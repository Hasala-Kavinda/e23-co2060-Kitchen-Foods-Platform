import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'orange' | 'emerald' | 'blue' | 'amber';
}

const colorMap = {
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20 glow-badge-orange',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 glow-badge-emerald',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20 glow-badge-blue',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20 glow-badge-amber',
};

export const StatsCard = ({ label, value, icon: Icon, trend, color }: StatsCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl chef-glass-card border border-slate-800/80"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorMap[color]} border`}>
          <Icon size={22} className="stroke-[2]" />
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            trend.isPositive 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-2xl font-display font-bold text-white tracking-tight">{value}</h3>
      </div>
    </motion.div>
  );
};
