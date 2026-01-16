"use client";

import Link from "next/link";
import {
  FileText,
  Users,
  LayoutTemplate,
  Settings,
  LogOut,
  Home,
  BarChart3,
  Menu,
  X,
  PenSquare,
  Mic2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAdmin();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return 'AD';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/users", label: "Users", icon: Users },
    { href: "/templates", label: "Templates", icon: LayoutTemplate },
    { href: "/blog", label: "Publish Blog", icon: PenSquare },
    { href: "/interviews", label: "Interviews", icon: Mic2 },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${isMobileOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      />

      {/* Sidebar */}
      <aside
        className={`admin-sidebar h-full fixed left-0 top-0 h-screen w-64 gradient-sidebar border-r border-gray-200 text-slate-900 flex flex-col z-50 transition-all duration-300 ${isMobileOpen ? "open" : ""}`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 flex items-center justify-center">
                <img
                  src="/favicon.ico"
                  alt="ProfResume Logo"
                  className="w-9 h-9 transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute -inset-1 gradient-primary rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">ProfResume</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-semibold text-sm text-white">
              {user ? getInitials(user.name) : 'AD'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'admin@example.com'}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
