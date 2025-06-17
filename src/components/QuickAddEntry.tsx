
import React, { useState } from 'react';
import { X, Save, Smile, Meh, Frown, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { JournalEntry } from '@/hooks/useJournal';

interface QuickAddEntryProps {
  onClose: () => void;
  onSave: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<JournalEntry>;
}

const moods = [
  { value: 'happy', label: 'Happy', icon: Smile, color: 'bg-green-100 text-green-800' },
  { value: 'excited', label: 'Excited', icon: Zap, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'bg-gray-100 text-gray-800' },
  { value: 'stressed', label: 'Stressed', icon: Heart, color: 'bg-red-100 text-red-800' },
  { value: 'sad', label: 'Sad', icon: Frown, color: 'bg-blue-100 text-blue-800' },
];

const categories = [
  { value: 'work', label: 'Work', color: 'bg-blue-100 text-blue-800' },
  { value: 'learning', label: 'Learning', color: 'bg-purple-100 text-purple-800' },
  { value: 'personal', label: 'Personal', color: 'bg-green-100 text-green-800' },
  { value: 'random', label: 'Random Thoughts', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'break', label: 'Break', color: 'bg-pink-100 text-pink-800' },
];

const QuickAddEntry: React.FC<QuickAddEntryProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<JournalEntry['category']>('personal');
  const [mood, setMood] = useState<JournalEntry['mood']>('neutral');
  const [activities, setActivities] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        category,
        mood,
        activities: activities.split(',').map(a => a.trim()).filter(Boolean),
        date: new Date(),
      });
      onClose();
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">New Journal Entry</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.value}
                  variant={category === cat.value ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    category === cat.value ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setCategory(cat.value as JournalEntry['category'])}
                >
                  {cat.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How are you feeling?
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((moodOption) => {
                const Icon = moodOption.icon;
                return (
                  <Badge
                    key={moodOption.value}
                    variant={mood === moodOption.value ? "default" : "outline"}
                    className={`cursor-pointer transition-all flex items-center gap-1 ${
                      mood === moodOption.value ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setMood(moodOption.value as JournalEntry['mood'])}
                  >
                    <Icon className="h-3 w-3" />
                    {moodOption.label}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your thoughts
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write about your day, thoughts, or experiences..."
              className="w-full min-h-[120px] resize-none"
            />
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activities (comma-separated)
            </label>
            <Input
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              placeholder="reading, coding, walking, meeting..."
              className="w-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || saving}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Entry'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddEntry;
