"use client";

import { useState } from "react";
import {
    getTierDisplayName,
    getTierFeatures,
    getTierPrice,
    getSubscription,
    clearSubscription,
    type SubscriptionTier
} from "@repo/utils-client";
import { Calendar, CreditCard, Crown, Download, Check, X } from "lucide-react";

interface SubscriptionDashboardProps {
    onUpgrade?: () => void;
}

export const SubscriptionDashboard = ({ onUpgrade }: SubscriptionDashboardProps) => {
    const subscription = getSubscription();
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    if (!subscription) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">📋</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Subscription</h2>
                <p className="text-gray-600 mb-6">Subscribe to unlock premium features</p>
                <button
                    onClick={onUpgrade}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    View Plans
                </button>
            </div>
        );
    }

    const tierInfo = getTierPrice(subscription.tier);
    const features = getTierFeatures(subscription.tier);
    const startDate = new Date(subscription.startDate);
    const expiryDate = subscription.expiryDate ? new Date(subscription.expiryDate) : null;

    const handleCancel = () => {
        clearSubscription();
        setShowCancelConfirm(false);
        window.location.reload();
    };

    return (
        <div className="space-y-6">
            {/* Current Plan Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 border-2 border-blue-200">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Crown className="text-yellow-500" size={24} />
                            <h2 className="text-2xl font-bold text-gray-900">
                                {getTierDisplayName(subscription.tier)} Plan
                            </h2>
                        </div>
                        <p className="text-gray-600">
                            {subscription.tier === 'free' ? 'Free forever' : `$${tierInfo.amount}/${tierInfo.period}`}
                        </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-semibold text-sm ${subscription.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {subscription.active ? 'Active' : 'Inactive'}
                    </div>
                </div>

                {/* Subscription Details */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                        <Calendar className="text-blue-600" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Started</p>
                            <p className="font-semibold text-gray-900">{startDate.toLocaleDateString()}</p>
                        </div>
                    </div>
                    {expiryDate && (
                        <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                            <Calendar className="text-purple-600" size={20} />
                            <div>
                                <p className="text-xs text-gray-500">Renews</p>
                                <p className="font-semibold text-gray-900">{expiryDate.toLocaleDateString()}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {subscription.tier !== 'premium' && (
                        <button
                            onClick={onUpgrade}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Upgrade Plan
                        </button>
                    )}
                    {subscription.tier !== 'free' && (
                        <button
                            onClick={() => setShowCancelConfirm(true)}
                            className="px-6 py-3 border-2 border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all duration-300"
                        >
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>

            {/* Features List */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Plan Includes</h3>
                <div className="grid md:grid-cols-2 gap-3">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                <Check size={14} className="text-green-600" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Billing History</h3>
                    <CreditCard className="text-gray-400" size={24} />
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-semibold text-gray-900">{getTierDisplayName(subscription.tier)} Plan</p>
                            <p className="text-sm text-gray-500">{startDate.toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-900">${tierInfo.amount}.00</p>
                            <span className="text-xs text-green-600 font-semibold">Paid</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <X size={32} className="text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Cancel Subscription?</h3>
                            <p className="text-gray-600">
                                You'll lose access to premium features immediately. Are you sure?
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelConfirm(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                            >
                                Keep Subscription
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
