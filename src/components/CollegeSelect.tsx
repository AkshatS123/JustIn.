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
    <div className="w-full animate-fade-in">
      <Select 
        onValueChange={handleSelectChange}
        onOpenChange={(open) => setIsOpen(open)}
        defaultValue={initialCollege}
      >
        <SelectTrigger 
          className={cn(
            "w-full h-12 bg-white/20 backdrop-blur-md border-white/30",
            "hover:bg-white/25 transition-all duration-200",
            "focus:ring-2 focus:ring-white/30 focus-visible:ring-offset-0",
            "text-white font-medium shadow-md",
            "rounded-xl",
            selectedCollege ? "border-justin-teal/70" : ""
          )}
        >
          {selectedCollege ? (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-justin-teal mr-2" />
              <span className="text-white">{selectedCollege}</span>
            </div>
          ) : (
            <SelectValue placeholder="Select your campus" className="text-white/80" />
          )}
        </SelectTrigger>
        <SelectContent 
          className="bg-white/90 backdrop-blur-md border-white/30 shadow-lg rounded-xl animate-in fade-in-80 zoom-in-95"
          position="popper"
          sideOffset={5}
        >
          <div className="max-h-[300px] overflow-y-auto py-1">
            {colleges.map((college) => (
              <SelectItem 
                key={college} 
                value={college}
                className={cn(
                  "cursor-pointer transition-colors duration-150 rounded-lg my-1 mx-1",
                  "hover:bg-justin-teal/10 focus:bg-justin-teal/10",
                  "data-[state=checked]:bg-justin-teal/20 data-[state=checked]:text-gray-900",
                  "py-2 px-3"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{college}</span>
                  {selectedCollege === college && (
                    <Check className="h-4 w-4 text-justin-teal" />
                  )}
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      
      {/* Small prompt to encourage selection */}
      {!selectedCollege && (
        <p className="text-white/70 text-sm mt-2 text-center">
          Select your campus to view drone footage
        </p>
      )}
    </div>
  );
};

export default CollegeSelect;
