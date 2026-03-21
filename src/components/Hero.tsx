'use client';

import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiMail } from 'react-icons/fi';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider"
          >
            Hello, I&apos;m
          </motion.p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="gradient-text">Vibhor Bansal</span>
          </h1>


          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Building high-throughput, cost-efficient data pipelines across Azure
            &amp; AWS — transforming raw data into actionable intelligence at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow cursor-pointer"
            >
              View Projects
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-xl glass text-foreground font-medium flex items-center gap-2 hover:border-primary/40 transition-colors"
            >
              <FiDownload /> Download Resume
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 rounded-xl glass text-foreground font-medium flex items-center gap-2 hover:border-primary/40 transition-colors cursor-pointer"
            >
              <FiMail /> Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-muted cursor-pointer"
            onClick={() => scrollTo('about')}
          >
            <FiArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
