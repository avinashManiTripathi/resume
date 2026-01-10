import { Metadata } from 'next';
import { ENV } from "@/app/env";
import { Server, Database, Cloud, Shield, Code, CheckCircle, Zap, Award, Target, TrendingUp, Terminal, Cpu } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticleSchema } from '@/components/ArticleSchema';
import { FAQSchema } from '@/components/FAQSchema';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'IT Professional Resume Builder 2026 - Network, DevOps & Systems Resume Templates',
    description: 'Build an IT professional resume for network admin, sysadmin, DevOps, cloud engineer, and cybersecurity roles. ATS-friendly templates with IT certifications and technical skills sections.',
    keywords: 'IT resume, IT professional resume, network admin resume, DevOps resume, sysadmin resume, cloud engineer resume, IT support resume, cybersecurity resume',
    alternates: {
        canonical: '/resume-builder/it-professional',
    },
};

export default function ITProfessionalResumePage() {
    const faqs = [
        { question: "What certifications should I include on my IT resume?", answer: "Include relevant certifications like CCNA, CCNP, AWS Solutions Architect, Azure Administrator, CompTIA A+/Network+/Security+, CISSP, and Kubernetes (CKA). List certification name, issuing organization, and date obtained." },
        { question: "How do I showcase DevOps experience on my resume?", answer: "Highlight CI/CD pipelines, infrastructure as code (Terraform, Ansible), container orchestration (Kubernetes), cloud platforms (AWS/Azure/GCP), and automation achievements with measurable impact." },
        { question: "Should I list all technologies I've worked with?", answer: "Focus on technologies relevant to the job. Group them by category (Cloud Platforms, Databases, Monitoring Tools, etc.) and emphasize your strongest skills and recent experience." },
        { question: "How important is showing automation in IT resumes?", answer: "Critical! Automation skills (scripting, infrastructure as code) are highly valued. Quantify time saved, processes automated, and efficiency gains in your bullet points." },
        { question: "What's the best way to describe troubleshooting skills?", answer: "Use specific examples with metrics: 'Resolved 95% of Tier 2 escalations within SLA', 'Reduced system downtime by 60% through proactive monitoring', 'Implemented solutions affecting X users/systems'." }
    ];

    const breadcrumbs = [
        { name: "Home", url: ENV.BASE_URL },
        { name: "Resume Builder", url: `${ENV.BASE_URL}/resume-builder` },
        { name: "IT Professional", url: `${ENV.BASE_URL}/resume-builder/it-professional` }
    ];

    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbSchema items={breadcrumbs} />
            <ArticleSchema
                title="IT Professional Resume Builder 2026 - Network, DevOps & Cloud Resumes"
                description="Build a powerful IT professional resume for network admin, DevOps, cloud, and cybersecurity roles with ATS-optimized templates and IT-specific sections."
                url={`${ENV.BASE_URL}/resume-builder/it-professional`}
            />
            <FAQSchema faqs={faqs} />

            <ResourceHero
                badge="IT & Infrastructure"
                badgeIcon={Server}
                title={
                    <>
                        IT Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Resume Builder</span>
                    </>
                }
                subtitle="Create a standout resume for network administration, systems engineering, DevOps, cloud architecture, and IT support roles. Showcase certifications, technical expertise, and infrastructure achievements."
            />

            <ResourceFeatureGrid
                title="Built for IT Professionals"
                features={[
                    {
                        icon: <Shield className="w-6 h-6" />,
                        title: "Certification Showcase",
                        description: "Dedicated sections for IT certifications (CCNA, AWS, Azure, Security+) with verification links."
                    },
                    {
                        icon: <Cloud className="w-6 h-6" />,
                        title: "Cloud & DevOps Focus",
                        description: "Highlight cloud platforms, containerization, CI/CD, and infrastructure automation."
                    },
                    {
                        icon: <Database className="w-6 h-6" />,
                        title: "Infrastructure Achievements",
                        description: "Showcase uptime improvements, cost savings, security enhancements, and scalability wins."
                    },
                    {
                        icon: <Terminal className="w-6 h-6" />,
                        title: "Automation & Scripting",
                        description: "Demonstrate efficiency gains through automation, scripting, and process optimization."
                    },
                    {
                        icon: <Cpu className="w-6 h-6" />,
                        title: "System Administration",
                        description: "Feature server management, virtualization, backup/recovery, and monitoring expertise."
                    },
                    {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: "ITIL & Best Practices",
                        description: "Highlight adherence to ITIL frameworks, change management, and incident response."
                    }
                ]}
            />

            <ResourceContentSection
                title="Key Sections for IT Professional Resumes"
                content={
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Resume Components</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-cyan-600" />
                                        Technical Skills
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Cloud Platforms (AWS, Azure, GCP)</li>
                                        <li>• Virtualization (VMware, Hyper-V)</li>
                                        <li>• Databases (SQL, NoSQL, MongoDB)</li>
                                        <li>• Networking (TCP/IP, VPN, Firewalls)</li>
                                        <li>• Scripting (Python, Bash, PowerShell)</li>
                                        <li>• Monitoring Tools (Prometheus, Grafana)</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-cyan-600" />
                                        Certifications
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Cloud (AWS/Azure/GCP certified)</li>
                                        <li>• Networking (CCNA, CCNP, JNCIA)</li>
                                        <li>• Security (Security+, CISSP, CEH)</li>
                                        <li>• DevOps (CKA, Terraform Associate)</li>
                                        <li>• Microsoft (MCSA, MCSE)</li>
                                        <li>• Linux (RHCSA, LFCS)</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-cyan-600" />
                                        Infrastructure Projects
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• Cloud migrations (on-prem to cloud)</li>
                                        <li>• Disaster recovery implementations</li>
                                        <li>• Network redesigns & optimizations</li>
                                        <li>• Security hardening initiatives</li>
                                        <li>• Monitoring & alerting systems</li>
                                        <li>• Automation & orchestration</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-cyan-600" />
                                        Key Metrics to Include
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 ml-7">
                                        <li>• System uptime (99.9%, 99.99%)</li>
                                        <li>• Cost savings from optimization</li>
                                        <li>• Number of users/systems supported</li>
                                        <li>• Time saved through automation</li>
                                        <li>• Incident resolution times</li>
                                        <li>• Performance improvements (%)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Action Verbs for IT Professionals
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4 text-gray-800">
                                <ul className="space-y-1">
                                    <li>• Architected</li>
                                    <li>• Automated</li>
                                    <li>• Configured</li>
                                    <li>• Deployed</li>
                                </ul>
                                <ul className="space-y-1">
                                    <li>• Implemented</li>
                                    <li>• Migrated</li>
                                    <li>• Monitored</li>
                                    <li>• Optimized</li>
                                </ul>
                                <ul className="space-y-1">
                                    <li>• Secured</li>
                                    <li>• Streamlined</li>
                                    <li>• Troubleshot</li>
                                    <li>• Virtualized</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            />

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Sample Achievement Bullets for IT Professionals
                    </h2>
                    <div className="space-y-4">
                        {[
                            "Migrated 200+ on-premise servers to AWS cloud infrastructure, reducing operational costs by $500K annually and improving system uptime to 99.95%",
                            "Implemented automated CI/CD pipeline using Jenkins and Docker, reducing deployment time from 4 hours to 15 minutes and enabling 50+ deployments per week",
                            "Designed and deployed multi-region disaster recovery solution, achieving RPO of 15 minutes and RTO of 1 hour across 500 virtual machines",
                            "Automated infrastructure provisioning using Terraform, reducing server setup time by 80% and eliminating configuration drift across 300+ instances",
                            "Led cybersecurity initiative that achieved SOC 2 Type II compliance, implementing security controls affecting 10,000+ users and passing security audit with zero findings",
                            "Optimized network infrastructure and implemented SD-WAN, reducing network latency by 45% and increasing bandwidth utilization by 60%"
                        ].map((bullet, index) => (
                            <div key={index} className="bg-white rounded-lg border-2 border-cyan-200 p-4 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">{bullet}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ResourceCTA
                title="Build Your IT Professional Resume"
                subtitle="Join 15,000+ IT professionals who landed jobs at top tech companies and enterprises"
            />
        </div>
    );
}
