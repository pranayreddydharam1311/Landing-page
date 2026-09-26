import React, { useState, useEffect } from 'react';
import {
  LandingPageData,
  CurriculumModule,
  PricingTier,
} from '../types/landingPage';
import {
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Wand2,
  Calendar,
  Lock,
  ExternalLink,
} from 'lucide-react';

interface LandingPageViewProps {
  data: LandingPageData;
  onOpenOptimizer: (element: string, currentText: string) => void;
  onLeadSubmitted: (lead: any) => void;
  activeVariant: 'A' | 'B';
  setActiveVariant: (v: 'A' | 'B') => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  data,
  onOpenOptimizer,
  onLeadSubmitted,
  activeVariant,
  setActiveVariant,
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Lead capture form state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadRole, setLeadRole] = useState('Software Engineer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Early-bird live countdown timer (48h 12m 30s)
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 54, seconds: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!leadEmail || !leadEmail.includes('@') || !leadEmail.includes('.')) {
      setFormError('Please enter a valid work or personal email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: data.campaignId,
          email: leadEmail,
          name: leadName || 'Applicant',
          role: leadRole,
          tier: data.pricingTiers?.[0]?.name || 'Standard Seat',
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmissionSuccess(result.message || 'Priority reservation confirmed!');
        onLeadSubmitted(result.lead);
        setLeadEmail('');
        setLeadName('');
      } else {
        setFormError(result.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      // Local fallback simulation if server is offline
      const mockLead = {
        id: `lead-${Date.now()}`,
        campaignId: data.campaignId,
        email: leadEmail,
        name: leadName || 'Applicant',
        role: leadRole,
        tier: data.pricingTiers?.[0]?.name || 'Standard Seat',
        submittedAt: 'Just now',
      };
      setSubmissionSuccess('Priority reservation confirmed! Onboarding dossier sent.');
      onLeadSubmitted(mockLead);
      setLeadEmail('');
      setLeadName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Switch headline and hook depending on variant
  const headline =
    activeVariant === 'B'
      ? data.abVariations.variantHeadlineB
      : data.hero.headline;

  const subheadline =
    activeVariant === 'B'
      ? data.abVariations.variantHookB
      : data.hero.subheadline;

  const primaryCta =
    activeVariant === 'B'
      ? data.abVariations.variantCtaB
      : data.hero.primaryCtaText;

  // Viewport width styling
  const viewportStyles = {
    desktop: 'w-full max-w-[1360px]',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[390px] max-w-full',
  }[viewport];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Studio Viewport & A/B Variant Control Bar */}
      <div className="w-full max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-[#0E131F]">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Viewport Simulation:</span>
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setViewport('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewport === 'desktop'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop (1440px)</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewport === 'tablet'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet (768px)</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewport === 'mobile'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile (390px)</span>
            </button>
          </div>
        </div>

        {/* A/B Split Variant Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Live Split Test:</span>
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveVariant('A')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeVariant === 'A'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Variant A (Technical Depth)
            </button>
            <button
              onClick={() => setActiveVariant('B')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeVariant === 'B'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Variant B (Career Velocity)
            </button>
          </div>
        </div>
      </div>

      {/* Frame Container */}
      <div className="w-full py-8 px-4 flex justify-center bg-[#070A0F]">
        <div
          className={`${viewportStyles} bg-[#0A0E17] text-slate-100 rounded-xl border border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden relative`}
        >
          {/* Top Urgency Ribbon */}
          {data.hero.urgencyBadge && (
            <div className="w-full bg-emerald-950/70 border-b border-emerald-800/50 px-4 py-2 text-center text-xs text-emerald-300 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{data.hero.urgencyBadge}</span>
              <span className="text-emerald-500/60">·</span>
              <span className="font-mono tabular-nums text-emerald-200 font-semibold">
                Ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
          )}

          {/* Landing Page Internal Top Bar (Single Row, 3 Zones) */}
          <nav className="w-full border-b border-slate-800/80 px-6 py-4 flex items-center justify-between bg-[#0A0E17]/95">
            <span className="text-base font-bold tracking-tight text-white font-['Cabinet_Grotesk']">
              {data.campaignName.split(' ')[0] || 'Masterclass'}
            </span>

            <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
              <a href="#curriculum" className="hover:text-emerald-400 transition-colors">
                Curriculum
              </a>
              <a href="#features" className="hover:text-emerald-400 transition-colors">
                Core Stack
              </a>
              <a href="#proof" className="hover:text-emerald-400 transition-colors">
                Outcomes
              </a>
              <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                Tuition
              </a>
              <a href="#faq" className="hover:text-emerald-400 transition-colors">
                FAQ
              </a>
            </div>

            <a
              href="#enroll"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap"
            >
              Enroll Now
            </a>
          </nav>

          {/* Hero Section */}
          <section className="relative px-6 py-16 md:py-24 max-w-6xl mx-auto flex flex-col items-center text-center">
            {/* Tag Kicker */}
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <span>{data.hero.tagKicker}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-normal capitalize">Limited to 40 Engineers</span>
            </div>

            {/* Headline with in-line AI optimizer trigger */}
            <div className="relative group max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-['Cabinet_Grotesk']">
                {headline}
              </h1>
              <button
                onClick={() => onOpenOptimizer('headline', headline)}
                title="Rewrite headline with Gemini"
                className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-8 top-1 p-1 text-slate-400 hover:text-emerald-400 bg-slate-800 rounded border border-slate-700"
              >
                <Wand2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subheadline */}
            <div className="relative group max-w-2xl mx-auto mt-6">
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {subheadline}
              </p>
              <button
                onClick={() => onOpenOptimizer('subheadline', subheadline)}
                title="Optimize subheadline with Gemini"
                className="opacity-0 group-hover:opacity-100 transition-opacity absolute -right-8 top-1 p-1 text-slate-400 hover:text-emerald-400 bg-slate-800 rounded border border-slate-700"
              >
                <Wand2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* CTA Group */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#enroll"
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {data.hero.secondaryCtaText && (
                <a
                  href="#curriculum"
                  className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{data.hero.secondaryCtaText}</span>
                </a>
              )}
            </div>

            {/* Value prop checkmarks */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-2xl mx-auto">
              {data.hero.valuePropBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Hero Visual Showcase Asset */}
            <div className="mt-12 w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
              <img
                src={data.hero.heroImage || '/src/assets/images/hero_ai_datascience_campaign_1790412632276.jpg'}
                alt="AI and Data Science Production Pipeline Workspace"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-[460px]"
                onError={(e) => {
                  // Fallback container in case image path has any runtime issue
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-transparent pointer-events-none" />
            </div>
          </section>

          {/* Proof Metrics Strip (Tabular Numbers) */}
          <section className="border-y border-slate-800/80 bg-slate-900/40 px-6 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {data.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                    {metric.value}
                  </span>
                  <span className="mt-1 text-xs font-semibold text-slate-200">{metric.label}</span>
                  <span className="mt-0.5 text-[11px] text-slate-400 max-w-[200px] leading-tight">
                    {metric.context}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Marquee / Tech Stacks */}
          <section className="px-6 py-6 border-b border-slate-800/60 bg-[#070A10]">
            <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-400">
              <span className="text-slate-500 uppercase tracking-widest text-[10px]">
                Production Stack:
              </span>
              <span className="hover:text-slate-200 transition-colors">Python 3.12</span>
              <span className="hover:text-slate-200 transition-colors">PyTorch 2.4</span>
              <span className="hover:text-slate-200 transition-colors">YOLOv8 & v11</span>
              <span className="hover:text-slate-200 transition-colors">Hugging Face Transformers</span>
              <span className="hover:text-slate-200 transition-colors">LangChain RAG</span>
              <span className="hover:text-slate-200 transition-colors">OpenCV 4.9</span>
              <span className="hover:text-slate-200 transition-colors">TensorFlow & Keras</span>
            </div>
          </section>

          {/* Core Capabilities / Features Bento Grid */}
          <section id="features" className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                01. Technical Pillars
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Cabinet_Grotesk']">
                Engineered for Real-World Industry Deployment
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Move past isolated toy tutorials. Each module is structured around deployable
                architectures, production constraints, and measurable inference benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.features.map((feat, idx) => (
                <div
                  key={feat.id || idx}
                  className="bg-[#0E1422] border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-emerald-400 mb-2 tracking-wide uppercase">
                      {feat.category}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 leading-snug">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {feat.description}
                    </p>
                  </div>

                  <div>
                    <div className="space-y-1.5 mb-4">
                      {feat.outcomes.map((outcome, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>

                    {feat.techStack && feat.techStack.length > 0 && (
                      <div className="pt-3 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                        {feat.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive 8-Week Curriculum Breakdown */}
          {data.curriculum && data.curriculum.length > 0 && (
            <section id="curriculum" className="border-t border-slate-800/80 bg-slate-950/60 px-6 py-16 md:py-24">
              <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                    02. 8-Week Deep-Dive Syllabus
                  </h2>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Cabinet_Grotesk']">
                    From Mathematical Foundations to Production Capstone
                  </h3>
                  <p className="mt-3 text-sm text-slate-400">
                    Click each module to inspect weekly architecture topics, lecture objectives, and
                    concrete capstone deliverables.
                  </p>
                </div>

                {/* Module Selector Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 p-1.5 bg-slate-900 border border-slate-800 rounded-xl max-w-4xl mx-auto">
                  {data.curriculum.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedModuleIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                        selectedModuleIndex === idx
                          ? 'bg-emerald-400 text-slate-950 font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {m.module}: {m.duration}
                    </button>
                  ))}
                </div>

                {/* Selected Module Detail Card */}
                {data.curriculum[selectedModuleIndex] && (
                  <div className="max-w-3xl mx-auto bg-[#0E1422] border border-slate-800 rounded-xl p-8 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
                      <div>
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                          {data.curriculum[selectedModuleIndex].module} ·{' '}
                          {data.curriculum[selectedModuleIndex].duration}
                        </span>
                        <h4 className="text-xl font-bold text-white mt-1">
                          {data.curriculum[selectedModuleIndex].title}
                        </h4>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                        Curriculum Topics Covered:
                      </div>
                      <div className="space-y-2">
                        {data.curriculum[selectedModuleIndex].topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="text-emerald-400 font-mono">0{tIdx + 1}.</span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-emerald-500/20 rounded-lg p-4">
                      <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Graduation Deliverable / Project Outcome:</span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium">
                        {data.curriculum[selectedModuleIndex].projectOutcome}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Social Proof & Verifiable Outcomes */}
          <section id="proof" className="px-6 py-16 md:py-24 max-w-6xl mx-auto border-t border-slate-800/80">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                03. Verifiable Alumni Proof
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Cabinet_Grotesk']">
                Engineers Transforming Their Daily Output
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                Direct feedback from engineers and researchers who deployed models through this
                cohort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.socialProof.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0E1422] border border-slate-800 rounded-xl p-6 flex flex-col justify-between"
                >
                  <p className="text-xs text-slate-300 italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">{item.author}</div>
                      <div className="text-[11px] text-slate-400">
                        {item.role} · {item.company}
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                      {item.outcomeMetric}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Tiers */}
          <section id="pricing" className="border-t border-slate-800/80 bg-slate-950/40 px-6 py-16 md:py-24">
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                  04. Cohort Investment
                </h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Cabinet_Grotesk']">
                  Transparent Tuition with Zero Hidden Fees
                </h3>
                <p className="mt-3 text-sm text-slate-400">
                  Backed by our 14-day 100% money-back satisfaction guarantee.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {data.pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-8 flex flex-col justify-between border ${
                      tier.popular
                        ? 'bg-[#0E1424] border-emerald-500/50 shadow-xl relative'
                        : 'bg-[#0E131F] border-slate-800'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                        {tier.badge || 'Recommended'}
                      </div>
                    )}

                    <div>
                      <div className="flex items-baseline justify-between mb-4">
                        <h4 className="text-lg font-bold text-white">{tier.name}</h4>
                        {tier.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {tier.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="mb-6">
                        <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-xs text-slate-400 ml-2">{tier.period}</span>
                        )}
                      </div>

                      <div className="space-y-3 mb-8">
                        {tier.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#enroll"
                      className={`w-full py-3 text-xs font-semibold rounded-lg text-center transition-colors ${
                        tier.popular
                          ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {tier.ctaLabel}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Lead Capture / Priority Reservation Form */}
          <section id="enroll" className="px-6 py-16 md:py-24 max-w-4xl mx-auto border-t border-slate-800/80">
            <div className="bg-[#0E1424] border border-emerald-500/40 rounded-2xl p-8 sm:p-12 shadow-2xl relative">
              <div className="max-w-xl mx-auto text-center mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 block">
                  Priority Cohort Access
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Cabinet_Grotesk']">
                  {data.conversionModule.headline}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {data.conversionModule.subtitle}
                </p>
                <div className="mt-4 inline-block bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 text-xs px-3 py-1 rounded">
                  {data.conversionModule.incentiveText}
                </div>
              </div>

              {submissionSuccess ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-6 text-center max-w-md mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">
                    Application Dossier Dispatched
                  </h4>
                  <p className="text-xs text-slate-300 mb-4">{submissionSuccess}</p>
                  <button
                    onClick={() => setSubmissionSuccess(null)}
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Professional Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Current Engineering Role
                    </label>
                    <select
                      value={leadRole}
                      onChange={(e) => setLeadRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="Software Engineer">Software Engineer (Backend/Full-Stack)</option>
                      <option value="Data Scientist">Data Scientist / Analyst</option>
                      <option value="Machine Learning Engineer">ML / AI Engineer</option>
                      <option value="Engineering Manager">Engineering Manager / Tech Lead</option>
                      <option value="Founder / Researcher">Founder / Academic Researcher</option>
                    </select>
                  </div>

                  {formError && (
                    <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Verifying Application...</span>
                    ) : (
                      <>
                        <span>{data.conversionModule.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{data.conversionModule.guaranteeText}</span>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* FAQ Accordion */}
          <section id="faq" className="px-6 py-16 max-w-4xl mx-auto border-t border-slate-800/80">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                Frequently Addressed Inquiries
              </h2>
              <h3 className="text-2xl font-bold text-white font-['Cabinet_Grotesk']">
                Technical Rigor & Enrollment Policies
              </h3>
            </div>

            <div className="space-y-3">
              {data.faq.map((item, idx) => {
                const isExpanded = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#0E131F] border border-slate-800 rounded-lg overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-emerald-300 transition-colors"
                    >
                      <span>{item.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/40 pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quiet Clean Footer */}
          <footer className="border-t border-slate-800/80 px-6 py-8 bg-[#070A10] text-center text-xs text-slate-400">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-bold text-slate-200 font-['Cabinet_Grotesk']">
                {data.campaignName}
              </span>

              <div className="flex items-center gap-4 text-[11px]">
                <a href="#curriculum" className="hover:text-white transition-colors">
                  Syllabus
                </a>
                <span>·</span>
                <a href="#features" className="hover:text-white transition-colors">
                  Stack
                </a>
                <span>·</span>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Tuition
                </a>
                <span>·</span>
                <a href="#enroll" className="hover:text-white transition-colors">
                  Early Access
                </a>
              </div>

              <span className="text-[11px]">
                © {new Date().getFullYear()} {data.campaignName.split(' ')[0]}. All rights reserved.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
