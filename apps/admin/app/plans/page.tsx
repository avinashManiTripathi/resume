"use client";

import { useState, useEffect } from "react";
import {
    Search,
    TrendingUp,
    Plus,
    Edit2,
    Trash2,
    Check,
    X,
    RefreshCw,
    Star,
    Circle,
    Info,
    Save
} from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { ENV } from "../env";
import { useAppNetwork, API_ENDPOINTS } from "@/hooks/useAppNetwork";

interface Plan {
    _id: string;
    planId: string;
    name: string;
    description: string;
    monthlyPrice: number;
    annualPrice: number;
    currency: string;
    features: string[];
    popular: boolean;
    isActive: boolean;
    updatedAt: string;
}


export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<Partial<Plan> | null>(null);
    const [saving, setSaving] = useState(false);

    const network = useAppNetwork();

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const data = await network.get<{ success: boolean, plans: Plan[] }>(API_ENDPOINTS.ADMIN.PLANS);
            if (data.success) {
                setPlans(data.plans);
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [network]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPlan?.planId || !editingPlan?.name) return;

        try {
            setSaving(true);
            const isEditing = !!editingPlan._id;
            const url = isEditing
                ? `${API_ENDPOINTS.ADMIN.PLANS}/${editingPlan._id}`
                : API_ENDPOINTS.ADMIN.PLANS;

            let data;
            if (isEditing) {
                data = await network.put<{ success: boolean, plan: Plan }>(url, editingPlan);
            } else {
                data = await network.post<{ success: boolean, plan: Plan }>(url, editingPlan);
            }

            if (data.success) {
                if (isEditing) {
                    setPlans(plans.map(p => p._id === data.plan._id ? data.plan : p));
                } else {
                    setPlans([...plans, data.plan]);
                }
                setIsModalOpen(false);
                setEditingPlan(null);
            }
        } catch (error) {
            console.error("Error saving plan:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this plan?")) return;

        try {
            const data = await network.del<{ success: boolean }>(`${API_ENDPOINTS.ADMIN.PLANS}/${id}`);
            if (data.success) {
                setPlans(plans.filter(p => p._id !== id));
            }
        } catch (error) {
            console.error("Error deleting plan:", error);
        }
    };

    const toggleStatus = async (plan: Plan) => {
        try {
            const data = await network.put<{ success: boolean, plan: Plan }>(`${API_ENDPOINTS.ADMIN.PLANS}/${plan._id}`, { isActive: !plan.isActive });
            if (data.success) {
                setPlans(plans.map(p => p._id === plan._id ? data.plan : p));
            }
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    const filteredPlans = plans.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.planId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            key: "name",
            label: "Plan Info",
            render: (_: string, plan: Plan) => (
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${plan.isActive ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                        <TrendingUp className={`w-5 h-5 ${plan.isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 uppercase tracking-tight">{plan.name}</p>
                        <p className="text-xs font-mono text-gray-400">{plan.planId}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "monthlyPrice",
            label: "Monthly",
            render: (value: number) => <span className="font-bold text-gray-900">₹{value}</span>,
        },
        {
            key: "annualPrice",
            label: "Annual",
            render: (value: number) => <span className="font-bold text-emerald-600">₹{value}</span>,
        },
        {
            key: "popular",
            label: "Status",
            render: (value: boolean, plan: Plan) => (
                <div className="flex flex-col gap-1">
                    <span className={`badge ${plan.isActive ? "badge-success" : "badge-error"} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit`}>
                        {plan.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                    {value && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                            <Star size={10} fill="currentColor" /> Popular
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (_: any, plan: Plan) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setEditingPlan(plan);
                            setIsModalOpen(true);
                        }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Plan"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => toggleStatus(plan)}
                        className={`p-2 rounded-lg transition-colors ${plan.isActive ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                        title={plan.isActive ? "Deactivate" : "Activate"}
                    >
                        {plan.isActive ? <X size={18} /> : <Check size={18} />}
                    </button>
                    <button
                        onClick={() => handleDelete(plan._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Plan"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                        Subscription Plans
                    </h1>
                    <p className="text-lg text-gray-600 font-medium max-w-2xl">
                        Manage your subscription tiers, pricing, and features. Changes are reflected in the Editor immediately.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchPlans}
                        className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => {
                            setEditingPlan({ features: [], currency: 'INR', isActive: true, popular: false });
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        <Plus size={20} />
                        Add New Plan
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search plans..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
                    />
                </div>

                <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-sm">
                    <DataTable
                        data={filteredPlans}
                        columns={columns}
                        pageSize={10}
                        showPagination={true}
                        emptyMessage={loading ? "Loading plans..." : "No plans found."}
                    />
                </div>

                <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-6 flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Info className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-amber-900 text-lg">Important Note</h3>
                        <p className="text-amber-700 font-medium">
                            Ensure `planId` matches the identifiers used in your code (e.g., 'free', 'pro', 'premium'). Deleting a plan that users are already subscribed to may cause issues.
                        </p>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                {editingPlan?._id ? "Edit Subscription Plan" : "Create New Plan"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Plan ID (Unique)</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 transition-all font-bold"
                                        placeholder="e.g. pro"
                                        value={editingPlan?.planId || ''}
                                        onChange={e => setEditingPlan({ ...editingPlan, planId: e.target.value })}
                                        disabled={!!editingPlan?._id}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Display Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 transition-all font-bold"
                                        placeholder="e.g. Pro Plan"
                                        value={editingPlan?.name || ''}
                                        onChange={e => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Description</label>
                                <textarea
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 transition-all font-medium h-24 resize-none"
                                    placeholder="Explain the value proposition..."
                                    value={editingPlan?.description || ''}
                                    onChange={e => setEditingPlan({ ...editingPlan, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Monthly Price (INR)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 transition-all font-bold"
                                        placeholder="499"
                                        value={editingPlan?.monthlyPrice || ''}
                                        onChange={e => setEditingPlan({ ...editingPlan, monthlyPrice: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Annual Price (INR)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 transition-all font-bold"
                                        placeholder="4990"
                                        value={editingPlan?.annualPrice || ''}
                                        onChange={e => setEditingPlan({ ...editingPlan, annualPrice: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Features</label>
                                <div className="space-y-2">
                                    {(editingPlan?.features || []).map((feature, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                className="flex-1 px-4 py-2 bg-gray-50 border-2 border-transparent rounded-lg focus:bg-white focus:border-indigo-500 transition-all font-medium"
                                                value={feature}
                                                onChange={e => {
                                                    const newFeatures = [...(editingPlan?.features || [])];
                                                    newFeatures[idx] = e.target.value;
                                                    setEditingPlan({ ...editingPlan, features: newFeatures });
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFeatures = (editingPlan?.features || []).filter((_, i) => i !== idx);
                                                    setEditingPlan({ ...editingPlan, features: newFeatures });
                                                }}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setEditingPlan({ ...editingPlan, features: [...(editingPlan?.features || []), ''] })}
                                        className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:text-indigo-700 transition-colors"
                                    >
                                        <Plus size={16} /> Add Feature
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-8 pt-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-2 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        checked={editingPlan?.popular || false}
                                        onChange={e => setEditingPlan({ ...editingPlan, popular: e.target.checked })}
                                    />
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Mark as Most Popular</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-2 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        checked={editingPlan?.isActive || false}
                                        onChange={e => setEditingPlan({ ...editingPlan, isActive: e.target.checked })}
                                    />
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Plan is Active</span>
                                </label>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-2xl font-black hover:bg-gray-100 transition-all border-2 border-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                                    {editingPlan?._id ? "Update Plan" : "Create Plan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
