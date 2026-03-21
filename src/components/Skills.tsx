'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import {
  SiApachespark,
  SiApacheairflow,
  SiApachekafka,
  SiSnowflake,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiGrafana,
  SiPrometheus,
  SiJenkins,
} from 'react-icons/si';
import {
  FiCloud,
  FiDatabase,
  FiCpu,
  FiGitBranch,
  FiCode,
  FiActivity,
} from 'react-icons/fi';

const skillCategories = [
  {
    title: 'Cloud Platforms',
    icon: <FiCloud size={20} />,
    skills: [
      'Azure ADLS Gen2',
      'Azure Data Factory',
      'Databricks',
      'Synapse',
      'AWS S3',
      'AWS Lambda',
      'AWS Glue',
      'CloudWatch',
    ],
  },
  {
    title: 'Data Technologies',
    icon: <FiDatabase size={20} />,
    skills: [
      'Snowflake',
      'Delta Lake',
      'SparkSQL',
      'Medallion Architecture',
      'Kafka',
      'Change Data Capture',
    ],
    icons: [SiSnowflake, SiApachekafka],
  },
  {
    title: 'Processing Frameworks',
    icon: <FiCpu size={20} />,
    skills: ['Apache Spark', 'PySpark', 'Airbyte'],
    icons: [SiApachespark],
  },
  {
    title: 'Orchestration Tools',
    icon: <FiGitBranch size={20} />,
    skills: ['Apache Airflow', 'Azure Data Factory'],
    icons: [SiApacheairflow],
  },
  {
    title: 'Programming Languages',
    icon: <FiCode size={20} />,
    skills: ['Python', 'Java', 'SQL', 'Shell Scripting'],
    icons: [SiPython],
  },
  {
    title: 'DevOps & Monitoring',
    icon: <FiActivity size={20} />,
    skills: [
      'Jenkins',
      'Argo CD',
      'Docker',
      'Helm',
      'Kubernetes',
      'Grafana',
      'Prometheus',
      'Splunk',
      'Dynatrace',
      'SonarQube',
    ],
    icons: [SiDocker, SiKubernetes, SiGrafana, SiPrometheus, SiJenkins],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="section-padding bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and platforms I use to build data systems"
        />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/5 text-primary border border-primary/10 hover:bg-primary/15 hover:border-primary/30 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
