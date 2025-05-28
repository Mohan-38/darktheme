import React, { useState } from 'react';
import { Save, User, Lock, Bell, Camera } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminSettingsPage = () => {
  // Profile Settings State
  const [profileSettings, setProfileSettings] = useState({
    name: '',
    email: '',
    profilePicture: null as File | null
  });

  // Password Settings State
  const [passwordSettings, setPasswordSettings] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false
  });

  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileSettings(prev => ({
        ...prev,
        profilePicture: e.target.files![0]
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings Data:', {
      profileSettings,
      passwordSettings,
      notificationSettings
    });
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">Manage your account settings and preferences</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 max-w-3xl">
            {/* Profile Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-slate-400 mr-2" />
                <h2 className="text-lg font-semibold text-slate-900">Profile Settings</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="profile-picture" className="block text-sm font-medium text-slate-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center">
                        {profileSettings.profilePicture ? (
                          <img
                            src={URL.createObjectURL(profileSettings.profilePicture)}
                            alt="Profile"
                            className="h-20 w-20 rounded-full object-cover"
                          />
                        ) : (
                          <Camera className="h-8 w-8 text-slate-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        id="profile-picture"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="ml-4">
                      <button
                        type="button"
                        className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                        onClick={() => document.getElementById('profile-picture')?.click()}
                      >
                        Change photo
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* Password Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Lock className="h-5 w-5 text-slate-400 mr-2" />
                <h2 className="text-lg font-semibold text-slate-900">Password Settings</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="old-password" className="block text-sm font-medium text-slate-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="old-password"
                    value={passwordSettings.oldPassword}
                    onChange={(e) => setPasswordSettings(prev => ({ ...prev, oldPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter current password"
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
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={passwordSettings.confirmPassword}
                    onChange={(e) => setPasswordSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Bell className="h-5 w-5 text-slate-400 mr-2" />
                <h2 className="text-lg font-semibold text-slate-900">Notification Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">Email Notifications</h3>
                    <p className="text-sm text-slate-500">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        emailNotifications: e.target.checked
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">Push Notifications</h3>
                    <p className="text-sm text-slate-500">Receive push notifications in browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        pushNotifications: e.target.checked
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;