import { Metadata } from 'next';
import { Building2, Users, Rocket, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import { ResourceHero, ResourceFeatureGrid, ResourceCTA, ResourceContentSection } from '@/components/ResourcePage';

export const metadata: Metadata = {
    title: 'Resume Solutions for Organizations - Corporate Career Support',
    description: 'Empower your employees or students with professional resume building tools. Our organizational solutions provide white-label and bulk access for teams.',
    keywords: 'resume tools for organizations, b2b resume builder, employee outplacement tools, university career services software',
};

export default function ForOrganizationsPage() {
    return (
        <div className="min-h-screen bg-white">
            <ResourceHero
                badge="Enterprise Solutions"
                badgeIcon={Building2}
                title={
                    <>
                        Advanced Resume Tools <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">for Organizations</span>
                    </>
                }
                subtitle="Whether you're a university career center or a corporate HR department, provide your people with the tools they need to succeed in their careers."
            />

            <ResourceFeatureGrid
                title="B2B Features & Benefits"
                features={[
                    {
                        icon: <Users className="w-6 h-6" />,
                        title: "Bulk Access",
                        description: "Provide professional resume builder access to your entire team or student body with easy licensing."
                    },
                    {
                        icon: <BarChart3 className="w-6 h-6" />,
                        title: "Usage Analytics",
                        description: "Monitor engagement and success metrics through a dedicated organizational dashboard."
                    },
                    {
                        icon: <Globe className="w-6 h-6" />,
                        title: "White-Label Options",
                        description: "Custom branding and integration options to match your organization's look and feel."
                    }
                ]}
            />

            <ResourceContentSection
                title="Support Your Team's Growth"
                content={
                    <div className="space-y-6">
                        <p>
                            Forward-thinking organizations understand that career support is a key part of the value proposition for employees and students. Our <strong>Solutions for Organizations</strong> make it simple to deploy professional career tools at scale.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Universities:</strong> Give your graduates an edge with ATS-optimized resume templates.</li>
                            <li><strong>HR Teams:</strong> Offer modern career tools as part of your employee benefits package.</li>
                            <li><strong>Outplacement:</strong> Support transitioning employees with the best tools in the market.</li>
                        </ul>
                    </div>
                }
            />

            <ResourceCTA
                title="Interested in a Partnership?"
                subtitle="Contact our sales team today to discuss bulk licensing and custom organizational solutions."
            />
        </div>
    );
}
