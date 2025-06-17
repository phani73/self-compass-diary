
import React from 'react';
import { Calendar, Activity, Smile, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DailyStats as DailyStatsType } from '@/hooks/useJournal';

interface DailyStatsProps {
  stats: DailyStatsType;
}

const DailyStats: React.FC<DailyStatsProps> = ({ stats }) => {
  const moodEmojis = {
    happy: '😊',
    excited: '🤩',
    neutral: '😐',
    stressed: '😰',
    sad: '😢',
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Entries</p>
              <p className="text-xl font-bold text-gray-900">{stats.totalEntries}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Activities</p>
              <p className="text-xl font-bold text-gray-900">{stats.activities}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Smile className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Mood</p>
              <p className="text-xl font-bold text-gray-900">
                {moodEmojis[stats.mood as keyof typeof moodEmojis] || '😐'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-xl font-bold text-gray-900">
                {Object.keys(stats.categories).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyStats;
