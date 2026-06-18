"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Fake News Classification",
    imageUrl: "/assets/fake-news.png",
    bullets: [
      "Designed and trained CNNs on a curated news dataset to detect linguistic and semantic cues of misinformation",
      "Engineered an ensemble of Logistic Regression, SVM & Random Forest to improve overall robustness",
      "Applied tokenization, stop-word removal, TF-IDF weighting, and Word2Vec embeddings",
      "Achieved 92%+ F1 on test set; containerized with Docker & exposed via Flask API",
    ],
    stack: ["Python", "TensorFlow", "scikit-learn", "Flask", "Docker"],
  },
  {
    id: 2,
    title: "POS Tagging with Viterbi",
    imageUrl: "/assets/pos-tagging.jpg",
    bullets: [
      "Built a Twitter POS tagger using Hidden Markov Models and Viterbi decoding",
      "Smoothed unknown tokens with a Naïve Bayes fallback, boosting rare-word accuracy",
      "Extracted suffix/prefix, capitalization, punctuation & n-gram features from tweets",
      "Integrated WordNet lexicon for named-entity & slang recognition",
      "Achieved >88% tagging accuracy on the UD Twitter Treebank",
    ],
    stack: ["Python", "NumPy", "NLTK", "scikit-learn"],
  },
  {
    id: 3,
    title: "MLBB: Automated ML Platform",
    imageUrl: "/assets/mlbb.jpg",
    bullets: [
      "React dashboard for dataset upload, algorithm selection, and training monitoring",
      "Flask backend for data cleaning, feature transformation & model training orchestration",
      "Automated hyperparameter tuning via GridSearchCV & Bayesian Optimization",
      "Interactive Chart.js visualizations: ROC curves, confusion matrices, metrics",
      "Exported production-ready Pickle/Joblib artifacts with a single click",
    ],
    stack: ["React", "Flask", "Pandas", "scikit-learn", "Chart.js"],
  },
  {
  id: 4,
  title: "POPTrade Marketplace",
  imageUrl: "/assets/poptrade.png",
  bullets: [
    "Built a Vue.js front end for browsing, listing, and trading Pop Mart blind‐box figures with real‐time price & availability feeds",
    "Implemented Firebase Authentication for secure sign-in, and Firestore for storing user profiles, listings, bids, and trade history",
    "Created Cloud Functions to match buy/sell orders serverlessly, handle escrow holds, and trigger notifications on fills via FCM",
    "Integrated WebSockets (Firebase Realtime Database) to push instant updates on order status, new listings, and price changes",
    "Designed a normalized Firestore schema to efficiently query collectibles by series, rarity, and condition",
    "Set up CI/CD on Firebase Hosting so that every commit to `main` auto-deploys the latest static assets"
  ],
  stack: ["Vue.js", "Firebase Auth", "Cloud Firestore", "Cloud Functions", "Firebase Realtime Database", "Tailwind CSS"],
}
];

export default function Projects() {
  return (
    <motion.section className="min-h-screen px-4 py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
            >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0]}}           // move up 10px then back
        transition={{
            duration: 3,                         // total time for one up-and-down
            repeat: Infinity,                    // loop forever
            ease: "easeInOut"
        }} 
        className="text-center mb-12">
        <h2 className="inline-block text-6xl lg:text-7xl font-poppins-bold text-gradient leading-snug">
          My Projects
        </h2>
        <p className="mt-2 text-lg font-poppins-regular text-white/50">
          Click on each for more information
        </p>
      </motion.div>

      <div className="max-w-8xl mx-auto mt-10 lg:mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {projects.map((proj,i) => {
            const isEven = i % 2 === 0;
          return (
            <Dialog key={proj.id}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group relative aspect-[3/2] w-full cursor-pointer overflow-hidden rounded-lg bg-gray-800/50 transition-transform"
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />

                  {/* dark overlay */}
                  <div className="absolute inset-0 bg-black/90 md:bg-black/0 md:group-hover:bg-black/90 transition-colors" />

                  {/* title on hover */}
                  <div className="absolute inset-0 flex items-center justify-center p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <h3 className="text-3xl font-poppins-semibold text-white/90">
                      {proj.title}
                    </h3>
                  </div>
                </motion.div>
              </DialogTrigger>

              <DialogContent
                className={cn(
                  ""
                )}
              >
                  <DialogHeader>
                    <DialogTitle className="text-2xl mb-2 text-gradient font-poppins-semibold">
                      {proj.title}
                    </DialogTitle>
                  </DialogHeader>

                  <DialogDescription asChild>
                    <div className="space-y-4 mt-4 text-white/80 font-poppins-regular">
                      <ul className="list-disc list-inside space-y-1">
                        {proj.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                      <div>
                        <h4 className="font-poppins-semibold text-white/80 mb-1">
                          Tech Stack
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                          {proj.stack.map((tech, i) => (
                            <li
                              key={i}
                              className="bg-gray-700/50 text-sm px-2 py-1 rounded-full"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogDescription>
              </DialogContent>
            </Dialog>
          )})}
        </div>
      </div>
    </motion.section>
  );
}
