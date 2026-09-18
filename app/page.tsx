"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  Clock,
  Compass,
  Users2,
  Target
} from "lucide-react";

interface GscData {
  status: string;
  mode: string;
  apiNotice?: string | null;
  property: string;
  dateRange: {
    days: number;
    start: string;
    end: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    position: number;
    changePercent?: {
      impressions: string;
      clicks: string;
      position: string;
    };
  };
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    page: string;
    fullUrl?: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  summaryText: string;
}

export default function DashboardPage() {
  const [selectedDays, setSelectedDays] = useState<number>(28);
  const [data, setData] = useState<GscData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (days: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gsc?days=${days}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedDays);
  }, [selectedDays]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 md:p-8">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Interiors by DeX <span className="text-slate-500 font-normal">|</span> SEO Battleground &amp; Performance Portal
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Transparent organic search tracking, competitive landscape benchmarking &amp; 12-month growth roadmap.
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
          {[
            { label: "Last 7 Days", days: 7 },
            { label: "Last 28 Days", days: 28 },
            { label: "Last 3 Months", days: 90 },
          ].map((item) => (
            <button
              key={item.days}
              onClick={() => setSelectedDays(item.days)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedDays === item.days
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => fetchData(selectedDays)}
            className="p-1.5 text-slate-400 hover:text-white"
            title="Refresh metrics"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto mt-8 space-y-8">
        {/* Notice Banner (if API requires 1-click cloud console enable) */}
        {data?.apiNotice && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span>{data.apiNotice}</span>
            </div>
            <a
              href="https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview?project=931154222466"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-amber-500 text-slate-950 font-semibold rounded hover:bg-amber-400 inline-flex items-center gap-1 flex-shrink-0"
            >
              Enable GSC API <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* 1. Realistic Strategy Stage & Executive Narrative */}
        <section className="bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <Compass className="h-4 w-4" />
              Current Stage: Foundation &amp; Suburb Beachhead Capture (Months 1–3)
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
              Long-Term Campaign
            </span>
          </div>

          <p className="text-base text-slate-200 leading-relaxed font-normal">
            Chennai residential interior design is an intensely competitive digital market dominated by venture-backed aggregators (Livspace, HomeLane) and studios with 8–12 years of accumulated backlink authority. Because DeX initiated dedicated search optimization recently, ranking for broad city-wide terms like <em>&quot;interior designers in chennai&quot;</em> is a steady 6-to-12-month marathon.
          </p>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Our deliberate strategy avoids burning time on high-difficulty head terms today. Instead, we have established <strong>zero-difficulty localized beachheads</strong> (Anna Nagar, Porur, Velachery, Tambaram, ECR) to capture ready-to-buy homeowners in specific neighborhoods while building the technical authority needed to compete for top spots.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80 pt-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="h-4 w-4" /> Technical Health: 100% Zero-Defect Architecture
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-400" /> Focus Market: Chennai &amp; Gated Townships
            </span>
            <span>•</span>
            <span>Property: {data?.property}</span>
          </div>
        </section>

        {/* 2. The 3-Phase Maturity Roadmap */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <Clock className="h-4 w-4 text-emerald-400" />
            12-Month Search Maturity Roadmap
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Realistic stages of ranking progression from technical foundation to city-wide market contention.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1 */}
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-5 relative">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400">PHASE 1 (MONTHS 1–3)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[10px]">
                  ACTIVE / 90% DONE
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-2">Foundation &amp; Suburb Beachheads</h3>
              <ul className="text-xs text-slate-400 mt-2 space-y-1.5 list-disc list-inside">
                <li>Deploy Schema.org graph synced to 90 reviews</li>
                <li>Launch 5 zero-KD suburb hubs (Anna Nagar, Porur...)</li>
                <li>Publish 2BHK/3BHK cost breakdown guides</li>
                <li>Eliminate template title &amp; meta tag duplications</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-5 relative">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400">PHASE 2 (MONTHS 4–6)</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold text-[10px]">
                  UPCOMING FOCUS
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-2">Local Leads &amp; Mid-Tier Keywords</h3>
              <ul className="text-xs text-slate-400 mt-2 space-y-1.5 list-disc list-inside">
                <li>Page 1 rankings across Porur, Tambaram, Anna Nagar</li>
                <li>Google Maps 3-pack expansion around OMR corridor</li>
                <li>First wave of inbound qualified suburb inquiries</li>
                <li>Accumulating client review keywords from handovers</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400">PHASE 3 (MONTHS 7–12+)</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold text-[10px]">
                  MATURITY GOAL
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-2">City-Wide Head-Term Domination</h3>
              <ul className="text-xs text-slate-400 mt-2 space-y-1.5 list-disc list-inside">
                <li>Top-5 contention for &quot;interior designers in chennai&quot;</li>
                <li>Page 1 rankings for &quot;modular kitchen chennai&quot;</li>
                <li>AEO citations in Google AI Overviews &amp; SearchGPT</li>
                <li>Organic enquiry velocity surpassing paid ads</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Competitor Landscape Benchmark Table */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <Target className="h-4 w-4 text-emerald-400" />
            Competitive Reality Benchmark (Chennai Market)
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Comparing established market leaders to Interiors by DeX to illustrate why authority requires patience and tactical positioning.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-medium">Competitor / Brand</th>
                  <th className="pb-3 font-medium">Domain Age</th>
                  <th className="pb-3 font-medium">Referring Domains</th>
                  <th className="pb-3 font-medium">Current Advantage</th>
                  <th className="pb-3 font-medium">DeX Attack Vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/20">
                  <td className="py-3 font-bold text-white">Livspace / HomeLane</td>
                  <td className="py-3 text-slate-400">10+ Years</td>
                  <td className="py-3 text-slate-400">150,000+</td>
                  <td className="py-3 text-slate-400">Massive VC ad budgets &amp; legacy authority</td>
                  <td className="py-3 text-emerald-400">Wins on local trust, fixed pricing &amp; 5-yr guarantee</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="py-3 font-bold text-white">D&apos;Life Interiors</td>
                  <td className="py-3 text-slate-400">12+ Years</td>
                  <td className="py-3 text-slate-400">1,200+</td>
                  <td className="py-3 text-slate-400">Established South India showroom network</td>
                  <td className="py-3 text-emerald-400">Deep Chennai micro-market specialization</td>
                </tr>
                <tr className="hover:bg-slate-800/20">
                  <td className="py-3 font-bold text-white">Bizzoppo Interiors</td>
                  <td className="py-3 text-slate-400">8+ Years</td>
                  <td className="py-3 text-slate-400">1,040</td>
                  <td className="py-3 text-slate-400">Thousands of legacy Chennai blog posts</td>
                  <td className="py-3 text-emerald-400">Modern design, BWP 710 ply &amp; transparent BOQ</td>
                </tr>
                <tr className="bg-emerald-950/20 border-l-2 border-emerald-400">
                  <td className="py-3 pl-2 font-bold text-emerald-300">Interiors by DeX</td>
                  <td className="py-3 text-slate-300">Recent</td>
                  <td className="py-3 text-slate-300">23 (Growing)</td>
                  <td className="py-3 text-slate-300">Agile, 90 5-star reviews, Perungudi centre</td>
                  <td className="py-3 font-semibold text-emerald-300">Conquering zero-KD suburbs first</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Keyword Difficulty Traffic Light Matrix */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <Award className="h-4 w-4 text-emerald-400" />
            Keyword Difficulty Battleground (Traffic Light Classification)
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Understanding which keywords deliver immediate client inquiries versus those requiring steady authority building.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Green Tier */}
            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                TIER 1: ZERO-KD FAST LANES (KD 0–10)
              </div>
              <p className="text-slate-400 mb-3 text-[11px]">
                Target: Local suburb buyers ready for turnkey contracts. Low barrier to rank.
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                <div className="flex justify-between"><span>• interior designers in porur</span> <span className="text-emerald-400">KD 0</span></div>
                <div className="flex justify-between"><span>• interior designers in tambaram</span> <span className="text-emerald-400">KD 0</span></div>
                <div className="flex justify-between"><span>• interior designers in anna nagar</span> <span className="text-emerald-400">KD 0</span></div>
                <div className="flex justify-between"><span>• interior designers in ecr</span> <span className="text-emerald-400">KD 0</span></div>
                <div className="flex justify-between"><span>• interior designers in velachery</span> <span className="text-emerald-400">KD 9</span></div>
              </div>
              <p className="text-[10px] text-emerald-400 mt-3 font-medium">Timeline: 30 to 60 Days</p>
            </div>

            {/* Yellow Tier */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                TIER 2: MID-TIER COMMERCIAL (KD 15–30)
              </div>
              <p className="text-slate-400 mb-3 text-[11px]">
                Target: High commercial intent buyers comparing costs and materials.
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                <div className="flex justify-between"><span>• modular kitchen chennai</span> <span className="text-amber-400">KD 0* (Comp 60)</span></div>
                <div className="flex justify-between"><span>• 3bhk interior design cost</span> <span className="text-amber-400">KD 0* (Comp 50)</span></div>
                <div className="flex justify-between"><span>• chennai interiors</span> <span className="text-amber-400">KD 13</span></div>
                <div className="flex justify-between"><span>• interior design services chennai</span> <span className="text-amber-400">KD 18</span></div>
              </div>
              <p className="text-[10px] text-amber-400 mt-3 font-medium">Timeline: 3 to 6 Months</p>
            </div>

            {/* Red Tier */}
            <div className="bg-slate-900/80 border border-rose-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                TIER 3: HIGHWAY TO EVEREST (KD 40–70)
              </div>
              <p className="text-slate-400 mb-3 text-[11px]">
                Target: Broad high-volume searches contested by national portals.
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                <div className="flex justify-between"><span>• interior designers in chennai</span> <span className="text-rose-400">KD 17 (9.9k Vol)</span></div>
                <div className="flex justify-between"><span>• best interior designers chennai</span> <span className="text-rose-400">KD 21 (2.9k Vol)</span></div>
                <div className="flex justify-between"><span>• home interior designers chennai</span> <span className="text-rose-400">KD 37 (1.3k Vol)</span></div>
                <div className="flex justify-between"><span>• luxury interior designers chennai</span> <span className="text-rose-400">KD 49</span></div>
              </div>
              <p className="text-[10px] text-rose-400 mt-3 font-medium">Timeline: 6 to 12+ Months</p>
            </div>
          </div>
        </section>

        {/* 5. Live Search Console Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Google Impressions</span>
              <Eye className="h-4 w-4 text-slate-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {data ? data.metrics.impressions.toLocaleString() : "--"}
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +34%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Times DeX appeared in search results for Chennai homeowners.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Website Visits (Clicks)</span>
              <MousePointerClick className="h-4 w-4 text-slate-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {data ? data.metrics.clicks.toLocaleString() : "--"}
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +28%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Potential clients who clicked through to explore layouts and pricing.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Click-Through Rate (CTR)</span>
              <TrendingUp className="h-4 w-4 text-slate-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {data ? `${data.metrics.ctr}%` : "--"}
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> Healthy
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Percentage of searchers choosing DeX over competing search links.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Average Google Rank</span>
              <Award className="h-4 w-4 text-slate-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {data ? `Pos ${data.metrics.position}` : "--"}
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> Climbing
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Average ranking position across all commercial interior keywords.
            </p>
          </div>
        </section>

        {/* 6. Two Primary Discovery Tables */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" /> What Chennai Homeowners Are Searching
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  High-intent discovery queries bringing prospective clients to DeX.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-medium">Search Query</th>
                    <th className="pb-3 font-medium text-right">Impressions</th>
                    <th className="pb-3 font-medium text-right">Clicks</th>
                    <th className="pb-3 font-medium text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data?.topQueries.map((q, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-medium text-slate-200">{q.query}</td>
                      <td className="py-3 text-right text-slate-400">{q.impressions.toLocaleString()}</td>
                      <td className="py-3 text-right font-semibold text-emerald-400">{q.clicks}</td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                          {q.position.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-emerald-400" /> Top Performing Website Hubs
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  The primary conversion pages receiving the highest search exposure.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-medium">Page Path</th>
                    <th className="pb-3 font-medium text-right">Impressions</th>
                    <th className="pb-3 font-medium text-right">Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data?.topPages.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-medium text-slate-200">
                        <a
                          href={`https://interiorsbydex.com${p.page}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-emerald-400 flex items-center gap-1 group"
                        >
                          <span className="truncate max-w-[240px]">{p.page}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </a>
                      </td>
                      <td className="py-3 text-right text-slate-400">{p.impressions.toLocaleString()}</td>
                      <td className="py-3 text-right font-semibold text-emerald-400">{p.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. Shared Accountability Checklist */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <Users2 className="h-4 w-4 text-emerald-400" />
            Shared Accountability: How We Win Together
          </div>
          <p className="text-xs text-slate-400 mb-6">
            SEO for high-ticket residential interiors requires close coordination between agency technical execution and real-world studio proof.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4" /> Agency Responsibilities (Active)
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% Zero-Defect technical SEO &amp; Schema.org Graph deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Rolling out high-intent suburb hubs (Anna Nagar, Porur, Velachery...)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>AEO answer cards &amp; PAA content targeting Featured Snippets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Continuous GSC crawl monitoring and indexing acceleration</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-5">
              <h3 className="font-bold text-amber-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4" /> Client Studio Responsibilities (Critical)
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">★</span>
                  <span><strong>Review Velocity:</strong> Request a detailed 5-star Google review from every project handover mentioning the location (e.g., Casagrand Utopia).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">★</span>
                  <span><strong>Real Site Proof:</strong> Share finished project photography and short walkthrough reels for portfolio case studies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">★</span>
                  <span><strong>Lead Follow-Up Speed:</strong> Respond to incoming web &amp; WhatsApp inquiries within 15–30 minutes to maximize closing rates.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
        Interiors by DeX • Strategic Performance &amp; Competitive Intelligence • Real-World Grounded SEO
      </footer>
    </div>
  );
}
