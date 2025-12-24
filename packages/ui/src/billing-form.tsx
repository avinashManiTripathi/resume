"use client";

import { useState } from "react";
import { Lock, CreditCard, Smartphone } from "lucide-react";

export type PaymentMethod = 'card' | 'upi' | 'paypal';

interface BillingFormProps {
    paymentMethod: PaymentMethod;
    onSubmit: (data: any) => void;
    isProcessing?: boolean;
}

export const BillingForm = ({ paymentMethod, onSubmit, isProcessing = false }: BillingFormProps) => {
    const [formData, setFormData] = useState({
        // Card fields
        cardNumber: '',
        cardName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        // UPI fields
        upiId: '',
        // Common fields
        email: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateCard = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 13) {
            newErrors.cardNumber = 'Invalid card number';
        }
        if (!formData.cardName || formData.cardName.trim().length < 3) {
            newErrors.cardName = 'Cardholder name is required';
        }
        if (!formData.expiryMonth || !formData.expiryYear) {
            newErrors.expiry = 'Expiry date is required';
        }
        if (!formData.cvv || formData.cvv.length < 3) {
            newErrors.cvv = 'Invalid CVV';
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        return newErrors;
    };

    const validateUPI = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.upiId || !/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) {
            newErrors.upiId = 'Invalid UPI ID (e.g., username@upi)';
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let validationErrors = {};
        if (paymentMethod === 'card') {
            validationErrors = validateCard();
        } else if (paymentMethod === 'upi') {
            validationErrors = validateUPI();
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setFormData(prev => ({ ...prev, cardNumber: formatted }));
        if (errors.cardNumber) {
            setErrors(prev => ({ ...prev, cardNumber: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Badge */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg p-3">
                <Lock size={16} className="text-green-600" />
                <span>Your payment information is encrypted and secure</span>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
                <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>

                    {/* Cardholder Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cardholder Name
                        </label>
                        <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cardName ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    name="expiryMonth"
                                    value={formData.expiryMonth}
                                    onChange={handleChange}
                                    className={`px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.expiry ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">MM</option>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                        <option key={month} value={month.toString().padStart(2, '0')}>
                                            {month.toString().padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="expiryYear"
                                    value={formData.expiryYear}
                                    onChange={handleChange}
                                    className={`px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.expiry ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">YY</option>
                                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                                        <option key={year} value={year.toString().slice(-2)}>
                                            {year.toString().slice(-2)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV
                            </label>
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="123"
                                maxLength={4}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cvv ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                    </div>
                </div>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === 'upi' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            UPI ID
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="upiId"
                                value={formData.upiId}
                                onChange={handleChange}
                                placeholder="username@upi"
                                className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.upiId ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                        <p className="text-xs text-gray-500 mt-1">Enter your UPI ID (e.g., yourname@paytm)</p>
                    </div>
                </div>
            )}

            {/* PayPal */}
            {paymentMethod === 'paypal' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">💰</div>
                    <h3 className="font-semibold text-gray-900 mb-2">PayPal Checkout</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        You'll be redirected to PayPal to complete your payment securely
                    </p>
                </div>
            )}

            {/* Email (common for all methods) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                <p className="text-xs text-gray-500 mt-1">We'll send your receipt to this email</p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isProcessing ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Lock size={18} />
                        {paymentMethod === 'paypal' ? 'Continue to PayPal' : 'Complete Payment'}
                    </>
                )}
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-4 border-t">
                <span className="flex items-center gap-1">
                    <Lock size={12} />
                    SSL Encrypted
                </span>
                <span>•</span>
                <span>PCI Compliant</span>
                <span>•</span>
                <span>30-day Money Back</span>
            </div>
        </form>
    );
};
