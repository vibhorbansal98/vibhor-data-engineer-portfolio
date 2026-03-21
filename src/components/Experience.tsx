'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';

const experiences = [
  {
    company: 'WPP Media',
    role: 'Data Engineer',
    location: 'Bangalore',
    period: 'Dec 2025 – Present',
    highlights: [
      'Working on a large-scale <strong>Media Data Lake</strong> project, ingesting and processing media data using <strong>PySpark</strong> into a Medallion Architecture (Bronze → Silver → Gold).',
      'Building and optimizing PySpark-based ingestion pipelines to handle <strong>high-volume media datasets</strong> across multiple domains with reliability and performance.',
      'Applying <strong>data quality checks and transformations</strong> at each layer of the Medallion architecture to ensure clean, analytics-ready data in the Gold layer.',
    ],
    tech: ['PySpark', 'Medallion Architecture', 'Data Lake', 'Data Quality'],
  },
  {
    company: 'Optum (UnitedHealth Group)',
    role: 'Senior Software Engineer',
    location: 'Noida',
    period: 'Mar 2022 – Dec 2025',
    highlights: [
      'Architected an end-to-end <strong>CDC pipeline processing 200GB data daily</strong> from PostgreSQL to Snowflake using Airbyte + Airflow — enabling real-time analytics for 50+ business users.',
      'Developed a Java Spring Boot microservice handling <strong>100K+ Kafka messages/hour</strong>, achieving <strong>99.9% uptime</strong> and reducing data processing costs by <strong>30%</strong>.',
      'Built ADF pipelines for <strong>healthcare data</strong> — ingesting CSV to ADLS, converting to Parquet, and transforming in Databricks (Bronze → Silver → Gold) as Delta tables.',
      'Led migration from <strong>Jenkins to Argo CD</strong>, saving 15 hours/month in production deployment effort.',
      'Managed 10+ domains with <strong>90%+ code coverage</strong>, SonarQube gate 9, and zero critical vulnerabilities.',
    ],
    tech: [
      'Snowflake',
      'Airflow',
      'Kafka',
      'Airbyte',
      'Databricks',
      'ADF',
      'Java',
      'Argo CD',
    ],
  },
  {
    company: 'Bank of America',
    role: 'Apprentice Trainee',
    location: 'Chennai',
    period: 'Jul 2021 – Mar 2022',
    highlights: [
      'Developed an <strong>AWS ETL pipeline</strong> for trading data using Lambda, S3, Glue, and Athena.',
      'Automated daily extraction with CloudWatch triggers, <strong>reducing manual work by 90%</strong>.',
      'Data cleansing and transformation performed before loading into analytics layers, enabling <strong>near-real-time insights</strong> for business analysts.',
    ],
    tech: ['AWS Lambda', 'S3', 'Glue', 'Athena', 'CloudWatch'],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Professional Experience"
          subtitle="A track record of building data systems that deliver real business impact"
        />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {exp.company}
                      </h3>
                      <p className="text-primary font-medium text-sm">
                        {exp.role} · {exp.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted bg-surface px-3 py-1.5 rounded-lg">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted leading-relaxed flex gap-2"
                      >
                        <span className="text-primary mt-1.5 shrink-0">▸</span>
                        <span dangerouslySetInnerHTML={{ __html: h }} />
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs rounded-md bg-accent/10 text-accent border border-accent/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
