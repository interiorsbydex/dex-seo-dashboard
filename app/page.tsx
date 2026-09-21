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
  Target,
  BarChart3,
  Camera,
  Video,
  FileText,
  HelpCircle,
  Building2,
  Globe2
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

  // Verified 6-Month GSC Historical Data from March 2026 to September 2026
  const historicalGscMonths = [
    { month: "March 2026", impressions: 484, clicks: 31, stage: "Initial Setup & Indexing" },
    { month: "April 2026", impressions: 1847, clicks: 105, stage: "Early Traction (+280%)" },
    { month: "May 2026", impressions: 2498, clicks: 124, stage: "Steady Growth" },
    { month: "June 2026", impressions: 4006, clicks: 201, stage: "Rapid Scaling" },
    { month: "July 2026", impressions: 4957, clicks: 195, stage: "Approaching Plateau" },
    { month: "August 2026", impressions: 5257, clicks: 189, stage: "Peak (Google Core Update)" },
    { month: "September 2026", impressions: 4118, clicks: 92, stage: "Plateau & Diagnostic Overhaul" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#111111] p-4 md:p-8 font-sans">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-[#E2DBD2] gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-3.5 w-3.5 rounded-full bg-[#D96032] shadow-sm animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] flex items-center gap-2">
              Interiors by DeX <span className="text-[#A0988E] font-normal">|</span> SEO Battleground &amp; Performance Portal
            </h1>
          </div>
          <p className="text-sm text-[#555555] mt-1.5 font-medium">
            Strategic campaign reality: 6-month historical trajectory, Google algorithm diagnostics, and E-E-A-T proof roadmap.
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E2DBD2] rounded-xl p-1.5 shadow-sm">
          {[
            { label: "Last 7 Days", days: 7 },
            { label: "Last 28 Days", days: 28 },
            { label: "Last 3 Months", days: 90 },
          ].map((item) => (
            <button
              key={item.days}
              onClick={() => setSelectedDays(item.days)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDays === item.days
                  ? "bg-[#D96032] text-white shadow-sm"
                  : "text-[#555555] hover:text-[#111111] hover:bg-[#F5F0EB]"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => fetchData(selectedDays)}
            className="p-1.5 text-[#555555] hover:text-[#111111]"
            title="Refresh metrics"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto mt-8 space-y-8">
        {/* Notice Banner */}
        {data?.apiNotice && (
          <div className="bg-[#FFFFFF] border border-[#D96032]/40 rounded-2xl p-4 text-xs text-[#111111] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-[#D96032] flex-shrink-0" />
              <span className="font-medium">{data.apiNotice}</span>
            </div>
            <a
              href="https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview?project=931154222466"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-[#D96032] text-white font-semibold rounded-lg hover:bg-[#bf4f24] inline-flex items-center gap-1 flex-shrink-0 shadow-sm"
            >
              Enable GSC API <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {/* 1. Executive Campaign Narrative: The 6-Month Journey */}
        <section className="bg-[#FFFFFF] border border-[#E2DBD2] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#D96032] text-xs font-bold tracking-wider uppercase">
              <Compass className="h-4 w-4" />
              Strategic Reality: Breaking the 6-Month Traffic Plateau
            </div>
            <span className="px-3 py-1 rounded-full bg-[#faece6] text-[#D96032] border border-[#D96032]/30 text-xs font-bold">
              Month 6+ Evolution
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-[#111111] mb-3">
            From 484 to 5,257 Monthly Impressions: Where We Succeeded &amp; Why We Plateaued
          </h2>

          <p className="text-sm md:text-base text-[#333333] leading-relaxed">
            Interiors by DeX did not start SEO yesterday. Over the past 6 months (March to August 2026), dedicated optimization expanded Google search visibility from <strong>484 to 5,257 monthly impressions</strong> (a 10x expansion) and generated <strong>937 verified website clicks</strong>.
          </p>

          <p className="text-sm text-[#555555] mt-3 leading-relaxed">
            However, in August, organic growth hit a ceiling. A forensic diagnostic uncovered the exact root causes: <strong>an over-reliance on branded search</strong> (60%+ of clicks were searchers already typing &apos;DeX&apos;), <strong>an invisible HTTP protocol split</strong> dividing 16,000+ impressions, and <strong>Google&apos;s August Core Algorithm Update</strong> penalizing repetitive page templates.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#E2DBD2] pt-6 text-xs text-[#444444]">
            <div className="bg-[#F5F0EB] p-3.5 rounded-xl border border-[#E2DBD2]">
              <span className="font-bold text-[#111111] block mb-1">Total Verified Impressions</span>
              <span className="text-xl font-extrabold text-[#D96032]">23,167</span>
              <p className="text-[11px] text-[#666666] mt-0.5">Across past 180 days in GSC</p>
            </div>
            <div className="bg-[#F5F0EB] p-3.5 rounded-xl border border-[#E2DBD2]">
              <span className="font-bold text-[#111111] block mb-1">Total Verified Clicks</span>
              <span className="text-xl font-extrabold text-[#D96032]">937</span>
              <p className="text-[11px] text-[#666666] mt-0.5">Inbound visitors from Google search</p>
            </div>
            <div className="bg-[#F5F0EB] p-3.5 rounded-xl border border-[#E2DBD2]">
              <span className="font-bold text-[#111111] block mb-1">Peak Monthly Volume</span>
              <span className="text-xl font-extrabold text-[#D96032]">5,257</span>
              <p className="text-[11px] text-[#666666] mt-0.5">Reached August 2026 before plateau</p>
            </div>
          </div>
        </section>

        {/* 2. Real 6-Month GSC Historical Breakdown */}
        <section className="bg-[#FFFFFF] border border-[#E2DBD2] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777777] mb-1">
            <BarChart3 className="h-4 w-4 text-[#D96032]" />
            Real 6-Month Google Search Console Historical Breakdown
          </div>
          <p className="text-xs text-[#555555] mb-6">
            Month-by-month trajectory illustrating early growth, the August peak, and the subsequent plateau.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2DBD2] text-[#666666]">
                  <th className="pb-3 font-semibold">Month</th>
                  <th className="pb-3 font-semibold text-right">Google Impressions</th>
                  <th className="pb-3 font-semibold text-right">Website Clicks</th>
                  <th className="pb-3 font-semibold">Campaign Phase &amp; Observation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DBD2]/70">
                {historicalGscMonths.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[#F5F0EB]/60 transition-colors">
                    <td className="py-3.5 font-bold text-[#111111]">{m.month}</td>
                    <td className="py-3.5 text-right font-mono font-semibold text-[#111111]">{m.impressions.toLocaleString()}</td>
                    <td className="py-3.5 text-right font-mono font-bold text-[#D96032]">{m.clicks}</td>
                    <td className="py-3.5 pl-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                        idx === 5
                          ? "bg-[#faece6] text-[#D96032] font-bold border border-[#D96032]/30"
                          : "bg-[#F5F0EB] text-[#444444]"
                      }`}>
                        {m.stage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. The Algorithm Update Impact: Google August 2026 Core Update */}
        <section className="bg-[#FFFFFF] border border-[#E2DBD2] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D96032] mb-1">
            <AlertTriangle className="h-4 w-4 text-[#D96032]" />
            Algorithm Analysis: Google August 2026 Core Update Impact
          </div>
          <h3 className="text-lg font-bold text-[#111111] mb-2">
            Why Traffic Stalled in Late August: The Factual Algorithm Root Cause
          </h3>
          <p className="text-xs text-[#555555] mb-6 leading-relaxed">
            Between August 15 and September 3, 2026, Google rolled out its official <strong>August 2026 Core Algorithm Update</strong>. Google announced this update was specifically designed to reward sites with genuine firsthand execution proof, while heavily deprioritizing sites that rely on repetitive page templates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="font-bold text-[#111111] block text-sm mb-1">1. The Template Repetition Filter</span>
              <p className="text-[#555555] leading-relaxed">
                Google&apos;s updated Helpful Content classifier detected that Framer had duplicated the exact same title tag and meta description across all commercial landing pages. Google treated these as low-effort doorway templates.
              </p>
              <div className="mt-3 text-[11px] text-[#D96032] font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Overhauled &amp; Resolved by Agency
              </div>
            </div>

            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="font-bold text-[#111111] block text-sm mb-1">2. The Protocol Cannibalization Split</span>
              <p className="text-[#555555] leading-relaxed">
                Google was splitting your domain equity between insecure HTTP (16,047 impressions) and HTTPS (7,474 impressions). The site was competing against itself, capping keyword progression.
              </p>
              <div className="mt-3 text-[11px] text-[#D96032] font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Canonical &amp; GBP Protocol Fixed
              </div>
            </div>

            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="font-bold text-[#111111] block text-sm mb-1">3. The Branded Keyword Ceiling</span>
              <p className="text-[#555555] leading-relaxed">
                Over 60% of clicks were searchers already typing &apos;DeX&apos;. Because the site had zero suburb pages (Anna Nagar, Porur...) and no 2BHK/3BHK cost breakdown guides, non-branded customer acquisition stalled.
              </p>
              <div className="mt-3 text-[11px] text-[#D96032] font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> 14 Non-Brand Money Hubs Deployed
              </div>
            </div>
          </div>
        </section>

        {/* 4. The E-E-A-T Chasm: Real Client Work vs. 3D Renders */}
        <section className="bg-[#FFFFFF] border-2 border-[#D96032]/30 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D96032] mb-1">
            <Camera className="h-4 w-4 text-[#D96032]" />
            The E-E-A-T Reality Check: Real Client Work vs. 3D Renders
          </div>
          <h3 className="text-lg font-bold text-[#111111] mb-2">
            Why Competitors Rank Ahead Today: The Proof &amp; Handover Bottleneck
          </h3>
          <p className="text-xs text-[#555555] mb-6 leading-relaxed">
            In Google&apos;s Search Quality Rater Guidelines, <strong>E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)</strong> is the ultimate filter. Google&apos;s computer vision algorithms analyze images to distinguish between computer-generated 3D renders and actual physical handovers in Chennai homes.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2DBD2] text-[#666666]">
                  <th className="pb-3 font-semibold">Interior Studio</th>
                  <th className="pb-3 font-semibold">Documented Client Proof</th>
                  <th className="pb-3 font-semibold">Visual Evidence on Website</th>
                  <th className="pb-3 font-semibold">Google Algorithm Trust Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DBD2]/70">
                <tr className="hover:bg-[#F5F0EB]/60">
                  <td className="py-3 font-bold text-[#111111]">D&apos;Life Interiors</td>
                  <td className="py-3 text-[#444444]">100+ Video Case Studies</td>
                  <td className="py-3 text-[#444444]">Real clients standing in completed kitchens with flat numbers</td>
                  <td className="py-3 font-semibold text-emerald-600">Very High (Page 1 Rank 1)</td>
                </tr>
                <tr className="hover:bg-[#F5F0EB]/60">
                  <td className="py-3 font-bold text-[#111111]">Bizzoppo Interiors</td>
                  <td className="py-3 text-[#444444]">80+ Real Handover Galleries</td>
                  <td className="py-3 text-[#444444]">Site photos of completed flats across Casagrand, Prestige</td>
                  <td className="py-3 font-semibold text-emerald-600">High (Page 1 Rank 3)</td>
                </tr>
                <tr className="hover:bg-[#F5F0EB]/60">
                  <td className="py-3 font-bold text-[#111111]">The Plank Interiors</td>
                  <td className="py-3 text-[#444444]">40+ Project Walkthroughs</td>
                  <td className="py-3 text-[#444444]">Before-and-after renovation photos with client quotes</td>
                  <td className="py-3 font-semibold text-emerald-600">High (Page 1 Rank 5)</td>
                </tr>
                <tr className="bg-[#faece6] border-l-4 border-[#D96032]">
                  <td className="py-3 pl-3 font-bold text-[#D96032]">Interiors by DeX</td>
                  <td className="py-3 text-[#111111] font-semibold">4 Projects (1 was blank until today)</td>
                  <td className="py-3 text-[#111111]">Heavy reliance on 3D renders; 0 video walkthroughs</td>
                  <td className="py-3 font-bold text-[#D96032]">Early-Stage Challenger (The Real Bottleneck)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 p-4 bg-[#F5F0EB] rounded-xl border border-[#E2DBD2] text-xs text-[#333333] leading-relaxed">
            <strong className="text-[#111111] block mb-1">The Critical Takeaway for the Client:</strong>
            An agency can engineer perfect technical code, Schema, and keyword architecture (which is now 100% complete). However, <strong>Google will not grant Page 1 rankings for competitive head terms until DeX provides verifiable photos and videos of real completed Chennai flats</strong>. Every completed project must become a documented digital asset.
          </div>
        </section>

        {/* 5. Complete Multi-Tier Keyword Strategy Matrix */}
        <section className="bg-[#FFFFFF] border border-[#E2DBD2] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777777] mb-1">
            <Target className="h-4 w-4 text-[#D96032]" />
            Complete Multi-Tier Keyword Strategy Matrix
          </div>
          <p className="text-xs text-[#555555] mb-6">
            DataForSEO intelligence breaking down our target keywords by funnel intent, search volume, and difficulty.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Tier 1 */}
            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                Tier 1: Zero-KD Suburb Beachheads
              </span>
              <p className="text-[#555555] mt-2 mb-3 text-[11px]">
                Immediate lead engines capturing ready-to-buy homeowners in specific neighborhoods.
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-[#222222]">
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>interior designers anna nagar</span> <span className="font-bold text-[#D96032]">210 SV | KD 0</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>interior designers tambaram</span> <span className="font-bold text-[#D96032]">210 SV | KD 0</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>interior designers velachery</span> <span className="font-bold text-[#D96032]">140 SV | KD 9</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>interior designers porur</span> <span className="font-bold text-[#D96032]">110 SV | KD 0</span></div>
                <div className="flex justify-between"><span>interior designers ecr (villas)</span> <span className="font-bold text-[#D96032]">10-30 SV | KD 0</span></div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] uppercase">
                Tier 2: Cost &amp; Flat Guides (BOFU)
              </span>
              <p className="text-[#555555] mt-2 mb-3 text-[11px]">
                High commercial intent searches from buyers comparing quotes and unit packages.
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-[#222222]">
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>3bhk interior design cost chennai</span> <span className="font-bold text-[#D96032]">40 SV | KD 0</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>2bhk interior design cost chennai</span> <span className="font-bold text-[#D96032]">40 SV | KD 44</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>modular kitchen chennai</span> <span className="font-bold text-[#D96032]">880 SV | KD 0</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>apartment interior designers</span> <span className="font-bold text-[#D96032]">90 SV | KD 0</span></div>
                <div className="flex justify-between"><span>nri interior design chennai</span> <span className="font-bold text-[#D96032]">High CPC ($4.50)</span></div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] uppercase">
                Tier 3: Design Awareness (TOFU)
              </span>
              <p className="text-[#555555] mt-2 mb-3 text-[11px]">
                Massive search volume editorial pillars building city-wide brand awareness.
              </p>
              <div className="space-y-1.5 font-mono text-[11px] text-[#222222]">
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>tv unit design</span> <span className="font-bold text-[#D96032]">246,000 SV | KD 0</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>main hall tv unit design</span> <span className="font-bold text-[#D96032]">49,500 SV | KD 9</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>false ceiling design for hall</span> <span className="font-bold text-[#D96032]">33,100 SV | KD 0</span></div>
                <div className="flex justify-between border-b border-[#E2DBD2] pb-1"><span>wardrobe design sliding</span> <span className="font-bold text-[#D96032]">14,800 SV | KD 0</span></div>
                <div className="flex justify-between"><span>living room partition design</span> <span className="font-bold text-[#D96032]">14,800 SV | KD 0</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Local SEO & Google Maps Entity Proof */}
        <section className="bg-[#FFFFFF] border border-[#E2DBD2] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777777] mb-1">
            <ShieldCheck className="h-4 w-4 text-[#D96032]" />
            Local SEO &amp; Google Maps Entity Proof
          </div>
          <p className="text-xs text-[#555555] mb-6">
            Verified signals anchoring Interiors by DeX to Google Maps Local 3-Pack algorithms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="text-xs text-[#666666]">Google Maps Reputation</span>
              <p className="text-2xl font-extrabold text-[#D96032] mt-1">5.0 ★★★★★</p>
              <p className="text-[11px] text-[#555555] mt-1">90 Verified 5-star customer reviews.</p>
            </div>

            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="text-xs text-[#666666]">Google Place CID</span>
              <p className="text-sm font-mono font-bold text-[#111111] mt-1">4008102395282919864</p>
              <p className="text-[11px] text-[#555555] mt-1">Directly connected to website Schema graph.</p>
            </div>

            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="text-xs text-[#666666]">Physical Experience Centre</span>
              <p className="text-sm font-bold text-[#111111] mt-1">MOTI Towers, Perungudi</p>
              <p className="text-[11px] text-[#555555] mt-1">1st Floor, Rajiv Gandhi Salai (OMR), Chennai.</p>
            </div>

            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-4">
              <span className="text-xs text-[#666666]">Sitemap Coverage</span>
              <p className="text-2xl font-extrabold text-[#D96032] mt-1">121 URLs</p>
              <p className="text-[11px] text-[#555555] mt-1">100% indexed in sitemap.xml for Googlebot.</p>
            </div>
          </div>
        </section>

        {/* 7. Shared Accountability: Action Plan to Unlock Page 1 */}
        <section className="bg-[#FFFFFF] border-2 border-[#D96032]/40 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D96032] mb-1">
            <Users2 className="h-4 w-4 text-[#D96032]" />
            Shared Accountability: How We Unlock Page 1 Together
          </div>
          <h3 className="text-lg font-bold text-[#111111] mb-2">
            The Exact Protocol to Out-Rank D&apos;Life and Bizzoppo
          </h3>
          <p className="text-xs text-[#555555] mb-6 leading-relaxed">
            Technical optimization creates the foundation; real-world proof wins the customer. Here is the split of responsibilities required to turn traffic into signed ₹9L–₹25L contracts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-[#F5F0EB] border border-[#E2DBD2] rounded-xl p-5">
              <h4 className="font-bold text-[#D96032] flex items-center gap-2 mb-3 text-sm">
                <CheckCircle2 className="h-4 w-4" /> Agency Deliverables (Completed &amp; Active)
              </h4>
              <ul className="space-y-2.5 text-[#333333]">
                <li className="flex items-start gap-2">
                  <span className="text-[#D96032] font-bold">✓</span>
                  <span><strong>14 Commercial Money Hubs Live:</strong> City hubs, 5 zero-KD suburbs, 2BHK/3BHK cost breakdown pages, and dedicated NRI remote hub.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D96032] font-bold">✓</span>
                  <span><strong>8 Master Editorial Pillars Published:</strong> TV units (246k SV), ceilings (33k SV), acrylic vs laminate, quartz vs granite, wardrobes with lofts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D96032] font-bold">✓</span>
                  <span><strong>Site-Wide Technical &amp; Schema Engine:</strong> Full Schema.org graph, dynamic Breadcrumbs, FAQPage schema, and contextual Image Alt Tag engine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D96032] font-bold">✓</span>
                  <span><strong>Live GSC API Monitoring:</strong> Continuous crawl inspection, tracking search impressions and ranking progression.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#faece6] border border-[#D96032]/40 rounded-xl p-5">
              <h4 className="font-bold text-[#D96032] flex items-center gap-2 mb-3 text-sm">
                <AlertTriangle className="h-4 w-4" /> Client Studio Actions (Mandatory for Growth)
              </h4>
              <ul className="space-y-2.5 text-[#111111]">
                <li className="flex items-start gap-2">
                  <span className="text-[#D96032] font-bold">★</span>
                  <span><strong>Shoot Handover Walkthroughs:</strong> For every completed flat (Casagrand, Prestige), record a 60-second video walkthrough + 8-10 real photos to publish as case studies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D96032] font-bold">★</span>
                  <span><strong>Google Review Location Anchoring:</strong> Ask clients to explicitly mention their locality in 5-star reviews (e.g., &quot;Interiors by DeX did our 3BHK in Casagrand Utopia, Porur&quot;).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D96032] font-bold">★</span>
                  <span><strong>Rapid Lead Response:</strong> Respond to incoming WhatsApp inquiries and consultation forms within 15 to 30 minutes to maximize conversion.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Live GSC Search Queries & Landing Pages */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#FFFFFF] border border-[#E2DBD2] rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#111111] flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-[#D96032]" /> What Chennai Homeowners Search When Discovering DeX
            </h3>
            <p className="text-xs text-[#555555] mb-4">
              Real-time search queries from Google Search Console driving brand exposure.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2DBD2] text-[#666666]">
                    <th className="pb-3 font-semibold">Search Query</th>
                    <th className="pb-3 font-semibold text-right">Impressions</th>
                    <th className="pb-3 font-semibold text-right">Clicks</th>
                    <th className="pb-3 font-semibold text-right">Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DBD2]/60">
                  {data?.topQueries.map((q, idx) => (
                    <tr key={idx} className="hover:bg-[#F5F0EB]/60 transition-colors">
                      <td className="py-2.5 font-medium text-[#111111]">{q.query}</td>
                      <td className="py-2.5 text-right font-mono text-[#555555]">{q.impressions.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-mono font-bold text-[#D96032]">{q.clicks}</td>
                      <td className="py-2.5 text-right font-mono text-[#555555]">{q.position.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2DBD2] rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#111111] flex items-center gap-2 mb-1">
              <Layers className="h-4 w-4 text-[#D96032]" /> Top Performing Website Hubs
            </h3>
            <p className="text-xs text-[#555555] mb-4">
              The primary landing pages capturing organic impressions and visits.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2DBD2] text-[#666666]">
                    <th className="pb-3 font-semibold">Page Path</th>
                    <th className="pb-3 font-semibold text-right">Impressions</th>
                    <th className="pb-3 font-semibold text-right">Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DBD2]/60">
                  {data?.topPages.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#F5F0EB]/60 transition-colors">
                      <td className="py-2.5 font-medium text-[#111111]">
                        <a
                          href={`https://interiorsbydex.com${p.page}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#D96032] flex items-center gap-1 group"
                        >
                          <span className="truncate max-w-[240px]">{p.page}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </a>
                      </td>
                      <td className="py-2.5 text-right font-mono text-[#555555]">{p.impressions.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-mono font-bold text-[#D96032]">{p.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#E2DBD2] text-center text-xs text-[#777777]">
        Interiors by DeX • Strategic Campaign Portal • Grounded in Google Search Console &amp; Algorithm Truth
      </footer>
    </div>
  );
}
