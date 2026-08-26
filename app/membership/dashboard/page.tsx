'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AlertCircle, Calendar, Download, ExternalLink, FileText, Loader2, Settings, ShieldCheck } from 'lucide-react';

type Tab = 'matches' | 'briefings' | 'resources' | 'settings';

function parseActivity(value?: string) {
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}

function formatTimestamp(value?: string) {
  if (!value) return 'Not yet recorded';
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleString() : 'Not yet recorded';
}

export default function MemberDashboardPage() {
  const token = useSearchParams().get('token') || '';
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('matches');
  const [reason, setReason] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelStatus, setCancelStatus] = useState('');

  const loadMember = async () => {
    if (!token) { setLoading(false); return; }
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/subscriber?token=${encodeURIComponent(token)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Secure member link could not be verified.');
      setMember(payload.subscriber);
    } catch (loadError: any) {
      setError(loadError.message || 'Secure member link could not be verified.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadMember(); }, [token]);

  const activity = useMemo(() => parseActivity(member?.leadActivity), [member?.leadActivity]);
  const active = String(member?.subscriptionStatus || '').toUpperCase() === 'ACTIVE';
  const matches = Array.isArray(member?.memberMatches) ? member.memberMatches : [];
  const profileFields = [member?.region, member?.industry, member?.companySize, activity?.revenueBand, activity?.growthObjective];
  const completedFields = profileFields.filter(Boolean).length;

  const cancel = async () => {
    setCancelling(true);
    setCancelStatus('');
    try {
      const response = await fetch('/api/membership/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, reason }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Subscription could not be cancelled.');
      setCancelStatus('PayPal confirmed the cancellation. Your account status has been updated.');
      await loadMember();
    } catch (cancelError: any) {
      setCancelStatus(cancelError.message || 'Subscription could not be cancelled.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-slate-100"><Header /><main className="max-w-xl mx-auto px-4 py-24 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-400" /><p className="text-sm text-slate-400 mt-4">Verifying membership…</p></main><Footer /></div>;
  }

  if (!member || !token || error) {
    return <div className="min-h-screen bg-slate-950 text-slate-100"><Header /><main className="max-w-xl mx-auto px-4 py-24 text-center"><AlertCircle className="w-10 h-10 mx-auto text-amber-400" /><h1 className="text-2xl font-black mt-4">Secure member link required</h1><p className="text-sm text-slate-400 mt-2">{error || 'Open the dashboard from your Funding Watch email.'}</p><a href="/membership" className="inline-block mt-6 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-xl">Go to Funding Watch</a></main><Footer /></div>;
  }

  if (!active) {
    return <div className="min-h-screen bg-slate-950 text-slate-100"><Header /><main className="max-w-xl mx-auto px-4 py-24 text-center"><AlertCircle className="w-10 h-10 mx-auto text-amber-400" /><h1 className="text-2xl font-black mt-4">Membership inactive</h1><p className="text-sm text-slate-400 mt-2">The verified provider status is {String(member.subscriptionStatus || 'inactive')}. Dashboard content is available only while the PayPal subscription is active.</p><a href="/membership" className="inline-block mt-6 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-xl">Restart membership</a></main><Footer /></div>;
  }

  const tabs: Array<{ id: Tab; label: string; icon: typeof Calendar }> = [
    { id: 'matches', label: 'Current matches', icon: Calendar },
    { id: 'briefings', label: 'Radar receipts', icon: FileText },
    { id: 'resources', label: 'Resources', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-800 pb-6 mb-7">
          <div><h1 className="text-3xl font-black">Funding Watch dashboard</h1><p className="text-sm text-slate-400 mt-1">{member.email}</p></div>
          <div className="inline-flex h-fit items-center gap-2 rounded-lg border border-emerald-800 bg-emerald-950 px-3 py-2 text-xs font-bold text-emerald-300"><ShieldCheck className="w-4 h-4" /> Provider-verified active membership</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setTab(id)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border ${tab === id ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-300 border-slate-800'}`}><Icon className="w-4 h-4" />{label}</button>)}
        </div>

        {tab === 'matches' && <section className="space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-bold">Saved profile</h2>
            <p className="text-xs text-slate-400 mt-1">{completedFields}/5 matching fields recorded. Matches are profile-level screening, not approval decisions.</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-4 text-xs"><div className="rounded-lg bg-slate-950 p-3"><span className="text-slate-500">Region</span><div className="font-bold mt-1">{member.region || 'Not recorded'}</div></div><div className="rounded-lg bg-slate-950 p-3"><span className="text-slate-500">Industry</span><div className="font-bold mt-1">{member.industry || 'Not recorded'}</div></div><div className="rounded-lg bg-slate-950 p-3"><span className="text-slate-500">Growth objective</span><div className="font-bold mt-1">{activity.growthObjective || 'Not recorded'}</div></div></div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-bold">Programs marked open and matched to this profile</h2>
            <p className="text-xs text-slate-400 mt-1 mb-5">Status comes from the FSI database. Confirm current intake, deadlines, and full eligibility on the official source before spending or applying.</p>
            {matches.length === 0 ? <p className="rounded-xl bg-slate-950 p-4 text-sm text-slate-400">No open profile-level matches are currently recorded. Your next weekly radar will rerun the database.</p> : <div className="space-y-3">{matches.map((match: any) => <article key={match.slug} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3"><div><div className="flex gap-2 mb-2"><span className="rounded bg-emerald-950 px-2 py-1 text-[10px] font-bold text-emerald-300">{match.fitBand} profile match</span><span className="rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-300">Database: {match.status}</span></div><h3 className="font-bold">{match.name}</h3><p className="text-xs text-slate-400 mt-1">{match.fundingType} · {match.fundingAmount} · {match.deadlineType}</p><p className="text-xs text-slate-500 mt-2">{match.explanation}</p></div><a href={match.officialWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-sky-400">Official source <ExternalLink className="w-3 h-3" /></a></div>
            </article>)}</div>}
          </div>
        </section>}

        {tab === 'briefings' && <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-lg font-bold">Email-provider receipts</h2><p className="text-xs text-slate-400 mt-1">This separates provider acceptance from verified delivery. Delivery is counted only when a signed webhook event is received.</p><div className="grid sm:grid-cols-2 gap-4 mt-5 text-sm"><div className="rounded-xl bg-slate-950 p-4"><div className="font-bold text-emerald-300">Welcome radar</div><div className="text-xs text-slate-400 mt-2">Provider accepted: {formatTimestamp(activity.membershipBriefing1AcceptedAt)}</div><div className="text-xs text-slate-500 mt-1">Receipt: {activity.membershipBriefing1ProviderMessageId ? 'recorded' : 'not recorded'}</div></div><div className="rounded-xl bg-slate-950 p-4"><div className="font-bold text-sky-300">Latest weekly radar</div><div className="text-xs text-slate-400 mt-2">Provider accepted: {formatTimestamp(activity.membershipRadarAcceptedAt)}</div><div className="text-xs text-slate-500 mt-1">Week: {activity.membershipRadarWeek || 'not yet sent'}</div></div></div></section>}

        {tab === 'resources' && <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-lg font-bold">Self-serve resource library</h2><p className="text-sm text-slate-400 mt-2">Browse the current downloadable funding guides and preparation resources. No live session is included.</p><a href="/download" className="inline-flex items-center gap-2 mt-5 rounded-lg bg-emerald-500 px-4 py-3 text-xs font-black text-slate-950"><Download className="w-4 h-4" />Open resource library</a></section>}

        {tab === 'settings' && <section className="max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-lg font-bold">Subscription settings</h2><div className="mt-4 space-y-2 text-sm text-slate-300"><p><span className="text-slate-500">Plan:</span> Funding Watch — $29 USD/month</p><p><span className="text-slate-500">Provider status:</span> ACTIVE</p><p><span className="text-slate-500">PayPal subscription:</span> {member.subscriptionId}</p></div>{cancelStatus && <div className="mt-5 rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs">{cancelStatus}</div>}<label className="block text-xs font-bold text-slate-400 mt-6 mb-2">Cancellation reason (optional)</label><input value={reason} onChange={(event) => setReason(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm" /><button onClick={cancel} disabled={cancelling} className="mt-3 w-full rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-xs font-bold text-red-200 disabled:opacity-50">{cancelling ? 'Confirming with PayPal…' : 'Cancel membership with PayPal'}</button></section>}
      </main>
      <Footer />
    </div>
  );
}
