
import React from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../constants';
import { ShieldCheck, LogIn } from 'lucide-react';

export default function Auth({ onLogin }: { onLogin: (user: User) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Multi-Channel Sales CRM</h1>
          <p className="text-slate-500 mt-2">Sign in with Google to access Bharat CRM</p>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-2">Select a Role (Simulation)</p>
          {MOCK_USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => onLogin(user)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-blue-200 flex items-center justify-center font-bold text-slate-600 group-hover:text-blue-600">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.role.replace('_', ' ')}</p>
                </div>
              </div>
              <LogIn size={18} className="text-slate-400 group-hover:text-blue-500" />
            </button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 italic">Internal CRM Application &bull; India First</p>
        </div>
      </div>
    </div>
  );
}
