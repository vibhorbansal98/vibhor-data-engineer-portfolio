'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const posts = [
  {
    title: 'Building Scalable CDC Pipelines with Airbyte and Snowflake',
    excerpt:
      'A deep dive into designing Change Data Capture pipelines that process hundreds of GBs daily with automated reconciliation and SCD logic.',
    category: 'Data Engineering',
    readTime: '8 min',
    date: 'Mar 2026',
    slug: 'scalable-cdc-pipelines',
  },
  {
    title: 'Kafka Streaming at Scale: Lessons from 100K Messages/Hour',
    excerpt:
      'Practical insights from building a high-throughput Kafka consumer microservice — batch sizing strategies, error handling, and cost optimization.',
    category: 'Streaming',
    readTime: '6 min',
    date: 'Feb 2026',
    slug: 'kafka-streaming-at-scale',
  },
  {
    title: 'Medallion Architecture: From Raw to Analytics-Ready in Three Layers',
    excerpt:
      'How the Bronze-Silver-Gold pattern streamlines data quality, transforms, and governance in modern data lakehouses.',
    category: 'Architecture',
    readTime: '7 min',
    date: 'Jan 2026',
    slug: 'medallion-architecture',
  },
  {
    title: 'Airflow Orchestration Patterns for Data Engineers',
    excerpt:
      'Best practices for structuring Airflow DAGs — dynamic task generation, retry logic, alerting, and integrating with tools like Airbyte.',
    category: 'Orchestration',
    readTime: '5 min',
    date: 'Dec 2025',
    slug: 'airflow-orchestration-patterns',
  },
  {
    title: 'Migrating CI/CD from Jenkins to Argo CD: A Practical Guide',
    excerpt:
      'How we saved 15 hours/month by adopting GitOps with Argo CD — setup, challenges, and lessons learned during the migration.',
    category: 'DevOps',
    readTime: '6 min',
    date: 'Nov 2025',
    slug: 'jenkins-to-argocd-migration',
  },
  {
    title: 'Cost Optimization Strategies for Cloud Data Pipelines',
    excerpt:
      'Real-world techniques for reducing cloud costs — from Snowflake warehouse tuning to batch processing optimization on AWS.',
    category: 'Cloud',
    readTime: '7 min',
    date: 'Oct 2025',
    slug: 'cloud-cost-optimization',
  },
];

export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="blog" className="section-padding bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Blog & Insights"
          subtitle="Sharing knowledge on data engineering, cloud architecture, and best practices"
        />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted">{post.date}</span>
                </div>

                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <FiClock size={12} />
                    {post.readTime} read
                  </div>
                  <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                    Read More <FiArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
