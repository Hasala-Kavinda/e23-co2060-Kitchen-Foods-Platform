import React from 'react';
import { Order } from '../types';
import { X, Clock, User, DollarSign, ChevronRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: string, status: Order['status']) => void;
}

export const OrderDetailsModal = ({ order, onClose, onStatusChange }: OrderDetailsModalProps) => {
  const steps = [
    { key: 'pending', label: 'Received' },
    { key: 'preparing', label: 'In Kitchen' },
    { key: 'ready', label: 'Ready for Pickup' },
    { key: 'delivered', label: 'Completed' },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === order.status);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-850 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Order Details</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{order.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700/60 rounded-xl transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Progress Timeline */}
          {order.status !== 'cancelled' && (
            <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Preparation Flow</h4>
              <div className="flex justify-between items-center relative">
                {/* Connection Line */}
                <div className="absolute left-2.5 right-2.5 top-2.5 h-[2px] bg-slate-800 -z-10" />
                <div 
                  className="absolute left-2.5 top-2.5 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 -z-10"
                  style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, idx) => {
                  const done = idx <= currentStepIndex;
                  const active = idx === currentStepIndex;
                  return (
                    <div key={step.key} className="flex flex-col items-center gap-1.5 relative">
                      <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all duration-300 ${
                        active 
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110'
                          : done
                            ? 'bg-slate-900 border-orange-500 text-orange-400'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}>
                        {done && !active ? <Check size={10} strokeWidth={3} /> : idx + 1}
                      </div>
                      <span className={`text-[10px] font-bold ${
                        active ? 'text-orange-400 font-semibold' : done ? 'text-slate-300' : 'text-slate-500'
                      }`}>{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customer / Timing Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-slate-850 rounded-xl text-orange-400">
                <User size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Customer</span>
                <span className="text-xs text-white font-bold block truncate">{order.customerName}</span>
              </div>
            </div>
            <div className="p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-slate-850 rounded-xl text-orange-400">
                <Clock size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Deliver By</span>
                <span className="text-xs text-white font-bold block truncate">{order.deliveryTime}</span>
              </div>
            </div>
          </div>

          {/* Ordered items list */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Items Summary</h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm p-3 bg-slate-950/20 border border-slate-850 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 font-mono font-bold text-xs rounded-md">
                      {item.quantity}
                    </span>
                    <span className="text-slate-300 font-semibold">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description / Notes */}
          {order.description && (
            <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Chef Notes & Requests</h4>
              <p className="text-xs text-slate-300 leading-relaxed italic">"{order.description}"</p>
            </div>
          )}

          {/* Pricing Total */}
          <div className="flex justify-between items-center p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
            <span className="text-sm font-semibold text-slate-400">Total Price (incl. tax)</span>
            <span className="text-xl font-display font-bold text-white">Rs. {order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-850 bg-slate-950/40 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
          >
            Cancel
          </button>
          
          {order.status === 'pending' && (
            <button 
              onClick={() => { onStatusChange(order.id, 'preparing'); onClose(); }}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all"
            >
              Accept Order
            </button>
          )}
          {order.status === 'preparing' && (
            <button 
              onClick={() => { onStatusChange(order.id, 'ready'); onClose(); }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all"
            >
              Mark Ready
            </button>
          )}
          {order.status === 'ready' && (
            <button 
              onClick={() => { onStatusChange(order.id, 'delivered'); onClose(); }}
              className="px-4 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-xl text-xs font-bold active:scale-95 transition-all"
            >
              Complete Order
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
