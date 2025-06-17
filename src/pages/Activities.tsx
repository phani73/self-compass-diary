
import React from 'react';
import { Activity, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useJournal } from '@/hooks/useJournal';

const Activities = () => {
  const { entries } = useJournal();

  const activityStats = entries.reduce((acc, entry) => {
    entry.activities.forEach(activity => {
      acc[activity] = (acc[activity] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const categoryStats = entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Activity Tracker
          </h1>
          <p className="text-gray-600">
            Overview of your daily activities and patterns
          </p>
        </div>

        {/* Category Stats */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(categoryStats).map(([category, count]) => (
                <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-500">{count}</div>
                  <div className="text-sm text-gray-600 capitalize">{category}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Most Common Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(activityStats)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .map(([activity, count]) => (
                <div key={activity} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{activity}</span>
                  <span className="text-orange-500 font-bold">{count}x</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default Activities;
