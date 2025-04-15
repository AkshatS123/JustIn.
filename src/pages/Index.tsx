import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import CollegeSelect from '@/components/CollegeSelect';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';

// College videos mapping
const collegeVideos: Record<string, string> = {
  'UCLA': '/videos/UCLA.mp4',
  'Columbia': '/videos/Columbia.mp4',
  'NYU': '/videos/NYU.mp4' // Updated to match the actual file name
};

// External videos fallback - these will be used if the local videos aren't found
const externalCollegeVideos: Record<string, string> = {
  'UCLA': 'https://drive.google.com/uc?export=download&id=1MUQzDlDhxgqYStKXPcMcCSVVwWd2dGj0',
  'Columbia': 'https://example.com/columbia-video',
  'NYU': 'https://example.com/nyu-video'
};

// Default college and video
const DEFAULT_COLLEGE = 'UCLA';

const Index = () => {
  const { toast } = useToast();
  const [selectedCollege, setSelectedCollege] = useState<string>(DEFAULT_COLLEGE);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>(collegeVideos[DEFAULT_COLLEGE]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [useLocalVideo, setUseLocalVideo] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to handle video errors and switch to external source if needed
  const handleVideoError = () => {
    console.log("Video error occurred, trying external source");
    if (useLocalVideo && selectedCollege) {
      setUseLocalVideo(false);
      setVideoSrc(externalCollegeVideos[selectedCollege]);
      console.log("Switched to external video source:", externalCollegeVideos[selectedCollege]);
    }
  };

  useEffect(() => {
    // Handle video loading
    const handleVideoLoaded = () => {
      console.log("Video loaded successfully");
      setVideoLoaded(true);
      setIsVideoLoading(false);
      setIsTransitioning(false);
    };

    if (videoRef.current) {
      // Add event listener for when video data is loaded
      videoRef.current.addEventListener('loadeddata', handleVideoLoaded);

      // Ensure video plays automatically
      const playVideo = async () => {
        try {
          if (videoRef.current) {
            console.log("Attempting to play video");
            await videoRef.current.play();
            console.log("Video playback started");
          }
        } catch (error) {
          console.error("Video autoplay failed:", error);
          // If autoplay fails, we still want to show the video
          handleVideoLoaded();
        }
      };
      
      playVideo();
    }

    // Cleanup event listener on component unmount
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', handleVideoLoaded);
      }
    };
  }, [videoSrc]);

  // For initial load, automatically select UCLA
  useEffect(() => {
    // Initialize UCLA without notification
  }, []);

  // Handle changing the college selection
  const handleCollegeSelected = (college: string) => {
    if (college === selectedCollege) return; // Skip if same college selected
    
    console.log(`College selected: ${college}`);
    setSelectedCollege(college);
    
    // Reset to try local video first
    setUseLocalVideo(true);
    
    // Change the video source based on the selected college
    if (college && collegeVideos[college]) {
      setIsTransitioning(true);
      setIsVideoLoading(true);
      setVideoLoaded(false);
      
      console.log(`Setting video source to: ${collegeVideos[college]}`);
      
      // Short delay to allow for fade-out transition
      setTimeout(() => {
        setVideoSrc(collegeVideos[college]);
        
        // Force refresh the video element
        if (videoRef.current) {
          videoRef.current.load();
          console.log('Video element reloaded');
          
          // Try to play again after reload
          videoRef.current.play()
            .then(() => {
              console.log('Video playback restarted after selection');
            })
            .catch(err => {
              console.error('Failed to restart video after selection:', err);
              handleVideoError();
            });
        }
      }, 300);
    }
  };

  const handleContinue = () => {
    if (!selectedCollege) {
      toast({
        title: "Select your college",
        description: "Please select your college to continue",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Welcome to Just In",
      description: `You've selected ${selectedCollege}`,
    });
    
    // In a real application, this would navigate to the next page
    // navigation.push('/dashboard');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Header with logo */}
      <Header />
      
      {/* Video Background with fallback to image */}
      <div className="video-background">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className={`video-container ${videoLoaded && !isTransitioning ? 'opacity-100 video-fade-in' : 'opacity-0'}`}
          poster="/placeholder.svg"
          onCanPlay={() => {
            console.log(`Video can play now: ${videoSrc}`);
            setVideoLoaded(true);
            setTimeout(() => {
              setIsTransitioning(false);
              setIsVideoLoading(false);
            }, 200);
          }}
          onError={(e) => {
            console.error("Video error occurred:", e);
            console.error("Video element error code:", videoRef.current?.error?.code);
            console.error("Video element error message:", videoRef.current?.error?.message);
            handleVideoError();
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay" /> {/* Darker overlay for better text contrast */}
        
        {/* Video Loading Indicator (centered on screen) */}
        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="loading-spinner" />
              <p className="text-white/70 mt-4 text-xl">
                {selectedCollege ? `Loading ${selectedCollege} campus footage...` : 'Loading campus footage...'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4 pt-8">
        {/* Logo */}
        <div className="mb-6 md:mb-10 mt-[-30px] md:mt-[-60px]">
          <Logo />
        </div>
        
        {/* College Selection Section */}
        <div className="w-full max-w-md bg-black/40 backdrop-blur-md p-5 sm:p-8 rounded-lg border border-white/10 shadow-xl">
          <h2 className="text-white text-xl sm:text-2xl font-medium mb-4 sm:mb-6 text-center">Find Your Campus</h2>
          
          {/* College Selection */}
          <CollegeSelect onSelected={handleCollegeSelected} initialCollege={DEFAULT_COLLEGE} />
          
          {/* Selected College Display */}
          {selectedCollege && (
            <div className="animate-fade-in text-white text-lg sm:text-xl font-light mt-4 sm:mt-6 text-center">
            </div>
          )}
          
          {/* Continue Button */}
          <Button 
            onClick={handleContinue}
            className="w-full max-w-full mt-6 sm:mt-8 py-4 sm:py-6 bg-gradient-button text-white font-semibold text-lg rounded-md hover:opacity-90 transition-all animate-fade-in"
            style={{ animationDelay: '600ms' }}
            disabled={!selectedCollege || isVideoLoading}
          >
            {isVideoLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </span>
            ) : (
              'CONTINUE'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
