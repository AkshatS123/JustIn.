import React, { useState } from 'react';
import { Check, MapPin, ChevronDown } from 'lucide-react';
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
      <div className="flex flex-col items-center">
        <Select 
          onValueChange={handleSelectChange}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <SelectTrigger 
            className={cn(
              "w-full sm:w-[220px] h-[48px] bg-white backdrop-blur-md border-neutral-200",
              "hover:bg-gray-50 transition-all duration-300 shadow-sm",
              "focus:ring-2 focus:ring-neutral-200",
              "text-gray-900 font-medium",
              selectedCollege ? "border-blue-400" : ""
            )}
          >
            {selectedCollege ? (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-gray-900">{selectedCollege}</span>
              </div>
            ) : (
              <SelectValue placeholder="Select College" />
            )}
          </SelectTrigger>
          <SelectContent 
            className="bg-white border-neutral-200 shadow-lg animate-in fade-in-80 zoom-in-95"
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
                    "hover:bg-neutral-50 focus:bg-neutral-50",
                    "data-[state=checked]:bg-neutral-100 data-[state=checked]:text-gray-900",
                    "py-2 px-3"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{college}</span>
                    {selectedCollege === college && (
                      <Check className="h-4 w-4 text-purple-600" />
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
