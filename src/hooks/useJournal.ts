
import { useState, useEffect } from 'react';
import { openDB } from 'idb';
import { format, startOfDay, endOfDay, isToday } from 'date-fns';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  category: 'work' | 'learning' | 'personal' | 'random' | 'break';
  mood: 'happy' | 'neutral' | 'sad' | 'excited' | 'stressed';
  activities: string[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyStats {
  totalEntries: number;
  categories: Record<string, number>;
  mood: string;
  activities: number;
}

const DB_NAME = 'JournalDB';
const DB_VERSION = 1;
const STORE_NAME = 'entries';

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize IndexedDB
  const initDB = async () => {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
          });
          store.createIndex('date', 'date');
          store.createIndex('category', 'category');
        }
      },
    });
    return db;
  };

  // Load all entries
  const loadEntries = async () => {
    try {
      const db = await initDB();
      const allEntries = await db.getAll(STORE_NAME);
      setEntries(allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new entry
  const addEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const db = await initDB();
      const newEntry: JournalEntry = {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await db.add(STORE_NAME, newEntry);
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (error) {
      console.error('Error adding entry:', error);
      throw error;
    }
  };

  // Update entry
  const updateEntry = async (id: string, updates: Partial<JournalEntry>) => {
    try {
      const db = await initDB();
      const existing = await db.get(STORE_NAME, id);
      if (existing) {
        const updated = { ...existing, ...updates, updatedAt: new Date() };
        await db.put(STORE_NAME, updated);
        setEntries(prev => prev.map(entry => entry.id === id ? updated : entry));
        return updated;
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      throw error;
    }
  };

  // Delete entry
  const deleteEntry = async (id: string) => {
    try {
      const db = await initDB();
      await db.delete(STORE_NAME, id);
      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
      throw error;
    }
  };

  // Get today's stats
  const getTodayStats = (): DailyStats => {
    const todayEntries = entries.filter(entry => isToday(new Date(entry.date)));
    
    const categories = todayEntries.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const moods = todayEntries.map(entry => entry.mood);
    const mostCommonMood = moods.length > 0 ? 
      moods.reduce((a, b, i, arr) => 
        arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
      ) : 'neutral';

    return {
      totalEntries: todayEntries.length,
      categories,
      mood: mostCommonMood,
      activities: todayEntries.reduce((acc, entry) => acc + entry.activities.length, 0),
    };
  };

  // Get entries by date range
  const getEntriesByDateRange = (startDate: Date, endDate: Date) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfDay(startDate) && entryDate <= endOfDay(endDate);
    });
  };

  // Search entries
  const searchEntries = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return entries.filter(entry => 
      entry.title.toLowerCase().includes(lowercaseQuery) ||
      entry.content.toLowerCase().includes(lowercaseQuery) ||
      entry.activities.some(activity => activity.toLowerCase().includes(lowercaseQuery))
    );
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return {
    entries,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    getTodayStats,
    getEntriesByDateRange,
    searchEntries,
  };
};
