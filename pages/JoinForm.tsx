import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Section } from '../components/Section';
import { ExternalLink, Edit2, Users, HeartHandshake } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText } from '../components/EditableText';

export const JoinForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get('type');
  
  const { getContent } = useData();
  const { user } = useAuth();
  const { openEdit } = useAdmin();
  const isAdmin = user && !user.isAnonymous;

  const [formType, setFormType] = useState<'volunteer' | 'partner'>(
    typeParam === 'partner' ? 'partner' : 'volunteer'
  );

  useEffect(() => {
    if (typeParam === 'partner') setFormType('partner');
    else setFormType('volunteer');
  }, [typeParam]);

  // Fetch URLs from content collection with default placeholders
  const volunteerUrl = getContent('link_volunteer_form', 'https://docs.google.com/forms/d/e/1FAIpQLSe-volunteer-placeholder/viewform');
  const partnerUrl = getContent('link_partner_form', 'https://docs.google.com/forms/d/e/1FAIpQLSe-partner-placeholder/viewform');

  const currentUrl = formType === 'volunteer' ? volunteerUrl : partnerUrl;
  const currentLinkId = formType === 'volunteer' ? 'link_volunteer_form' : 'link_partner_form';

  return (
    <div className="pt-20">
      <div className="bg-sh-blue-light py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-sh-blue mb-4">
          <EditableText 
            id={`join_header_${formType}`} 
            defaultText={formType === 'partner' ? 'Partner Application' : 'Volunteer Application'} 
          />
        </h1>
        <div className="text-gray-600 max-w-2xl mx-auto px-4 text-lg">
           <EditableText 
             id={`join_subheader_${formType}`} 
             defaultText={formType === 'partner' 
              ? 'Join hands with us to create sustainable impact through Corporate Social Responsibility.' 
              : 'Lend your skills and time to make a difference in the lives of women and children.'} 
             tag="p"
           />
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-gray-100 text-center">
           {/* Form Type Toggle */}
           <div className="flex justify-center mb-12 gap-4 p-1.5 bg-gray-100 rounded-full w-fit mx-auto">
              <button 
                type="button"
                onClick={() => { setFormType('volunteer'); navigate('?type=volunteer', { replace: true }); }}
                className={`px-6 md:px-8 py-3 rounded-full font-bold transition-all duration-300 ${formType === 'volunteer' ? 'bg-sh-blue text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Volunteer
              </button>
              <button 
                type="button"
                onClick={() => { setFormType('partner'); navigate('?type=partner', { replace: true }); }}
                className={`px-6 md:px-8 py-3 rounded-full font-bold transition-all duration-300 ${formType === 'partner' ? 'bg-sh-blue text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Partner
              </button>
           </div>

           <div className="animate-in fade-in zoom-in duration-300">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-sh-blue ${formType === 'volunteer' ? 'bg-blue-50' : 'bg-sh-yellow-light text-sh-brown'}`}>
                    {formType === 'volunteer' ? <Users size={40} /> : <HeartHandshake size={40} />}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    <EditableText 
                        id={`join_card_title_${formType}`} 
                        defaultText={formType === 'volunteer' ? 'Ready to Serve?' : 'Ready to Partner?'} 
                    />
                </h2>
                
                <div className="text-gray-600 mb-10 leading-relaxed text-lg max-w-xl mx-auto">
                        <EditableText 
                            id={`join_card_desc_${formType}`} 
                            defaultText={formType === 'volunteer' 
                                ? "We are excited to have you join our workforce! Please click the button below to fill out our official volunteer application form via Google Forms."
                                : "Thank you for your interest in partnering with us. Please click the button below to fill out our partnership inquiry form via Google Forms."} 
                            tag="p"
                        />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <a 
                        href={currentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl bg-sh-blue hover:bg-sh-blue-dark`}
                    >
                        {formType === 'volunteer' ? 'Open Volunteer Form' : 'Open Partner Form'} <ExternalLink size={20} />
                    </a>
                    
                    <p className="text-sm text-gray-400 mt-2">
                        Link will open in a new tab
                    </p>

                    {isAdmin && (
                        <div className="mt-8 pt-6 border-t border-gray-100 w-full max-w-md mx-auto">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Admin Settings</p>
                            <button 
                                onClick={() => openEdit('content', { id: currentLinkId, text: currentUrl })}
                                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-sh-blue bg-blue-50 hover:bg-blue-100 px-4 py-3 rounded-xl transition-colors border border-blue-100"
                            >
                                <Edit2 size={16} /> 
                                Change {formType === 'volunteer' ? 'Volunteer' : 'Partner'} Form URL
                            </button>
                            <p className="text-xs text-gray-400 mt-2 truncate px-4 max-w-full block" title={currentUrl}>
                                Target: {currentUrl}
                            </p>
                        </div>
                    )}
                </div>
           </div>
        </div>
      </Section>
    </div>
  );
};