"use client";

import Link from "next/link";
import { Users, LayoutTemplate, ArrowRight, TrendingUp, FileText } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage users, templates, and system settings
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Users", value: "1,234", change: "+12%", icon: Users, color: "blue" },
          { label: "Active Templates", value: "18", change: "+2", icon: LayoutTemplate, color: "purple" },
          { label: "Resumes Created", value: "50,234", change: "+320", icon: FileText, color: "green" },
          { label: "Growth", value: "95%", change: "+5%", icon: TrendingUp, color: "orange" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/users" className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-500 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">Manage Users</h3>
              <p className="text-gray-600">View and manage all users</p>
            </div>
            <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-2 transition-transform" />
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>•  View user details and activity</li>
            <li>• Suspend or delete user accounts</li>
            <li>• Export user data</li>
          </ul>
        </Link>

        <Link href="/templates" className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-500 hover:shadow-2xl transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
              <LayoutTemplate className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">Manage Templates</h3>
              <p className="text-gray-600">View and manage resume templates</p>
            </div>
            <ArrowRight className="w-6 h-6 text-purple-600 group-hover:translate-x-2 transition-transform" />
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Add, edit, or delete templates</li>
            <li>• Toggle template visibility</li>
            <li>• Preview and test templates</li>
          </ul>
        </Link>
      </div>
    </div>
  );
}
