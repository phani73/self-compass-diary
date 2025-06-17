
import React from 'react';
import { Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import RecentEntries from '@/components/RecentEntries';
import { useJournal } from '@/hooks/useJournal';

const Journal = () => {
  const { entries } = useJournal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Journal Timeline
          </h1>
          <p className="text-gray-600">
            All your thoughts and activities in chronological order
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search your entries..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* All Entries */}
        <RecentEntries entries={entries} />

        {/* Bottom Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default Journal;
