
import React, { useState } from 'react';
import { User, Expense } from '../types';
import { Wallet, TrendingUp, TrendingDown, DollarSign, ArrowRight, X, Plus } from 'lucide-react';

export default function Accounts({ user, expenses, onAddExpense }: any) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Accounts</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Treasury &bull; Profit &bull; Payables</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-3 bg-[#D32F2F] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-red-100 hover:scale-[1.02] transition-all"
        >
          Log New Expense
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl text-[#228B22] mb-4">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">₹3,12,000</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Gross Income</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-red-50 rounded-2xl text-[#D32F2F] mb-4">
            <TrendingDown size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">₹{expenses.reduce((acc: number, e: Expense) => acc + e.amount, 0).toLocaleString()}</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Opex</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-[#87CEEB]/10 rounded-2xl text-[#87CEEB] mb-4">
            <DollarSign size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">₹12,800</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Incentives</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-3 text-[#332333] mb-10">
            <Wallet size={20} />
            <h2 className="text-lg font-bold tracking-tight">Ledger</h2>
          </div>
          <div className="space-y-4">
            {expenses.map((exp: Expense) => (
              <div key={exp.id} className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-slate-100">
                    <TrendingDown size={16} className="text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{exp.category}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{exp.date} &bull; {exp.paidBy}</p>
                  </div>
                </div>
                <p className="font-bold text-slate-900">₹{exp.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden flex flex-col">
          <h2 className="text-lg font-bold tracking-tight mb-8 relative z-10">Commission Desk</h2>
          <div className="space-y-6 relative z-10 flex-1">
             <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mb-2">My Payout</p>
                <h3 className="text-2xl font-bold text-amber-400">₹8,450</h3>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed italic">Commissions are auto-calculated at 2% on verified closures.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
             <button className="flex items-center text-[#87CEEB] font-bold text-sm hover:underline">
               Raise Payout Ticket <ArrowRight size={18} className="ml-2" />
             </button>
          </div>
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-[40px] shadow-3xl p-10 max-w-md w-full animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Log Expense</h2>
              <button onClick={() => setShowModal(false)}><X size={24} className="text-slate-300" /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              onAddExpense({
                id: `e${Date.now()}`,
                category: (e.target as any).cat.value,
                amount: parseInt((e.target as any).val.value),
                date: new Date().toISOString().split('T')[0],
                paidBy: user.name,
                remarks: ''
              });
              setShowModal(false);
            }} className="space-y-4">
              <select name="cat" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold">
                <option>Marketing</option>
                <option>Operations</option>
                <option>Travel</option>
                <option>Software</option>
              </select>
              <input name="val" type="number" placeholder="Amount (₹)" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold" />
              <button type="submit" className="w-full py-4 bg-[#D32F2F] text-white font-bold rounded-2xl uppercase tracking-widest shadow-xl shadow-red-50">Log Transaction</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
