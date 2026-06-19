export const projects = [
  // Tier 1 — Featured case studies
  {
    id: "juriscontext",
    tier: 1,
    title: "JurisContext",
    subtitle: "Financial Regulatory Document Retrieval System",
    tagline: "End-to-end RAG pipeline for querying Singapore & US financial regulations in natural language.",
    context: "BT4103 Capstone · NUS · Group Project",
    problem:
      "Financial regulatory documents across Singapore and the US are fragmented across jurisdictions and formats. Compliance teams and financial officers need rapid, natural-language access to regulatory frameworks — with proper source attribution.",
    contribution:
      "Designed and built the chunking strategy framework, embedding pipeline, and RAGAS evaluation system. Implemented LlamaIndex semantic chunking and the agentic chunker that automatically adapts strategy based on document structure.",
    approach:
      "Multi-source ingestion connectors (Singapore SSO Banking Act, SGX rules, US CFR via eCFR API, FINRA rulebook) → normalisation → 6 configurable chunking strategies → Vertex AI text-embedding-004 → Google Cloud Matching Engine ANN vector search → optional Gemini 1.5 Flash re-ranking → RAG generation → RAGAS automated evaluation. Orchestrated via weekly Apache Airflow DAG. Exposed via FastMCP server and FastAPI web UI.",
    highlights: [
      "6 chunking strategies: Fixed, Recursive, MD Header, LlamaIndex Semantic, Agentic, LLM-only",
      "Vertex AI text-embedding-004 + Google Cloud Matching Engine (ANN, Tree-AH index)",
      "RAGAS evaluation: faithfulness, context precision, context recall, answer relevancy",
      "Weekly Apache Airflow DAG for automated ingestion and re-indexing",
      "FastMCP server interface for programmatic integration",
    ],
    stack: ["Python", "Google Cloud", "Vertex AI", "Matching Engine", "LangChain", "Apache Airflow", "FastAPI", "FastMCP", "RAGAS", "BeautifulSoup", "PyMuPDF"],
    image: null,
    github: null,
    demo: null,
    year: "2025",
  },
  {
    id: "steam-reviews",
    tier: 1,
    title: "Steam Review Analysis",
    subtitle: "What Actually Drives Game Recommendations?",
    tagline: "Processed 9.6M Steam reviews with PySpark to discover that review timing and length outpredict text content — with direct relevance to recommender system feature engineering.",
    context: "BT4221 · NUS · Group Project",
    problem:
      "With 9.6 million Steam reviews and extreme class imbalance (89:11 positive-to-negative), which features most strongly influence whether a review recommends a game? Rather than optimising purely for prediction accuracy, the project prioritises feature importance and interpretability.",
    contribution:
      "Led feature engineering pipeline design, implemented PySpark MLlib model training with hyperparameter tuning, and built the semantic feature experiment using LangChain and OpenAI API to extract 9 LLM-derived signals from review text.",
    approach:
      "Cleaned 9.6M reviews with PySpark (duplicate removal, outlier capping, stratified balancing) → engineered 8 structured features from review metadata and text structure → trained Logistic Regression and Random Forest via PySpark MLlib → analysed feature importance → ran parallel agentic pipeline using LangGraph for comparison → semantic feature experiment with OpenAI-extracted signals.",
    highlights: [
      "Counterintuitive finding: review timing (34.6%) + length (55.8%) dominate — metadata beats text content",
      "Random Forest AUC-ROC 0.7375, F1 0.6811 on balanced 9.6M-review dataset",
      "Dual-pipeline design: manual analytical workflow vs. LangGraph agentic workflow",
      "Semantic feature experiment: 9 LLM-extracted dimensions via LangChain + OpenAI API",
      "49 interactive Plotly EDA visualisations",
    ],
    stack: ["PySpark", "Python", "LangChain", "LangGraph", "OpenAI API", "Scikit-learn (MLlib)", "Pandas", "Plotly", "Matplotlib"],
    image: null,
    github: null,
    demo: "https://www.youtube.com/watch?v=FcJ23XYdudw",
    year: "2025",
  },

  // Tier 2 — Full project cards
  {
    id: "fake-news",
    tier: 2,
    title: "Fake News Classification",
    subtitle: "NLP + Deep Learning Ensemble",
    tagline: "Multi-model NLP pipeline combining classical ML and deep learning for fake news detection, achieving 92%+ F1.",
    context: "Personal Project",
    problem:
      "Identifying fake news at scale requires robust NLP models that generalise beyond keyword matching.",
    contribution: "Built the full training pipeline from data preprocessing through model ensembling.",
    approach:
      "Classical baselines (Random Forest, Naïve Bayes, SVM with TF-IDF and N-grams) → deep learning stack (DNN, CNN, LSTM) → ensemble combination for final predictions.",
    highlights: [
      "92%+ F1 score on held-out test set",
      "CNN architecture outperformed LSTM on this task",
      "Ensemble of classical + deep models beat individual approaches",
    ],
    stack: ["Python", "TensorFlow", "Flask", "Docker", "Scikit-learn", "NumPy", "Pandas"],
    image: "/assets/fake-news.png",
    github: null,
    demo: null,
    year: "2023",
  },
  {
    id: "mlbb",
    tier: 2,
    title: "Automated ML Platform",
    subtitle: "No-Code ML Training Dashboard",
    tagline: "Full-stack platform letting users train, tune, and evaluate ML models through a browser interface — no code required.",
    context: "Personal Project",
    problem:
      "Non-technical users and rapid prototypers need a way to experiment with ML without writing training loops.",
    contribution: "Designed and built the React frontend, Flask backend, and model training orchestration layer.",
    approach:
      "React dashboard → hyperparameter configuration UI → Flask API → model training pipeline → 4 real-time visualisations (loss curves, confusion matrix, feature importance, ROC).",
    highlights: [
      "4 training visualisation types rendered in-browser",
      "Hyperparameter tuning interface with live feedback",
      "Supports classification and regression workflows",
    ],
    stack: ["React", "Flask", "Python", "Scikit-learn", "Chart.js", "Node.js"],
    image: "/assets/mlbb.jpg",
    github: null,
    demo: null,
    year: "2023",
  },

  // Tier 3 — Compact cards
  {
    id: "pos-tagging",
    tier: 3,
    title: "POS Tagging with Viterbi",
    subtitle: "Hidden Markov Model + Viterbi Algorithm",
    tagline: "Twitter POS tagger using HMM + Viterbi with custom morphological feature extraction, achieving 88% accuracy.",
    context: "Academic Project",
    approach:
      "Hidden Markov Model with Viterbi decoding + Naïve Bayes integration. Feature engineering: morphological attributes, linguistic nuances, domain-specific Twitter patterns.",
    highlights: [
      "88% accuracy on Twitter POS tagging benchmark",
      "Custom feature extraction for informal language",
    ],
    stack: ["Python", "HMM", "Viterbi Algorithm", "NumPy"],
    image: "/assets/pos-tagging.jpg",
    github: null,
    demo: null,
    year: "2023",
  },
  {
    id: "poptrade",
    tier: 3,
    title: "POPTrade Marketplace",
    subtitle: "Real-Time Collectibles Exchange",
    tagline: "Vue.js + Firebase marketplace for trading collectibles with real-time updates and CI/CD deployment.",
    context: "Personal Project",
    approach:
      "Vue.js frontend + Firebase Realtime Database + Firestore + Firebase Authentication + CI/CD pipeline via Firebase Hosting.",
    highlights: [
      "Real-time buy/sell updates via Firebase listeners",
      "Full CI/CD pipeline on Firebase Hosting",
    ],
    stack: ["Vue.js", "Firebase", "Firestore", "JavaScript", "CI/CD"],
    image: "/assets/poptrade.png",
    github: null,
    demo: null,
    year: "2023",
  },
];
