from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import OpenAIEmbeddings

_resume_vector_store = None

def get_resume_store():
    """
    Load and cache the resume PDF as an in-memory vector store.
    """
    global _resume_vector_store
    if _resume_vector_store is not None:
        print("✅ [Resume Store] Using cached resume vector store")
        return _resume_vector_store

    print("📄 [Resume Store] Loading and embedding resume PDF...")

    # PDF expected at backend/assets/resume.pdf
    pdf_path = Path(__file__).parent.parent.parent / "assets" / "resume.pdf"
    if not pdf_path.exists():
        raise FileNotFoundError(f"Resume PDF not found at {pdf_path}")

    loader = PyPDFLoader(str(pdf_path))
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(docs)

    embeddings = OpenAIEmbeddings()
    store = InMemoryVectorStore.from_documents(chunks, embeddings)

    _resume_vector_store = store
    print("🧠 [Resume Store] Resume embedded and cached successfully")
    return store