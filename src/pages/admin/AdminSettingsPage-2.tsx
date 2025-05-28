import React, { useState } from 'react';
import { Save, User, Lock, UserPlus, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const AdminSettingsPage = () => {
  const { user } = useAuth();
  
  // Change Password State
  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // New User State
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Loading and Error States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate passwords match
      if (passwordSettings.newPassword !== passwordSettings.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      // Update password using Supabase
      const { error } = await supabase.auth.updateUser({
        password: passwordSettings.newPassword
      });

      if (error) throw error;

      setSuccess('Password updated successfully');
      setPasswordSettings({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new user creation
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate passwords match
      if (newUser.password !== newUser.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Create new user using Supabase Admin API
      const { error } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true
      });

      if (error) throw error;

      setSuccess('New user created successfully');
      setNewUser({
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-500">Manage your account and create new users</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{success}</p>
          </div>
        )}

        <div className="space-y-6 max-w-3xl">
          {/* Change Password Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Lock className="h-5 w-5 text-slate-400 mr-2" />
              <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-slate-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  value={passwordSettings.currentPassword}
                  onChange={(e) => setPasswordSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={passwordSettings.newPassword}
                  onChange={(e) => setPasswordSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-new-password" className="block text-sm font-medium text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-new-password"
                  value={passwordSettings.confirmPassword}
                  onChange={(e) => setPasswordSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Create New User Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <UserPlus className="h-5 w-5 text-slate-400 mr-2" />
              <h2 className="text-lg font-semibold text-slate-900">Create New User</h2>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label htmlFor="new-user-email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="new-user-email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-user-password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="new-user-password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-user-confirm-password" className="block text-sm font-medium text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="new-user-confirm-password"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;