import React from 'react';

const DemoPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">
      <div className="text-center max-w-md">
        <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Demo</h1>
        <p className="text-sm text-gray-600 mb-4">Feature showcase</p>
        <div className="bg-gray-50 rounded p-4 border border-gray-200">
          <p className="text-xs text-gray-600 mb-3">
            Explore upcoming features and capabilities.
          </p>
          <div className="inline-block px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 font-medium">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
