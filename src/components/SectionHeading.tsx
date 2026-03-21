'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text inline-block">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted max-w-2xl mx-auto text-lg">{subtitle}</p>
      )}
      <div className="mt-4 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-primary to-accent" />
    </motion.div>
  );
}
