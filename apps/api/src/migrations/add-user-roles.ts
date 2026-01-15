/**
 * Migration: Add role field to existing users
 * Date: 2026-01-15
 * Description: Sets default 'user' role for all existing users without a role field
 */

import mongoose from 'mongoose';
import { User } from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/profresume';

async function migrateUserRoles() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find all users without a role field
        const usersWithoutRole = await User.find({
            $or: [
                { role: { $exists: false } },
                { role: null }
            ]
        });

        console.log(`📊 Found ${usersWithoutRole.length} users without role field`);

        if (usersWithoutRole.length === 0) {
            console.log('✅ All users already have roles assigned');
            await mongoose.disconnect();
            return;
        }

        // Update all users without role to 'user'
        const result = await User.updateMany(
            {
                $or: [
                    { role: { $exists: false } },
                    { role: null }
                ]
            },
            {
                $set: { role: 'user' }
            }
        );

        console.log(`✅ Migration completed successfully!`);
        console.log(`   - Users updated: ${result.modifiedCount}`);
        console.log(`   - Default role set: 'user'`);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

// Run migration
migrateUserRoles().then(() => {
    console.log('🎉 Migration script finished');
    process.exit(0);
}).catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
});
