import Photo from "@/components/HeroImage"
import Socials from "@/components/socials"
import TypingAnimation from "@/components/TypingAnimation"
import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"
import { motion } from "framer-motion"

const hero = () => {
  return (
    <motion.section
        id = "hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-full mt-20 min-h-screen"
    >
      <div className="container mx-auto h-full">
        <div className="flex flex-col items-center justify-between xl:flex-row xl:pt-8 xl:pb-24">
          <div className="order-2 xl:order-none flex flex-col items-center xl:items-start text-center xl:text-left space-y-8">
            <h1 className="h1">
              <span className="text-gradient text-5xl sm:text-7xl font-poppins-bold">
                Justin Goh</span>
            </h1>
            <div>
              <TypingAnimation />
            </div>
            <p className="max-w-[500px] mb-9 text-white/80 font-poppins-regular">Final-year Business Analytics student at the National University of Singapore with specialisations in Machine Learning and Financial Analytics.</p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button asChild variant= "outline" size = "lg" className= "uppercase flex items-center gap-2">
                <a href = "/Goh_Kian_Hwee_Justin_Resume.pdf" download>
                <span> Download CV </span>
                <FiDownload className="text-xl" />
                </a>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials 
                containerStyles={"flex gap-6"} 
                iconStyles={"w-9 h-9 border border-accent rounded-full flex justify-center items-center text-white text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"}/>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
            }}
            className="order-1 xl:order-none mb-8 xl:mb-0"
            >
            <Photo />
            </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default hero