import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProfilePageProps {
  onClose: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 rounded p-1 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white border border-gray-200 rounded p-6 mb-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-3">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            </div>

            {/* Profile Details */}
            {!editMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <p className="px-3 py-2 bg-gray-50 rounded text-xs text-gray-900 border border-gray-200">
                      {user.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="px-3 py-2 bg-gray-50 rounded text-xs text-gray-900 border border-gray-200">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="px-3 py-2 bg-gray-50 rounded text-xs text-gray-900 border border-gray-200">
                    Active
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setFormData({
                        name: user.name,
                        email: user.email,
                      });
                      setEditMode(true);
                    }}
                    className="flex-1 px-3 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-3 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="flex-1 px-3 py-2 bg-gray-200 text-gray-900 rounded text-sm font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Additional Settings */}
          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Settings</h3>
            <div className="space-y-2 divide-y divide-gray-200">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-500">Manage preferences</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">Privacy</p>
                  <p className="text-xs text-gray-500">Control settings</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">Security</p>
                  <p className="text-xs text-gray-500">Password & options</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
