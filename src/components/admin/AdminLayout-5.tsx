import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  Code,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Footer from '../layout/Footer'; // Your external Footer component

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:static`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-slate-900"
            >
              <Code className="h-6 w-6 text-blue-600" />
              <span>TechCreator</span>
            </Link>

            <button
              className="lg:hidden text-slate-500 hover:text-slate-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Admin Panel
            </h2>

            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 mr-3 ${
                      isActive(item.path) ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>

            <hr className="my-6 border-slate-200" />

            <Link
              to="/admin/settings"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <Settings className="h-5 w-5 mr-3 text-slate-400" />
              Settings
            </Link>

            <button
              onClick={logout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 w-full text-left mt-2"
            >
              <LogOut className="h-5 w-5 mr-3 text-slate-400" />
              Log Out
            </button>

            <hr className="my-6 border-slate-200" />

            <Link
              to="/"
              className="text-sm text-slate-600 hover:text-blue-600"
              onClick={() => setSidebarOpen(false)}
            >
              ← Back to Website
            </Link>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex flex-col flex-1 lg:ml-64">
          {/* Topbar */}
          <div className="sticky top-0 z-10 flex h-16 bg-white shadow-sm lg:hidden">
            <div className="flex items-center px-4">
              <button
                className="text-slate-500 hover:text-slate-700 focus:outline-none"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link
                to="/"
                className="ml-3 flex items-center space-x-2 text-xl font-bold text-slate-900"
              >
                <Code className="h-6 w-6 text-blue-600" />
                <span>TechCreator</span>
              </Link>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-grow px-4 py-6">{children}</main>
        </div>
      </div>

      {/* Footer spans full width at bottom */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
