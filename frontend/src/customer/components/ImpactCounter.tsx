import React, { useState, useEffect } from 'react';

export interface Stats {
  active_chefs: number;
  meals_served: number;
  income_generated: number;
}

const Counter: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-serif font-bold text-brand-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-stone-500 font-medium uppercase tracking-wider text-xs">{label}</div>
    </div>
  );
};

export const ImpactCounter: React.FC<{ stats: Stats | null }> = ({ stats }) => {
  if (!stats) return null;
  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-mono text-xs uppercase tracking-[0.3em] mb-3 block">Our Impact</span>
          <h2 className="text-4xl font-serif font-bold text-stone-900">Growing every day</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <Counter value={stats.active_chefs} label="Active Chefs" />
          <Counter value={stats.meals_served} label="Healthy Meals Served" />
          <Counter value={stats.income_generated} label="Families Supported" suffix="+" />
        </div>
      </div>
    </section>
  );
};
