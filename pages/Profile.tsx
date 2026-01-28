
import React, { useState } from 'react';
import { User, Task, LeaveRequest } from '../types';
import { MOCK_TASKS, MOCK_LEAVES } from '../constants';
import { Clock, Calendar, CheckSquare, Send, UserCheck, Timer } from 'lucide-react';

export default function Profile({ user }: { user: User }) {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS.filter(t => t.assignedTo === user.id));
  const [leaves, setLeaves] = useState<LeaveRequest[]>(MOCK_LEAVES.filter(l => l.userId === user.id));

  const handleClockToggle = () => {
    const now = new Date().toLocaleTimeString();
    if (!isClockedIn) {
      setClockTime(now);
      setIsClockedIn(true);
    } else {
      setIsClockedIn(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-3xl font-bold text-[#87CEEB] border border-slate-50 shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{user.name}</h1>
            <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.2em] mt-1">
              {user.role.replace('_', ' ')} &bull; {user.email}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center space-x-6">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Shift Status</p>
            <p className="text-sm font-bold text-slate-800">{isClockedIn ? `Clocked In at ${clockTime}` : 'Offline'}</p>
          </div>
          <button 
            onClick={handleClockToggle}
            className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
              isClockedIn 
                ? 'bg-[#D32F2F] text-white shadow-xl shadow-red-100' 
                : 'bg-[#228B22] text-white shadow-xl shadow-green-100'
            }`}
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Work Log & Attendance */}
        <section className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 text-[#332333]">
            <Timer size={20} />
            <h2 className="text-lg font-bold tracking-tight">Work Log</h2>
          </div>
          <div className="space-y-4">
            <div className="p-5 bg-slate-50 rounded-2xl flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attendance</span>
              <span className="text-sm font-bold text-[#228B22]">94% Monthly</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Leaves Taken</span>
              <span className="text-sm font-bold text-slate-800">2 / 12 Days</span>
            </div>
          </div>
          
          <div className="pt-4">
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-slate-800 transition-all">
              Request Leave
            </button>
          </div>
        </section>

        {/* My Tasks */}
        <section className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3 text-[#FBB03B]">
              <CheckSquare size={20} />
              <h2 className="text-lg font-bold tracking-tight">My Tasks</h2>
            </div>
            <button className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-widest hover:underline">+ New Task</button>
          </div>

          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="group p-6 bg-slate-50 rounded-[32px] border border-transparent hover:border-slate-100 transition-all flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${task.priority === 'High' ? 'bg-[#D32F2F]' : 'bg-[#FBB03B]'}`}></div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{task.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Due {task.dueDate} &bull; {task.linkedEntity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                   <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white rounded-lg text-slate-400">{task.status}</span>
                   <button className="p-2 text-slate-200 hover:text-[#228B22] transition-colors"><UserCheck size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-[#332333] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <Send size={120} />
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-8">Leave History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leaves.map(leave => (
            <div key={leave.id} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{leave.type} Leave</p>
                <p className="font-bold text-sm">{leave.startDate} to {leave.endDate}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest ${
                leave.status === 'Approved' ? 'bg-[#228B22]/20 text-[#228B22]' : 'bg-[#FBB03B]/20 text-[#FBB03B]'
              }`}>
                {leave.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
