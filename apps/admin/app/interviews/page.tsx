"use client";

import { useState } from "react";
import {
    Mic2,
    TrendingUp,
    Clock,
    Award,
    Download,
    Eye,
    Filter,
    Calendar,
    User,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";

interface Interview {
    id: string;
    userName: string;
    userEmail: string;
    interviewType: string;
    technology: string;
    level: string;
    date: string;
    duration: string;
    status: "completed" | "in-progress" | "abandoned";
    score?: number;
}

export default function InterviewsPage() {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("");

    // Mock interview data
    const interviews: Interview[] = [
        {
            id: "1",
            userName: "John Doe",
            userEmail: "john.doe@example.com",
            interviewType: "Technical",
            technology: "React",
            level: "Senior",
            date: "2024-01-15T10:30:00",
            duration: "45 min",
            status: "completed",
            score: 85,
        },
        {
            id: "2",
            userName: "Jane Smith",
            userEmail: "jane.smith@example.com",
            interviewType: "Technical",
            technology: "Node.js",
            level: "Mid-Level",
            date: "2024-01-15T14:00:00",
            duration: "38 min",
            status: "completed",
            score: 92,
        },
        {
            id: "3",
            userName: "Mike Johnson",
            userEmail: "mike.j@example.com",
            interviewType: "Behavioral",
            technology: "General",
            level: "Entry",
            date: "2024-01-14T16:20:00",
            duration: "27 min",
            status: "completed",
            score: 78,
        },
        {
            id: "4",
            userName: "Sarah Wilson",
            userEmail: "sarah.w@example.com",
            interviewType: "Technical",
            technology: "Python",
            level: "Senior",
            date: "2024-01-14T11:00:00",
            duration: "52 min",
            status: "completed",
            score: 88,
        },
        {
            id: "5",
            userName: "Alex Brown",
            userEmail: "alex.brown@example.com",
            interviewType: "System Design",
            technology: "Architecture",
            level: "Senior",
            date: "2024-01-13T15:30:00",
            duration: "15 min",
            status: "abandoned",
            score: 0,
        },
    ];

    const filteredInterviews = interviews.filter((interview) => {
        if (selectedFilter !== "all" && interview.status !== selectedFilter) {
            return false;
        }
        return true;
    });

    const totalInterviews = interviews.length;
    const completedInterviews = interviews.filter((i) => i.status === "completed").length;
    const avgScore =
        interviews.filter((i) => i.score).reduce((sum, i) => sum + (i.score || 0), 0) /
        interviews.filter((i) => i.score).length;
    const avgDuration = "42 min"; // Calculated from duration strings

    const handleExport = () => {
        alert("Exporting interview data as CSV...");
        // In production, this would generate and download a CSV file
    };

    const getStatusBadge = (status: Interview["status"]) => {
        const styles = {
            completed: "bg-green-100 text-green-700",
            "in-progress": "bg-blue-100 text-blue-700",
            abandoned: "bg-red-100 text-red-700",
        };
        return styles[status];
    };

    const getScoreBadge = (score: number) => {
        if (score >= 90) return "bg-green-100 text-green-700";
        if (score >= 75) return "bg-blue-100 text-blue-700";
        if (score >= 60) return "bg-orange-100 text-orange-700";
        return "bg-red-100 text-red-700";
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Interview Analytics
                    </h1>
                    <p className="text-lg text-gray-600">
                        View and analyze interview session data
                    </p>
                </div>
                <button
                    onClick={handleExport}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                    <Download className="w-5 h-5" />
                    Export Data
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard
                    label="Total Interviews"
                    value={totalInterviews}
                    change="+5"
                    icon={Mic2}
                    color="blue"
                    trend="up"
                />
                <StatCard
                    label="Completed"
                    value={completedInterviews}
                    change="+4"
                    icon={Award}
                    color="green"
                    trend="up"
                />
                <StatCard
                    label="Avg Score"
                    value={`${Math.round(avgScore)}%`}
                    change="+3%"
                    icon={TrendingUp}
                    color="purple"
                    trend="up"
                />
                <StatCard
                    label="Avg Duration"
                    value={avgDuration}
                    change="-2 min"
                    icon={Clock}
                    color="orange"
                    trend="down"
                />
            </div>

            {/* Filters */}
            <div className="card p-6 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-500" />
                        <span className="font-medium text-gray-700">Filters:</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedFilter("all")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedFilter === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setSelectedFilter("completed")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedFilter === "completed"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setSelectedFilter("in-progress")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedFilter === "in-progress"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            In Progress
                        </button>
                        <button
                            onClick={() => setSelectedFilter("abandoned")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedFilter === "abandoned"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Abandoned
                        </button>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Interview Data Table */}
            <div className="card p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Interview Sessions ({filteredInterviews.length})
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                    User
                                </th>
                                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                    Type
                                </th>
                                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                    Technology
                                </th>
                                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                    Level
                                </th>
                                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                    Date & Time
                                </th>
                                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                    Duration
                                </th>
                                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                    Status
                                </th>
                                <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                    Score
                                </th>
                                <th className="text-right py-4 px-4 font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInterviews.map((interview) => (
                                <tr
                                    key={interview.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-semibold text-white text-sm">
                                                {interview.userName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {interview.userName}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {interview.userEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-gray-900">{interview.interviewType}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                            {interview.technology}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-gray-600">{interview.level}</span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">
                                        <div>
                                            <p className="font-medium">
                                                {new Date(interview.date).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(interview.date).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            {interview.duration}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                                interview.status
                                            )}`}
                                        >
                                            {interview.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        {interview.score !== undefined ? (
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getScoreBadge(
                                                    interview.score
                                                )}`}
                                            >
                                                {interview.score}%
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredInterviews.length === 0 && (
                    <div className="text-center py-12">
                        <Mic2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No interviews found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            Try adjusting your filters
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
