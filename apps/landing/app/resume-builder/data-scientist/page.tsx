import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { BarChart2, Brain, Database, Target, Award, CheckCircle, Zap, TrendingUp, Code } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Data Scientist Resume Builder 2026 — Free ML & Analytics Resume Templates | Hirecta',
    description: 'Build a professional data scientist resume with our free resume builder. ATS-optimized templates for data scientists, ML engineers, data analysts, and AI researchers. Showcase models deployed, accuracy improvements, and business impact. Free PDF download.',
    keywords: 'data scientist resume builder, data scientist resume template, machine learning engineer resume, ML resume, data analyst resume, AI resume, Python resume, data science cv, deep learning resume, NLP resume, data engineer resume 2026',
    alternates: { canonical: '/resume-builder/data-scientist' },
    openGraph: {
        title: 'Data Scientist Resume Builder 2026 — ML & Analytics Templates | Hirecta',
        description: 'Free data scientist resume builder. ATS-friendly templates for ML engineers, data analysts & AI researchers. Showcase model accuracy, business impact & Python skills.',
        url: '/resume-builder/data-scientist',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Data Scientist Resume Builder — Hirecta' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Data Scientist Resume Builder 2026 | ML Engineer Templates | Hirecta',
        description: 'Build a high-impact data science resume. Showcase models, accuracy metrics, and business ROI. ATS-friendly, free.',
        images: ['/og-image.png'],
        creator: '@hirecta',
    },
};

const dsSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hirecta Data Scientist Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1340", "bestRating": "5" },
};

export default function DataScientistResumePage() {
    const faqs = [
        { question: "What should a data scientist resume include?", answer: "A data scientist resume should include: programming languages (Python, R, SQL), ML frameworks (TensorFlow, PyTorch, scikit-learn), cloud platforms (AWS, GCP, Azure), specific models built with accuracy metrics, business impact of models deployed, data manipulation tools (pandas, Spark), and key projects with GitHub links." },
        { question: "How do I show business impact of data science work?", answer: "Always connect models to business outcomes: 'Built churn prediction model (XGBoost, 89% accuracy) → reduced quarterly churn by 12% → saved $2.3M ARR.' Include: model accuracy metrics, inference speed, scale (data points/day), business KPI improved, and dollar value generated or saved." },
        { question: "Should I include my Kaggle rank on a data science resume?", answer: "Yes! Kaggle Grand Master, Master, or Expert ranks are significant signals. Include your rank, top competition placements, and any medals. Also include GitHub profile showing open-source contributions and Jupyter notebooks. A portfolio Notion page with project writeups is a powerful differentiator." },
        { question: "What's the most important technical section for a data scientist resume?", answer: "The Technical Skills / Tech Stack section is most scanned by ATS. Organize it into: Languages (Python, R, SQL), ML/DL Frameworks (scikit-learn, TensorFlow, PyTorch), Data Tools (pandas, NumPy, Spark, dbt), Cloud & MLOps (AWS SageMaker, MLflow, Docker, Kubernetes), and Visualization (Tableau, Power BI, matplotlib)." },
        { question: "Do I need a research publications section?", answer: "For academic/research roles or PhD candidates: yes, include top publications with venue, citations, and impact. For industry roles at tech companies: 1-2 top publications is enough — don't bury business impact under academic minutiae. Companies like Google and Meta value published research highly." },
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "Data Scientist Resume", url: `${ENV.BASE_URL}/resume-builder/data-scientist` },
    ];

    const bullets = [
        "Developed real-time fraud detection model (LightGBM + feature store on Redis), achieving 94.2% precision at 0.3% false positive rate, preventing $8.5M in annual fraud losses",
        "Built NLP pipeline (BERT fine-tuned on domain corpus) for customer intent classification, improving routing accuracy by 34% and reducing average handling time by 18%",
        "Designed and deployed recommender system (collaborative filtering + content-based hybrid) serving 2M daily users, increasing average session revenue by 12% ($4.1M quarterly impact)",
        "Led A/B test framework redesign using Bayesian sequential testing, reducing experiment runtime by 40% while maintaining 95% statistical power — enabled 2x more experiments per quarter",
        "Migrated legacy Spark ML pipeline to SageMaker, cutting model training costs by 52% ($180K/year savings) and reducing deployment cycle from 2 weeks to 2 days",
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="Data Scientist Resume Builder 2026 — ML & Analytics Resume Templates"
                description="Build a professional data scientist resume with ATS-friendly templates. Showcase ML models, accuracy metrics, and business impact."
                url={`${ENV.BASE_URL}/resume-builder/data-scientist`}
                datePublished="2026-02-21"
                author="Hirecta Career Experts"
            />
            <FAQSchema faqs={faqs} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dsSchema) }} />

            <ResourceHero
                badge="Data Science & AI"
                badgeIcon={BarChart2}
                title={
                    <>
                        Data Scientist <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Resume Builder</span>
                    </>
                }
                subtitle="Create a results-driven data science resume that demonstrates model accuracy, business impact, and technical depth. ATS-friendly templates for data scientists, ML engineers, data analysts, and AI researchers. 100% free."
            />

            <ResourceFeatureGrid
                title="Built for Data & AI Professionals"
                features={[
                    { icon: <Brain className="w-6 h-6" />, title: "Model Impact Section", description: "Dedicated section for ML models deployed, accuracy metrics (precision, recall, F1), and business KPIs improved." },
                    { icon: <Code className="w-6 h-6" />, title: "Technical Stack Section", description: "Structured section for Python, R, SQL, ML frameworks, cloud platforms, and data engineering tools." },
                    { icon: <Database className="w-6 h-6" />, title: "Portfolio Integration", description: "Easy links to GitHub, Kaggle profile, research papers, and data science notebook portfolios." },
                    { icon: <BarChart2 className="w-6 h-6" />, title: "AI Bullet Generator", description: "AI-powered bullet point suggestions using data science terminology: accuracy, recall, precision, AUC-ROC, SHAP." },
                    { icon: <TrendingUp className="w-6 h-6" />, title: "Business Impact Focus", description: "Templates guide you to connect every model to a business outcome: revenue, cost savings, or efficiency gain." },
                    { icon: <Award className="w-6 h-6" />, title: "ATS-Optimized", description: "Pass ATS for data roles at Google, Netflix, Airbnb, and top tech companies with proper ML keywords." },
                ]}
            />

            <ResourceContentSection
                title="How to Write a Data Scientist Resume That Gets Interviews"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Data Science Resume Sections</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Technical Skills
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Languages: Python, R, SQL, Scala</li>
                                        <li>• ML: scikit-learn, XGBoost, TensorFlow, PyTorch</li>
                                        <li>• Data: pandas, NumPy, Spark, dbt</li>
                                        <li>• Cloud & MLOps: AWS, GCP, MLflow, Docker</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" /> Projects / Models
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Model type and algorithm used</li>
                                        <li>• Dataset scale (rows, features)</li>
                                        <li>• Accuracy / evaluation metrics</li>
                                        <li>• Business impact in $ or %</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> Pro Tips for Data Science Resumes
                            </h4>
                            <ul className="space-y-2 text-gray-800">
                                <li>• Always pair model accuracy with the business KPI it improved</li>
                                <li>• Mention data scale: "Trained on 50M+ rows" shows production experience</li>
                                <li>• Include Kaggle rank, GitHub stars, or publications for credibility</li>
                                <li>• Separate 'Academic Projects' from 'Industry Projects' if a recent grad</li>
                                <li>• List cloud certifications: AWS ML Specialty, GCP Professional ML Engineer</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">High-Impact Data Science Resume Bullets</h3>
                            <div className="space-y-3">
                                {bullets.map((bullet, i) => (
                                    <div key={i} className="bg-white rounded-lg border-2 border-purple-200 p-4 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700">{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sub-role guides */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Science Resume Guide by Sub-Role</h3>
                            <p className="text-gray-600 mb-6">Data science is a broad field. Each sub-role has distinct technical requirements and keyword sets. Here is what to emphasize for each track.</p>
                            <div className="grid md:grid-cols-2 gap-5">
                                {[
                                    { role: "Data Scientist", skills: ["Statistical modeling: regression, classification, clustering", "Experiment design and A/B testing (frequentist + Bayesian)", "Feature engineering and selection methodologies", "Model evaluation: precision, recall, F1, AUC-ROC, RMSE", "Business impact framing for non-technical stakeholders", "Python (pandas, scikit-learn, statsmodels)", "SQL for data extraction and exploratory queries", "Visualization: matplotlib, seaborn, Plotly, Tableau"] },
                                    { role: "Machine Learning Engineer", skills: ["Model training, tuning, and deployment pipeline", "ML infrastructure: SageMaker, Vertex AI, Azure ML", "Model serving: FastAPI, TorchServe, TensorFlow Serving", "MLOps: MLflow, DVC, Weights & Biases, Kubeflow", "Feature stores: Feast, Tecton, Redis", "Containerization: Docker, Kubernetes", "Latency optimization and model compression", "Monitoring: data drift, model degradation detection"] },
                                    { role: "Data Analyst", skills: ["SQL: complex joins, CTEs, window functions, stored procs", "BI tools: Tableau, Power BI, Looker, Metabase", "Python/R for statistical analysis and scripting", "Excel / Google Sheets: pivot tables, VLOOKUP, macros", "Dashboard design and stakeholder reporting", "Business intelligence and KPI definition", "Data cleaning and data quality management", "A/B test analysis and interpretation"] },
                                    { role: "Data Engineer", skills: ["Data pipeline design and orchestration (Airflow, Prefect)", "Cloud data warehouses: Snowflake, BigQuery, Redshift", "ETL/ELT frameworks: dbt, Spark, Glue, Fivetran", "Streaming: Kafka, Kinesis, Flink", "Data modeling: Star schema, Data Vault, Lakehouse", "Infrastructure as Code: Terraform, Pulumi", "Data governance and lineage tracking", "Python + Scala for distributed computing"] },
                                    { role: "NLP / GenAI Engineer", skills: ["LLM fine-tuning: OpenAI API, Llama, Mistral, Gemini", "RAG (Retrieval-Augmented Generation) pipelines", "Vector databases: Pinecone, Weaviate, Qdrant, pgvector", "Prompt engineering and chain-of-thought techniques", "Transformers, BERT, GPT architectures", "Text classification, NER, summarization, QA systems", "LangChain, LlamaIndex, Haystack frameworks", "Evaluation: BLEU, ROUGE, human evaluation frameworks"] },
                                    { role: "AI / Research Scientist", skills: ["Novel architecture design and ablation studies", "Research paper writing and conference submissions (NeurIPS, ICML, ICLR, ACL)", "Large-scale distributed training (multi-GPU, TPU clusters)", "Reinforcement learning: PPO, DQN, RLHF", "Theoretical foundations: information theory, optimization", "Open-source contribution and GitHub presence", "Reproducible research: experiment tracking, seeds, configs", "Collaboration with applied science and engineering teams"] },
                                ].map((item, i) => (
                                    <div key={i} className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                                        <h4 className="font-bold text-gray-900 mb-3">{item.role}</h4>
                                        <ul className="space-y-1.5">
                                            {item.skills.map((s, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Examples */}
                        <div className="bg-purple-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Summary Examples by Level</h3>
                            <div className="space-y-5">
                                {[
                                    { label: "New Grad / Junior Data Scientist", summary: "Detail-oriented data science graduate (M.S. Statistics, Stanford) with hands-on experience in Python, SQL, and machine learning through 2 industry internships and 3 Kaggle competition medals (Expert rank). Built a customer lifetime value prediction model (XGBoost, RMSE: 0.34) during internship at [Company] that improved marketing budget allocation by 15%. Proficient in pandas, scikit-learn, TensorFlow, and Tableau. Seeking a data scientist role in e-commerce or fintech." },
                                    { label: "Mid-Level Data Scientist (3–6 years)", summary: "Analytically rigorous Data Scientist with 5 years of experience delivering ML solutions at scale in AdTech and e-commerce. Deployed 12 production models including a real-time bidding propensity model (LightGBM, AUC 0.91) that increased campaign ROAS by 23% across $50M annual ad spend. Expert in Python (pandas, scikit-learn, PyTorch), SQL, AWS SageMaker, and A/B test design. Strong communicator — regularly present model findings to C-suite and cross-functional stakeholders." },
                                    { label: "Senior / Staff ML Engineer", summary: "Staff Machine Learning Engineer with 9+ years designing and deploying large-scale ML systems at top-tier tech companies (Meta, Stripe). Architected the ML platform serving 50+ internal data science teams — reduced model deployment time from 3 weeks to same-day. Led GenAI initiative integrating LLM-powered features into core product: drove 18% DAU increase and $42M incremental ARR. Expert in PyTorch, Kubernetes, MLflow, and distributed training. 3 patents filed in personalization and ranking systems." },
                                ].map((ex, i) => (
                                    <div key={i} className="bg-white rounded-lg p-5 border border-purple-100">
                                        <p className="text-purple-700 font-bold text-xs uppercase tracking-wider mb-2">{ex.label}</p>
                                        <p className="text-gray-700 leading-relaxed text-sm italic">"{ex.summary}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mistakes */}
                        <div className="bg-red-50 rounded-xl p-8 border border-red-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-5">6 Data Science Resume Mistakes That Kill Your Chances</h3>
                            <div className="space-y-4">
                                {[
                                    { mistake: "Listing model types without evaluation metrics", fix: "'Built a classification model' tells recruiters nothing. 'Trained XGBoost classifier on 20M records, achieving 94.3% precision at 0.2% false positive rate, reducing fraud losses by $6.2M annually' is compelling." },
                                    { mistake: "No GitHub link or portfolio", fix: "Data science hiring involves technical screening. Include a GitHub URL with 3–5 well-documented repositories. Data scientists without visible code are high-risk hires. A Kaggle profile with competition results is a major bonus." },
                                    { mistake: "Academic-style writing", fix: "Avoid: 'We investigated neural network architectures to explore whether...' Write: 'Built LSTM sequence model for demand forecasting; reduced out-of-stock events by 14%, saving $3.1M in lost sales annually.'" },
                                    { mistake: "Burying technical skills in paragraph form", fix: "ATS systems scan for specific tool names in list form. Create a dedicated 'Technical Skills' section organized by category: Languages | ML Frameworks | Data Tools | Cloud & MLOps | Visualization." },
                                    { mistake: "Omitting scale and scope", fix: "Data scientists at leading companies work with massive datasets. Always note scale: 'Trained on 200M+ records,' 'Serving 5M daily predictions at <50ms p99 latency,' 'Processing 10TB/day in streaming pipeline.' Scale signals seniority." },
                                    { mistake: "Not separating academic from industry projects", fix: "Recent grads should clearly label sections: 'Industry Experience' (internships) and 'Academic Projects.' Hiring managers at tech companies value industry projects 3:1 over class projects. Lead with internship impact." },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white rounded-lg p-4 border border-red-100">
                                        <p className="font-semibold text-red-700 mb-1">✗ {item.mistake}</p>
                                        <p className="text-gray-600 text-sm"><strong className="text-green-700">Fix: </strong>{item.fix}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Salary Table */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Science Salary Data (US, 2026)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-purple-100">
                                        <tr>
                                            <th className="text-left p-3 font-bold text-gray-900">Role</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Base Salary</th>
                                            <th className="text-left p-3 font-bold text-gray-900">Total Comp (TC)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            ["Junior Data Scientist", "$90,000 – $120,000", "$100K – $150K"],
                                            ["Data Analyst (Mid)", "$75,000 – $105,000", "$85K – $130K"],
                                            ["Mid-Level Data Scientist", "$130,000 – $170,000", "$160K – $250K"],
                                            ["Senior Data Scientist", "$160,000 – $210,000", "$220K – $380K"],
                                            ["ML Engineer (Senior)", "$170,000 – $230,000", "$240K – $450K"],
                                            ["Staff / Principal DS", "$220,000 – $290,000", "$350K – $600K+"],
                                            ["Director of Data Science", "$230,000 – $310,000", "$400K – $700K+"],
                                        ].map((row, i) => (
                                            <tr key={i} className="even:bg-gray-50">
                                                <td className="p-3 font-medium text-gray-900">{row[0]}</td>
                                                <td className="p-3 text-purple-700 font-semibold">{row[1]}</td>
                                                <td className="p-3 text-gray-600">{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-xs text-gray-400 mt-2">TC includes base + bonus + equity (RSU). Source: Levels.fyi + Glassdoor 2025–2026. Bay Area and NYC skew higher.</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Data Science ATS Keyword List (2026)</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Python", "R", "SQL", "Scala", "Julia", "Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "Computer Vision", "Reinforcement Learning", "TensorFlow", "PyTorch", "Keras", "scikit-learn", "XGBoost", "LightGBM", "CatBoost", "pandas", "NumPy", "SciPy", "Apache Spark", "PySpark", "Hadoop", "dbt", "Airflow", "Prefect", "Kafka", "AWS SageMaker", "Google Vertex AI", "Azure ML", "MLflow", "Kubeflow", "DVC", "Docker", "Kubernetes", "Snowflake", "BigQuery", "Redshift", "PostgreSQL", "MongoDB", "LLM", "Generative AI", "RAG", "LangChain", "Pinecone", "Feature Engineering", "A/B Testing", "Bayesian Statistics", "Causal Inference", "Tableau", "Power BI", "Looker", "Plotly", "Weights & Biases", "SHAP", "LIME", "Data Pipeline", "ETL", "ELT", "Data Modeling", "Data Governance", "Git", "CI/CD"].map((kw, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Data Scientist Resume FAQs</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="bg-purple-50 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 mb-4">Also explore:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/resume-builder/software-engineer" className="text-blue-600 hover:underline font-semibold">Software Engineer Resume</Link>
                        <Link href="/resume-builder/product-manager" className="text-blue-600 hover:underline font-semibold">Product Manager Resume</Link>
                        <Link href="/resume-builder/marketing" className="text-blue-600 hover:underline font-semibold">Marketing Resume</Link>
                        <Link href="/ai-resume-builder" className="text-blue-600 hover:underline font-semibold">AI Resume Builder</Link>
                        <Link href="/free-resume-builder" className="text-blue-600 hover:underline font-semibold">Free Resume Builder</Link>
                    </div>
                </div>
            </div>

            <ResourceCTA
                title="Build Your Data Science Resume Now — Free"
                subtitle="Join thousands of data scientists and ML engineers who've landed roles at top tech companies with Hirecta."
            />
        </div>
    );
}
