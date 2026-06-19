import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import Work from "@/components/Work";
import Projects from "@/components/projects";
import Skills from "@/components/Skills";
import Education from "@/components/education";
import WhyMe from "@/components/whyme";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Work />
      <Projects />
      <Skills />
      <Education />
      <WhyMe />
      <Contact />
    </main>
  );
}
