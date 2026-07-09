import React from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewOrderToastProps {
  isVisible: boolean;
  onClose: () => void;
  orderId: string;
}

export const NewOrderToast = ({ isVisible, onClose, orderId }: NewOrderToastProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -80, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 24, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: -80, x: '-50%', scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed top-0 left-1/2 z-[100] w-full max-w-md px-4"
        >
          <div className="bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl border border-orange-500/30 shadow-[0_20px_50px_rgba(249,115,22,0.15)] flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="bg-orange-500 text-white p-2.5 rounded-xl shadow-lg shadow-orange-500/20">
                <Bell className="animate-swing" size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-100">New Order Placed!</p>
                <p className="text-xs text-slate-400">Order ID <span className="font-mono text-orange-400 font-bold">{orderId}</span> needs your confirmation.</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
