
import React from 'react';
import { Bell, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Reminders = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Daily Reminders
          </h1>
          <p className="text-gray-600">
            Set up notifications to maintain your journaling habit
          </p>
        </div>

        {/* Reminder Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Reminder Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="reminder-time" className="block text-sm font-medium text-gray-700 mb-2">
                  Daily reminder time
                </label>
                <input
                  type="time"
                  id="reminder-time"
                  defaultValue="20:00"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Bell className="mr-2 h-4 w-4" />
                Enable Daily Reminders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reminder Status */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle>Reminder Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Daily Journal Reminder</span>
              </div>
              <span className="text-sm text-green-600">Active</span>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default Reminders;
