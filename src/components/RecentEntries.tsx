
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JournalEntry } from '@/hooks/useJournal';

interface RecentEntriesProps {
  entries: JournalEntry[];
}

const RecentEntries: React.FC<RecentEntriesProps> = ({ entries }) => {
  const categoryColors = {
    work: 'bg-blue-100 text-blue-800',
    learning: 'bg-purple-100 text-purple-800',
    personal: 'bg-green-100 text-green-800',
    random: 'bg-yellow-100 text-yellow-800',
    break: 'bg-pink-100 text-pink-800',
  };

  const moodEmojis = {
    happy: '😊',
    excited: '🤩',
    neutral: '😐',
    stressed: '😰',
    sad: '😢',
  };

  if (entries.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No entries yet. Start your journaling journey!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Recent Entries</h2>
      <div className="space-y-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex-1 mr-2">
                  {entry.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {moodEmojis[entry.mood]}
                  </span>
                  <Badge className={categoryColors[entry.category]}>
                    {entry.category}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {entry.content}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {formatDistanceToNow(new Date(entry.date), { addSuffix: true })}
                </span>
                {entry.activities.length > 0 && (
                  <span>
                    {entry.activities.length} activities
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentEntries;
