
import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationTabProps {
  active: 'compose' | 'apply';
}

const NavigationTabs: React.FC<NavigationTabProps> = ({ active }) => {
  return (
    <div className="flex justify-center w-full border-b border-border">
      <div className="flex space-x-8">
        <div className={cn(
          "py-3 px-6 relative cursor-pointer",
          active === 'compose' && "text-primary"
        )}>
          <span>Compose</span>
          {active === 'compose' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
          )}
        </div>
        <div className={cn(
          "py-3 px-6 relative cursor-pointer",
          active === 'apply' && "text-primary"
        )}>
          <span>Apply</span>
          {active === 'apply' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
