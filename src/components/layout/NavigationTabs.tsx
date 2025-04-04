import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationTabProps {
  active: 'compose' | 'apply';
  onTabChange: (tab: 'compose' | 'apply') => void;
}

const NavigationTabs: React.FC<NavigationTabProps> = ({ active, onTabChange }) => {
  return (
    <div className="flex justify-center w-full border-b border-border">
      <div className="flex space-x-8">
        <div
          onClick={() => onTabChange('compose')}
          className={cn(
            "py-3 px-6 relative cursor-pointer",
            active === 'compose' ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span>Compose</span>
          {active === 'compose' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
          )}
        </div>
        <div
          onClick={() => onTabChange('apply')}
          className={cn(
            "py-3 px-6 relative cursor-pointer",
            active === 'apply' ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
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
