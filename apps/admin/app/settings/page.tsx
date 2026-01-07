"use client";

import { useState } from "react";
import { Save, Plus, Edit3, Trash2, Menu, ChevronDown, ChevronUp } from "lucide-react";

interface MenuItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface MenuColumn {
  header?: string;
  items: MenuItem[];
}

interface NavDropdown {
  id: string;
  label: string;
  type: string;
  columns: MenuColumn[];
}

interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function SettingsPage() {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [editingMenu, setEditingMenu] = useState<string | null>(null);
  const [editingFooter, setEditingFooter] = useState<string | null>(null);

  // Sample data matching the structure
  const [menuItems, setMenuItems] = useState<NavDropdown[]>([
    {
      id: "product",
      label: "Product",
      type: "mega-dropdown",
      columns: [
        {
          items: [
            { icon: "🎯", title: "Features", description: "Powerful resume building tools", href: "/#features" },
            { icon: "📄", title: "Templates", description: "ATS-friendly designs", href: "/templates" },
            { icon: "💎", title: "Pricing", description: "Simple, transparent pricing", href: "/pricing" }
          ]
        },
        {
          items: [
            { icon: "👥", title: "Use Cases", description: "For students, professionals & more", href: "/use-cases" },
            { icon: "✨", title: "Examples", description: "Real resume showcases", href: "/examples" },
            { icon: "🔗", title: "Integrations", description: "Connect with LinkedIn & more", href: "/integrations" }
          ]
        }
      ]
    },
    {
      id: "resources",
      label: "Resources",
      type: "mega-dropdown",
      columns: [
        {
          header: "Guides",
          items: [
            { icon: "��", title: "Resume Writing Guide", description: "Complete guide to writing resumes", href: "/resources/resume-guide" },
            { icon: "✍️", title: "Cover Letter Guide", description: "Write compelling cover letters", href: "/resources/cover-letter-guide" },
            { icon: "🤖", title: "ATS Guide", description: "Beat applicant tracking systems", href: "/resources/ats-guide" }
          ]
        }
      ]
    }
  ]);

  const [footerSections, setFooterSections] = useState<FooterSection[]>([
    {
      title: "Product",
      links: [
        { text: "Features", href: "#features" },
        { text: "Templates", href: "/templates" },
        { text: "Pricing", href: "#pricing" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "/about" },
        { text: "Blog", href: "/blog" },
        { text: "Contact", href: "/contact" }
      ]
    }
  ]);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const data = { menuItems, footerSections };
    console.log("Saving:", JSON.stringify(data, null, 2));
    alert("Settings saved! Check console for data.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Navigation Management</h1>
          <p className="text-lg text-gray-600">Manage header mega menus and footer sections</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save All Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Header Mega Menus */}
        <div className="bg-white rounded-xl border-2 border-gray-200">
          <div className="p-6 border-b-2 border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Menu className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Header Mega Menus</h2>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Menu
            </button>
          </div>

          <div className="p-6 space-y-4">
            {menuItems.map((menu) => (
              <div key={menu.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                {/* Menu Header */}
                <div 
                  className="bg-gray-50 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleMenu(menu.id)}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{menu.label}</h3>
                    <span className="text-sm text-gray-500">
                      ({menu.columns.reduce((acc, col) => acc + col.items.length, 0)} items)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingMenu(menu.id);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {expandedMenus.includes(menu.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Menu Content */}
                {expandedMenus.includes(menu.id) && (
                  <div className="p-4 bg-white">
                    <div className="grid md:grid-cols-2 gap-4">
                      {menu.columns.map((column, colIndex) => (
                        <div key={colIndex} className="space-y-3">
                          {column.header && (
                            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                              {column.header}
                            </h4>
                          )}
                          <div className="space-y-2">
                            {column.items.map((item, itemIndex) => (
                              <div 
                                key={itemIndex} 
                                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-2xl">{item.icon}</span>
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-900">{item.title}</div>
                                    <div className="text-sm text-gray-600">{item.description}</div>
                                    <div className="text-xs text-blue-600 mt-1">{item.href}</div>
                                  </div>
                                  <div className="flex gap-1">
                                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                      <Edit3 className="w-3 h-3" />
                                    </button>
                                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium">
                              + Add Item
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-500 hover:text-purple-600 transition-colors text-sm font-medium">
                      + Add Column
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Sections */}
        <div className="bg-white rounded-xl border-2 border-gray-200">
          <div className="p-6 border-b-2 border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Footer Sections</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {footerSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{section.title}</h3>
                    <div className="flex gap-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{link.text}</div>
                          <div className="text-xs text-gray-500">{link.href}</div>
                        </div>
                        <div className="flex gap-1">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-purple-500 hover:text-purple-600 transition-colors text-sm font-medium">
                      + Add Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
