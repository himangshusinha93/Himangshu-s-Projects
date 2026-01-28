
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  BarChart3, 
  Settings, 
  LogOut, 
  UserCircle,
  Briefcase,
  Wallet,
  Users2
} from 'lucide-react';

import { Lead, User, UserRole } from './types';
import { MOCK_LEADS, MOCK_USERS } from './constants';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Pipeline from './pages/Pipeline';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Team from './pages/Team';
import Sales from './pages/Sales';
import Accounts from './pages/Accounts';

const Navbar = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-64 bg-white border-r border-slate-100 h-screen fixed left-0 top-0 flex flex-col z-10">
      <div className="p-8">
        <div className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
             <div className="w-4 h-4 bg-white/30 rounded-sm transform rotate-45"></div>
           </div>
           <h1 className="text-xl font-bold text-slate-800 tracking-tight">Sales CRM</h1>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">Sales CRM<br/>Energy</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-2 mt-2">
        <Link to="/" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
          <div className="p-2 rounded-xl bg-slate-100 text-[#332333]">
            <LayoutDashboard size={18} />
          </div>
          <span className={`text-sm font-bold ${isActive('/') ? 'text-slate-900' : 'text-slate-400'}`}>Dashboard</span>
        </Link>
        <Link to="/leads" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/leads') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
          <div className="p-2 rounded-xl bg-[#87CEEB]/10 text-[#87CEEB]">
            <Users size={18} />
          </div>
          <span className={`text-sm font-bold ${isActive('/leads') ? 'text-slate-900' : 'text-slate-400'}`}>Leads</span>
        </Link>
        <Link to="/pipeline" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/pipeline') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
          <div className="p-2 rounded-xl bg-[#FBB03B]/10 text-[#FBB03B]">
            <Kanban size={18} />
          </div>
          <span className={`text-sm font-bold ${isActive('/pipeline') ? 'text-slate-900' : 'text-slate-400'}`}>Pipeline</span>
        </Link>
        
        {/* New Shared Modules */}
        <Link to="/sales" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/sales') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
          <div className="p-2 rounded-xl bg-[#228B22]/10 text-[#228B22]">
            <Briefcase size={18} />
          </div>
          <span className={`text-sm font-bold ${isActive('/sales') ? 'text-slate-900' : 'text-slate-400'}`}>Sales</span>
        </Link>
        <Link to="/accounts" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/accounts') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
          <div className="p-2 rounded-xl bg-[#D32F2F]/10 text-[#D32F2F]">
            <Wallet size={18} />
          </div>
          <span className={`text-sm font-bold ${isActive('/accounts') ? 'text-slate-900' : 'text-slate-400'}`}>Accounts</span>
        </Link>

        {/* New Role-Based Module */}
        {(user.role === UserRole.ADMIN || user.role === UserRole.SALES_MANAGER) && (
          <Link to="/team" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/team') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
            <div className="p-2 rounded-xl bg-[#332333]/10 text-[#332333]">
              <Users2 size={18} />
            </div>
            <span className={`text-sm font-bold ${isActive('/team') ? 'text-slate-900' : 'text-slate-400'}`}>My Team</span>
          </Link>
        )}

        <Link to="/profile" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/profile') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
          <div className="p-2 rounded-xl bg-[#87CEEB]/10 text-[#87CEEB]">
            <UserCircle size={18} />
          </div>
          <span className={`text-sm font-bold ${isActive('/profile') ? 'text-slate-900' : 'text-slate-400'}`}>My Profile</span>
        </Link>

        <Link to="/reports" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/reports') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
          <div className="p-2 rounded-xl bg-[#332333]/10 text-[#332333]">
            <BarChart3 size={18} />
          </div>
          <span className={`text-sm font-bold ${isActive('/reports') ? 'text-slate-900' : 'text-slate-400'}`}>Analytics</span>
        </Link>

        {user.role === UserRole.ADMIN && (
          <Link to="/settings" className={`flex items-center space-x-4 p-3 rounded-2xl transition-all ${isActive('/settings') ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
            <div className="p-2 rounded-xl bg-[#D32F2F]/10 text-[#D32F2F]">
              <Settings size={18} />
            </div>
            <span className={`text-sm font-bold ${isActive('/settings') ? 'text-slate-900' : 'text-slate-400'}`}>Admin</span>
          </Link>
        )}
      </div>

      <div className="p-6 border-t border-slate-50 mt-auto">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 w-full p-3 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-bold">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('crm_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    
    const savedLeads = localStorage.getItem('crm_leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    } else {
      setLeads(MOCK_LEADS);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('crm_leads', JSON.stringify(leads));
    }
  }, [leads, initialized]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('crm_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('crm_user');
  };

  const updateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  const addLead = (newLead: Lead) => {
    const existing = leads.find(l => l.phone_number === newLead.phone_number);
    if (existing) {
      alert("Lead already exists.");
      return;
    }
    setLeads(prev => [newLead, ...prev]);
  };

  if (!initialized) return <div className="flex items-center justify-center h-screen bg-white font-bold text-slate-400 uppercase tracking-widest">Initializing CRM...</div>;

  if (!currentUser) return <Auth onLogin={handleLogin} />;

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-white">
        <Navbar user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 ml-64 p-10 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard leads={leads} user={currentUser} />} />
            <Route path="/leads" element={<Leads leads={leads} onUpdateLead={updateLead} onAddLead={addLead} user={currentUser} users={MOCK_USERS} />} />
            <Route path="/pipeline" element={<Pipeline leads={leads} onUpdateLead={updateLead} />} />
            <Route path="/sales" element={<Sales user={currentUser} />} />
            <Route path="/accounts" element={<Accounts user={currentUser} />} />
            <Route path="/team" element={(currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.SALES_MANAGER) ? <Team user={currentUser} /> : <Navigate to="/" />} />
            <Route path="/profile" element={<Profile user={currentUser} />} />
            <Route path="/reports" element={<Reports leads={leads} />} />
            <Route path="/settings" element={currentUser.role === UserRole.ADMIN ? <SettingsPage /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
