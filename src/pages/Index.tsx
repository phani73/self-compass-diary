
import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Activity, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import QuickAddEntry from '@/components/QuickAddEntry';
import DailyStats from '@/components/DailyStats';
import RecentEntries from '@/components/RecentEntries';
import Navigation from '@/components/Navigation';
import { useJournal } from '@/hooks/useJournal';

const Index = () => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { entries, addEntry, getTodayStats } = useJournal();
  const todayStats = getTodayStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}! 👋
          </h1>
          <p className="text-gray-600">
            {format(new Date(), 'EEEE, MMMM do, yyyy')}
          </p>
        </div>

        {/* Quick Add Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowQuickAdd(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Journal Entry
          </Button>
        </div>

        {/* Daily Stats */}
        <DailyStats stats={todayStats} />

        {/* Recent Entries */}
        <RecentEntries entries={entries.slice(0, 5)} />

        {/* Quick Add Modal */}
        {showQuickAdd && (
          <QuickAddEntry
            onClose={() => setShowQuickAdd(false)}
            onSave={addEntry}
          />
        )}

        {/* Bottom Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default Index;
