import React from 'react';
import { Lead, LeadStatus } from '../types';
import { PIPELINE_STAGES } from '../constants';
import { MoreVertical, Phone, MessageSquare, Target, User, ChevronRight } from 'lucide-react';

export default function Pipeline({ leads, onUpdateLead }: { leads: Lead[]; onUpdateLead: (l: Lead) => void }) {
  
  const getLeadsByStage = (stage: string) => leads.filter(l => l.stage === stage);

  const moveLead = (lead: Lead, newStage: string) => {
    onUpdateLead({
      ...lead,
      stage: newStage,
      status: newStage as LeadStatus,
      worked_flag: newStage !== 'New',
      last_activity_at: new Date().toISOString()
    });
  };

  const stageColors: Record<string, string> = {
    'New': '#87CEEB',
    'Qualified': '#FBB03B',
    'Contacted': '#332333',
    'Quote': '#3b82f6',
    'Converted': '#228B22',
    'Lost': '#D32F2F'
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sales Funnel</h1>
        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Pipeline Health &bull; Velocity</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 min-h-[70vh]">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = getLeadsByStage(stage);
          const accentColor = stageColors[stage] || '#64748b';
          
          return (
            <div key={stage} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <h3 className="font-bold text-slate-800 tracking-tight">{stage}</h3>
                  <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                    {stageLeads.length}
                  </span>
                </div>
                <MoreVertical size={16} className="text-slate-300 cursor-pointer hover:text-slate-500" />
              </div>

              <div className="space-y-4 p-3 bg-slate-50/50 rounded-[32px] min-h-[500px] border border-slate-50">
                {stageLeads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-100 rounded-[32px]">
                    <Target size={28} className="text-slate-200 mb-3" />
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Empty Stage</p>
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group hover:shadow-xl hover:shadow-blue-50/50"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-lg ${
                          lead.ai_score >= 8 ? 'text-[#228B22] bg-[#228B22]/10' : 
                          lead.ai_score >= 5 ? 'text-[#FBB03B] bg-[#FBB03B]/10' : 'text-[#D32F2F] bg-[#D32F2F]/10'
                        }`}>
                          IQ Score {lead.ai_score}
                        </span>
                        <div className="flex space-x-1">
                          {lead.source === 'whatsapp' && <MessageSquare size={14} className="text-[#228B22]" />}
                          {lead.source === 'missed_call' && <Phone size={14} className="text-[#D32F2F]" />}
                        </div>
                      </div>
                      
                      <p className="font-bold text-slate-900 mb-1 group-hover:text-[#3b82f6] transition-colors">{lead.name}</p>
                      <p className="text-[11px] text-slate-400 mb-5 font-medium leading-relaxed line-clamp-2 italic">"{lead.ai_summary}"</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-500">
                             {(lead.assigned_to || 'u3').charAt(0)}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{lead.assigned_to || 'u3'}</span>
                        </div>
                        <div className="flex space-x-1">
                          {PIPELINE_STAGES.indexOf(stage) < PIPELINE_STAGES.length - 1 && (
                            <button 
                              onClick={() => moveLead(lead, PIPELINE_STAGES[PIPELINE_STAGES.indexOf(stage) + 1])}
                              className="p-2 bg-slate-50 text-slate-300 hover:text-[#3b82f6] hover:bg-blue-50 rounded-xl transition-all"
                              title="Advance Stage"
                            >
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
