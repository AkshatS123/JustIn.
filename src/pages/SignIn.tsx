import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Animation control
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setShowForm(true);
    }, 100);
  }, []);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      navigate('/marketplace');
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Logo at top with proper spacing */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#3a4f7a] font-medium">
          Just In<span className="text-justin-teal">.</span>
        </h1>
      </div>
      
      {/* Main content container */}
      <div className={`w-full max-w-md transition-all duration-500 transform ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Card container */}
        <div className="w-full px-8 py-8 mx-auto bg-white border border-gray-100 rounded-3xl shadow-sm">
          <h2 className="mb-6 text-2xl font-medium text-center text-black">
            Create Account
          </h2>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Username Field */}
            <div className="relative">
              <div className="flex items-center px-4 py-3 bg-gray-100 rounded-full">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-gray-500 text-gray-800 pl-0"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="relative">
              <div className="flex items-center px-4 py-3 bg-gray-100 rounded-full">
                <Lock className="w-5 h-5 mr-2 text-gray-500" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-gray-500 text-gray-800 pl-0"
                />
              </div>
            </div>
            
            {/* Confirm Password Field */}
            <div className="relative">
              <div className="flex items-center px-4 py-3 bg-gray-100 rounded-full">
                <Lock className="w-5 h-5 mr-2 text-gray-500" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-gray-500 text-gray-800 pl-0"
                />
              </div>
            </div>
            
            {/* Sign Up Button */}
            <Button 
              type="submit"
              className="w-full py-6 mt-4 font-medium text-white bg-black rounded-full hover:bg-black/90"
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </form>
        </div>
        
        {/* Social Sign Up Section */}
        <div className="mt-6 mb-8">
          <div className="flex items-center justify-center">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or sign up with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            {/* Google Button */}
            <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            
            {/* Facebook Button */}
            <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22,12.1c0-5.5-4.5-10-10-10c-5.5,0-10,4.5-10,10c0,5,3.7,9.1,8.4,9.9v-7H7.9v-2.9h2.5V9.9c0-2.5,1.5-3.9,3.8-3.9 c1.1,0,2.2,0.2,2.2,0.2v2.5h-1.3c-1.2,0-1.6,0.8-1.6,1.6v1.9h2.8L15.9,15h-2.4v7C18.3,21.2,22,17.1,22,12.1z" fill="#1877F2"/>
              </svg>
            </button>
            
            {/* Apple Button */}
            <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M16.114,11.906c-0.008-2.221,1.82-3.291,1.903-3.341c-1.039-1.517-2.651-1.725-3.221-1.745 c-1.358-0.142-2.671,0.807-3.364,0.807c-0.706,0-1.778-0.792-2.929-0.768c-1.489,0.023-2.877,0.876-3.644,2.211 c-1.572,2.727-0.399,6.752,1.111,8.96c0.752,1.076,1.636,2.279,2.794,2.236c1.129-0.045,1.55-0.725,2.913-0.725 c1.347,0,1.742,0.725,2.923,0.699c1.211-0.018,1.973-1.088,2.703-2.172c0.866-1.24,1.215-2.453,1.229-2.518 C17.513,15.541,16.127,13.602,16.114,11.906L16.114,11.906z M13.835,6.335c0.61-0.755,1.027-1.787,0.913-2.831 c-0.883,0.037-1.982,0.596-2.616,1.334c-0.563,0.658-1.061,1.729-0.932,2.744C12.174,7.664,13.212,7.083,13.835,6.335 L13.835,6.335z" fill="#000000"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 