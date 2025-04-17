import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate, useLocation } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Animation control
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Extract college from location state if available
    if (location.state && location.state.college) {
      setSelectedCollege(location.state.college);
    }
    
    // Trigger animation after component mounts
    setTimeout(() => {
      setShowForm(true);
    }, 100);
  }, [location]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset all error states
    setNameError('');
    setEmailError('');
    setPasswordError('');
    
    // Validate form
    let hasError = false;
    
    if (!name.trim()) {
      setNameError('Please enter your name');
      hasError = true;
    }
    
    if (!email.trim()) {
      setEmailError('Please enter your email');
      hasError = true;
    } else if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else if (!email.endsWith('.edu')) {
      setEmailError('Please use your school email ending with .edu');
      hasError = true;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }
    
    if (hasError) return;
    
    // Show loading
    setIsLoading(true);
    
    // Simulate verification (would be a real API call in production)
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate to marketplace without showing a success toast
      navigate('/marketplace');
    }, 1500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* Header with logo */}
      <Header />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-justin-blue/30 to-black z-0"></div>
      
      {/* Content Container */}
      <div className={`relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto transition-all duration-500 transform ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium text-white mb-2">
            Verify Your <span className="text-justin-teal">{selectedCollege}</span> Account
          </h1>
          <p className="text-white/70">
            Please sign in with your school email
          </p>
        </div>
        
        {/* Form Card */}
        <div className="w-full glassmorphism mb-6">
          <form onSubmit={handleSignIn} className="p-6 space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (nameError) setNameError(''); }}
                  className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-justin-teal/50 ${nameError ? 'border-red-400' : ''}`}
                />
              </div>
              {nameError && (
                <div className="flex items-center mt-1 text-red-400 text-xs font-medium">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {nameError}
                </div>
              )}
            </div>
            
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                School Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@school.edu"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                  className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-justin-teal/50 ${emailError ? 'border-red-400' : ''}`}
                />
              </div>
              {emailError && (
                <div className="flex items-center mt-1 text-red-400 text-xs font-medium">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {emailError}
                </div>
              )}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
                  className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-justin-teal/50 ${passwordError ? 'border-red-400' : ''}`}
                />
              </div>
              {passwordError && (
                <div className="flex items-center mt-1 text-red-400 text-xs font-medium">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {passwordError}
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-justin-teal to-justin-mint text-white font-medium text-base rounded-xl hover:opacity-95 transition-all shadow-lg shimmer mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Verifying
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </Button>
          </form>
        </div>
        
        {/* Privacy Note */}
        <p className="text-white/50 text-xs text-center max-w-sm">
          By signing in, you agree to our Terms of Service and Privacy Policy. 
          We will only use your email to verify your school affiliation.
        </p>
      </div>
    </div>
  );
};

export default SignIn; 