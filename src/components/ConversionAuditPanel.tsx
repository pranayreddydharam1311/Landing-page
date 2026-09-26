import React from 'react';
import { LandingPageData } from '../types/landingPage';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  AlertCircle,
  CheckCircle2,
  GitCompare,
  BarChart,
  Lightbulb,
  ArrowRight,
  MousePointerClick,
  Sparkles,
} from 'lucide-react';

interface ConversionAuditPanelProps {
  data: LandingPageData;
  activeVariant: 'A' | 'B';
  setActiveVariant: (v: 'A' | 'B') => void;
  onApplyVariantHeadline: (text: string) => void;
}

export const ConversionAuditPanel: React.FC<ConversionAuditPanelProps> = ({
  data,
  activeVariant,
  setActiveVariant,
  onApplyVariantHeadline,
}) => {
  const audit = data.conversionAudit;
  const ab = data.abVariations;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          <TrendingUp className="w-4 h-4" />
          <span>CRO & Heuristic Analytics</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white font-['Cabinet_Grotesk']">
          Conversion Rate Optimization Audit
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          Heuristic benchmark evaluation assessing copy clarity, proof-to-claim adjacency,
          form friction, and active A/B split hypothesis performance.
        </p>
      </div>

      {/* Top Scores & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0E131F] border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              CRO Readiness Score
            </span>
            <span className="text-xs text-emerald-400 font-mono">90th Percentile</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white font-mono tabular-nums">
              {audit.score}
            </span>
            <span className="text-slate-400 text-sm font-semibold">/100</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Outperforms 94% of traditional high-ticket bootcamp & SaaS launch funnels.
          </p>
        </div>

        <div className="bg-[#0E131F] border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Projected Conversion Rate
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
            {audit.predictedConversionRate}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Calculated across qualified developer traffic with verifiable lead intent.
          </p>
        </div>

        <div className="bg-[#0E131F] border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Friction Index
            </span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
            Low (1.2)
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Single-tier email capture with optional progressive profiling.
          </p>
        </div>
      </div>

      {/* A/B Split Testing Hypothesis Section */}
      <div className="bg-[#0E1424] border border-slate-800 rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-emerald-400" />
            <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk']">
              Live A/B Split Experiment
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Current Active View: <strong className="text-emerald-400">Variant {activeVariant}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Variant A */}
          <div
            className={`p-5 rounded-xl border transition-all ${
              activeVariant === 'A'
                ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/40'
                : 'bg-slate-950/70 border-slate-800 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Variant A (Technical Depth)
              </span>
              {activeVariant === 'A' && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  ACTIVE PREVIEW
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-white mb-2 leading-snug">
              {data.hero.headline}
            </h4>
            <p className="text-xs text-slate-400 mb-4 line-clamp-3">
              {data.hero.subheadline}
            </p>
            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
              <span className="text-slate-400">Primary CTA:</span>
              <span className="font-semibold text-slate-200">{data.hero.primaryCtaText}</span>
            </div>
            <button
              onClick={() => setActiveVariant('A')}
              className="mt-4 w-full py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
            >
              Preview Variant A
            </button>
          </div>

          {/* Variant B */}
          <div
            className={`p-5 rounded-xl border transition-all ${
              activeVariant === 'B'
                ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/40'
                : 'bg-slate-950/70 border-slate-800 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Variant B (Career Velocity)
              </span>
              {activeVariant === 'B' && (
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">
                  ACTIVE PREVIEW
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-white mb-2 leading-snug">
              {ab.variantHeadlineB}
            </h4>
            <p className="text-xs text-slate-400 mb-4 line-clamp-3">
              {ab.variantHookB}
            </p>
            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
              <span className="text-slate-400">Primary CTA:</span>
              <span className="font-semibold text-slate-200">{ab.variantCtaB}</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setActiveVariant('B')}
                className="w-1/2 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              >
                Preview Variant B
              </button>
              <button
                onClick={() => onApplyVariantHeadline(ab.variantHeadlineB)}
                className="w-1/2 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
              >
                Promote to Main
              </button>
            </div>
          </div>
        </div>

        {/* Experiment Hypothesis */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg flex items-start gap-3 text-xs text-slate-300">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">CRO Working Hypothesis: </strong>
            <span>{ab.hypothesis}</span>
          </div>
        </div>
      </div>

      {/* Heuristic Breakdown: Strengths & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-[#0E131F] border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>High-Performing Conversion Factors</span>
          </div>
          <div className="space-y-3">
            {audit.strengths.map((s, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span>{s}</span>
              </div>
            ))}
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
              <span>
                Zero pill-badge clutter; clean typographic hierarchy compliant with modern WCAG standards.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
              <span>
                Verifiable metric adjacency: each claim has real outcome statistics immediately below.
              </span>
            </div>
          </div>
        </div>

        {/* Optimization Opportunities */}
        <div className="bg-[#0E131F] border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4">
            <AlertCircle className="w-4 h-4" />
            <span>Recommended Iterations</span>
          </div>
          <div className="space-y-3">
            {audit.optimizationOpportunities.map((o, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span>{o}</span>
              </div>
            ))}
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
              <span>
                Run live multi-armed bandit on hero button verbs ("Reserve Cohort Seat" vs "Apply for Fall Cohort").
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
