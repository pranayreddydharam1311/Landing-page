import React, { useState } from 'react';
import { LandingPageData } from '../types/landingPage';
import {
  Code,
  X,
  Copy,
  Check,
  Download,
  FileCode,
  FileJson,
} from 'lucide-react';

interface ExportCodeModalProps {
  data: LandingPageData;
  onClose: () => void;
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({
  data,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'json'>('html');
  const [copied, setCopied] = useState(false);

  // Generate clean standalone HTML
  const generateStandaloneHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.hero.headline} — ${data.campaignName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, .font-display { font-family: 'Cabinet Grotesk', sans-serif; }
  </style>
</head>
<body class="bg-[#0A0E17] text-slate-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300">

  <!-- Top Notification -->
  ${
    data.hero.urgencyBadge
      ? `<div class="w-full bg-emerald-950/80 border-b border-emerald-800/60 px-4 py-2 text-center text-xs text-emerald-300">
    ${data.hero.urgencyBadge}
  </div>`
      : ''
  }

  <!-- Header -->
  <header class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-800/80">
    <a href="#" class="text-lg font-black tracking-tight text-white font-display">${data.campaignName.split(' ')[0]}</a>
    <nav class="hidden md:flex items-center gap-6 text-xs text-slate-300">
      <a href="#curriculum" class="hover:text-emerald-400">Curriculum</a>
      <a href="#features" class="hover:text-emerald-400">Stack</a>
      <a href="#pricing" class="hover:text-emerald-400">Tuition</a>
    </nav>
    <a href="#enroll" class="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-md hover:bg-emerald-300">Enroll Now</a>
  </header>

  <!-- Hero -->
  <main class="max-w-5xl mx-auto px-6 py-20 text-center">
    <div class="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">${data.hero.tagKicker}</div>
    <h1 class="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 font-display max-w-4xl mx-auto">${data.hero.headline}</h1>
    <p class="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">${data.hero.subheadline}</p>
    <div class="flex items-center justify-center gap-4">
      <a href="#enroll" class="px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300">${data.hero.primaryCtaText}</a>
    </div>
  </main>

</body>
</html>`;
  };

  const codeContent =
    activeTab === 'html'
      ? generateStandaloneHtml()
      : JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename =
      activeTab === 'html' ? 'landing-page.html' : 'campaign-data.json';
    const blob = new Blob([codeContent], {
      type: activeTab === 'html' ? 'text/html' : 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0E1424] border border-slate-700/80 rounded-2xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col max-h-[85vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
          <Code className="w-4 h-4" />
          <span>Production Export Bundle</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 font-['Cabinet_Grotesk']">
          Export Landing Page Code & Schema
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Ready for immediate static deployment via Cloudflare Pages, Vercel, Netlify, or AWS S3.
        </p>

        {/* Tab switcher */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'html'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Standalone HTML + Tailwind</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === 'json'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>JSON Campaign Schema</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Preview Area */}
        <div className="flex-1 overflow-hidden rounded-xl border border-slate-800 bg-[#060910]">
          <pre className="p-4 text-[11px] font-mono text-slate-300 overflow-auto h-full max-h-[380px] leading-relaxed selection:bg-emerald-500/20">
            {codeContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
