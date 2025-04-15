import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Hash, MessageCircle, User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-serif text-gray-900 font-semibold">
            Profile
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h2>
          <p className="text-gray-600">The Profile page is under development</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          <Link to="/marketplace" className="flex flex-col items-center justify-center w-full py-1">
            <Home className="h-6 w-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Home</span>
          </Link>
          <Link to="/explore" className="flex flex-col items-center justify-center w-full py-1">
            <Hash className="h-6 w-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Explore</span>
          </Link>
          <Link to="/messages" className="flex flex-col items-center justify-center w-full py-1">
            <MessageCircle className="h-6 w-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Messages</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center w-full py-1">
            <User className="h-6 w-6 text-gray-900" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Profile; 