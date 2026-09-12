import React from 'react';
import Link from 'next/link';
import { Sparkles, Brain, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FounderAIToolCardProps {
  placement?: string;
  className?: string;
  variant?: 'slate' | 'indigo' | 'white';
}

export function FounderAIToolCard({
  placement = 'contextual_tech_card',
  className = '',
  variant = 'slate',
}: FounderAIToolCardProps) {
  const playStoreUrl = `https://play.google.com/store/apps/details?id=com.asmind.app&referrer=utm_source%3Dfsidigital%26utm_medium%3Dreferral%26utm_campaign%3Dfounder_ai_twin%26utm_content%3D${encodeURIComponent(placement)}`;

  const containerStyles = {
    slate: 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white border-slate-800 shadow-xl',
    indigo: 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border-indigo-900 shadow-xl',
    white: 'bg-white text-slate-900 border-slate-200 shadow-md',
  }[variant];

  const isLight = variant === 'white';

  return (
    <aside
      aria-label="Founder AI Productivity Spotlight"
      className={`rounded-2xl border p-6 sm:p-8 my-8 relative overflow-hidden ${containerStyles} ${className}`}
    >
      {/* Subtle background glow */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Badge
            className={
              isLight
                ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-800/80'
            }
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-400" />
            Founder Productivity Spotlight
          </Badge>
          <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Personal AI Companion
          </span>
        </div>
        <span
          className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
            isLight
              ? 'bg-slate-100 text-slate-600'
              : 'bg-slate-800/80 text-indigo-300 border border-slate-700'
          }`}
        >
          Free on Google Play
        </span>
      </div>

      <div className="space-y-3">
        <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Scaling a Tech Venture? Combat Founder Decision Fatigue
        </h3>
        <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          Navigating non-dilutive grant applications, product roadmaps, and capital allocation creates heavy cognitive friction. 
          <strong className={isLight ? 'text-slate-900' : 'text-white'}> TwinGenie</strong> acts as your personal AI twin—learning your operational style to help you reflect, prioritize, and make high-clarity decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Learns your voice, habits & priorities</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Confidential strategic sounding board</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Daily executive journaling & synthesis</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Zero-distraction, private reflection</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <Link
            href="/founder-ai"
            className="text-xs font-semibold text-indigo-300 hover:text-white transition-colors underline underline-offset-4"
          >
            Explore Founder AI Hub →
          </Link>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            Android: <code>com.asmind.app</code>
          </span>
        </div>
        <Button
          asChild
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25 px-6 py-2.5 rounded-xl transition-all"
        >
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-outbound-tool="twingenie"
          >
            Get TwinGenie on Google Play
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </a>
        </Button>
      </div>
    </aside>
  );
}
