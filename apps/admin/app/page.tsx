"use client";

import Link from "next/link";
import {
  Users,
  LayoutTemplate,
  ArrowRight,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle2,
  PenSquare,
  Mic2,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";

export default function AdminDashboard() {
  // Mock data for recent activity
  const recentActivities = [
    { user: "John Doe", action: "Created new resume", time: "2 minutes ago" },
    { user: "Jane Smith", action: "Updated template", time: "15 minutes ago" },
    { user: "Mike Johnson", action: "Upgraded to Pro", time: "1 hour ago" },
    { user: "Sarah Wilson", action: "Downloaded PDF", time: "2 hours ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, Admin 👋
        </h1>
        <p className="text-lg text-gray-600">
          Here's what's happening with your resume builder today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Total Users"
          value={1234}
          change="+12%"
          icon={Users}
          color="blue"
          trend="up"
        />
        <StatCard
          label="Active Templates"
          value={18}
          change="+2"
          icon={LayoutTemplate}
          color="purple"
          trend="up"
        />
        <StatCard
          label="Resumes Created"
          value={50234}
          change="+320"
          icon={FileText}
          color="green"
          trend="up"
        />
        <StatCard
          label="Growth Rate"
          value="95%"
          change="+5%"
          icon={TrendingUp}
          color="orange"
          trend="up"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/users"
            className="card-premium hover-lift p-8 group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Manage Users
                </h3>
                <p className="text-gray-600">
                  View and manage all registered users
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                View user details and activity
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Suspend or delete accounts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Export user data
              </li>
            </ul>
          </Link>

          <Link
            href="/templates"
            className="card-premium hover-lift p-8 group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <LayoutTemplate className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Manage Templates
                </h3>
                <p className="text-gray-600">
                  View and manage resume templates
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-600 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Add, edit, or delete templates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Toggle template visibility
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Preview and test templates
              </li>
            </ul>
          </Link>
        </div>
      </div>

      {/* More Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Content & Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/blog"
            className="card-premium hover-lift p-8 group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <PenSquare className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Publish Blog
                </h3>
                <p className="text-gray-600">
                  Create and manage blog content
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-green-600 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Write and edit blog posts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Manage categories and tags
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Schedule and publish content
              </li>
            </ul>
          </Link>

          <Link
            href="/interviews"
            className="card-premium hover-lift p-8 group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Mic2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Interview Data
                </h3>
                <p className="text-gray-600">
                  View interview analytics
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-orange-600 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                View all interview sessions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Export data and reports
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Track performance metrics
              </li>
            </ul>
          </Link>
        </div>
      </div>

      {/* Subscription Pricing Action */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription & Revenue</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/plans"
            className="card-premium hover-lift p-8 group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Manage Pricing
                </h3>
                <p className="text-gray-600">
                  Configure subscription plans and pricing
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-indigo-600 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Update monthly and annual prices
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Manage plan features and visibility
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Create new subscription tiers
              </li>
            </ul>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <div className="card p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-semibold text-white text-sm">
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/users"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-2"
            >
              View all activity
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
