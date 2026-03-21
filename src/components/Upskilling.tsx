'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { FiBookOpen, FiCpu, FiZap } from 'react-icons/fi';

const learnings = [
  {
    icon: <FiBookOpen size={24} />,
    title: 'dbt (Data Build Tool)',
    description:
      'Exploring dbt for modern data transformations — building modular, testable SQL pipelines with version control and documentation as first-class citizens.',
    status: 'Currently Learning',
    tags: ['dbt Core', 'SQL Transformations', 'Data Testing', 'Documentation'],
  },
  {
    icon: <FiCpu size={24} />,
    title: 'Generative AI',
    description:
      'Experimenting with LLMs and generative AI to build intelligent tools like AI-powered resume builders and automated data documentation systems.',
    status: 'Experimenting',
    tags: ['LLMs', 'Prompt Engineering', 'AI Applications', 'RAG'],
  },
  {
    icon: <FiZap size={24} />,
    title: 'Intelligent Data Applications',
    description:
      'Building data-driven applications that leverage ML models and AI for automated insights, anomaly detection, and smart data quality monitoring.',
    status: 'Exploring',
    tags: ['ML Pipelines', 'Anomaly Detection', 'Data Quality AI', 'AutoML'],
  },
];

export default function Upskilling() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="upskilling" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Upskilling & Learning"
          subtitle="Staying ahead in the ever-evolving data landscape"
        />

        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {learnings.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-lg">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-accent/5 text-accent/80 border border-accent/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
