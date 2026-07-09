import React from 'react';
import { motion } from 'motion/react';
import { ChefHat } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-brand-cream flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        key="logo-reveal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "backOut" }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="w-24 h-24 bg-brand-primary rounded-3xl flex items-center justify-center text-white shadow-2xl mb-8"
        >
          <ChefHat size={48} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900 mb-2">Kitchen Foods</h1>
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-brand-primary rounded-full"
            />
            <p className="text-stone-500 font-mono text-xs uppercase tracking-[0.3em]">Excellence Loading</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
