import React, { useState } from 'react';
import { LandingPageData } from '../types/landingPage';
import {
  Sparkles,
  RefreshCw,
  Sliders,
  Check,
  Zap,
  Target,
  FileText,
  Layers,
  ChevronRight,
  Cpu,
} from 'lucide-react';
import { AI_DATASCIENCE_CAMPAIGN, SAAS_GROWTH_CAMPAIGN } from '../data/defaultCampaigns';

interface CampaignArchitectProps {
  currentData: LandingPageData;
  onPageGenerated: (newPage: LandingPageData) => void;
  onViewLive: () => void;
}

export const CampaignArchitect: React.FC<CampaignArchitectProps> = ({
  currentData,
  onPageGenerated,
  onViewLive,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<'ai_masterclass' | 'saas_platform' | 'custom'>('ai_masterclass');
  const [campaignName, setCampaignName] = useState('AI & Data Science Engineering Masterclass');
  const [campaignType, setCampaignType] = useState('bootcamp');
  const [targetAudience, setTargetAudience] = useState('Software Engineers, Data Analysts & Technical Practitioners');
  const [brandTone, setBrandTone] = useState<'authoritative_tech' | 'growth_dynamic' | 'minimalist_luxury' | 'bold_challenger'>('authoritative_tech');
  const [conversionGoal, setConversionGoal] = useState<'priority_waitlist' | 'early_bird_checkout' | 'demo_booking' | 'curriculum_download'>('priority_waitlist');
  const [customInstructions, setCustomInstructions] = useState(
    'Highlight production-grade code, real-world datasets, PyTorch, Transformers, YOLO, LangChain RAG, and weekly 1-on-1 expert mentor feedback.'
  );

  const [activeOffers, setActiveOffers] = useState<string[]>([
    'Python programming with AI/ML libraries',
    'Machine Learning algorithms and models',
    'Generative AI with LLMs, RAG, and LangChain',
    'Data Science with real-world datasets',
    'Computer Vision with OpenCV and YOLO',
    'Natural Language Processing with Transformers',
    'Deep Learning with TensorFlow and PyTorch',
    'Expert feedback from experienced AI professionals'
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePresetSelect = (preset: 'ai_masterclass' | 'saas_platform' | 'custom') => {
    setSelectedPreset(preset);
    if (preset === 'ai_masterclass') {
      setCampaignName('AI & Data Science Engineering Masterclass');
      setCampaignType('bootcamp');
      setTargetAudience('Software Engineers, Data Analysts & Technical Practitioners');
      setBrandTone('authoritative_tech');
      setConversionGoal('priority_waitlist');
      setActiveOffers([
        'Python programming with AI/ML libraries',
        'Machine Learning algorithms and models',
        'Generative AI with LLMs, RAG, and LangChain',
        'Data Science with real-world datasets',
        'Computer Vision with OpenCV and YOLO',
        'Natural Language Processing with Transformers',
        'Deep Learning with TensorFlow and PyTorch',
        'Expert feedback from experienced AI professionals'
      ]);
      setCustomInstructions(
        'Highlight production-grade code, real-world datasets, PyTorch, Transformers, YOLO, LangChain RAG, and weekly 1-on-1 expert mentor feedback.'
      );
    } else if (preset === 'saas_platform') {
      setCampaignName('Autonomous Campaign Intelligence Engine');
      setCampaignType('saas');
      setTargetAudience('Performance Marketers, Growth Engineers & Founders');
      setBrandTone('growth_dynamic');
      setConversionGoal('early_bird_checkout');
      setActiveOffers([
        'Automated multi-armed bandit traffic routing',
        'Sub-second Edge page delivery across 310 global locations',
        'Predictive conversion heatmaps powered by frontier LLMs',
        'Instant CRM and webhook synchronization'
      ]);
      setCustomInstructions(
        'Focus on pipeline velocity, measurable conversion uplift, and eliminating design-engineering bottlenecks.'
      );
    } else {
      setCampaignName('');
      setTargetAudience('');
      setActiveOffers([]);
      setCustomInstructions('');
    }
  };

  const toggleOffer = (offer: string) => {
    setActiveOffers((prev) =>
      prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setGenStep('Analyzing target audience and conversion intent...');

    try {
      setTimeout(() => {
        setGenStep('Synthesizing value proposition & persuasive copywriting...');
      }, 700);

      setTimeout(() => {
        setGenStep('Generating 8-week syllabus, technical bento grid & social proof...');
      }, 1500);

      const res = await fetch('/api/generate-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignName,
          campaignType,
          targetAudience,
          keyOffers: activeOffers,
          brandTone,
          conversionGoal,
          customInstructions,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        onPageGenerated(json.data);
        onViewLive();
      } else {
        setErrorMsg(json.message || 'Generation issue. Default high-converting architecture applied.');
      }
    } catch (err: any) {
      console.error('Generation error, applying pre-tuned template:', err);
      // Fallback
      if (selectedPreset === 'saas_platform') {
        onPageGenerated(SAAS_GROWTH_CAMPAIGN);
      } else {
        onPageGenerated(AI_DATASCIENCE_CAMPAIGN);
      }
      onViewLive();
    } finally {
      setIsGenerating(false);
      setGenStep(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      {/* Title & Scope */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          <Sliders className="w-4 h-4" />
          <span>OptiLaunch Campaign Architect</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white font-['Cabinet_Grotesk']">
          AI-Powered Marketing Campaign Generator
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          Configure your product scope, technical deliverables, and audience parameters. OptiLaunch
          synthesizes high-impact hooks, verifiable social proof, transparent curriculum modules,
          and a CRO-optimized lead capture pathway.
        </p>
      </div>

      {/* Preset Archetypes */}
      <div className="mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
          1. Select Campaign Archetype & Preset
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => handlePresetSelect('ai_masterclass')}
            className={`p-5 rounded-xl border text-left transition-all ${
              selectedPreset === 'ai_masterclass'
                ? 'bg-[#0E1528] border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                : 'bg-[#0D121D] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                Specialized Track
              </span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              AI & Data Science Masterclass
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python, PyTorch, Transformers, YOLO, LangChain RAG & 1-on-1 mentorship.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('saas_platform')}
            className={`p-5 rounded-xl border text-left transition-all ${
              selectedPreset === 'saas_platform'
                ? 'bg-[#0E1528] border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                : 'bg-[#0D121D] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                B2B SaaS Launch
              </span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              Autonomous Campaign SaaS
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-armed bandit testing, edge delivery, and pipeline velocity.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handlePresetSelect('custom')}
            className={`p-5 rounded-xl border text-left transition-all ${
              selectedPreset === 'custom'
                ? 'bg-[#0E1528] border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                : 'bg-[#0D121D] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Blank Canvas
              </span>
              <FileText className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              Custom Campaign Brief
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Write bespoke requirements for any niche or product offering.
            </p>
          </button>
        </div>
      </div>

      {/* Campaign Details Form */}
      <div className="bg-[#0E131F] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Campaign Name / Program Title
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. AI & Data Science Engineering Masterclass"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Software Engineers, Data Analysts, ML Practitioners"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Brand Tone & Conversion Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Brand Tone
            </label>
            <select
              value={brandTone}
              onChange={(e: any) => setBrandTone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="authoritative_tech">Authoritative Technical (Engineers & Data Scientists)</option>
              <option value="growth_dynamic">Growth Dynamic (B2B SaaS & Performance Marketers)</option>
              <option value="minimalist_luxury">Minimalist Precision (High-ticket Executive Offerings)</option>
              <option value="bold_challenger">Bold Challenger (Disruptive High-Contrast Launch)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Primary Conversion Goal
            </label>
            <select
              value={conversionGoal}
              onChange={(e: any) => setConversionGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="priority_waitlist">Priority Cohort Waitlist & Early Access</option>
              <option value="early_bird_checkout">Early-Bird Tuition Checkout</option>
              <option value="curriculum_download">Download 8-Week Technical Syllabus</option>
              <option value="demo_booking">Schedule 1-on-1 Admissions / Demo Call</option>
            </select>
          </div>
        </div>

        {/* Technical Offerings / What to Expect Checklist */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Key Deliverables & What to Expect
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              'Python programming with AI/ML libraries',
              'Machine Learning algorithms and models',
              'Generative AI with LLMs, RAG, and LangChain',
              'Data Science with real-world datasets',
              'Computer Vision with OpenCV and YOLO',
              'Natural Language Processing with Transformers',
              'Deep Learning with TensorFlow and PyTorch',
              'Expert feedback from experienced AI professionals',
            ].map((item, idx) => {
              const isChecked = activeOffers.includes(item);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleOffer(item)}
                  className={`px-3 py-2 text-xs rounded-lg border text-left flex items-center justify-between transition-colors ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{item}</span>
                  {isChecked && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Prompt Context */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Custom Directives & Conversion Priorities
          </label>
          <textarea
            rows={3}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="Specify any special proof claims, pricing tiers, or tone requirements..."
            className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 leading-relaxed"
          />
        </div>

        {errorMsg && (
          <div className="p-3 text-xs bg-amber-950/40 border border-amber-800/40 text-amber-300 rounded-lg">
            {errorMsg}
          </div>
        )}

        {/* Generate Button & Progress */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {isGenerating && genStep ? (
              <span className="flex items-center gap-2 text-emerald-400 font-medium animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                {genStep}
              </span>
            ) : (
              <span>Powered by Gemini 3.8 Flash · Evaluated against top CRO benchmarks</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onViewLive}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              View Current Page
            </button>

            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Architecture...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Optimized Landing Page</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
