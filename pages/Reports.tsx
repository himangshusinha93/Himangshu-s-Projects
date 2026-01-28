import React from 'react';
import { Lead, LeadStatus } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { TrendingUp, Users, Target, Activity, Award } from 'lucide-react';

export default function Reports({ leads }: { leads: Lead[] }) {
  const sourceStats = Object.entries(leads.reduce((acc: any, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name: name.toUpperCase(), value }));

  const statusStats = Object.entries(leads.reduce((acc: any, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));

  const conversionRate = leads.length ? (leads.filter(l => l.status === LeadStatus.CONVERTED).length / leads.length * 100).toFixed(1) : '0';
  const workedPercent = leads.length ? (leads.filter(l => l.worked_flag).length / leads.length * 100).toFixed(0) : '0';

  // Palette from the reference image
  const COLORS = ['#FBB03B', '#228B22', '#87CEEB', '#332333', '#D32F2F', '#3b82f6'];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all">Export Report</button>
          <button className="px-6 py-3 bg-[#3b82f6] text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-600 transition-all">Monthly View</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <TrendingUp size={20} className="text-[#3b82f6]" />
            </div>
            <span className="text-[#228B22] text-[10px] font-bold uppercase tracking-widest">+5.2%</span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Conversion Ratio</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">{conversionRate}%</h3>
        </div>
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#87CEEB]/10 rounded-2xl">
              <Activity size={20} className="text-[#87CEEB]" />
            </div>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Engagement Depth</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">{workedPercent}%</h3>
        </div>
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#FBB03B]/10 rounded-2xl">
              <Target size={20} className="text-[#FBB03B]" />
            </div>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Funnel Velocity</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">4.2 <span className="text-sm text-slate-400 font-medium lowercase">days</span></h3>
        </div>
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#228B22]/10 rounded-2xl">
              <Award size={20} className="text-[#228B22]" />
            </div>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Top Performer</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">Rahul G.</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-10 tracking-tight">Channel Attribution</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={125}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-10 tracking-tight">Pipeline Stage Density</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f8fafc" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} width={100} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={32}>
                  {statusStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
