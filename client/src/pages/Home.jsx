// src/pages/Home.jsx
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar"
import Hero from "@/components/hero"
import Resume from "@/components/resume";
import Experiences from "@/components/experiences";
import Education from "@/components/education";
import Projects from "@/components/projects";
import WhyMe from "@/components/whyme";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

const Home = () => {
  return (
    <motion.div
      className="min-h-screen bg-background bg-cover bg-center bg-fixed"
      animate={{
        filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {/* Background */}
      {/* Nav Bar */}
      <Navbar />
      {/* Main Content */}
       <section id="hero" className="min-h-screen scroll-mt-40 ">
      <Hero />
      </section>
      <section id="skills" className="min-h-screen scroll-mt-32">
      <Resume />
      </section>
      <section id="experiences" className="min-h-screen scroll-mt-32 mb-30">
      <Experiences />
      </section>
      <section id="education" className="min-h-screen scroll-mt-5">
      <Education />
      </section>
      <section id="projects" className="min-h-screen scroll-mt-15">
      <Projects />
      </section>
      <section id="whyme" className="min-h-screen scroll-mt-25">
      <WhyMe />
      </section>
      <section id="contact" className="min-h-screen scroll-mt-10">
      <Contact />
      </section>
      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Home;
