# backend/routes/whyme.py
import os
import csv
from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from lib.vectorstore.resumestore import get_resume_store
from langchain_openai import ChatOpenAI
from langchain.chains.combine_documents.stuff import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from lib.prompt import prompt
from werkzeug.utils import secure_filename
from pathlib import Path
from flask import current_app
from langchain.document_loaders import PyPDFLoader

whyme_bp = Blueprint("whyme", __name__, url_prefix="/api/whyme")

ALLOWED_EXTENSIONS = {"pdf"}

def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@whyme_bp.route("/upload_jd", methods=["POST"])
def upload_jobdesc():
    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "Only PDF files are allowed"}), 400

    tmp_dir = Path(current_app.root_path) / "../tmp"
    tmp_dir.mkdir(exist_ok=True)
    filename = secure_filename(file.filename)
    tmp_path = tmp_dir / filename
    file.save(tmp_path)

    try:
        loader = PyPDFLoader(str(tmp_path))
        docs = loader.load()
        text = "\n\n".join(page.page_content for page in docs)
    finally:
        tmp_path.unlink()

    return jsonify({"text": text}), 200


LOG_DIR = os.path.join(os.path.dirname(__file__), os.pardir, "logs")
LOG_FILE = os.path.join(LOG_DIR, "whyme_requests.csv")

os.makedirs(LOG_DIR, exist_ok=True)

if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "job_description", "ai_answer"])


@whyme_bp.route("", methods=["POST"])
def whyme():
    data = request.get_json()
    job_desc = data.get("jobDescription")
    print(f"Job Description: {job_desc}")
    if not job_desc:
        return jsonify({"error": "Missing job description"}), 400

    store = get_resume_store()
    retriever = store.as_retriever(search_kwargs={"k": 4})
    llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0.3)
    combine_chain = create_stuff_documents_chain(llm=llm, prompt=prompt)
    chain = create_retrieval_chain(retriever=retriever, combine_docs_chain=combine_chain)
    result = chain.invoke({"input": job_desc})["answer"]

    print(f"Generated Result: {result}")

    with open(LOG_FILE, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.now(timezone.utc).isoformat(),
            job_desc.replace("\n", " "),
            result.replace("\n", " ")
        ])
    return jsonify({"result": result})

@whyme_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200
