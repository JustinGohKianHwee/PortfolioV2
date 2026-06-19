export const skillGroups = [
  {
    category: "ML & Research",
    skills: [
      "Deep Learning",
      "Recommendation Systems",
      "Retrieval & Ranking",
      "Transformer Architectures",
      "Embeddings & Vector Search",
      "Hard Negative Mining",
      "A/B Experimentation",
      "Foundation Models",
      "LLMs & RAG",
      "Feature Engineering",
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "PyTorch",
      "TensorFlow",
      "HuggingFace Transformers",
      "LangChain",
      "LangGraph",
      "Scikit-learn",
      "PySpark",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "Languages",
    skills: ["Python", "Java", "JavaScript", "SQL", "R", "HTML"],
  },
  {
    category: "Infrastructure & Tools",
    skills: [
      "Google Cloud (Vertex AI, GCS, Matching Engine)",
      "AWS",
      "Docker",
      "Apache Airflow",
      "MLflow / MLOps",
      "Git",
      "CI/CD",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    category: "Frontend & Backend",
    skills: ["React", "Vue.js", "Flask", "FastAPI", "Node.js", "Vite"],
  },
];

// Flat list for simple display
export const allSkills = skillGroups.flatMap((g) => g.skills);
