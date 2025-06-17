
import React from 'react';
import { User, Calendar, Activity, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useJournal } from '@/hooks/useJournal';
import { format } from 'date-fns';

const Profile = () => {
  const { entries } = useJournal();

  const totalEntries = entries.length;
  const firstEntryDate = entries.length > 0 ? entries[entries.length - 1].date : null;
  const daysActive = firstEntryDate ? Math.ceil((Date.now() - new Date(firstEntryDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl pb-20">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600">
            Track your journaling journey and progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{totalEntries}</div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{daysActive}</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Journey Timeline */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Your Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {firstEntryDate && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">First Entry</span>
                  <span className="text-gray-600">{format(new Date(firstEntryDate), 'MMM dd, yyyy')}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Average Entries per Day</span>
                <span className="text-gray-600">{daysActive > 0 ? (totalEntries / daysActive).toFixed(1) : '0'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <div className={`p-3 rounded-lg ${totalEntries >= 1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${totalEntries >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="font-medium">First Entry</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${totalEntries >= 7 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${totalEntries >= 7 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="font-medium">Week Warrior (7 entries)</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${totalEntries >= 30 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${totalEntries >= 30 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="font-medium">Monthly Master (30 entries)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default Profile;
