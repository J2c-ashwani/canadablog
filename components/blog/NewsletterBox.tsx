'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Bell, CheckCircle } from 'lucide-react';

export default function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          🎉 Successfully Subscribed!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          You'll receive the latest grant alerts and funding opportunities directly in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full mr-3">
            <Bell className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Never Miss an Opportunity
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Subscribe now for Grant Alerts & get notified of new funding opportunities, deadlines, and expert tips.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:text-white"
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Subscribing...
            </div>
          ) : (
            <>
              <Bell className="w-4 h-4 mr-2" />
              Subscribe for Grant Alerts
            </>
          )}
        </Button>
      </form>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
        🔒 Your email is safe. Unsubscribe anytime. No spam, just valuable grant opportunities.
      </p>
    </div>
  );
}
