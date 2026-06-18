"use client";

import { motion } from "framer-motion";

export default function Photo() {
  return (
    <div className="w-full h-full relative">
    {/* Image container */}
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4, ease: "easeIn" } }}
        className="absolute w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] rounded-full overflow-hidden mix-blend-normal"
    >
        <img
        src="/assets/montreal_final.png"
        alt="Montreal skyline"
        className="w-full h-full object-contain rounded-full"
        />
    </motion.div>

    {/* Animated SVG ring */}
    <motion.svg
    className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
    fill="transparent"
    viewBox="0 0 506 506"
    xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6b21a8" /> {/* purple-800 */}
            <stop offset="50%"  stopColor="#4338ca" /> {/* indigo-700 */}
            <stop offset="100%" stopColor="#1e3a8a" /> {/* blue-900 */}
            </linearGradient>
        </defs>
        
    <motion.circle
        cx="253"
        cy="253"
        r="250"
        stroke="url(#ringGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0, strokeDasharray: "24 10 0 0" }}
        animate={{
        opacity: [0, 1],
        strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
        rotate: [120, 360],
        }}
        transition={{
        opacity: { duration: 0.01 },
        delay: 0,
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        }}
    />
    </motion.svg>
    </div>
  );
}
