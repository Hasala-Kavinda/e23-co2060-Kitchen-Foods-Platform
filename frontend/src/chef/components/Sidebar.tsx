import React, { useState } from 'react';
import { LayoutDashboard, Utensils, ClipboardList, Settings, LogOut, User, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';
import { ChefProfile } from '../types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
  profile: ChefProfile;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: ClipboardList, label: 'Orders' },
  { icon: Utensils, label: 'Menu Items' },
  { icon: User, label: 'Profile' },
  { icon: Settings, label: 'Settings' },
];

export const Sidebar = ({ activeTab, onTabChange, onLogout, isOpen, onClose, profile }: SidebarProps) => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 26, stiffness: 190 }}
            className="fixed inset-y-0 left-0 w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50 shadow-2xl lg:shadow-none"
          >
            {/* Header / Brand */}
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                    <Utensils size={22} className="stroke-[2.5]" />
                  </div>
                  <span className="text-xl font-display font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    ChefDash
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-200 lg:hidden"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chef Mini Profile Card */}
            <div className="px-6 py-4 my-2">
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 flex flex-col items-center text-center">
                <div className="relative mb-2.5">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-16 h-16 rounded-full border-2 border-orange-500/40 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className={cn(
                    "absolute bottom-0.5 right-0.5 w-3.5 h-3.5 border-2 border-slate-900 rounded-full",
                    isOnline ? "bg-emerald-500" : "bg-slate-500"
                  )} />
                </div>
                <h4 className="font-bold text-sm text-slate-100 line-clamp-1">{profile.name}</h4>
                <p className="text-[10px] text-orange-500 font-semibold mb-3 tracking-wide uppercase">{profile.specialty.split(" ").slice(0, 2).join(" ")}</p>
                
                {/* Online/Offline Status Switcher */}
                <button 
                  onClick={() => setIsOnline(!isOnline)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200",
                    isOnline 
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                      : "bg-slate-800/30 border-slate-700/60 text-slate-400"
                  )}
                >
                  <span>Kitchen {isOnline ? 'Open' : 'Closed'}</span>
                  {isOnline ? (
                    <ToggleRight className="text-emerald-400" size={18} />
                  ) : (
                    <ToggleLeft className="text-slate-500" size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Navigation links */}
            <div className="px-6 flex-1 overflow-y-auto">
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = activeTab === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        onTabChange(item.label);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={cn(
                        "w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                        isActive
                          ? "text-orange-500 bg-orange-500/10 border border-orange-500/20" 
                          : "text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent"
                      )}
                    >
                      <item.icon size={18} className={cn(
                        isActive ? "text-orange-500 stroke-[2.5]" : "text-slate-400 group-hover:text-white"
                      )} />
                      <span>{item.label}</span>
                      
                      {/* Active indicator bubble (sliding effect placeholder) */}
                      {isActive && (
                        <span className="absolute right-3 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-lg shadow-orange-500" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Footer / Sign Out */}
            <div className="mt-auto p-6 border-t border-slate-800/60">
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition-all duration-200"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
