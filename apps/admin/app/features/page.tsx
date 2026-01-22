"use client";

import { useState, useEffect } from "react";
import { Search, Shield, ShieldAlert, ShieldCheck, Save, RefreshCw } from "lucide-react";
import { DataTable } from "@/components/DataTable";

interface FeatureSetting {
    _id: string;
    name: string;
    description: string;
    isPremium: boolean;
    updatedAt: string;
}

const API_BASE = "https://api.hirecta.com" //process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

export default function FeaturesPage() {
    const [features, setFeatures] = useState<FeatureSetting[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [savingId, setSavingId] = useState<string | null>(null);

    const fetchFeatures = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/api/admin/feature-settings`, {
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setFeatures(data.settings);
            }
        } catch (error) {
            console.error("Error fetching features:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    const togglePremium = async (name: string, currentStatus: boolean, id: string) => {
        try {
            setSavingId(id);
            const response = await fetch(`${API_BASE}/api/admin/feature-settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, isPremium: !currentStatus }),
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                setFeatures(features.map(f => f.name === name ? data.setting : f));
            }
        } catch (error) {
            console.error("Error updating feature:", error);
        } finally {
            setSavingId(null);
        }
    };

    const filteredFeatures = features.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            key: "name",
            label: "Feature Name",
            sortable: true,
            render: (value: string) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 uppercase tracking-tight">{value.replace('-', ' ')}</p>
                        <p className="text-xs font-mono text-gray-400">{value}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "description",
            label: "Description",
            render: (value: string) => (
                <p className="text-gray-600 font-medium">{value}</p>
            ),
        },
        {
            key: "isPremium",
            label: "Premium Requirement",
            sortable: true,
            render: (value: boolean, feature: FeatureSetting) => (
                <div className="flex items-center gap-3">
                    <span
                        className={`badge ${value ? "badge-warning" : "badge-success"} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}
                    >
                        {value ? "PRO / PREMIUM" : "FREE FOR ALL"}
                    </span>
                    {value ? <ShieldAlert className="w-4 h-4 text-orange-500" /> : <ShieldCheck className="w-4 h-4 text-green-500" />}
                </div>
            ),
        },
        {
            key: "updatedAt",
            label: "Last Modified",
            sortable: true,
            render: (value: string) => (
                <span className="text-sm text-gray-500 font-medium">
                    {new Date(value).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Toggle Access",
            render: (_: any, feature: FeatureSetting) => (
                <button
                    onClick={() => togglePremium(feature.name, feature.isPremium, feature._id)}
                    disabled={savingId === feature._id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${feature.isPremium
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        }`}
                >
                    {savingId === feature._id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : feature.isPremium ? (
                        <>Make Free</>
                    ) : (
                        <>Make Premium</>
                    )}
                </button>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                        Feature Access Control
                    </h1>
                    <p className="text-lg text-gray-600 font-medium max-w-2xl">
                        Toggle which features require a premium subscription and which are available to all users.
                    </p>
                </div>
                <button
                    onClick={fetchFeatures}
                    className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                    title="Refresh Settings"
                >
                    <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                {/* Simple Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search features..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-medium"
                    />
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-sm">
                    <DataTable
                        data={filteredFeatures}
                        columns={columns}
                        pageSize={10}
                        showPagination={true}
                        emptyMessage={loading ? "Loading features..." : "No features found."}
                    />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-blue-900 text-lg">System Intelligence</h3>
                        <p className="text-blue-700 font-medium">
                            Changes applied here will immediately reflect in the backend middleware. Users will be prompted to upgrade or allowed access based on these dynamic settings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
