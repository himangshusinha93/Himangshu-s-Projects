
import React from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS, MOCK_LEAVES } from '../constants';
import { Users2, Award, Calendar, CheckCircle, XCircle } from 'lucide-react';

export default function Team({ user }: { user: User }) {
  const teamMembers = MOCK_USERS.filter(u => u.role !== UserRole.ADMIN);
  const pendingLeaves = MOCK_LEAVES.filter(l => l.status === 'Pending');

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Management</h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Oversee execution &bull; Approve requests</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Snapshot */}
        <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 text-[#FBB03B]">
            <Award size={20} />
            <h2 className="text-lg font-bold tracking-tight">Top Performers</h2>
          </div>
          <div className="space-y-6">
            {teamMembers.slice(0, 2).map((m, i) => (
              <div key={m.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-slate-400 border border-slate-50">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{m.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{m.role.replace('_', ' ')}</p>
                  </div>
                </div>
                <span className="text-[#228B22] font-bold text-sm">92%</span>
              </div>
            ))}
          </div>
        </section>

        {/* User Directory */}
        <section className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 text-[#332333] mb-8">
            <Users2 size={20} />
            <h2 className="text-lg font-bold tracking-tight">Team Directory</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map(member => (
              <div key={member.id} className="p-6 bg-slate-50 rounded-[32px] flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-[#87CEEB]/10 flex items-center justify-center text-[#87CEEB] font-bold text-lg">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{member.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#228B22]"></div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Online</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center space-x-3 text-[#D32F2F] mb-8">
          <Calendar size={20} />
          <h2 className="text-xl font-bold tracking-tight">Pending Leave Approvals</h2>
        </div>
        
        {pendingLeaves.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingLeaves.map(leave => (
              <div key={leave.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Request by</p>
                  <p className="font-bold text-slate-800">{teamMembers.find(t => t.id === leave.userId)?.name}</p>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                  <span>{leave.type}</span>
                  <span>{leave.startDate} - {leave.endDate}</span>
                </div>
                <div className="pt-4 flex space-x-3">
                  <button className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"><XCircle size={18} /></button>
                  <button className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-green-50 hover:text-[#228B22] transition-all flex items-center justify-center"><CheckCircle size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 bg-slate-50 rounded-[40px] border border-dashed border-slate-100 text-center">
            <p className="text-slate-400 font-bold italic text-sm">No pending approvals at this time.</p>
          </div>
        )}
      </section>
    </div>
  );
}
