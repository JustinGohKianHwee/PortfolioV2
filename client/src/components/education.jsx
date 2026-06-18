// components/Education.jsx
import { motion } from "framer-motion";
import { HiOfficeBuilding, HiLocationMarker } from 'react-icons/hi';
import { cn } from '@/lib/utils';

const colours = [
  {
    bg: "bg-purple-800/19",
    dot: "bg-purple-500",
    badge: "bg-purple-700/10",
    ring:  'ring-purple-500',
  },
  {
    bg: "bg-indigo-700/19",
    dot: "bg-indigo-500",
    badge: "bg-indigo-600/10",
    ring: "ring-indigo-500",
  },
  {
    bg: "bg-blue-900/19",
    dot: "bg-blue-500",
    badge: "bg-blue-800/10",
    ring: "ring-blue-500",
  },
];

const educations = [
  {
    year: "2021 – Present",
    institution: "National University of Singapore",
    degree: "Bachelor of Science (w Hons) in Business Analytics",
    location: "Singapore",
    details: [
      "Major in Business Analytics, minor in Quantitative Finance",
      "Double Specialization in Financial and Machine Learning Analytics",
      "Recipient of NUS Merit Scholarship",
      "Programmes head of Sheares Hall Cultural Management Board",
      "Programmes head of Sheares Hall Overseas Community Service Programme"
    ],
  },
  {
    year: "2024",
    institution: "University of British Columbia",
    degree: "Student Exchange Programme",
    location: "Vancouver, Canada",
    details: [
      "Completed 4 Machine Learning, Statistics and Computer Science modules",
    ],
  },
  {
    year: "2018 – 2019",
    institution: "Raffles Junior College",
    degree: "GCSE A-Levels",
    location: "Singapore",
    details: [
      "AAA/A in Physics, Mathematics, Chemistry, and Economics",
      "Achieved Raffles Academic Excellence Award 2019",
      "Recipient of MOE Pre-University Scholarship",
      "Vice-Captain of Raffles Squash",
    ],
  },
  {
    year: "2014 – 2017",
    institution: "Raffles Institution",
    degree: "Integrated Program",
    location: "Singapore",
    details: [
      "EAGLEs award for exemplary leadership",
      "Raffles COLOURS Award",
      "Vice-Captain of Raffles Squash"
    ],
  },
  
];

export default function Education() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0]}}           // move up 10px then back
        transition={{
            duration: 3,                         // total time for one up-and-down
            repeat: Infinity,                    // loop forever
            ease: "easeInOut"
        }} 
        className="text-center mb-12">
        <h2 className="inline-block text-6xl lg:text-7xl font-poppins-bold text-gradient">
          Education
        </h2>
        <p className="mt-2 text-lg text-white/50 font-poppins-regular">
          Building expertise through hands-on learning
        </p>
      </motion.div>

      {/* Cards */}
      <div className="space-y-8">
        {educations.map((edu, idx) => {
            const { bg, dot, badge, ring } = colours[idx % colours.length];
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={cn(
                "relative ring-1 rounded-xl p-6 overflow-visible opacity-0 w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[60%] mx-auto",
                bg,
                ring
              )}
          >
            {/* Date badge */}
            <span className={cn(
                  "absolute top-4 right-4 text-xs text-white/70 px-3 py-1 rounded-full font-poppins-semibold",
                  badge
                )}>
              {edu.year}
            </span>

            {/* Title + dot */}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("w-3 h-3 rounded-full", dot)} />
              <h3 className="text-lg lg:text-xl font-poppins-semibold text-white/90 pr-16 md:pr-6">
                {edu.degree}
              </h3>
            </div>

            {/* Institution & location */}
            <div className="flex items-center text-white/50 space-x-6 mb-4 text-sm font-poppins-regular">
              <span className="flex items-center gap-1">
                <HiOfficeBuilding className="w-4 h-4" />
                {edu.institution}
              </span>
              <span className="flex items-center gap-1">
                <HiLocationMarker className="w-4 h-4" />
                {edu.location}
              </span>
            </div>

            {/* Description */}
            <ul className="list-disc list-inside text-left h4 text-white/60 font-poppins-regular">
                {edu.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
          </motion.div>
        )})}
      </div>
    </section>
  );
}
