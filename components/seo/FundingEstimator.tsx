"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Sparkles, ArrowRight, RefreshCw, CheckCircle, Calculator } from 'lucide-react';

interface FundingEstimatorProps {
  defaultRegion?: string;
  defaultIndustry?: string;
}

export function FundingEstimator({ defaultRegion = 'on', defaultIndustry = 'technology' }: FundingEstimatorProps) {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState<'Canada' | 'USA'>('Canada');
  const [region, setRegion] = useState(defaultRegion);
  const [industry, setIndustry] = useState(defaultIndustry);
  const [employees, setEmployees] = useState('11-50');
  const [revenue, setRevenue] = useState('$500K-$2M');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ min: string; max: string; matches: string[] } | null>(null);
  const [error, setError] = useState('');

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const calculateEstimate = () => {
    let min = 15000;
    let max = 75000;
    const matches: string[] = [];

    // Simple deterministic logic based on profile
    if (industry === 'technology' || industry === 'ai-startups' || industry === 'saas-companies') {
      min = 50000;
      max = 500000;
      matches.push('SR&ED Tax Credit', 'IRAP Innovation Grant', 'Mitacs Research Support');
    } else if (industry === 'manufacturing' || industry === 'manufacturers') {
      min = 30000;
      max = 350000;
      matches.push('Skills Development Fund', 'CME SMART Equipment Grant', 'RDA Funding');
    } else if (industry === 'agriculture') {
      min = 20000;
      max = 250000;
      matches.push('Sustainable CAP Cost-Shared', 'ACT Clean Technology Grant');
    } else {
      matches.push('Canada Job Grant (Wage Subsidy)', 'Digital Adoption Program');
    }

    if (revenue === '$500K-$2M') {
      min = Math.round(min * 1.5);
      max = Math.round(max * 1.5);
    } else if (revenue === '$2M-$10M') {
      min = Math.round(min * 2.5);
      max = Math.round(max * 2.5);
    } else if (revenue === '$10M+') {
      min = Math.round(min * 4.0);
      max = Math.round(max * 5.0);
    }

    return {
      min: `$${(min / 1000).toFixed(0)}K`,
      max: `$${(max / 1000).toFixed(0)}K`,
      matches
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !companyName) {
      setError('Please provide both company name and contact email.');
      return;
    }
    setError('');
    setSubmitting(true);

    const calculated = calculateEstimate();

    try {
      const payload = {
        name: `Founder (${companyName})`,
        email,
        phone: 'N/A',
        category: 'Funding Estimator Tool',
        message: `Estimator Match: ${calculated.min} - ${calculated.max} for ${companyName}. Profile: Size: ${employees}, Revenue: ${revenue}, Industry: ${industry}, Region: ${region}.`,
        companyName,
        country,
        state: region,
        industry,
        businessStage: 'growth',
        fundingAmount: `${calculated.min}-${calculated.max}`,
        fundingPurpose: 'working-capital',
        businessDescription: `Estimated matching programs: ${calculated.matches.join(', ')}`,
        consentToPartnerContact: true,
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '/grants',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to record estimation lead.');
      }

      setResult(calculated);
      setStep(5);
    } catch (err: any) {
      setError('Unable to lock in your eligibility score. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetEstimator = () => {
    setStep(1);
    setCompanyName('');
    setEmail('');
    setResult(null);
  };

  return (
    <Card className="overflow-hidden border border-slate-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 p-6 text-white">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-emerald-300" />
          <Badge className="bg-white/20 text-white border-none">Step {step} of 5</Badge>
        </div>
        <h3 className="mt-2 text-2xl font-bold">Funding Eligibility Estimator</h3>
        <p className="mt-1 text-sm text-emerald-100">Calculate potential matching grants and tax credits for your business profile.</p>
      </div>

      <CardContent className="p-6">
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">1. Select Country</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setCountry('Canada'); setRegion('on'); }}
                  className={`rounded-lg py-3 border text-sm font-bold transition-all ${country === 'Canada' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300' : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900'}`}
                >
                  🇨🇦 Canada
                </button>
                <button
                  type="button"
                  onClick={() => { setCountry('USA'); setRegion('ca'); }}
                  className={`rounded-lg py-3 border text-sm font-bold transition-all ${country === 'USA' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300' : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900'}`}
                >
                  🇺🇸 United States
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">2. State or Province</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                {country === 'Canada' ? (
                  <>
                    <option value="on">Ontario (ON)</option>
                    <option value="bc">British Columbia (BC)</option>
                    <option value="ab">Alberta (AB)</option>
                    <option value="qc">Quebec (QC)</option>
                    <option value="mb">Manitoba (MB)</option>
                    <option value="sk">Saskatchewan (SK)</option>
                    <option value="ns">Nova Scotia (NS)</option>
                  </>
                ) : (
                  <>
                    <option value="ca">California (CA)</option>
                    <option value="tx">Texas (TX)</option>
                    <option value="ny">New York (NY)</option>
                    <option value="fl">Florida (FL)</option>
                    <option value="oh">Ohio (OH)</option>
                    <option value="il">Illinois (IL)</option>
                  </>
                )}
              </select>
            </div>

            <Button onClick={handleNext} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 mt-2">
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Primary Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <option value="technology">Technology Startups & SaaS</option>
                <option value="ai-startups">AI & Machine Learning</option>
                <option value="manufacturing">Advanced Manufacturing</option>
                <option value="agriculture">Agriculture & Agri-Food</option>
                <option value="healthcare">Healthcare & Life Sciences</option>
                <option value="clean-energy">Clean Tech & Energy</option>
                <option value="retail">Retail & Hospitality</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handlePrev} className="w-1/2">Back</Button>
              <Button onClick={handleNext} className="w-1/2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold">Next</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Company Size (Employees)</label>
              <div className="grid grid-cols-2 gap-2">
                {['1-10', '11-50', '51-200', '201+'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setEmployees(val)}
                    className={`rounded-lg py-2 border text-xs font-bold transition-all ${employees === val ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300' : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900'}`}
                  >
                    {val} staff
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Annual Revenue</label>
              <div className="grid grid-cols-2 gap-2">
                {['$100K-$500K', '$500K-$2M', '$2M-$10M', '$10M+'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRevenue(val)}
                    className={`rounded-lg py-2 border text-xs font-bold transition-all ${revenue === val ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300' : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900'}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handlePrev} className="w-1/2">Back</Button>
              <Button onClick={handleNext} className="w-1/2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold">Next</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Industries"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. founder@acme.com"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900"
              />
            </div>

            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={handlePrev} className="w-1/3">Back</Button>
              <Button type="submit" disabled={submitting} className="w-2/3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold">
                {submitting ? 'Calculating...' : 'Unlock Match Score'}
              </Button>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-2">
              <Shield className="h-3.5 w-3.5" />
              <span>We never share details. Privacy-first data handling.</span>
            </div>
          </form>
        )}

        {step === 5 && result && (
          <div className="space-y-5 text-center animate-in zoom-in-95 duration-300">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Personalized Recommendation</p>
              <h4 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                {result.min} – {result.max}
              </h4>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-2">
                Estimated Non-Dilutive Match
              </p>
              <p className="text-xs text-slate-500 mt-2 px-4 leading-relaxed">
                Based on your company profile, you are a strong candidate for government support. Book your audit to lock in these eligible matching programs.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left dark:bg-neutral-900 dark:border-neutral-800">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Primary Program Matches:</span>
              <ul className="space-y-2">
                {result.matches.map((match, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{match}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 shadow-md">
              <a href={`/get-started?service=eligibility-audit&potential=${result.min}-${result.max}&company=${encodeURIComponent(companyName)}`}>
                Book Your Funding Eligibility Audit <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <button type="button" onClick={resetEstimator} className="text-xs text-slate-400 hover:text-slate-600 underline">
              Recalculate Estimate
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
