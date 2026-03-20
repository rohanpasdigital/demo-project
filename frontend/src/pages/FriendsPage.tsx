import React from 'react';

const FriendsPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">
      <div className="text-center max-w-md">
        <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Friends</h1>
        <p className="text-sm text-gray-600 mb-4">Connect with people around the world</p>
        <div className="bg-gray-50 rounded p-4 border border-gray-200">
          <p className="text-xs text-gray-600 mb-3">
            This feature is currently under development.
          </p>
          <div className="inline-block px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 font-medium">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
