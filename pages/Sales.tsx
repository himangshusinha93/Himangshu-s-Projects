
import React, { useState } from 'react';
import { User, Quotation, Invoice } from '../types';
import { Briefcase, FileText, Send, CheckCircle, Clock, X, Plus } from 'lucide-react';

export default function Sales({ user, quotes, invoices, onAddQuote }: any) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Deal Desk</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Quotes &bull; Invoices &bull; Records</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-3 bg-[#3b82f6] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all"
        >
          Draft New Quote
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 text-[#FBB03B]">
            <FileText size={20} />
            <h2 className="text-lg font-bold tracking-tight">Active Quotes</h2>
          </div>
          <div className="space-y-4">
            {quotes.map((quote: Quotation) => (
              <div key={quote.id} className="p-6 bg-slate-50 rounded-3xl flex justify-between items-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-50">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{quote.clientName}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{quote.id} &bull; Valid {quote.validUntil}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-sm">₹{quote.total.toLocaleString()}</p>
                  <span className="text-[9px] font-bold uppercase text-[#FBB03B] tracking-widest">{quote.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center space-x-3 text-[#228B22]">
            <CheckCircle size={20} />
            <h2 className="text-lg font-bold tracking-tight">Billing Status</h2>
          </div>
          <div className="space-y-4">
            {invoices.map((inv: Invoice) => (
              <div key={inv.id} className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:bg-white hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{inv.clientName}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{inv.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-[9px] font-bold uppercase tracking-widest ${
                    inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {inv.status}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-[#228B22]" style={{ width: `${(inv.paidAmount / inv.total) * 100}%` }}></div>
                </div>
                <div className="flex justify-between items-center mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>₹{inv.paidAmount.toLocaleString()} collected</span>
                  <span>Goal: ₹{inv.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-[40px] shadow-3xl p-10 max-w-md w-full animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">New Quote</h2>
              <button onClick={() => setShowModal(false)}><X size={24} className="text-slate-300" /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              onAddQuote({
                id: `Q${Date.now()}`,
                clientName: (e.target as any).client.value,
                total: parseInt((e.target as any).value.value),
                status: 'Sent',
                validUntil: '2024-12-31',
                items: []
              });
              setShowModal(false);
            }} className="space-y-4">
              <input name="client" placeholder="Client Name" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm" />
              <input name="value" type="number" placeholder="Total Value (₹)" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold" />
              <button type="submit" className="w-full py-4 bg-[#3b82f6] text-white font-bold rounded-2xl uppercase tracking-widest shadow-xl shadow-blue-50">Issue Quotation</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
