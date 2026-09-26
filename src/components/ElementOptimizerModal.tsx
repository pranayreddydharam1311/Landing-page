import React, { useState } from 'react';
import {
  Wand2,
  X,
  Sparkles,
  Check,
  RefreshCw,
  ArrowRight,
  Flame,
  Briefcase,
  Scissors,
  Shield,
} from 'lucide-react';

interface ElementOptimizerModalProps {
  element: string;
  currentText: string;
  onApply: (newText: string) => void;
  onClose: () => void;
}

export const ElementOptimizerModal: React.FC<ElementOptimizerModalProps> = ({
  element,
  currentText,
  onApply,
  onClose,
}) => {
  const [selectedDirection, setSelectedDirection] = useState('Add Urgency & Scarcity');
  const [variants, setVariants] = useState<string[]>([
    `Deploy Enterprise-Ready AI Models with Direct Senior Staff Guidance`,
    `Stop Watching Tutorials: Build Production Computer Vision, RAG & Deep Learning Systems`,
    `The Rigorous 8-Week AI Engineering Track Built for Modern Practitioners`,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const directions = [
    { label: 'Add Urgency & Scarcity', icon: Flame },
    { label: 'Senior Technical Depth', icon: Briefcase },
    { label: 'Shorter & Punchier', icon: Scissors },
    { label: 'Overcome Skepticism', icon: Shield },
  ];

  const handleGenerateVariants = async (dir?: string) => {
    const directionToUse = dir || selectedDirection;
    setIsLoading(true);

    try {
      const res = await fetch('/api/optimize-element', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          element,
          currentText,
          direction: customPrompt || directionToUse,
        }),
      });
      const data = await res.json();
      if (data.success && data.variants && data.variants.length > 0) {
        setVariants(data.variants);
      }
    } catch (err) {
      console.error('Failed to generate variants:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0E1424] border border-slate-700/80 rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          <Wand2 className="w-4 h-4" />
          <span>AI Copy Doctor & Optimizer</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 font-['Cabinet_Grotesk']">
          Refine {element.charAt(0).toUpperCase() + element.slice(1)}
        </h3>

        {/* Current Text */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3.5 mb-5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Current Live Copy:
          </span>
          <p className="text-xs text-slate-200 italic leading-relaxed">
            "{currentText}"
          </p>
        </div>

        {/* Preset Strategies */}
        <div className="mb-5">
          <span className="text-xs font-semibold text-slate-300 block mb-2">
            Optimization Angle:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {directions.map((d, idx) => {
              const Icon = d.icon;
              const isSelected = selectedDirection === d.label;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDirection(d.label);
                    handleGenerateVariants(d.label);
                  }}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 text-xs transition-colors ${
                    isSelected
                      ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom refinement prompt */}
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Or write custom instructions (e.g. emphasize PyTorch benchmarks)..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
            />
            <button
              onClick={() => handleGenerateVariants()}
              disabled={isLoading}
              className="px-3 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {isLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* Suggested Variants */}
        <div>
          <span className="text-xs font-semibold text-slate-300 block mb-2">
            AI-Engineered Options (Click to Apply):
          </span>
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {variants.map((v, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onApply(v);
                  onClose();
                }}
                className="group p-3 bg-slate-900 hover:bg-[#0A1A22] border border-slate-800 hover:border-emerald-500/50 rounded-lg cursor-pointer transition-all flex items-start justify-between gap-3"
              >
                <p className="text-xs text-slate-200 group-hover:text-emerald-300 leading-relaxed">
                  {v}
                </p>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-emerald-400 font-semibold shrink-0 mt-0.5 flex items-center gap-1">
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
