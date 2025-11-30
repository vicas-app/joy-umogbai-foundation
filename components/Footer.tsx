import React from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO, NAV_LINKS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sh-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & Vision */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">{COMPANY_INFO.name}</h2>
            <p className="text-sh-blue-light mb-6 opacity-80">{COMPANY_INFO.tagline}</p>
            <div className="p-4 border-l-4 border-sh-yellow bg-white/10 italic text-sm">
              "{COMPANY_INFO.bibleVerse} - Come to me, all you who are weary and burdened, and I will give you rest."
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-serif">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className="text-sh-blue-light hover:text-sh-yellow transition-colors">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 font-serif">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 text-sh-yellow flex-shrink-0" size={18} />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-sh-yellow flex-shrink-0" size={18} />
                <span>{COMPANY_INFO.phone1}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-sh-yellow flex-shrink-0" size={18} />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white underline">{COMPANY_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="text-sh-yellow flex-shrink-0" size={18} />
                <a href={`https://instagram.com/${COMPANY_INFO.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-white">{COMPANY_INFO.instagram}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs opacity-60">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};