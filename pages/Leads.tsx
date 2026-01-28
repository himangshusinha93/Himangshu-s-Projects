import React, { useState, useMemo } from 'react';
import { Lead, User, LeadStatus, LeadSource, UserRole, LeadNote } from '../types';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  Info,
  ChevronRight,
  User as UserIcon,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ExternalLink,
  Target,
  Zap,
  Loader2,
  X,
  History,
  Send,
  ArrowRight
} from 'lucide-react';
import { PIPELINE_STAGES } from '../constants';
import { qualifyLeadAI, suggestNextActionAI } from '../services/geminiService';

const StatusBadge = ({ status }: { status: LeadStatus }) => {
  const styles = {
    [LeadStatus.NEW]: 'bg-[#87CEEB]/10 text-[#87CEEB]',
    [LeadStatus.QUALIFIED]: 'bg-[#FBB03B]/10 text-[#FBB03B]',
    [LeadStatus.CONTACTED]: 'bg-[#332333]/10 text-[#332333]',
    [LeadStatus.QUOTE]: 'bg-[#3b82f6]/10 text-[#3b82f6]',
    [LeadStatus.CONVERTED]: 'bg-[#228B22]/10 text-[#228B22]',
    [LeadStatus.LOST]: 'bg-[#D32F2F]/10 text-[#D32F2F]',
  };
  return <span className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>{status}</span>;
};

const SourceIcon = ({ source }: { source: LeadSource }) => {
  switch (source) {
    case LeadSource.WHATSAPP: return <MessageSquare size={16} className="text-[#228B22]" />;
    case LeadSource.MISSED_CALL: return <Phone size={16} className="text-[#D32F2F]" />;
    case LeadSource.FACEBOOK: return <Mail size={16} className="text-[#3b82f6]" />;
    case LeadSource.INDIAMART: return <ExternalLink size={16} className="text-[#FBB03B]" />;
    default: return <FileText size={16} className="text-slate-400" />;
  }
};

export default function Leads({ leads, onUpdateLead, onAddLead, user, users }: any) {
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadName, setNewLeadName] = useState('');
  const [newNote, setNewNote] = useState('');
  const [qualifying, setQualifying] = useState(false);
  const [aiActionSuggestion, setAiActionSuggestion] = useState('');
  const [loadingAiSuggestion, setLoadingAiSuggestion] = useState(false);

  const filteredLeads = useMemo(() => {
    let result = leads;
    if (user.role === UserRole.SALES_EXECUTIVE) {
      result = result.filter((l: Lead) => l.assigned_to === user.id);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l: Lead) => 
        l.name.toLowerCase().includes(q) || 
        l.phone_number.includes(q)
      );
    }
    return result;
  }, [leads, search, user]);

  const handleAddManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadPhone || !newLeadName) return;

    setQualifying(true);
    const id = `L${Date.now()}`;
    const leadData: Partial<Lead> = {
      id,
      name: newLeadName,
      phone_number: newLeadPhone,
      source: LeadSource.MANUAL,
      status: LeadStatus.NEW,
      stage: 'New',
      assigned_to: user.role === UserRole.SALES_EXECUTIVE ? user.id : undefined,
      created_at: new Date().toISOString(),
      last_activity_at: new Date().toISOString(),
      notes: [],
      worked_flag: false
    };

    const aiResult = await qualifyLeadAI(leadData);
    const finalLead = {
      ...leadData,
      ai_score: aiResult?.ai_score || 5,
      ai_summary: aiResult?.ai_summary || 'Manual entry. Qualification pending.',
    } as Lead;

    onAddLead(finalLead);
    setIsAddingLead(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setQualifying(false);
  };

  const handleStatusChange = (lead: Lead, newStatus: LeadStatus) => {
    const worked = newStatus !== LeadStatus.NEW;
    const updated = { 
      ...lead, 
      status: newStatus, 
      stage: newStatus.toString(), 
      worked_flag: worked,
      last_activity_at: new Date().toISOString()
    };
    onUpdateLead(updated);
    if (selectedLead?.id === lead.id) {
      setSelectedLead(updated);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote || !selectedLead) return;
    
    const note: LeadNote = {
      id: `n${Date.now()}`,
      text: newNote,
      createdAt: new Date().toISOString(),
      author: user.name
    };

    const updated = {
      ...selectedLead,
      notes: [note, ...selectedLead.notes],
      last_activity_at: new Date().toISOString(),
      worked_flag: true
    };
    
    onUpdateLead(updated);
    setSelectedLead(updated);
    setNewNote('');
  };

  const handleSuggestAction = async () => {
    if (!selectedLead) return;
    setLoadingAiSuggestion(true);
    try {
      const suggestion = await suggestNextActionAI(selectedLead);
      setAiActionSuggestion(suggestion || 'No suggestion available.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAiSuggestion(false);
    }
  };

  return (
    <div className="space-y-8 relative min-h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Leads Module</h1>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none w-72 text-sm font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsAddingLead(true)}
            className="flex items-center space-x-2 bg-[#3b82f6] text-white px-6 py-3 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 font-bold"
          >
            <Plus size={20} />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contact Info</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Source</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Assigned To</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">AI Score</th>
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredLeads.map((lead: Lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div onClick={() => setSelectedLead(lead)} className="cursor-pointer">
                    <p className="font-bold text-slate-800 group-hover:text-[#3b82f6] transition-colors">
                      {lead.name}
                    </p>
                    <p className="text-xs text-slate-400 font-medium mt-1">{lead.phone_number}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <SourceIcon source={lead.source} />
                    <span className="text-sm text-slate-600 font-bold capitalize">{lead.source.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm text-slate-600 font-medium">
                    {users.find((u: any) => u.id === lead.assigned_to)?.name || 'Unassigned'}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                    lead.ai_score >= 8 ? 'bg-[#228B22]/10 text-[#228B22]' : 
                    lead.ai_score >= 5 ? 'bg-[#FBB03B]/10 text-[#FBB03B]' : 'bg-[#D32F2F]/10 text-[#D32F2F]'
                  }`}>
                    {lead.ai_score}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button onClick={() => setSelectedLead(lead)} className="text-slate-300 hover:text-[#3b82f6] p-2 rounded-xl hover:bg-blue-50 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal/Sidebar */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]" onClick={() => { setSelectedLead(null); setAiActionSuggestion(''); }} />
          <div className="relative w-full max-w-2xl bg-white h-screen shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedLead.name}</h2>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">{selectedLead.phone_number}</p>
              </div>
              <button onClick={() => { setSelectedLead(null); setAiActionSuggestion(''); }} className="p-3 text-slate-300 hover:bg-slate-50 rounded-2xl transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-10 space-y-12">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-[32px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Lead Source</p>
                  <div className="flex items-center space-x-3">
                    <SourceIcon source={selectedLead.source} />
                    <span className="font-bold text-slate-800 capitalize">{selectedLead.source.replace('_', ' ')}</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-[32px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Account Manager</p>
                  <div className="flex items-center space-x-3">
                    <UserIcon size={18} className="text-slate-300" />
                    <span className="font-bold text-slate-800">{users.find((u: any) => u.id === selectedLead.assigned_to)?.name || 'Unassigned'}</span>
                  </div>
                </div>
              </div>

              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                  Pipeline Stage
                </h3>
                <div className="flex flex-wrap gap-3">
                  {PIPELINE_STAGES.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => handleStatusChange(selectedLead, stage as LeadStatus)}
                      className={`px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider border transition-all ${
                        selectedLead.status === stage 
                          ? 'bg-[#3b82f6] text-white border-blue-600 shadow-xl shadow-blue-100' 
                          : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </section>

              <section className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute bottom-0 right-0 p-10 opacity-5">
                   <Zap size={100} />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Zap size={20} className="text-amber-400" fill="currentColor" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">AI Intent Summary</h3>
                  </div>
                  <div className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest ${
                    selectedLead.ai_score >= 8 ? 'bg-[#228B22] text-white' : 'bg-[#FBB03B] text-slate-900'
                  }`}>
                    Quality: {selectedLead.ai_score}/10
                  </div>
                </div>
                <p className="text-lg text-slate-200 italic leading-relaxed mb-8">"{selectedLead.ai_summary}"</p>
                
                <div className="pt-8 border-t border-white/10">
                  <button 
                    onClick={handleSuggestAction}
                    disabled={loadingAiSuggestion}
                    className="flex items-center space-x-3 text-amber-400 font-bold text-sm hover:text-amber-300 disabled:opacity-50 transition-all"
                  >
                    {loadingAiSuggestion ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
                    <span>Suggest Strategic Move</span>
                  </button>
                  {aiActionSuggestion && (
                    <div className="mt-6 p-6 bg-white/5 border border-white/5 rounded-3xl text-[15px] text-slate-300 leading-relaxed font-medium">
                      {aiActionSuggestion}
                    </div>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    Interaction Log
                  </h3>
                </div>
                
                <form onSubmit={handleAddNote} className="mb-10 relative">
                  <textarea
                    placeholder="Document interactions..."
                    className="w-full p-6 pr-16 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-medium focus:ring-4 focus:ring-blue-100 focus:outline-none min-h-[140px] transition-all"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button type="submit" className="absolute bottom-6 right-6 p-4 bg-[#3b82f6] text-white rounded-2xl hover:bg-blue-600 shadow-xl shadow-blue-100 transition-all">
                    <Send size={18} />
                  </button>
                </form>

                <div className="space-y-6">
                  {selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((note) => (
                      <div key={note.id} className="flex space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-500">
                          {note.author.charAt(0)}
                        </div>
                        <div className="bg-slate-50 p-6 rounded-[32px] rounded-tl-none border border-slate-50 flex-1">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-slate-900">{note.author}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(note.createdAt).toLocaleDateString('en-IN')}</span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">{note.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-[40px] border border-dashed border-slate-100">
                      <p className="text-sm text-slate-400 font-bold italic">No logs available.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-md" onClick={() => setIsAddingLead(false)} />
          <div className="relative bg-white rounded-[40px] shadow-3xl p-10 max-w-md w-full animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Lead Capture</h2>
            <p className="text-slate-400 text-sm font-medium mb-10 leading-snug">Manual entry for offline or direct inquiries.</p>
            
            <form onSubmit={handleAddManualLead} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-2">Full Legal Name</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all" 
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-2">Phone Identifier</label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all" 
                  placeholder="+91 00000 00000"
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                />
              </div>
              
              <div className="pt-8 flex space-x-4">
                <button 
                  type="button" 
                  onClick={() => setIsAddingLead(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={qualifying}
                  className="flex-[2] py-4 bg-[#3b82f6] text-white font-bold rounded-2xl hover:bg-blue-600 flex items-center justify-center space-x-3 shadow-2xl shadow-blue-100 transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {qualifying ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                  <span>{qualifying ? 'Analyzing...' : 'Initialize Lead'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
