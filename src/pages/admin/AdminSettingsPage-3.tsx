import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Mail, 
  Phone, 
  Globe, 
  Moon, 
  Sun,
  CheckCircle,
  Save
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const AdminSettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Profile Settings
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: user?.email || '',
    phone: '+91 1234567890',
    website: 'https://techcreator.com',
    bio: 'Senior developer specializing in IoT, blockchain, and web development.'
  });
  
  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    projectUpdates: true,
    newInquiries: true,
    orderAlerts: true,
    marketingEmails: false
  });
  
  // Security Settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
    compactMode: false,
    animationsEnabled: true
  });
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would update the profile in the backend
      await updateProfile(profileData);
      showSuccessMessage();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would update notification preferences in the backend
      showSuccessMessage();
    } catch (error) {
      console.error('Failed to update notifications:', error);
    }
  };
  
  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would update the password in the backend
      if (securityData.newPassword !== securityData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      showSuccessMessage();
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Failed to update security settings:', error);
    }
  };
  
  const handleAppearanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would update appearance settings in the backend
      showSuccessMessage();
    } catch (error) {
      console.error('Failed to update appearance settings:', error);
    }
  };
  
  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-500">Manage your account settings and preferences.</p>
          </div>
          
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Settings updated successfully!
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="h-4 w-4 inline-block mr-2" />
                Profile
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'notifications'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bell className="h-4 w-4 inline-block mr-2" />
                Notifications
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'security'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Lock className="h-4 w-4 inline-block mr-2" />
                Security
              </button>
              
              <button
                onClick={() => setActiveTab('appearance')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'appearance'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Palette className="h-4 w-4 inline-block mr-2" />
                Appearance
              </button>
            </div>
            
            <div className="p-6">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-slate-400 mr-2" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-slate-400 mr-2" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Website
                    </label>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-slate-400 mr-2" />
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
              
              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <form onSubmit={handleNotificationSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">Email Notifications</h3>
                        <p className="text-sm text-slate-500">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">Project Updates</h3>
                        <p className="text-sm text-slate-500">Get notified about project changes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.projectUpdates}
                          onChange={(e) => setNotifications({ ...notifications, projectUpdates: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">New Inquiries</h3>
                        <p className="text-sm text-slate-500">Get notified about new client inquiries</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.newInquiries}
                          onChange={(e) => setNotifications({ ...notifications, newInquiries: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">Order Alerts</h3>
                        <p className="text-sm text-slate-500">Get notified about new orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.orderAlerts}
                          onChange={(e) => setNotifications({ ...notifications, orderAlerts: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">Marketing Emails</h3>
                        <p className="text-sm text-slate-500">Receive marketing and promotional emails</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.marketingEmails}
                          onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </form>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <form onSubmit={handleSecuritySubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Update Password
                    </button>
                  </div>
                </form>
              )}
              
              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <form onSubmit={handleAppearanceSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Theme
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={appearance.theme === 'light'}
                          onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-lg flex items-center ${
                          appearance.theme === 'light'
                            ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-600'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}>
                          <Sun className="h-5 w-5 mr-2" />
                          Light
                        </div>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={appearance.theme === 'dark'}
                          onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-lg flex items-center ${
                          appearance.theme === 'dark'
                            ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-600'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}>
                          <Moon className="h-5 w-5 mr-2" />
                          Dark
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Font Size
                    </label>
                    <select
                      value={appearance.fontSize}
                      onChange={(e) => setAppearance({ ...appearance, fontSize: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">Compact Mode</h3>
                        <p className="text-sm text-slate-500">Use compact layout for dense information</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={appearance.compactMode}
                          onChange={(e) => setAppearance({ ...appearance, compactMode: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">Enable Animations</h3>
                        <p className="text-sm text-slate-500">Show animations and transitions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={appearance.animationsEnabled}
                          onChange={(e) => setAppearance({ ...appearance, animationsEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;