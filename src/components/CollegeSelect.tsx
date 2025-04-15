import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CollegeSelectProps {
  onSelected: (college: string) => void;
  initialCollege?: string;
}

const colleges = [
  'UCLA',
  'Columbia',
  'NYU'
];

const CollegeSelect = ({ onSelected, initialCollege }: CollegeSelectProps) => {
  const [selectedCollege, setSelectedCollege] = useState<string>(initialCollege || '');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectChange = (value: string) => {
    setSelectedCollege(value);
    onSelected(value);
  };

  return (
    <div className="w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2">
        <span className="text-xl font-medium text-white drop-shadow-lg">I go to</span>
        <Select 
          onValueChange={handleSelectChange}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <SelectTrigger 
            className={cn(
              "w-full sm:w-[220px] h-[48px] bg-white/10 backdrop-blur-md border-white/30 text-white",
              "hover:bg-white/20 transition-all duration-300 shadow-lg",
              "focus:ring-2 focus:ring-white/50",
              selectedCollege ? "border-blue-400/70" : ""
            )}
          >
            <SelectValue placeholder="Select College" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white/90 backdrop-blur-md border-white/20 shadow-xl animate-in fade-in-80 zoom-in-95"
            position="popper"
            sideOffset={5}
          >
            <div className="max-h-[300px] overflow-y-auto py-1">
              {colleges.map((college) => (
                <SelectItem 
                  key={college} 
                  value={college}
                  className={cn(
                    "cursor-pointer transition-colors duration-150",
                    "hover:bg-blue-50 focus:bg-blue-50",
                    "data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-800",
                    "py-2 px-3"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{college}</span>
                    {selectedCollege === college && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
      
      {/* Small prompt to encourage selection */}
      {!selectedCollege && (
        <p className="text-white/70 text-sm mt-2 text-center sm:text-left">
          Select your college to see campus drone footage
        </p>
      )}
    </div>
  );
};

export default CollegeSelect;
