'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  features: string[];
  urgencyText?: string;
  emailCapture?: boolean;
}

export default function CTASection({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  features,
  urgencyText,
  emailCapture = true
}: CTASectionProps) {
  const [email, setEmail] = useState('');
  
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white p-8 rounded-lg text-center mb-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-xl mb-6">{subtitle}</p>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8 text-sm">
        {features.map((feature, index) => (
          <div key={index} className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p>{feature}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <a 
          href={primaryButtonLink} 
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors transform hover:scale-105"
        >
          {primaryButtonText}
        </a>
        {urgencyText && (
          <p className="text-sm opacity-90">{urgencyText}</p>
        )}
        <p className="text-xs opacity-75">No spam, no obligations. Just expert guidance to help you win grants.</p>
      </div>
      
      {emailCapture && (
        <div className="mt-8 bg-white bg-opacity-10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">🔔 Get Instant Grant Alerts</h3>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Alerts
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
