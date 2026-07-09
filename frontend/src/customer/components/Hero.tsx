import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, MapPin, ShieldCheck, Clock, Star, ChevronRight, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#menu');
    }
  };

  const trustBadges = [
    { icon: <ShieldCheck size={14} />, label: "Verified Chefs" },
    { icon: <MapPin size={14} />, label: "Hyper-Local" },
    { icon: <Star size={14} />, label: "4.9 Avg Rating" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdf8f3 0%, #f5f0e8 50%, #f0ebe0 100%)' }}>
      {/* Ambient blobs */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #F27D26 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #d4521a 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center pt-28 pb-16">
        {/* LEFT: Text Content */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] font-mono">Sri Lanka's Home Kitchen Network</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] text-stone-900 mb-6"
          >
            Real food,<br />
            real kitchens,<br />
            <span className="italic text-brand-primary">real people.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-stone-600 mb-10 max-w-md leading-relaxed"
          >
            Skip the restaurant. Order authentic, home-cooked Sri Lankan meals directly from verified local chefs within 10 km of you.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5 mb-12"
          >
            <button
              onClick={scrollToMenu}
              className="group px-8 py-4 bg-stone-900 text-white rounded-full font-bold text-base flex items-center gap-3 hover:bg-brand-primary transition-colors duration-300 shadow-2xl shadow-stone-900/20"
            >
              Order Now
              <span className="w-8 h-8 rounded-full bg-brand-primary group-hover:bg-white group-hover:text-stone-900 flex items-center justify-center transition-colors duration-300">
                <ArrowRight size={16} className="-rotate-45" />
              </span>
            </button>
            <Link to="/impact" className="text-sm font-bold text-stone-900/60 hover:text-brand-primary transition-colors flex items-center gap-2">
              Meet our chefs <ChevronRight size={16} />
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-stone-900/8 text-xs font-semibold text-stone-600 shadow-sm">
                <span className="text-brand-primary">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Image Mosaic */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          className="relative hidden lg:flex items-center justify-center h-[550px]"
        >
          {/* Main large image */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-80 h-80 rounded-[48px] overflow-hidden shadow-2xl shadow-brand-primary/20 border-[8px] border-white z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800"
              alt="Sri Lankan rice and curry"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-serif font-bold text-3xl drop-shadow-md mb-2">Rice & Curry Set</p>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-bold tracking-wider uppercase border border-white/30 shadow-sm">
                  From LKR 1,350
                </span>
                <span className="flex items-center gap-1.5 text-white/90 text-sm font-bold bg-stone-900/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <Star size={14} className="fill-brand-primary text-brand-primary"/> 4.9
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top-right floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, 15, 0], rotate: [0, 4, 0] }}
            transition={{
              opacity: { delay: 0.6, duration: 0.8 },
              scale: { delay: 0.6, duration: 0.8 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
            className="absolute top-4 right-0 w-52 h-52 rounded-[40px] overflow-hidden shadow-2xl shadow-stone-900/15 border-[8px] border-white z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400"
              alt="Watalappan dessert"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </motion.div>

          {/* Bottom-left floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -12, 0], rotate: [0, -5, 0] }}
            transition={{
              opacity: { delay: 0.8, duration: 0.8 },
              scale: { delay: 0.8, duration: 0.8 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            }}
            className="absolute bottom-8 -left-8 w-48 h-48 rounded-[40px] overflow-hidden shadow-2xl shadow-stone-900/15 border-[8px] border-white z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400"
              alt="Hoppers"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </motion.div>

          {/* Floating stat pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1, duration: 0.5 },
              x: { delay: 1, duration: 0.5 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
            className="absolute top-1/2 -left-20 -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-stone-900/10 px-7 py-6 flex items-center gap-5 z-30 border border-white"
          >
            <div className="relative w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <ChefHat size={28} className="relative z-10" />
              <motion.div
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                className="absolute inset-0 bg-brand-primary rounded-2xl"
              />
            </div>
            <div>
              <p className="text-3xl font-black text-stone-900 leading-none tracking-tight">120+</p>
              <p className="text-xs text-stone-500 font-bold uppercase tracking-widest mt-1.5">Local Chefs</p>
            </div>
          </motion.div>

          {/* Order-ready badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -12, 0] }}
            transition={{
              opacity: { delay: 1.2, duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
            className="absolute bottom-16 right-0 bg-brand-primary text-white rounded-[24px] shadow-2xl shadow-brand-primary/40 px-7 py-5 flex items-center gap-3 z-30 border-2 border-white/20 backdrop-blur-md"
          >
            <div className="relative flex items-center justify-center bg-white/20 w-10 h-10 rounded-full">
              <Clock size={20} />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"
              />
            </div>
            <span className="text-lg font-bold tracking-wide">Ready in 20 min</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
