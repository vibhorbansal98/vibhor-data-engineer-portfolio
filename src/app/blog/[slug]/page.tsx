import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';

interface BlogContent {
  title: string;
  category: string;
  date: string;
  readTime: string;
  sections: { heading: string; content: string }[];
  keyTakeaways: string[];
}

const blogData: Record<string, BlogContent> = {
  'scalable-cdc-pipelines': {
    title: 'Building Scalable CDC Pipelines with Airbyte and Snowflake',
    category: 'Data Engineering',
    date: 'Mar 2026',
    readTime: '8 min',
    sections: [
      {
        heading: 'Why CDC Matters',
        content:
          'Change Data Capture (CDC) is a pattern that identifies and tracks changes in source databases so that downstream systems can react in near real-time. Traditional batch ETL simply cannot keep up when business teams need fresh data every few minutes rather than once a day. By capturing only the rows that changed — inserts, updates, and deletes — CDC dramatically reduces data transfer volumes and keeps your warehouse costs under control.',
      },
      {
        heading: 'Architecture Overview',
        content:
          'Our pipeline processes approximately 200 GB of incremental data per day from PostgreSQL to Snowflake. At its core, Airbyte handles the replication layer. It reads the PostgreSQL WAL (Write-Ahead Log) and emits change events in a normalized format. Airflow orchestrates the entire workflow — triggering Airbyte syncs, running data quality checks, and managing SCD Type-2 merge operations in Snowflake. The separation of concerns between the two tools is key: Airbyte focuses on reliable extraction, and Airflow handles scheduling, retries, and alerting.',
      },
      {
        heading: 'Configuring Airbyte for CDC',
        content:
          'Setting up CDC in Airbyte involves enabling logical replication on PostgreSQL (wal_level = logical), creating a dedicated replication slot, and configuring Airbyte\'s PostgreSQL source connector with the CDC option. One critical lesson: always set a replication slot monitoring alert. If Airbyte goes down and the slot isn\'t consumed, the WAL will grow unbounded and eventually fill your disk. We use a simple CloudWatch alarm on the pg_replication_slots view to catch this early.',
      },
      {
        heading: 'SCD Type-2 in Snowflake',
        content:
          'Once the raw change events land in a staging table in Snowflake, we run a MERGE statement to apply them against the target dimension table using SCD Type-2 logic. This preserves full history: when a row is updated, the existing record gets an end_date timestamp and a new record is inserted with the updated values. The MERGE runs inside an Airflow task that also performs row-count reconciliation between the source and target to catch any drift.',
      },
      {
        heading: 'Handling Schema Evolution',
        content:
          'Schema changes in the source database are inevitable. New columns, renamed fields, type changes — all of these can break a CDC pipeline. We handle this by enabling Airbyte\'s "detect and propagate schema changes" feature and pairing it with a custom Airflow sensor that detects schema mismatches before the merge step. When a mismatch is found, the pipeline pauses and sends a Slack alert so the team can review and approve the DDL change in Snowflake.',
      },
      {
        heading: 'Performance and Cost Optimization',
        content:
          'Running CDC at scale requires careful tuning. We use Snowflake\'s transient tables for staging to avoid Time Travel storage costs, size our virtual warehouse to SMALL for most syncs (scaling up only for initial full loads), and compress staging files with Snappy before loading. On the Airbyte side, we tune the batch size and flush interval to balance latency against API call volume. These optimizations reduced our monthly Snowflake bill by roughly 25%.',
      },
    ],
    keyTakeaways: [
      'CDC captures only changed rows, reducing transfer volumes by 90%+ compared to full-table batch loads.',
      'Separating extraction (Airbyte) from orchestration (Airflow) makes each component independently testable and replaceable.',
      'Always monitor your PostgreSQL replication slot to prevent WAL disk exhaustion.',
      'SCD Type-2 merge logic in Snowflake preserves full history for audit and analytics.',
      'Schema evolution handling is not optional — automate detection and approval workflows early.',
    ],
  },

  'kafka-streaming-at-scale': {
    title: 'Kafka Streaming at Scale: Lessons from 100K Messages/Hour',
    category: 'Streaming',
    date: 'Feb 2026',
    readTime: '6 min',
    sections: [
      {
        heading: 'The Challenge',
        content:
          'Our team needed to build a microservice that could consume over 100,000 Kafka messages per hour, transform them, and load the results into Snowflake — all with 99.9% uptime. The messages represented healthcare claims data from multiple upstream systems, and any data loss or significant delay would directly impact downstream reporting and compliance dashboards.',
      },
      {
        heading: 'Choosing the Right Consumer Pattern',
        content:
          'We evaluated three consumer patterns: single-threaded sequential processing, multi-threaded consumer groups, and micro-batching with flush intervals. We settled on micro-batching because it gave us the best throughput-to-cost ratio. The consumer accumulates messages into an in-memory buffer and flushes to Snowflake every 5 seconds or when the buffer hits 1,000 records, whichever comes first. This approach reduced the number of Snowflake INSERT operations by 95% compared to row-by-row insertion.',
      },
      {
        heading: 'Building with Java Spring Boot',
        content:
          'The service is built on Java Spring Boot with the Spring Kafka library. We use a ConcurrentKafkaListenerContainerFactory with a concurrency of 3 (matching our topic\'s partition count) to parallelize consumption within a single instance. Each listener thread writes to a thread-safe ConcurrentLinkedQueue, and a scheduled task drains the queue and bulk-loads into Snowflake using the Snowflake JDBC driver\'s batch insert API.',
      },
      {
        heading: 'Error Handling and Dead Letter Queues',
        content:
          'Robust error handling was non-negotiable. We implemented a three-tier strategy: (1) transient errors trigger automatic retries with exponential backoff (up to 3 attempts), (2) deserialization errors route the raw message to a Dead Letter Queue (DLQ) topic for later inspection, and (3) Snowflake connection failures trigger a circuit breaker that pauses consumption and alerts the on-call engineer via PagerDuty. This layered approach means we never silently lose a message.',
      },
      {
        heading: 'Monitoring and Observability',
        content:
          'We instrument the service with Micrometer + Prometheus metrics exposed on a /actuator/prometheus endpoint. Key metrics include messages consumed per second, batch flush duration, Snowflake insert latency (p50/p99), consumer lag per partition, and DLQ message count. All metrics feed into Grafana dashboards with alerting rules. Consumer lag above 10,000 triggers a warning; above 50,000 triggers a page.',
      },
      {
        heading: 'Results',
        content:
          'After three months in production, the service achieved 99.96% uptime, processed an average of 2.4 million messages per day, and reduced our previous Snowflake ingestion costs by 30% thanks to the batching strategy. The DLQ has captured only 12 malformed messages out of over 200 million processed — a testament to the quality controls we added upstream.',
      },
    ],
    keyTakeaways: [
      'Micro-batching with flush intervals reduces write operations by 95% and dramatically lowers warehouse costs.',
      'Match consumer concurrency to your Kafka partition count for optimal parallelism.',
      'A three-tier error strategy (retry → DLQ → circuit breaker) ensures zero silent data loss.',
      'Monitor consumer lag, flush latency, and DLQ counts as your primary health signals.',
      'Invest in observability from day one — it pays for itself during the first production incident.',
    ],
  },

  'medallion-architecture': {
    title: 'Medallion Architecture: From Raw to Analytics-Ready in Three Layers',
    category: 'Architecture',
    date: 'Jan 2026',
    readTime: '7 min',
    sections: [
      {
        heading: 'What Is the Medallion Architecture?',
        content:
          'The Medallion Architecture — also known as the multi-hop architecture — organizes data in a lakehouse into three progressive layers: Bronze (raw), Silver (cleansed), and Gold (business-ready). Each layer adds incremental quality, structure, and governance. Think of it as a refining process: raw ore enters the Bronze layer, gets purified in Silver, and emerges as polished analytics-ready datasets in Gold.',
      },
      {
        heading: 'Bronze Layer: Raw Ingestion',
        content:
          'The Bronze layer is your system of record — an append-only, schema-on-read landing zone where data arrives in its original format. We store everything as Delta tables with full audit columns: ingestion timestamp, source system identifier, and a raw payload column. No transformations happen here. The goal is to preserve the exact data as it arrived, enabling full reprocessing from scratch if business logic changes downstream. We typically retain Bronze data for 90 days.',
      },
      {
        heading: 'Silver Layer: Cleansing and Conforming',
        content:
          'The Silver layer applies data quality rules, deduplication, type casting, and schema enforcement. This is where we join related tables, resolve foreign keys, and standardize column naming conventions. We use PySpark with Delta Lake\'s MERGE operation to handle upserts efficiently. Key data quality checks include: null checks on required fields, referential integrity validation, date range validation, and duplicate detection using composite keys. Rows that fail validation are routed to a quarantine table for investigation.',
      },
      {
        heading: 'Gold Layer: Business Aggregation',
        content:
          'The Gold layer contains pre-aggregated, denormalized datasets tailored to specific business use cases — dashboards, ML features, or API responses. Each Gold table has a clear business owner and a documented SLA for freshness. We avoid "one Gold table to rule them all" anti-patterns; instead, each domain team defines their own Gold tables based on their analytical needs. This reduces contention and makes ownership crystal clear.',
      },
      {
        heading: 'Data Quality at Every Layer',
        content:
          'Quality gates between layers are the backbone of the Medallion Architecture. We implement expectations (similar to Great Expectations) at each transition. Bronze → Silver checks focus on schema conformance and basic validity. Silver → Gold checks focus on business rules and aggregation correctness. Every failed check logs to a centralized data quality dashboard and triggers an alert. This layered approach means a bad file in Bronze never silently corrupts a Gold report.',
      },
      {
        heading: 'When to Use (and When Not to)',
        content:
          'The Medallion Architecture excels when you have diverse data sources, need audit trails, and serve multiple downstream consumers. It adds overhead that may not be justified for small, single-source pipelines or exploratory analytics. If your entire data estate fits in a single PostgreSQL database, you probably don\'t need three layers. But the moment you have 5+ sources feeding 10+ dashboards, the structure pays for itself in reduced debugging time and faster onboarding of new engineers.',
      },
    ],
    keyTakeaways: [
      'Bronze = raw and immutable; Silver = cleansed and conformed; Gold = business-ready aggregations.',
      'Each layer adds incremental quality — never skip layers by going straight from Bronze to Gold.',
      'Delta Lake\'s MERGE operation makes upserts efficient and ACID-compliant in the Silver layer.',
      'Assign clear business ownership to Gold tables to avoid "shared everything, owned by nobody" anti-patterns.',
      'Implement data quality gates at every layer transition to prevent bad data from propagating downstream.',
    ],
  },

  'airflow-orchestration-patterns': {
    title: 'Airflow Orchestration Patterns for Data Engineers',
    category: 'Orchestration',
    date: 'Dec 2025',
    readTime: '5 min',
    sections: [
      {
        heading: 'Why Airflow?',
        content:
          'Apache Airflow has become the de facto orchestration tool for data engineering teams. Its core strength is defining workflows as code (DAGs in Python), which means your pipeline definitions live in version control, can be code-reviewed, and are testable. But Airflow\'s flexibility is also its biggest trap — without patterns and guardrails, teams end up with spaghetti DAGs that are impossible to debug.',
      },
      {
        heading: 'Pattern 1: Dynamic Task Generation',
        content:
          'Hard-coding one task per table leads to monolithic DAGs that need a code change every time a new table is added. Instead, we define a YAML configuration file listing all tables and their properties (schema, primary key, SCD type), and our DAG factory reads this config at parse time to generate tasks dynamically. Adding a new table to the pipeline is now a one-line config change, not a code change. The factory pattern also makes it easy to apply consistent retry, timeout, and alerting settings across all tasks.',
      },
      {
        heading: 'Pattern 2: Idempotent Tasks',
        content:
          'Every task should be safe to re-run without side effects. This means using MERGE/upsert instead of INSERT, partitioning output by execution date, and using Airflow\'s built-in templating ({{ ds }}, {{ ts }}) to parameterize queries. Idempotency is the single most important property for reliable pipelines because it makes retries safe and backfills trivial. If re-running a task doubles your data, you have a bug.',
      },
      {
        heading: 'Pattern 3: Sensor-Based Dependencies',
        content:
          'When your DAG depends on external events — a file landing in S3, a table being refreshed in a source database, or an Airbyte sync completing — use Airflow Sensors instead of blind time-based waits. We use the S3KeySensor for file-based triggers, the ExternalTaskSensor for cross-DAG dependencies, and custom HTTP sensors to poll Airbyte\'s API for sync completion. Sensors with exponential poke intervals prevent wasted compute while ensuring timely execution.',
      },
      {
        heading: 'Pattern 4: Alerting and SLA Management',
        content:
          'Every production DAG should have an SLA defined. Airflow\'s sla_miss_callback sends a Slack notification if a DAG hasn\'t completed within its expected window. We pair this with task-level on_failure_callback that sends detailed error context (task ID, exception traceback, log link) to a dedicated #data-alerts Slack channel. For critical pipelines, we also integrate PagerDuty for after-hours escalation.',
      },
      {
        heading: 'Pattern 5: Testing DAGs',
        content:
          'DAGs are code, and code should be tested. We maintain a test suite that validates: (1) all DAGs parse without import errors (dag_bag.import_errors), (2) no DAG has cycles, (3) all tasks have at least one retry, (4) all tasks have an on_failure_callback, and (5) task IDs follow naming conventions. These tests run in CI on every pull request. They catch broken imports, missing dependencies, and misconfigured tasks before they hit production.',
      },
    ],
    keyTakeaways: [
      'Dynamic task generation via config files eliminates code changes for new tables.',
      'Idempotency is your #1 reliability guarantee — if re-running a task breaks things, fix it immediately.',
      'Use Sensors for external dependencies instead of sleep() or fixed schedules.',
      'SLA callbacks and on_failure_callbacks should be mandatory for every production DAG.',
      'Test your DAGs in CI — broken imports are the most common preventable production incident.',
    ],
  },

  'jenkins-to-argocd-migration': {
    title: 'Migrating CI/CD from Jenkins to Argo CD: A Practical Guide',
    category: 'DevOps',
    date: 'Nov 2025',
    readTime: '6 min',
    sections: [
      {
        heading: 'Why We Left Jenkins',
        content:
          'Our Jenkins setup had grown organically over three years. We had 40+ pipelines, a shared Jenkins master that crashed monthly under load, Groovy scripts that nobody fully understood, and a deployment process that required SSH-ing into production servers. Deployments averaged 45 minutes and required a dedicated engineer. The breaking point came when a misconfigured Jenkinsfile deployed a staging build to production, causing a 4-hour outage. We needed a system where the desired state was declarative, version-controlled, and self-healing.',
      },
      {
        heading: 'Why Argo CD?',
        content:
          'Argo CD is a declarative GitOps continuous delivery tool for Kubernetes. The principle is simple: your Git repository is the single source of truth for your cluster state. Argo CD continuously monitors your repo and automatically syncs the live cluster state to match. If someone manually changes a deployment, Argo CD detects the drift and either alerts or auto-corrects. This eliminates an entire class of "works on my machine" and "who changed production?" issues.',
      },
      {
        heading: 'Migration Strategy',
        content:
          'We migrated in three phases over six weeks. Phase 1: containerized all applications and created Helm charts for each service. Phase 2: stood up Argo CD in a dedicated namespace, onboarded non-critical services first, and ran Jenkins and Argo CD in parallel. Phase 3: migrated critical services, set up ApplicationSets for multi-environment management, and decommissioned Jenkins. The parallel-running phase was critical — it gave us confidence that Argo CD was correctly syncing before we cut over.',
      },
      {
        heading: 'ApplicationSets for Multi-Environment',
        content:
          'One of Argo CD\'s most powerful features is ApplicationSets, which let you template applications across multiple environments (dev, staging, production) from a single definition. We use a Git Generator that reads environment-specific values files from our repo. Promoting a change from staging to production is now a pull request that updates the production values file — reviewable, auditable, and reversible.',
      },
      {
        heading: 'Handling Secrets',
        content:
          'The biggest challenge in GitOps is secrets management — you can\'t commit plain-text secrets to Git. We evaluated Sealed Secrets, SOPS, and HashiCorp Vault, and chose the External Secrets Operator backed by AWS Secrets Manager. Application manifests reference ExternalSecret resources, and the operator syncs the actual secret values from AWS at runtime. This keeps secrets out of Git while maintaining the declarative model.',
      },
      {
        heading: 'Results',
        content:
          'After the migration, deployment time dropped from 45 minutes to under 5 minutes. We eliminated manual SSH deployments entirely. The team saved approximately 15 hours per month in deployment-related effort. Most importantly, we\'ve had zero deployment-related incidents since the switch — drift detection catches configuration mismatches automatically, and the pull request workflow ensures every change is reviewed.',
      },
    ],
    keyTakeaways: [
      'GitOps eliminates "who changed production?" incidents by making Git the single source of truth.',
      'Run the old and new systems in parallel during migration to build confidence.',
      'ApplicationSets provide clean multi-environment management without duplication.',
      'Use External Secrets Operator to keep secrets out of Git while staying declarative.',
      'Our deployment time dropped from 45 minutes to under 5 minutes, saving 15 hours/month.',
    ],
  },

  'cloud-cost-optimization': {
    title: 'Cost Optimization Strategies for Cloud Data Pipelines',
    category: 'Cloud',
    date: 'Oct 2025',
    readTime: '7 min',
    sections: [
      {
        heading: 'The Cost Problem',
        content:
          'Cloud data platforms make it incredibly easy to scale — and incredibly easy to overspend. We\'ve seen Snowflake bills balloon 3× after a single misconfigured query, and AWS Glue jobs running 24/7 when they only needed 2 hours of compute per day. Cost optimization isn\'t about being cheap; it\'s about making sure every dollar of cloud spend translates into business value.',
      },
      {
        heading: 'Snowflake Warehouse Tuning',
        content:
          'The easiest Snowflake win is right-sizing virtual warehouses. Most teams default to LARGE or X-LARGE warehouses when SMALL handles 80% of workloads just fine. We profiled every query using the QUERY_HISTORY view, identified queries with high queue times (sign of under-provisioning) and queries with low utilization percentages (sign of over-provisioning), and right-sized accordingly. We also implemented auto-suspend after 60 seconds of inactivity and used multi-cluster warehouses with scaling policies for bursty workloads. These changes alone cut our Snowflake compute costs by 35%.',
      },
      {
        heading: 'Batch vs. Streaming Cost Trade-offs',
        content:
          'Not everything needs to be real-time. We audit each pipeline\'s freshness requirements with business stakeholders. If the dashboard is viewed once per morning, a nightly batch is fine — no need for a Kafka stream. We categorize pipelines into three tiers: Tier 1 (near real-time, < 5 min latency), Tier 2 (hourly), and Tier 3 (daily). This simple classification helped us move three pipelines from Kafka to batch Airflow DAGs, saving $2,100/month in streaming infrastructure costs.',
      },
      {
        heading: 'Storage Optimization',
        content:
          'Storage costs creep up silently. We implemented three strategies: (1) convert CSV and JSON files to Parquet or Delta format at the Bronze layer — compression ratios of 5-10× are typical, (2) set lifecycle policies on S3/ADLS to transition data older than 90 days to cold storage tiers, and (3) disable Snowflake Time Travel on staging and transient tables where we don\'t need 90-day history. Strategy 3 alone freed up 4 TB of storage.',
      },
      {
        heading: 'Compute Scheduling',
        content:
          'Many pipelines run on fixed schedules regardless of whether new data has arrived. We replaced time-based triggers with event-based triggers wherever possible — S3 event notifications, database CDC triggers, and webhook-based Airflow DAG runs. This reduced unnecessary compute executions by 40%. For non-event-driven workloads, we use AWS Spot Instances for Airflow workers and Databricks pools with spot pricing, accepting the occasional task restart in exchange for 60-70% cost savings.',
      },
      {
        heading: 'Building a Cost Culture',
        content:
          'Tools and techniques only work if the team cares about costs. We added a monthly "Cloud Cost Review" to our sprint ceremonies, set up per-team cost dashboards with alerts at 80% and 100% of budget, and made cost impact a mandatory section in every architecture design review. When engineers can see how their pipeline changes affect the bill in near real-time, they self-optimize. Our total data platform costs dropped 28% over six months without sacrificing any SLAs.',
      },
    ],
    keyTakeaways: [
      'Right-size Snowflake warehouses by profiling QUERY_HISTORY — most workloads run fine on SMALL.',
      'Classify pipelines by freshness tier (real-time, hourly, daily) and match infrastructure accordingly.',
      'Convert to columnar formats (Parquet/Delta) early in the pipeline for 5-10× storage savings.',
      'Replace time-based triggers with event-based triggers to eliminate unnecessary compute.',
      'Build a cost culture: team dashboards, budget alerts, and cost impact in design reviews.',
    ],
  },
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-white/5 bg-surface/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/#blog"
            className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
          >
            <FiArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
            {post.category}
          </span>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title Block */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <FiCalendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock size={14} />
              {post.readTime} read
            </span>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-primary/50 via-accent/30 to-transparent" />
        </div>

        {/* Content Sections */}
        <article className="space-y-10">
          {post.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full inline-block" />
                {section.heading}
              </h2>
              <p className="text-muted leading-relaxed text-[15px]">
                {section.content}
              </p>
            </section>
          ))}
        </article>

        {/* Key Takeaways */}
        <div className="mt-14 glass rounded-2xl p-8 border border-primary/10">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-primary text-xl">💡</span>
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {post.keyTakeaways.map((takeaway, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-muted leading-relaxed"
              >
                <span className="text-primary mt-0.5 shrink-0 font-bold">
                  {i + 1}.
                </span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
          >
            <FiArrowLeft size={16} />
            Read More Articles
          </Link>
        </div>
      </main>
    </div>
  );
}
