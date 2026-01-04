"use client";

import { useState } from "react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
      <p className="text-lg text-gray-600 mb-8">Manage all registered users</p>
      
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
        />
      </div>
      
      <div className="mt-6 bg-white rounded-xl p-8 border-2 border-gray-200 text-center">
        <p className="text-gray-500">User management interface - Connect to API at http://localhost:4000/api/auth/users</p>
      </div>
    </div>
  );
}
