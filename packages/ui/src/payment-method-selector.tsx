"use client";

import { CreditCard, Smartphone, DollarSign } from "lucide-react";
import { useState } from "react";

export type PaymentMethod = 'card' | 'upi' | 'paypal';

interface PaymentMethodSelectorProps {
    selected: PaymentMethod;
    onSelect: (method: PaymentMethod) => void;
}

interface PaymentOption {
    id: PaymentMethod;
    name: string;
    icon: React.ReactNode;
    description: string;
    logos?: string[];
}

const paymentOptions: PaymentOption[] = [
    {
        id: 'card',
        name: 'Credit/Debit Card',
        icon: <CreditCard size={24} />,
        description: 'Visa, Mastercard, Amex',
        logos: ['💳'],
    },
    {
        id: 'upi',
        name: 'UPI',
        icon: <Smartphone size={24} />,
        description: 'Google Pay, PhonePe, Paytm',
        logos: ['📱'],
    },
    {
        id: 'paypal',
        name: 'PayPal',
        icon: <DollarSign size={24} />,
        description: 'Fast & secure checkout',
        logos: ['💰'],
    },
];

export const PaymentMethodSelector = ({ selected, onSelect }: PaymentMethodSelectorProps) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Payment Method
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {paymentOptions.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => onSelect(option.id)}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${selected === option.id
                                ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            }`}
                    >
                        {/* Selection Indicator */}
                        {selected === option.id && (
                            <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}

                        {/* Icon */}
                        <div className={`mb-3 ${selected === option.id ? 'text-blue-600' : 'text-gray-600'}`}>
                            {option.icon}
                        </div>

                        {/* Name */}
                        <h3 className={`font-semibold mb-1 ${selected === option.id ? 'text-blue-900' : 'text-gray-900'}`}>
                            {option.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-600 mb-2">
                            {option.description}
                        </p>

                        {/* Logos */}
                        {option.logos && (
                            <div className="flex gap-1 text-lg">
                                {option.logos.map((logo, idx) => (
                                    <span key={idx}>{logo}</span>
                                ))}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
