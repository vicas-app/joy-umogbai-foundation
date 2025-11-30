import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Settings, LogOut, Image as ImageIcon, Edit2, MapPin, Phone, Mail, Instagram, ChevronRight } from 'lucide-react';
import { NAV_LINKS, COMPANY_INFO } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { useData } from '../contexts/DataContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { updateLogo, uploading } = useAdmin();
  const { settings } = useData();
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  // Refs for swipe detection
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const isAdmin = user && !user.isAnonymous;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Swipe gesture handling
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchEnd.current = null;
      touchStart.current = { 
        x: e.targetTouches[0].clientX, 
        y: e.targetTouches[0].clientY 
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd.current = { 
        x: e.targetTouches[0].clientX, 
        y: e.targetTouches[0].clientY 
      };
    };

    const handleTouchEnd = () => {
      if (!touchStart.current || !touchEnd.current) return;

      const xDiff = touchStart.current.x - touchEnd.current.x;
      const yDiff = touchStart.current.y - touchEnd.current.y;
      const absX = Math.abs(xDiff);
      const absY = Math.abs(yDiff);

      // Require horizontal swipe to be dominant and sufficiently long (> 50px)
      if (absX > absY && absX > 50) {
        // Swipe Left (Open Menu) - must start from right edge (last 40px of screen)
        if (xDiff > 0 && !isOpen && touchStart.current.x > window.innerWidth - 40) {
          setIsOpen(true);
        }
        // Swipe Right (Close Menu)
        if (xDiff < 0 && isOpen) {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen]);

  // Reset secret click counter if inactive for 1 second
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (secretClicks > 0) {
      timer = setTimeout(() => setSecretClicks(0), 1000);
    }
    return () => clearTimeout(timer);
  }, [secretClicks]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isAdmin) {
        // If already admin, just go home
        navigate('/');
        return;
    }
    // If this is the 3rd click (current state is 2)
    if (secretClicks >= 2) {
      e.preventDefault();
      setSecretClicks(0);
      navigate('/admin/login');
    } else {
      setSecretClicks(prev => prev + 1);
    }
    closeMenu();
  };

  const handleLogout = async () => {
    await logout();
    setShowAdminMenu(false);
    navigate('/');
  };

  const onLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        await updateLogo(e.target.files[0]);
        setShowAdminMenu(false);
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-soft py-2 border-b border-white/20' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <NavLink 
          to="/" 
          className="flex items-center gap-3 z-50 select-none cursor-pointer relative group ml-2 md:ml-6" 
          onClick={handleLogoClick}
        >
          {settings.logoUrl && (
            <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="h-12 md:h-16 w-auto object-contain drop-shadow-sm transition-all"
            />
          )}

          <div className="flex flex-col items-start justify-center ml-2 leading-tight">
                <span className={`font-serif text-sm md:text-base font-bold tracking-wide transition-colors duration-300 ${isScrolled ? 'text-sh-blue' : 'text-white drop-shadow-md'}`}>
                    Joy Umogbai
                </span>
                <span className={`font-serif text-sm md:text-base font-bold tracking-wide transition-colors duration-300 ${isScrolled ? 'text-sh-blue' : 'text-white drop-shadow-md'}`}>
                    Foundation
                </span>
                <span className={`text-[10px] md:text-xs font-medium italic transition-colors duration-300 ${isScrolled ? 'text-sh-yellow' : 'text-sh-yellow/90 drop-shadow-md'}`}>
                    Matt 11:28
                </span>
            </div>
          
          {/* Admin Edit Logo Button */}
          {isAdmin && (
            <div 
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    logoInputRef.current?.click();
                }}
                className="absolute -right-8 top-1/2 -translate-y-1/2 p-2 bg-white text-sh-blue rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 border border-gray-100"
                title="Upload Logo"
            >
                <Edit2 size={16} />
            </div>
          )}
        </NavLink>

        {/* Desktop Nav - Changed breakpoint to lg (1024px) to prevent overlap on tablets */}
        <div className="hidden lg:flex items-center space-x-5 xl:space-x-8">
          {NAV_LINKS.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-semibold tracking-wide transition-all duration-300 relative group
                ${isActive ? 'text-sh-yellow' : isScrolled ? 'text-gray-600 hover:text-sh-blue' : 'text-white hover:text-sh-yellow'}
                ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}
                after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-sh-yellow after:transition-transform after:duration-300 after:origin-left
                `
              }
            >
              {link.label}
            </NavLink>
          ))}
          
          {isAdmin && (
            <div className="relative">
                <button 
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                    className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-sh-blue bg-sh-blue/10 hover:bg-sh-blue/20' : 'text-white bg-white/20 hover:bg-white/30'}`}
                >
                    <Settings size={20} />
                </button>
                {showAdminMenu && (
                    <div className="absolute top-12 right-0 bg-white rounded-xl shadow-xl w-48 py-2 overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
                        <button onClick={() => logoInputRef.current?.click()} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700">
                            <ImageIcon size={16} className="text-sh-blue"/> {uploading ? 'Uploading...' : 'Change Logo'}
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-sm text-red-600">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}
            </div>
          )}

          {!isAdmin && (
            <button 
                onClick={() => navigate('/get-involved')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 shadow-lg
                ${isScrolled 
                    ? 'bg-gradient-to-r from-sh-blue to-sh-blue-dark text-white hover:shadow-blue-200' 
                    : 'bg-sh-yellow text-sh-blue-dark hover:bg-white hover:text-sh-blue'}`}
            >
                <Heart size={18} fill="currentColor" className={isScrolled ? 'text-sh-yellow' : ''}/>
                <span>Donate</span>
            </button>
          )}
        </div>

        {/* Mobile Toggle - Visible up to lg breakpoint */}
        <div className="lg:hidden z-50 flex items-center gap-4">
          {isAdmin && (
             <button onClick={() => setShowAdminMenu(!showAdminMenu)} className={`${isScrolled ? 'text-sh-blue' : 'text-white'}`}>
                <Settings size={24} />
             </button>
          )}
          <button onClick={toggleMenu} className={`${isScrolled ? 'text-sh-blue' : 'text-white'} p-2`}>
             <Menu size={32} />
          </button>
        </div>

        {/* Mobile Menu Overlay - Back drop */}
        <div 
            className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={closeMenu}
            aria-hidden="true"
        />

        {/* Mobile Sidebar (Right-aligned Drawer) */}
        <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-gradient-to-b from-sh-blue to-sh-blue-dark z-[70] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
          {/* Subtle decoration */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative flex flex-col h-full z-10 text-white">
              
              {/* Header */}
              <div className="flex justify-between items-center px-8 py-8">
                  <span className="font-serif text-3xl font-bold tracking-wide">Menu</span>
                  <button onClick={closeMenu} className="p-2 -mr-2 text-white/70 hover:text-white transition-colors hover:rotate-90 duration-300">
                     <X size={32} strokeWidth={1.5} />
                  </button>
              </div>

              <div className="flex-grow px-8 overflow-y-auto scrollbar-hide">
                 
                 <div className="mb-6">
                    <div className="flex flex-col space-y-5">
                        {NAV_LINKS.map((link) => (
                        <NavLink 
                            key={link.path} 
                            to={link.path} 
                            onClick={closeMenu}
                            className={({ isActive }) => 
                                `text-lg font-medium tracking-wide transition-all duration-300
                                ${isActive 
                                    ? 'text-sh-yellow translate-x-1 font-bold' 
                                    : 'text-white/80 hover:text-white hover:translate-x-1'}`
                            }
                        >
                            {link.label}
                        </NavLink>
                        ))}
                    </div>
                 </div>

                 <div className="my-8 border-t border-white/20 w-full"></div>

                 <div className="space-y-5 mb-8">
                    {isAdmin ? (
                        <>
                            <button onClick={() => { logoInputRef.current?.click(); closeMenu(); }} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-base font-medium">
                                <ImageIcon size={20} strokeWidth={1.5}/>
                                <span>Change Logo</span>
                            </button>
                            <button onClick={handleLogout} className="flex items-center gap-3 text-sh-yellow hover:text-white transition-colors text-base font-medium">
                                <LogOut size={20} strokeWidth={1.5}/>
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                         <div className="pt-2">
                             <button 
                                onClick={() => {
                                    closeMenu();
                                    navigate('/get-involved');
                                }}
                                className="w-full py-3 bg-sh-yellow text-sh-blue-dark rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Heart size={20} className="fill-current"/> 
                                <span>Donate Now</span>
                            </button>
                         </div>
                    )}
                 </div>
              </div>

                {/* Footer Contact */}
                <div className="p-8 bg-black/10 backdrop-blur-sm mt-auto">
                    <h3 className="font-serif text-2xl font-bold mb-6">Contact Us</h3>
                    <ul className="space-y-4 text-white/90 text-sm">
                        <li className="flex items-start gap-4">
                            <MapPin className="text-sh-yellow shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
                            <span className="font-light leading-relaxed">{COMPANY_INFO.address}</span>
                        </li>
                        <li className="flex items-center gap-4">
                            <Phone className="text-sh-yellow shrink-0" size={20} strokeWidth={1.5} />
                            <span className="font-light">{COMPANY_INFO.phone1}</span>
                        </li>
                    </ul>
                </div>
          </div>
        </div>
      </div>
      
      {/* Hidden File Input for Logo Upload - Available to all admin interactions */}
      {isAdmin && (
        <input 
            type="file" 
            ref={logoInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={onLogoFileChange}
        />
      )}
    </nav>
  );
};