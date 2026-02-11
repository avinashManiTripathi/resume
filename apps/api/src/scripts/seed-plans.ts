import { Plan } from '../models/Plan';


const plans = [
    {
        planId: "free",
        name: "Free",
        description: "Perfect for getting started",
        monthlyPrice: 0,
        annualPrice: 0,
        currency: "INR",
        features: [
            "Create and edit resume",
            "Real-time preview",
            "10 basic templates",
            "Auto-save functionality",
            "Export to PDF (limited)",
        ],
        popular: false,
        isActive: true
    },
    {
        planId: "pro",
        name: "Pro",
        description: "Best for job seekers",
        monthlyPrice: 799,
        annualPrice: 7990,
        currency: "INR",
        features: [
            "Everything in Free",
            "Unlimited PDF downloads",
            "Access to 15+ premium templates",
            "Export to Word format",
            "Basic customer support",
            "Remove watermarks",
            "Cover letter builder",
        ],
        popular: true,
        isActive: true
    },
    {
        planId: "premium",
        name: "Premium",
        description: "For professionals",
        monthlyPrice: 1599,
        annualPrice: 15990,
        currency: "INR",
        features: [
            "Everything in Pro",
            "Unlimited premium templates (50+)",
            "Priority customer support",
            "Custom branding options",
            "Advanced formatting tools",
            "Resume analytics",
            "LinkedIn profile optimization",
            "Interview preparation guide",
        ],
        popular: false,
        isActive: true
    }
];

export async function seedPlans() {
    try {
        console.log('🌱 Seeding plans...');

        for (const planData of plans) {
            await Plan.findOneAndUpdate(
                { planId: planData.planId },
                planData,
                { upsert: true, new: true }
            );
            console.log(`✅ Seeded/Updated plan: ${planData.name}`);
        }

        console.log('🎉 Plan seeding completed!');
    } catch (error) {
        console.error('❌ Error seeding plans:', error);
        throw error;
    }
}

// Run if executed directly
if (require.main === module) {
    const { database } = require('../config/database');
    require('dotenv').config();

    database.connect()
        .then(() => seedPlans())
        .then(() => {
            console.log('Done');
            process.exit(0);
        })
        .catch((error: any) => {
            console.error('Error in seeding script:', error);
            process.exit(1);
        });
}
