import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import SystemDesign from '@/components/SystemDesign';
import Achievements from '@/components/Achievements';
import Upskilling from '@/components/Upskilling';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <SystemDesign />
        <Achievements />
        <Upskilling />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
