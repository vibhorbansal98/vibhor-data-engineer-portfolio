'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { FiCloud, FiDatabase, FiTrendingUp } from 'react-icons/fi';

const highlights = [
  {
    icon: <FiDatabase size={24} />,
    title: 'Scalable Pipelines',
    desc: '5+ years designing end-to-end ETL/ELT data pipelines processing hundreds of GBs daily with CDC, SCD, and Medallion Architecture.',
  },
  {
    icon: <FiCloud size={24} />,
    title: 'Cloud Expertise',
    desc: 'Deep experience across Azure (ADLS, ADF, Databricks, Synapse) and AWS (S3, Lambda, Glue, CloudWatch) ecosystems.',
  },
  {
    icon: <FiTrendingUp size={24} />,
    title: 'Performance & Cost',
    desc: 'Proven track record of optimizing throughput, reducing processing costs by 30%, and achieving 99.9% uptime on production systems.',
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="Bridging the gap between raw data and business intelligence"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-lg text-muted leading-relaxed max-w-3xl mx-auto text-center">
            Results-driven Data Engineer with <span className="text-foreground font-medium">5+ years of experience</span> designing
            and optimizing end-to-end data pipelines in Azure and AWS. Skilled in{' '}
            <span className="text-foreground font-medium">ETL/ELT, data modeling, CDC/SCD</span>, and orchestration using Airflow.
            Proven track record in building{' '}
            <span className="text-foreground font-medium">scalable, cost-efficient and secure data workflows</span>, integrating batch
            and streaming sources like Kafka and relational databases into Snowflake and Delta Lake for analytics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
