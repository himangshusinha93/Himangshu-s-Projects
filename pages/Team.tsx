
import React from 'react';
import { User, UserRole, LeaveRequest } from '../types';
import { MOCK_USERS } from '../constants';
import { Users2, Award, Calendar, CheckCircle, XCircle } from 'lucide-react';

export default function Team({ user, leaves, onUpdateLeave }: any) {
  const teamMembers = MOCK_USERS.filter(u => u.role !== UserRole.ADMIN);
  const pendingLeaves = leaves.filter((l: LeaveRequest) => l.status === 'Pending');

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Hub</h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Oversee ops &bull; Manage approvals</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 text-[#FBB03B]">
            <Award size={20} />
            <h2 className="text-lg font-bold tracking-tight">Efficiency Score</h2>
          </div>
          <div className="space-y-6">
            {teamMembers.slice(0, 2).map((m, i) => (
              <div key={m.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-slate-300">
                    #{i + 1}
                  </div>
                  <p className="text-sm font-bold text-slate-800">{m.name}</p>
                </div>
                <span className="text-[#228B22] font-bold text-sm">92%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 text-[#332333] mb-8">
            <Users2 size={20} />
            <h2 className="text-lg font-bold tracking-tight">Active Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map(member => (
              <div key={member.id} className="p-6 bg-slate-50 rounded-[32px] flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#87CEEB]/10 flex items-center justify-center text-[#87CEEB] font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{member.name}</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#228B22] animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center space-x-3 text-[#D32F2F] mb-8">
          <Calendar size={20} />
          <h2 className="text-xl font-bold tracking-tight">Leave Approvals</h2>
        </div>
        
        {pendingLeaves.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingLeaves.map((leave: LeaveRequest) => (
              <div key={leave.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                    {MOCK_USERS.find(t => t.id === leave.userId)?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Request by</p>
                    <p className="font-bold text-slate-800">{MOCK_USERS.find(t => t.id === leave.userId)?.name}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                   <p className="text-xs font-bold text-slate-500">{leave.type} &bull; {leave.startDate} to {leave.endDate}</p>
                   <p className="text-sm italic text-slate-400">"{leave.reason}"</p>
                </div>
                <div className="pt-2 flex space-x-3">
                  <button onClick={() => onUpdateLeave(leave.id, 'Rejected')} className="flex-1 py-3 bg-red-50 text-[#D32F2F] rounded-2xl hover:bg-red-100 transition-colors font-bold text-[10px] uppercase tracking-widest">Reject</button>
                  <button onClick={() => onUpdateLeave(leave.id, 'Approved')} className="flex-1 py-3 bg-green-50 text-[#228B22] rounded-2xl hover:bg-green-100 transition-colors font-bold text-[10px] uppercase tracking-widest">Approve</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 bg-slate-50 rounded-[40px] border border-dashed border-slate-100 text-center">
            <p className="text-slate-300 font-bold italic text-sm">Clear skies. No pending leaves.</p>
          </div>
        )}
      </section>
    </div>
  );
}
