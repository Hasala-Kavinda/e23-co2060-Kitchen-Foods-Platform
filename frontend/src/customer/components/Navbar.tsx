import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { ChefHat, Utensils, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, hash: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-stone-900/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-serif font-bold tracking-tight text-stone-900">Kitchen Foods</Link>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-stone-900/70">
            <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="hover:text-brand-primary transition-colors cursor-pointer">Menu</a>
            <Link to="/impact" className="hover:text-brand-primary transition-colors">Chefs</Link>
            <a href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')} className="hover:text-brand-primary transition-colors cursor-pointer">About</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hidden sm:flex px-6 py-2.5 text-red-500 border-2 border-red-500 text-sm font-bold rounded-full items-center gap-2 hover:bg-red-500 hover:text-white active:scale-95 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <Link to="/login" className="hidden sm:flex px-6 py-2.5 text-brand-primary border-2 border-brand-primary text-sm font-bold rounded-full items-center gap-2 hover:bg-brand-primary hover:text-white active:scale-95 transition-all">
                Login / Sign Up
              </Link>
            )}

            <button
              className="md:hidden text-stone-900 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <Utensils size={24} /> : <ChefHat size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream border-b border-stone-900/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif text-stone-900/70 hover:text-brand-primary">Home</Link>
              <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="text-lg font-serif text-stone-900/70 hover:text-brand-primary cursor-pointer">Menu</a>
              <Link to="/impact" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif text-stone-900/70 hover:text-brand-primary">Chefs</Link>
              <a href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')} className="text-lg font-serif text-stone-900/70 hover:text-brand-primary cursor-pointer">About</a>

              {isLoggedIn ? (
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full py-4 border-2 border-red-500 text-red-500 text-center font-bold rounded-2xl flex items-center justify-center gap-2"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 border-2 border-brand-primary text-brand-primary text-center font-bold rounded-2xl">
                  Login / Sign Up
                </Link>
              )}

              <button onClick={(e) => handleNavClick(e, '#menu')} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl">
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
