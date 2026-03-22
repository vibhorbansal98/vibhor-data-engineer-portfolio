'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { FiExternalLink, FiGithub, FiStar, FiLock } from 'react-icons/fi';

const projects = [
  {
    title: 'AI Resume Builder',
    description:
      'An intelligent resume and portfolio builder powered by AI suggestions, offering multiple professionally designed templates, real-time preview, and PDF export capabilities.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI/ML'],
    impact: 'Streamlines resume creation with AI-powered content suggestions and professional templates',
    featured: true,
    github: 'https://github.com/vibhorbansal98/ai-resume-builder',
    demo: 'https://ai-resume-builder-vibhor.vercel.app/',
  },
  {
    title: 'Real-Time CDC Pipeline',
    description:
      'End-to-end Change Data Capture pipeline processing 200GB daily from PostgreSQL to Snowflake. Uses Airbyte for ingestion and Airflow for orchestration, enabling real-time analytics.',
    tech: ['Snowflake', 'Airbyte', 'Airflow', 'PostgreSQL', 'Python'],
    impact: 'Enables real-time analytics for 50+ downstream teams with automated data sync',
    featured: false,
    internal: true,
  },
  {
    title: 'Kafka Streaming Microservice',
    description:
      'High-throughput Java Spring Boot microservice processing 100K+ Kafka messages per hour into Snowflake with 99.9% uptime and 30% cost reduction.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'Snowflake', 'Docker'],
    impact: '99.9% uptime, 30% cost reduction through optimized batch sizing',
    featured: false,
    internal: true,
  },
  {
    title: 'AWS Trading Data ETL',
    description:
      'Serverless ETL pipeline for trading data using AWS Lambda, S3, Glue, and Athena with automated CloudWatch triggers for daily extraction.',
    tech: ['AWS Lambda', 'S3', 'Glue', 'Athena', 'CloudWatch'],
    impact: '90% reduction in manual work through automated daily extraction',
    featured: false,
    internal: true,
  },
  {
    title: 'Media Data Lake (Medallion)',
    description:
      'Large-scale media data lakehouse built on Medallion Architecture processing high-volume datasets using PySpark with data quality checks at each layer.',
    tech: ['PySpark', 'Delta Lake', 'Medallion Architecture', 'Data Quality'],
    impact: 'Analytics-ready Gold layer for cross-domain media data analysis',
    featured: false,
    internal: true,
  },
  {
    title: 'Azure Healthcare Pipeline',
    description:
      'ADF pipeline ingesting data from multiple sources (APIs, source databases, ADLS storage) to ADLS, converting to Parquet, and transforming in Databricks with event-based triggers and SCD logic.',
    tech: ['Azure ADF', 'Databricks', 'ADLS Gen2', 'Delta Lake', 'Parquet'],
    impact: 'Near real-time Gold layer updates for healthcare data with SCD logic',
    featured: false,
    internal: true,
  },
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="section-padding bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="Real-world data engineering solutions with measurable impact"
        />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-all duration-300 group ${
                proj.featured
                  ? 'md:col-span-2 lg:col-span-1 ring-1 ring-primary/20 glow'
                  : ''
              }`}
            >
              {proj.featured && (
                <div className="flex items-center gap-1.5 text-primary text-xs font-medium mb-3">
                  <FiStar size={14} className="fill-current" />
                  Featured Project
                </div>
              )}

              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {proj.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed mb-3 flex-1">
                {proj.description}
              </p>

              <div className="text-xs text-accent/80 bg-accent/5 rounded-lg px-3 py-2 mb-4 border border-accent/10">
                <strong className="text-accent">Impact:</strong> {proj.impact}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs rounded-md bg-primary/5 text-primary/80 border border-primary/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {proj.internal && (
                  <span className="flex items-center gap-1.5 text-sm text-muted/70">
                    <FiLock size={14} />
                    Internal Project
                  </span>
                )}
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                  >
                    <FiGithub size={16} /> GitHub
                  </a>
                )}
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-light transition-colors"
                  >
                    <FiExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
