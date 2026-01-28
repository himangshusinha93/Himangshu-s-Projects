
import React from 'react';
import { User, Quotation, Invoice } from '../types';
import { MOCK_QUOTES, MOCK_INVOICES } from '../constants';
import { Briefcase, FileText, Send, CheckCircle, Clock } from 'lucide-react';

export default function Sales({ user }: { user: User }) {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sales Execution</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Manage quotes &bull; Track invoices</p>
        </div>
        <button className="px-8 py-3 bg-[#3b82f6] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all">
          Generate New Quote
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Quotations */}
        <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 text-[#FBB03B]">
            <FileText size={20} />
            <h2 className="text-lg font-bold tracking-tight">Recent Quotations</h2>
          </div>
          <div className="space-y-4">
            {MOCK_QUOTES.map(quote => (
              <div key={quote.id} className="p-6 bg-slate-50 rounded-3xl flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-50">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{quote.clientName}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">ID: {quote.id} &bull; Valid till {quote.validUntil}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-sm">₹{quote.total.toLocaleString()}</p>
                  <span className="text-[9px] font-bold uppercase text-[#FBB03B] tracking-widest">{quote.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Invoices */}
        <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 text-[#228B22]">
            <CheckCircle size={20} />
            <h2 className="text-lg font-bold tracking-tight">Pending Invoices</h2>
          </div>
          <div className="space-y-4">
            {MOCK_INVOICES.map(invoice => (
              <div key={invoice.id} className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:bg-white hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{invoice.clientName}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{invoice.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-[9px] font-bold uppercase tracking-widest ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-[#228B22]" style={{ width: `${(invoice.paidAmount / invoice.total) * 100}%` }}></div>
                </div>
                <div className="flex justify-between items-center mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>₹{invoice.paidAmount.toLocaleString()} Received</span>
                  <span>₹{invoice.total.toLocaleString()} Total</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-[#332333] p-10 rounded-[40px] text-white">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
             <Clock size={24} className="text-[#87CEEB]" />
             <h2 className="text-xl font-bold tracking-tight">Revenue Funnel Stats</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Total Sales (MTD)</p>
              <h3 className="text-3xl font-bold text-white">₹2,45,000</h3>
           </div>
           <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Unpaid Receivables</p>
              <h3 className="text-3xl font-bold text-[#FBB03B]">₹84,500</h3>
           </div>
           <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Conversion Rate</p>
              <h3 className="text-3xl font-bold text-[#228B22]">62%</h3>
           </div>
        </div>
      </section>
    </div>
  );
}
