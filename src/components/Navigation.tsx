
import React from 'react';
import { Home, Calendar, Activity, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Calendar, label: 'Journal' },
    { icon: Activity, label: 'Activities' },
    { icon: Bell, label: 'Reminders' },
    { icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 px-4 pb-2 pt-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 p-2 h-auto ${
                item.active
                  ? 'text-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
