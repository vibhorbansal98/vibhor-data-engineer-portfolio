'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';

const architectures = [
  {
    title: 'CDC Pipeline Architecture',
    description:
      'End-to-end Change Data Capture pipeline from PostgreSQL to Snowflake with automated orchestration and reconciliation.',
    layers: [
      { label: 'Source', items: ['PostgreSQL', 'Triggers'], color: 'from-blue-500 to-blue-600' },
      { label: 'Ingestion', items: ['Airbyte', 'CDC Sync'], color: 'from-cyan-500 to-cyan-600' },
      { label: 'Orchestration', items: ['Airflow DAGs', 'Reconciliation'], color: 'from-violet-500 to-violet-600' },
      { label: 'Warehouse', items: ['Snowflake', 'SCD Logic'], color: 'from-purple-500 to-purple-600' },
      { label: 'Serving', items: ['Analytics', '50+ Users'], color: 'from-pink-500 to-pink-600' },
    ],
  },
  {
    title: 'Streaming Architecture',
    description:
      'High-throughput streaming system processing 100K+ messages per hour from Kafka to Snowflake.',
    layers: [
      { label: 'Producers', items: ['Applications', 'Events'], color: 'from-emerald-500 to-emerald-600' },
      { label: 'Broker', items: ['Kafka Topics', 'Partitions'], color: 'from-green-500 to-green-600' },
      { label: 'Consumer', items: ['Spring Boot', 'Batch Processing'], color: 'from-teal-500 to-teal-600' },
      { label: 'Storage', items: ['Snowflake', 'Streams'], color: 'from-cyan-500 to-cyan-600' },
      { label: 'Foundation', items: ['Latest Data', 'SCD'], color: 'from-blue-500 to-blue-600' },
    ],
  },
  {
    title: 'Medallion Architecture',
    description:
      'Multi-layer data lakehouse processing high-volume datasets with quality checks at each stage.',
    layers: [
      { label: 'Landing', items: ['CSV/JSON', 'Raw Files'], color: 'from-amber-500 to-amber-600' },
      { label: 'Bronze', items: ['Raw Ingestion', 'Schema Applied'], color: 'from-orange-500 to-orange-600' },
      { label: 'Silver', items: ['Cleansed', 'Validated'], color: 'from-slate-400 to-slate-500' },
      { label: 'Gold', items: ['Aggregated', 'Analytics-Ready'], color: 'from-yellow-500 to-yellow-600' },
      { label: 'Consumers', items: ['BI Tools', 'Reports'], color: 'from-amber-600 to-amber-700' },
    ],
  },
];

export default function SystemDesign() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="architecture" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="System Design & Architecture"
          subtitle="Data pipeline architectures I've designed and built"
        />

        <div ref={ref} className="space-y-8">
          {architectures.map((arch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">
                {arch.title}
              </h3>
              <p className="text-sm text-muted mb-6">{arch.description}</p>

              {/* Pipeline flow visualization */}
              <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
                {arch.layers.map((layer, j) => (
                  <div key={j} className="flex-1 flex items-center">
                    <div className="flex-1 text-center">
                      <div
                        className={`bg-gradient-to-br ${layer.color} rounded-xl p-3 md:p-4 text-white mb-1 min-h-[80px] flex flex-col justify-center`}
                      >
                        <div className="font-semibold text-xs md:text-sm mb-1">
                          {layer.label}
                        </div>
                        {layer.items.map((item, k) => (
                          <div
                            key={k}
                            className="text-white/80 text-xs leading-tight"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    {j < arch.layers.length - 1 && (
                      <div className="hidden md:flex items-center px-1 text-primary text-lg">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
