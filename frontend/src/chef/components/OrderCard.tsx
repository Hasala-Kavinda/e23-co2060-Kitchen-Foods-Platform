import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { Clock, CheckCircle2, ChefHat, Package, AlertCircle, ArrowRight, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: Order['status']) => void;
  onViewDetails?: (order: Order) => void;
}

const statusConfig = {
  pending: { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20 glow-badge-amber', label: 'New Order' },
  preparing: { icon: ChefHat, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20 glow-badge-blue', label: 'Preparing' },
  ready: { icon: Package, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20 glow-badge-emerald', label: 'Ready' },
  delivered: { icon: CheckCircle2, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', label: 'Completed' },
  cancelled: { icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: 'Cancelled' },
};

export const OrderCard = ({ order, onStatusChange, onViewDetails }: OrderCardProps) => {
  const config = statusConfig[order.status] ?? statusConfig['pending'];
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    // Generate a random mock countdown duration for active orders, starting from 15-45 minutes
    if (order.status === 'delivered' || order.status === 'cancelled') {
      setTimeLeft('');
      return;
    }

    const minutes = Math.floor(10 + (parseInt(order.id.replace(/\D/g, '')) || 5) % 35);
    let secondsLeft = minutes * 60;

    const interval = setInterval(() => {
      if (secondsLeft <= 0) {
        setTimeLeft('Overdue!');
        clearInterval(interval);
      } else {
        secondsLeft--;
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        setTimeLeft(`${m}m ${s < 10 ? '0' : ''}${s}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [order.id, order.status]);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg ${
        order.status === 'pending' ? 'chef-order-pulse' : 'hover:border-slate-700/80'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${config.bg} ${config.color} border ${config.border.split(' ')[0]}`}>
            <config.icon size={18} className="stroke-[2.5]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white tracking-tight">{order.id}</h4>
            <p className="text-xs text-slate-400 line-clamp-1">{order.customerName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end text-xs font-semibold text-slate-400 mb-1">
            <Clock size={12} className="text-slate-500" />
            <span>{order.deliveryTime}</span>
          </div>
          {timeLeft && (
            <span className="text-[10px] text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/25 animate-pulse">
              ⏱️ {timeLeft}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1.5 mb-4 py-1.5 border-t border-b border-slate-800/60">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">
              <span className="text-orange-400 font-bold mr-1">{item.quantity}x</span> {item.name}
            </span>
            <span className="font-semibold text-slate-200">Rs. {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {order.description && (
        <div className="mb-4 p-2.5 bg-slate-950/50 border border-slate-800/80 rounded-xl text-[11px] text-slate-400">
          <span className="font-bold text-slate-300 block mb-0.5">Note:</span>
          <p className="line-clamp-2 italic">"{order.description}"</p>
        </div>
      )}

      <div className="pt-2 flex items-center justify-between">
        <div className="text-xs">
          <span className="text-slate-400">Total:</span>
          <span className="ml-1 font-bold text-white">Rs. {order.total.toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          {onViewDetails && (
            <button 
              onClick={() => onViewDetails(order)}
              className="p-2 bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700/50"
              title="View Details"
            >
              <Eye size={14} />
            </button>
          )}

          {order.status === 'pending' && (
            <button 
              onClick={() => onStatusChange(order.id, 'preparing')}
              className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-1"
            >
              Accept <ArrowRight size={12} />
            </button>
          )}
          {order.status === 'preparing' && (
            <button 
              onClick={() => onStatusChange(order.id, 'ready')}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1"
            >
              Ready <ArrowRight size={12} />
            </button>
          )}
          {order.status === 'ready' && (
            <button 
              onClick={() => onStatusChange(order.id, 'delivered')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-white text-slate-900 text-xs font-bold rounded-lg active:scale-95 transition-all"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
