
import React, { useState, useEffect, useMemo } from 'react';
import { Lead, User, UserRole, LeadStatus, LeadSource } from '../types';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  PhoneOutgoing, 
  ArrowUpRight, 
  Zap,
  Loader2,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { summarizeDashboardAI } from '../services/geminiService';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <span className="flex items-center text-emerald-500 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-lg">
          <ArrowUpRight size={16} className="mr-1" /> {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
  </div>
);

export default function Dashboard({ leads, user }: { leads: Lead[]; user: User }) {
  const [aiSummary, setAiSummary] = useState<string | undefined>("");
  const [loadingAI, setLoadingAI] = useState(false);

  // Filter leads if Executive
  const filteredLeads = useMemo(() => {
    if (user.role === UserRole.SALES_EXECUTIVE) {
      return leads.filter(l => l.assigned_to === user.id);
    }
    return leads;
  }, [leads, user]);

  const stats = useMemo(() => {
    const total = filteredLeads.length;
    const worked = filteredLeads.filter(l => l.worked_flag || l.status !== LeadStatus.NEW).length;
    const unworked = total - worked;
    const converted = filteredLeads.filter(l => l.status === LeadStatus.CONVERTED).length;
    const conversionRate = total > 0 ? (converted / total) * 100 : 0;

    const sourceData: Record<string, number> = {};
    filteredLeads.forEach(l => {
      sourceData[l.source] = (sourceData[l.source] || 0) + 1;
    });

    return {
      total,
      worked,
      unworked,
      conversionRate,
      sourceData: Object.entries(sourceData).map(([name, value]) => ({ name: name.replace('_', ' ').toUpperCase(), value }))
    };
  }, [filteredLeads]);

  useEffect(() => {
    const getSummary = async () => {
      setLoadingAI(true);
      try {
        const text = await summarizeDashboardAI(stats);
        setAiSummary(text);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAI(false);
      }
    };
    getSummary();
  }, [stats]);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.name}</h1>
          <p className="text-slate-500">Here's what's happening in your sales pipeline today.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
          <Calendar size={18} className="text-slate-400" />
          <span className="text-sm font-medium text-slate-700">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={user.role === UserRole.SALES_EXECUTIVE ? "Assigned Leads" : "Total Leads"} 
          value={stats.total} 
          icon={Users} 
          color="bg-blue-500" 
          trend="+12%"
        />
        <StatCard 
          title="Worked Leads" 
          value={stats.worked} 
          icon={CheckCircle} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Leads Requiring Follow-up" 
          value={stats.unworked} 
          icon={Clock} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${stats.conversionRate.toFixed(1)}%`} 
          icon={TrendingUp} 
          color="bg-indigo-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Leads by Source</h2>
            <button className="text-blue-600 text-sm font-medium hover:underline">View detailed report</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.sourceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {stats.sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-2xl shadow-lg text-white">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="text-amber-400" fill="currentColor" size={20} />
            <h2 className="text-lg font-bold">AI Performance Summary</h2>
          </div>
          
          {loadingAI ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <Loader2 className="animate-spin text-blue-400" size={32} />
              <p className="text-slate-400 text-sm italic">Analyzing your sales trends...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm">
              <p className="text-indigo-100 leading-relaxed">
                {aiSummary || "No AI summary available. Start engaging with leads to see insights."}
              </p>
              <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">Recommended Strategy</p>
                <p className="text-sm">Increase focus on WhatsApp leads as they currently show a 15% higher conversion intent score.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
