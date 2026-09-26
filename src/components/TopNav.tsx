import React from 'react';
import { Sparkles, Code, Users, BarChart3, SlidersHorizontal } from 'lucide-react';

interface TopNavProps {
  activeTab: 'preview' | 'architect' | 'audit' | 'leads';
  setActiveTab: (tab: 'preview' | 'architect' | 'audit' | 'leads') => void;
  onOpenExport: () => void;
  leadsCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  leadsCount,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('preview');
          }}
          className="text-lg font-black tracking-tight text-white font-['Cabinet_Grotesk'] hover:text-emerald-400 transition-colors"
        >
          OptiLaunch
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide">
          <button
            onClick={() => setActiveTab('preview')}
            className={`transition-colors flex items-center gap-1.5 pb-0.5 ${
              activeTab === 'preview'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Live Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('architect')}
            className={`transition-colors flex items-center gap-1.5 pb-0.5 ${
              activeTab === 'architect'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Campaign Architect</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`transition-colors flex items-center gap-1.5 pb-0.5 ${
              activeTab === 'audit'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>CRO & A/B Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`transition-colors flex items-center gap-1.5 pb-0.5 ${
              activeTab === 'leads'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Pipeline Leads</span>
            <span className="text-[11px] font-mono tabular-nums bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
              {leadsCount}
            </span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('architect')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 rounded-md border border-slate-700 transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Generate Page</span>
          </button>
          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap shadow-sm"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
