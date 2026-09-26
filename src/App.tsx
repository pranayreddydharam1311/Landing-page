import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { LandingPageView } from './components/LandingPageView';
import { CampaignArchitect } from './components/CampaignArchitect';
import { ConversionAuditPanel } from './components/ConversionAuditPanel';
import { LeadsPipelineModal } from './components/LeadsPipelineModal';
import { ElementOptimizerModal } from './components/ElementOptimizerModal';
import { ExportCodeModal } from './components/ExportCodeModal';
import { AI_DATASCIENCE_CAMPAIGN } from './data/defaultCampaigns';
import { LandingPageData, LeadRecord } from './types/landingPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'preview' | 'architect' | 'audit' | 'leads'>('preview');
  const [landingPageData, setLandingPageData] = useState<LandingPageData>(AI_DATASCIENCE_CAMPAIGN);
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');

  // Leads
  const [leads, setLeads] = useState<LeadRecord[]>([
    {
      id: 'lead-1',
      campaignId: 'ai-datascience-masterclass',
      email: 'sarah.lin@datacorp.io',
      name: 'Sarah Lin',
      role: 'Senior Data Analyst',
      tier: 'Professional Cohort',
      submittedAt: '12m ago',
    },
    {
      id: 'lead-2',
      campaignId: 'ai-datascience-masterclass',
      email: 'marcus.vance@techscale.com',
      name: 'Marcus Vance',
      role: 'Software Engineer (Backend)',
      tier: 'Professional Cohort',
      submittedAt: '43m ago',
    },
    {
      id: 'lead-3',
      campaignId: 'ai-datascience-masterclass',
      email: 'a.patel@quantedge.ai',
      name: 'Ananya Patel',
      role: 'ML Ops Intern',
      tier: 'Professional Cohort',
      submittedAt: '2h ago',
    },
  ]);

  // Modals
  const [optimizerModal, setOptimizerModal] = useState<{
    open: boolean;
    element: string;
    currentText: string;
  }>({
    open: false,
    element: '',
    currentText: '',
  });

  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Fetch leads on mount
  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.leads && data.leads.length > 0) {
          setLeads(data.leads);
        }
      })
      .catch((err) => console.log('Using initial client leads:', err));
  }, []);

  const handleLeadSubmitted = (newLead: LeadRecord) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleOpenOptimizer = (element: string, currentText: string) => {
    setOptimizerModal({
      open: true,
      element,
      currentText,
    });
  };

  const handleApplyOptimizedText = (newText: string) => {
    if (optimizerModal.element === 'headline') {
      if (activeVariant === 'B') {
        setLandingPageData((prev) => ({
          ...prev,
          abVariations: {
            ...prev.abVariations,
            variantHeadlineB: newText,
          },
        }));
      } else {
        setLandingPageData((prev) => ({
          ...prev,
          hero: {
            ...prev.hero,
            headline: newText,
          },
        }));
      }
    } else if (optimizerModal.element === 'subheadline') {
      if (activeVariant === 'B') {
        setLandingPageData((prev) => ({
          ...prev,
          abVariations: {
            ...prev.abVariations,
            variantHookB: newText,
          },
        }));
      } else {
        setLandingPageData((prev) => ({
          ...prev,
          hero: {
            ...prev.hero,
            subheadline: newText,
          },
        }));
      }
    }
  };

  const handleApplyVariantHeadline = (text: string) => {
    setLandingPageData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        headline: text,
      },
    }));
    setActiveVariant('A');
    setActiveTab('preview');
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] antialiased">
      {/* Top Bar Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setExportModalOpen(true)}
        leadsCount={leads.length}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 w-full pb-16">
        {activeTab === 'preview' && (
          <LandingPageView
            data={landingPageData}
            onOpenOptimizer={handleOpenOptimizer}
            onLeadSubmitted={handleLeadSubmitted}
            activeVariant={activeVariant}
            setActiveVariant={setActiveVariant}
          />
        )}

        {activeTab === 'architect' && (
          <CampaignArchitect
            currentData={landingPageData}
            onPageGenerated={(newPage) => {
              setLandingPageData(newPage);
              setActiveVariant('A');
            }}
            onViewLive={() => setActiveTab('preview')}
          />
        )}

        {activeTab === 'audit' && (
          <ConversionAuditPanel
            data={landingPageData}
            activeVariant={activeVariant}
            setActiveVariant={setActiveVariant}
            onApplyVariantHeadline={handleApplyVariantHeadline}
          />
        )}

        {activeTab === 'leads' && (
          <LeadsPipelineModal
            leads={leads}
            onRefresh={() => {
              fetch('/api/leads')
                .then((res) => res.json())
                .then((data) => {
                  if (data.success && data.leads) setLeads(data.leads);
                })
                .catch(() => {});
            }}
          />
        )}
      </main>

      {/* AI Copy Optimizer Modal */}
      {optimizerModal.open && (
        <ElementOptimizerModal
          element={optimizerModal.element}
          currentText={optimizerModal.currentText}
          onApply={handleApplyOptimizedText}
          onClose={() => setOptimizerModal({ open: false, element: '', currentText: '' })}
        />
      )}

      {/* Code Export Modal */}
      {exportModalOpen && (
        <ExportCodeModal
          data={landingPageData}
          onClose={() => setExportModalOpen(false)}
        />
      )}
    </div>
  );
}
