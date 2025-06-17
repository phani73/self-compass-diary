
import { useState, useEffect } from 'react';

interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:MM format
  message: string;
}

export const useReminders = () => {
  const [settings, setSettings] = useState<ReminderSettings>({
    enabled: false,
    time: '20:00',
    message: "Don't forget to write in your journal today! 📖✨",
  });

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('journal-reminders');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading reminder settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const updateSettings = (newSettings: Partial<ReminderSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('journal-reminders', JSON.stringify(updated));
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  // Show notification
  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    }
  };

  // Check and show daily reminder
  const checkDailyReminder = () => {
    if (!settings.enabled) return;

    const now = new Date();
    const [hours, minutes] = settings.time.split(':').map(Number);
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    // Check if it's time for the reminder (within 1 minute)
    const timeDiff = Math.abs(now.getTime() - reminderTime.getTime());
    if (timeDiff < 60000) { // 1 minute
      const lastShown = localStorage.getItem('last-reminder-shown');
      const today = now.toDateString();
      
      if (lastShown !== today) {
        showNotification('Journal Reminder', settings.message);
        localStorage.setItem('last-reminder-shown', today);
      }
    }
  };

  // Set up periodic check
  useEffect(() => {
    const interval = setInterval(checkDailyReminder, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [settings]);

  return {
    settings,
    updateSettings,
    requestNotificationPermission,
    showNotification,
  };
};
