import React, { useState } from 'react';
import { LeadRecord } from '../types/landingPage';
import {
  Users,
  Download,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Calendar,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';

interface LeadsPipelineModalProps {
  leads: LeadRecord[];
  onRefresh: () => void;
}

export const LeadsPipelineModal: React.FC<LeadsPipelineModalProps> = ({
  leads,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === 'ALL' || (lead.role && lead.role.includes(roleFilter));
    return matchesSearch && matchesRole;
  });

  const exportCsv = () => {
    const headers = ['ID', 'Email', 'Name', 'Role', 'Tier', 'Submitted At'];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.email}"`,
      `"${l.name}"`,
      `"${l.role || ''}"`,
      `"${l.tier || ''}"`,
      `"${l.submittedAt}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `optilaunch_campaign_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Campaign Inbound Pipeline</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-['Cabinet_Grotesk']">
            Captured Priority Applicants
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Real-time subscriber records generated via the interactive landing page lead capture
            form.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0E131F] border border-slate-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search applicants by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 shrink-0">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
          >
            <option value="ALL">All Roles</option>
            <option value="Software Engineer">Software Engineers</option>
            <option value="Data">Data Analysts / Scientists</option>
            <option value="ML">ML & AI Specialists</option>
            <option value="Manager">Tech Leads & Managers</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0E131F] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-5">Applicant</th>
                <th className="py-3 px-5">Work Email</th>
                <th className="py-3 px-5">Role / Focus</th>
                <th className="py-3 px-5">Program Tier</th>
                <th className="py-3 px-5">Captured</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">
                      {lead.name}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-slate-300">
                      {lead.email}
                    </td>
                    <td className="py-3.5 px-5 text-slate-300">
                      {lead.role || 'Software Engineer'}
                    </td>
                    <td className="py-3.5 px-5 text-slate-400">
                      {lead.tier || 'Professional Seat'}
                    </td>
                    <td className="py-3.5 px-5 text-slate-400 tabular-nums">
                      {lead.submittedAt}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Confirmed</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No applicants matching current search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
