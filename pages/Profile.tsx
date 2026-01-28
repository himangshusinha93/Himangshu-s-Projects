
import React, { useState } from 'react';
import { User, Task, LeaveRequest } from '../types';
import { Clock, Calendar, CheckSquare, Send, UserCheck, Timer, X, Plus } from 'lucide-react';

export default function Profile({ user, tasks, leaves, onAddTask, onAddLeave }: any) {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const myTasks = tasks.filter((t: Task) => t.assignedTo === user.id);
  const myLeaves = leaves.filter((l: LeaveRequest) => l.userId === user.id);

  const handleClockToggle = () => {
    const now = new Date().toLocaleTimeString();
    if (!isClockedIn) {
      setClockTime(now);
      setIsClockedIn(true);
    } else {
      setIsClockedIn(false);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    onAddTask({
      id: `t${Date.now()}`,
      title: newTaskTitle,
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      status: 'Pending',
      assignedTo: user.id
    });
    setNewTaskTitle('');
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
            <p className="text-sm font-bold text-slate-800">{isClockedIn ? `In: ${clockTime}` : 'Offline'}</p>
          </div>
          <button 
            onClick={handleClockToggle}
            className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
              isClockedIn ? 'bg-[#D32F2F] text-white' : 'bg-[#228B22] text-white'
            }`}
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 text-[#332333]">
            <Timer size={20} />
            <h2 className="text-lg font-bold tracking-tight">Daily Ops</h2>
          </div>
          <div className="space-y-4">
            <div className="p-5 bg-slate-50 rounded-2xl flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attendance</span>
              <span className="text-sm font-bold text-[#228B22]">94% MTD</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Leaves</span>
              <span className="text-sm font-bold text-slate-800">{myLeaves.length} used</span>
            </div>
          </div>
          <button 
            onClick={() => setShowLeaveModal(true)}
            className="w-full py-4 bg-[#332333] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-slate-800 transition-all"
          >
            Apply for Leave
          </button>
        </section>

        <section className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3 text-[#FBB03B]">
              <CheckSquare size={20} />
              <h2 className="text-lg font-bold tracking-tight">Work Queue</h2>
            </div>
          </div>

          <form onSubmit={handleAddTask} className="mb-6 flex space-x-3">
             <input 
              type="text" 
              placeholder="What needs doing?"
              className="flex-1 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#87CEEB] text-sm"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
             />
             <button type="submit" className="p-3 bg-[#87CEEB] text-white rounded-2xl hover:scale-105 transition-transform">
               <Plus size={20} />
             </button>
          </form>

          <div className="space-y-3">
            {myTasks.length > 0 ? myTasks.map((task: Task) => (
              <div key={task.id} className="p-5 bg-slate-50 rounded-[24px] flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-[#D32F2F]' : 'bg-[#FBB03B]'}`}></div>
                  <h3 className="font-bold text-slate-800 text-sm">{task.title}</h3>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{task.status}</span>
              </div>
            )) : <p className="text-center py-10 text-slate-300 font-bold italic">No tasks assigned.</p>}
          </div>
        </section>
      </div>

      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-md" onClick={() => setShowLeaveModal(false)} />
          <div className="relative bg-white rounded-[40px] shadow-3xl p-10 max-w-md w-full animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Request Leave</h2>
              <button onClick={() => setShowLeaveModal(false)}><X size={24} className="text-slate-300" /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              onAddLeave({
                id: `lv${Date.now()}`,
                userId: user.id,
                type: 'Casual',
                startDate: (e.target as any).start.value,
                endDate: (e.target as any).end.value,
                reason: (e.target as any).reason.value,
                status: 'Pending'
              });
              setShowLeaveModal(false);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="start" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold" />
                <input type="date" name="end" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold" />
              </div>
              <textarea name="reason" placeholder="Brief reason..." required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm min-h-[100px]" />
              <button type="submit" className="w-full py-4 bg-[#D32F2F] text-white font-bold rounded-2xl uppercase tracking-widest shadow-xl shadow-red-50">Submit Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
