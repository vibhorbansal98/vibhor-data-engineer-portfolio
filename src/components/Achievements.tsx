'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import AnimatedCounter from './AnimatedCounter';
import { FiDatabase, FiZap, FiShield, FiTrendingDown, FiClock, FiCode } from 'react-icons/fi';

const metrics = [
  {
    icon: <FiDatabase size={28} />,
    value: 200,
    suffix: 'GB+',
    label: 'Data Processed Daily',
    description: 'End-to-end CDC pipeline',
  },
  {
    icon: <FiZap size={28} />,
    value: 100,
    suffix: 'K+',
    label: 'Messages / Hour',
    description: 'Kafka streaming throughput',
  },
  {
    icon: <FiShield size={28} />,
    value: 99,
    suffix: '.9%',
    label: 'System Uptime',
    description: 'Production microservice',
  },
  {
    icon: <FiTrendingDown size={28} />,
    value: 30,
    suffix: '%',
    label: 'Cost Reduction',
    description: 'Optimized batch processing',
  },
  {
    icon: <FiClock size={28} />,
    value: 90,
    suffix: '%',
    label: 'Manual Work Reduced',
    description: 'CloudWatch automation',
  },
  {
    icon: <FiCode size={28} />,
    value: 90,
    suffix: '%+',
    label: 'Code Coverage',
    description: 'Across 10+ domains',
  },
];

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="achievements" className="section-padding bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Key Achievements"
          subtitle="Measurable impact through engineering excellence"
        />

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl p-5 md:p-6 text-center hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                {metric.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-muted">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
