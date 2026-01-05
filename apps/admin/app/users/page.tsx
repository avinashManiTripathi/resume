"use client";

import { useState } from "react";
import { Search, Download, UserPlus, Filter, Mail, Shield, Ban } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { UserAvatar } from "@/components/UserAvatar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  joinedDate: string;
  resumeCount: number;
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // MockData - In production, this would come from your API
  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Premium",
      status: "active",
      joinedDate: "2024-01-15",
      resumeCount: 5,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Free",
      status: "active",
      joinedDate: "2024-02-20",
      resumeCount: 2,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Premium",
      status: "active",
      joinedDate: "2024-03-10",
      resumeCount: 8,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Free",
      status: "inactive",
      joinedDate: "2023-12-05",
      resumeCount: 1,
    },
    {
      id: "5",
      name: "Tom Brown",
      email: "tom@example.com",
      role: "Premium",
      status: "suspended",
      joinedDate: "2024-01-20",
      resumeCount: 3,
    },
  ];

  // Filter users
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      key: "name",
      label: "User",
      sortable: true,
      render: (value: string, user: User) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={user.name} size="md" />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (value: string) => (
        <span
          className={`badge ${value === "Premium" ? "badge-warning" : "badge-primary"}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => {
        const statusColors = {
          active: "badge-success",
          inactive: "badge-primary",
          suspended: "badge-danger",
        };
        return (
          <span className={`badge ${statusColors[value as keyof typeof statusColors]}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      key: "resumeCount",
      label: "Resumes",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: "joinedDate",
      label: "Joined",
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-600">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, user: User) => (
        <div className="flex items-center gap-2">
          <button
            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors"
            title="Change Role"
          >
            <Shield className="w-4 h-4" />
          </button>
          <button
            className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
            title="Suspend User"
          >
            <Ban className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          User Management
        </h1>
        <p className="text-lg text-gray-600">
          Manage all registered users and their permissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {mockUsers.length}
          </div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {mockUsers.filter((u) => u.status === "active").length}
          </div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {mockUsers.filter((u) => u.role === "Premium").length}
          </div>
          <div className="text-sm text-gray-600">Premium Users</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {mockUsers.reduce((sum, u) => sum + u.resumeCount, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Resumes</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">All Roles</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          {/* Actions */}
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
            <Download className="w-5 h-5" />
            Export
          </button>
          <button className="px-6 py-3 gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        pageSize={10}
        showPagination={true}
        emptyMessage="No users found. Try adjusting your filters."
      />
    </div>
  );
}
