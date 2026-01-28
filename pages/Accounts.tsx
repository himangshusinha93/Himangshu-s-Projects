
import React from 'react';
import { User, Expense } from '../types';
import { MOCK_EXPENSES } from '../constants';
import { Wallet, TrendingUp, TrendingDown, DollarSign, ArrowRight } from 'lucide-react';

export default function Accounts({ user }: { user: User }) {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Controls</h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Treasury &bull; Profitability &bull; Payouts</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl text-[#228B22] mb-4">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">₹3,12,000</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Net Income</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-red-50 rounded-2xl text-[#D32F2F] mb-4">
            <TrendingDown size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">₹45,200</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Operational Expense</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="p-4 bg-[#87CEEB]/10 rounded-2xl text-[#87CEEB] mb-4">
            <DollarSign size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">₹12,800</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Pending Commissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3 text-[#332333]">
              <Wallet size={20} />
              <h2 className="text-lg font-bold tracking-tight">Expense Register</h2>
            </div>
            <button className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-widest hover:underline">Log Expense</button>
          </div>
          <div className="space-y-4">
            {MOCK_EXPENSES.map(exp => (
              <div key={exp.id} className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-slate-100">
                    <TrendingDown size={16} className="text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{exp.category}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{exp.date} &bull; Paid by {exp.paidBy}</p>
                  </div>
                </div>
                <p className="font-bold text-slate-900">₹{exp.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-[-20%] left-[-20%] w-full h-full bg-[#87CEEB]/10 blur-[100px] rounded-full"></div>
          <h2 className="text-lg font-bold tracking-tight mb-8 relative z-10">Commission Calculator</h2>
          <div className="space-y-6 relative z-10 flex-1">
             <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mb-2">My Current Earnings</p>
                <h3 className="text-2xl font-bold">₹8,450</h3>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed italic">Commissions are auto-calculated based on a 2% base rate on all closed deals for your region.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
             <button className="flex items-center text-amber-400 font-bold text-sm hover:underline">
               Request Payout <ArrowRight size={18} className="ml-2" />
             </button>
          </div>
        </section>
      </div>
    </div>
  );
}
