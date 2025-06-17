
import React from 'react';
import { Home, Calendar, Activity, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Journal', path: '/journal' },
    { icon: Activity, label: 'Activities', path: '/activities' },
    { icon: Bell, label: 'Reminders', path: '/reminders' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 px-4 pb-2 pt-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              asChild
              className={`flex flex-col items-center gap-1 p-2 h-auto ${
                isActive
                  ? 'text-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Link to={item.path}>
                <Icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
