import React from 'react';
import { Settings, Shield, Globe, Bell, Code, Database, UserPlus } from 'lucide-react';
import { PIPELINE_STAGES } from '../constants';

const SettingItem = ({ icon: Icon, title, description, iconColor, children }: any) => (
  <div className="flex items-start space-x-6 p-8 hover:bg-slate-50/50 transition-colors group">
    <div className={`p-4 rounded-2xl shadow-sm border border-slate-50 transition-all group-hover:scale-110`} style={{ backgroundColor: `${iconColor}10`, color: iconColor }}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 font-medium mt-1">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  </div>
);

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Configuration</h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Enterprise Controls &bull; System Logic</p>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
        <SettingItem 
          icon={Globe} 
          title="Conversion Stages" 
          description="Define the milestones in your custom sales lifecycle."
          iconColor="#FBB03B"
        >
          <div className="flex flex-wrap gap-3">
            {PIPELINE_STAGES.map(stage => (
              <span key={stage} className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-100">
                {stage}
              </span>
            ))}
            <button className="px-4 py-2 rounded-xl text-[10px] font-bold text-[#3b82f6] bg-blue-50/50 border border-blue-100 uppercase tracking-widest hover:bg-blue-50">+ Add Milestone</button>
          </div>
        </SettingItem>

        <SettingItem 
          icon={Code} 
          title="Lead Ingestion Webhooks" 
          description="Automated API endpoints for multi-channel lead capture."
          iconColor="#87CEEB"
        >
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-2xl font-mono text-[10px] text-slate-500 flex justify-between items-center border border-slate-100">
              <span className="truncate mr-4">https://api.bharatcrm.io/v1/ingest/indiamart</span>
              <button className="text-[#3b82f6] font-bold uppercase tracking-widest hover:underline">Copy URL</button>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl font-mono text-[10px] text-slate-500 flex justify-between items-center border border-slate-100">
              <span className="truncate mr-4">https://api.bharatcrm.io/v1/ingest/facebook</span>
              <button className="text-[#3b82f6] font-bold uppercase tracking-widest hover:underline">Copy URL</button>
            </div>
          </div>
        </SettingItem>

        <SettingItem 
          icon={Shield} 
          title="Access Governance" 
          description="Manage organizational roles and security permissions."
          iconColor="#332333"
        >
          <button className="flex items-center space-x-3 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all">
            <UserPlus size={16} />
            <span>Authorize Member</span>
          </button>
        </SettingItem>

        <SettingItem 
          icon={Database} 
          title="Core Architecture" 
          description="Real-time data synchronization with your cloud cluster."
          iconColor="#228B22"
        >
          <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-[#228B22]">
            <div className="w-2 h-2 rounded-full bg-[#228B22] animate-pulse" />
            <span>Operational &bull; Connected to Primary DB</span>
          </div>
        </SettingItem>
      </div>

      <div className="p-10 bg-red-50/50 border border-red-100 rounded-[40px]">
        <h3 className="text-sm font-bold text-[#D32F2F] uppercase tracking-widest mb-2">Restricted Actions</h3>
        <p className="text-xs text-red-700/60 font-medium mb-8 leading-relaxed">System resets will permanently purge current lead data and restore defaults. Proceed with absolute caution.</p>
        <button className="px-6 py-3 bg-white border border-red-100 text-[#D32F2F] text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-[#D32F2F] hover:text-white transition-all shadow-sm">
          Factory System Reset
        </button>
      </div>
    </div>
  );
}
