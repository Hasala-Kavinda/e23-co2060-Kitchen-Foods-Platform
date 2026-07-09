import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../shared/api';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route } from 'react-router-dom';

// --- Page & Section Imports ---
import { Hero } from './components/Hero';
import { PromoBanner } from './components/PromoBanner';
import { Recommendations } from './components/Recommendations';
import { MenuCustomization } from './components/MenuCustomization';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { ImpactCounter, Stats } from './components/ImpactCounter';
import { SplashScreen } from './components/SplashScreen';
import { Layout } from './components/Layout';

import { ImpactStory } from './pages/ImpactStory';
import { Login } from './pages/Login';

// --- Home Component ---
const Home = ({ stats }: { stats: Stats | null }) => {
  return (
    <>
      <Hero />
      <PromoBanner />
      <Recommendations />
      <MenuCustomization />
      <HowItWorks />
      <Testimonials />
      <ImpactCounter stats={stats} />
    </>
  );
};

// --- App Entry Component ---
export default function App() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/stats`),
          new Promise(resolve => setTimeout(resolve, 2500)),
        ]);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setShowSplash(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="min-h-screen"
        >
          <Routes>
            {/* Routes with Navbar & Footer */}
            <Route path="/" element={<Layout><Home stats={stats} /></Layout>} />
            <Route path="/impact" element={<Layout><ImpactStory /></Layout>} />

            {/* Standalone Route without Navbar/Footer */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </motion.div>
      )}
    </div>
  );
}


