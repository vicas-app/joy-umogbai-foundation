import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/Section';
import { COMPANY_INFO } from '../constants';
import { useData } from '../contexts/DataContext';
import { ArrowRight, Heart, ChevronRight, Edit2, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText } from '../components/EditableText';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { metrics, programs, testimonials, heroImages, settings } = useData();
  const { user } = useAuth();
  const { openEdit, openNew, handleDelete, uploadGlobalImage, uploading } = useAdmin();
  const isAdmin = user && !user.isAnonymous;
  const missionImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Ensure currentSlide is within bounds if images are deleted
  useEffect(() => {
    if (currentSlide >= heroImages.length && heroImages.length > 0) {
        setCurrentSlide(0);
    }
  }, [heroImages.length, currentSlide]);

  const currentHeroImage = heroImages.length > 0 ? heroImages[currentSlide] : null;

  // Filter and deduplicate metrics
  const displayedMetrics = metrics
    .filter(metric => {
      // Remove empty cards
      if (!metric.value || !metric.label) return false;
      return true;
    })
    // Deduplicate by label to remove repeated metrics
    .filter((metric, index, self) => 
      index === self.findIndex((t) => t.label === metric.label)
    );

  const handleMissionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        await uploadGlobalImage('homeMissionImageUrl', e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
        
        {heroImages.map((img, index) => (
          <div 
            key={img.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1500ms] ease-in-out transform ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url("${img.imageUrl}")` }} 
          />
        ))}

        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-sh-blue/20 to-sh-blue/90 z-10" />

        {/* Admin Controls for Hero Images */}
        {isAdmin && (
            <div className="absolute top-24 right-4 z-50 flex flex-col gap-2 bg-white/90 p-3 rounded-xl backdrop-blur-md shadow-lg border border-white/50">
                 <button 
                    onClick={() => openNew('hero_images')}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors shadow-sm font-medium"
                    title="Add new background image"
                >
                    <Plus size={16} /> Add Slide
                </button>
                {currentHeroImage && (
                    <>
                        <button 
                            onClick={() => openEdit('hero_images', currentHeroImage)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors shadow-sm font-medium"
                            title="Change current background image"
                        >
                            <ImageIcon size={16} /> Change Image
                        </button>
                        {heroImages.length > 1 && (
                            <button 
                                onClick={() => handleDelete('hero_images', currentHeroImage.id)}
                                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors shadow-sm font-medium"
                                title="Delete current slide"
                            >
                                <Trash2 size={16} /> Delete Slide
                            </button>
                        )}
                    </>
                )}
            </div>
        )}
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto fade-in">
          <div className="inline-block px-5 py-1.5 mb-8 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-sh-yellow text-sm font-bold tracking-widest uppercase shadow-lg">
            {COMPANY_INFO.parentOrg}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-lg">
            <EditableText id="home_hero_title" defaultText="Lighting the Path for" /> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sh-yellow to-orange-200"><EditableText id="home_hero_title_highlight" defaultText="Every Woman & Girl" /></span>
          </h1>
          <div className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
             <EditableText id="home_hero_subtitle" defaultText="We are a community dedicated to faith, empowerment, and compassion. Join us in building a future where no woman is left behind." tag="p"/>
          </div>
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <button 
              onClick={() => navigate('/get-involved')}
              className="px-8 py-4 bg-gradient-to-r from-sh-yellow to-orange-400 text-white rounded-full font-bold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
            >
              Get Involved <ArrowRight size={20} />
            </button>
            <button 
               onClick={() => navigate('/about')}
               className="px-8 py-4 bg-white/10 border border-white/50 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white hover:text-sh-blue transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              Our Story
            </button>
          </div>
        </div>

        <div className="absolute bottom-40 md:bottom-32 left-0 right-0 z-20 flex justify-center gap-3">
            {heroImages.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === currentSlide ? 'bg-sh-yellow w-12 shadow-glow' : 'bg-white/30 w-3 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
        </div>
      </div>

      {/* Wave Separator */}
      <div className="relative z-20 -mt-24 md:-mt-32 w-full pointer-events-none">
        <svg 
            className="w-full h-auto text-white fill-current block drop-shadow-xl" 
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0,96 C400,0 800,280 1440,240 L1440,320 L0,320 Z" />
        </svg>
      </div>

      {/* Mission & Impact Preview */}
      <Section bg="white" className="relative z-20 pt-0 pb-24">
        {/* Metrics Cards */}
        <div className="flex flex-wrap justify-center gap-8 -mt-12 md:-mt-24 mb-24 px-4">
          {displayedMetrics.map((metric, idx) => (
            <div key={metric.id || idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-soft hover:border-sh-blue/20 hover:-translate-y-2 transition-all duration-300 relative group min-w-[260px] flex-1 max-w-[320px] text-center">
              {isAdmin && (
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/90 p-1 rounded-full shadow-sm">
                    <button 
                        onClick={() => openEdit('metrics', metric)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Metric"
                    >
                        <Edit2 size={14} />
                    </button>
                    <button 
                        onClick={() => handleDelete('metrics', metric.id || metric.label.toLowerCase().replace(/\s+/g, '_'))}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Metric"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
              )}
              <div className="text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-sh-blue to-sh-blue-dark mb-3">{metric.value}</div>
              <div className="text-sh-yellow font-bold uppercase text-xs tracking-widest mb-3">{metric.label}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{metric.description}</p>
            </div>
          ))}

          {/* Add New Metric Card */}
          {isAdmin && (
             <button 
                onClick={() => openNew('metrics')}
                className="bg-gray-50 border-2 border-dashed border-gray-200 p-8 rounded-2xl shadow-sm text-center transform hover:-translate-y-2 transition-all duration-300 relative group min-w-[260px] flex-1 max-w-[320px] flex flex-col items-center justify-center cursor-pointer hover:border-sh-blue/50 hover:bg-blue-50/30 mt-0"
              >
                <div className="p-4 bg-white rounded-full text-gray-400 group-hover:text-sh-blue group-hover:bg-sh-blue/10 shadow-sm mb-3 transition-colors">
                    <Plus size={24} />
                </div>
                <span className="text-gray-500 font-bold group-hover:text-sh-blue transition-colors">Add Metric</span>
             </button>
          )}
        </div>

        {/* Mission Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-sh-yellow/20 rounded-full blur-2xl z-0" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-sh-blue/10 rounded-full blur-2xl z-0" />
            
            {isAdmin && (
              <>
                <button 
                    onClick={() => missionImageInputRef.current?.click()}
                    className="absolute top-6 left-6 z-30 p-3 bg-white text-sh-blue rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:rotate-6"
                    title="Change Image"
                >
                   {uploading ? <div className="animate-spin h-5 w-5 border-2 border-sh-blue border-t-transparent rounded-full"/> : <ImageIcon size={20} />}
                </button>
                <input 
                    type="file" 
                    ref={missionImageInputRef}
                    onChange={handleMissionImageUpload}
                    className="hidden"
                    accept="image/*"
                />
              </>
            )}

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                src={settings.homeMissionImageUrl || "https://picsum.photos/id/338/600/700"} 
                alt="Community gathering" 
                className="w-full object-cover h-[500px] lg:h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            </div>

            {/* Floating Quote Card */}
            <div className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-8 rounded-2xl shadow-xl z-20 max-w-xs border-l-8 border-sh-yellow hidden md:block transform transition-transform duration-500 hover:-translate-y-2">
              <p className="font-serif italic text-gray-800 text-lg leading-relaxed">"Safe Haven isn't just an organization; it's a family where healing begins."</p>
            </div>
          </div>

          <div className="lg:pl-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                 <EditableText id="home_mission_title" defaultText="A Sanctuary of Hope & Empowerment" />
            </h2>
            <div className="text-gray-600 text-lg leading-loose mb-6 font-light">
                <EditableText id="home_mission_p1" defaultText="Founded on the principles of compassion and faith, the Safe Haven Foundation strives to uplift the vulnerable. From IDP camps to educational halls, we are present where help is needed most." tag="p"/>
            </div>
            <div className="text-gray-600 text-lg leading-loose mb-10 font-light">
                <EditableText id="home_mission_p2" defaultText="We focus on holistic growth—mental, spiritual, and physical—ensuring every beneficiary has the tools to thrive." tag="p"/>
            </div>
            <button 
               onClick={() => navigate('/programs')}
               className="group text-sh-blue font-bold text-lg flex items-center gap-3 transition-all hover:text-sh-blue-dark"
            >
              See Our Programs 
              <span className="bg-sh-blue/10 p-2 rounded-full group-hover:bg-sh-blue group-hover:text-white transition-colors">
                <ChevronRight size={20} />
              </span>
            </button>
          </div>
        </div>
      </Section>

      {/* Program Highlights */}
      <Section bg="cream" className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              <EditableText id="home_programs_title" defaultText="Our Core Focus Areas" />
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-sh-blue to-sh-blue-dark mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {programs.slice(0, 3).map((program) => (
             <div key={program.id} className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer hover:shadow-2xl transition-all duration-300 relative border border-gray-100 flex flex-col">
                {isAdmin && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); openEdit('programs', program); }}
                        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full shadow-sm hover:bg-white hover:scale-110 transition-transform"
                    >
                        <Edit2 size={16} />
                    </button>
                )}
               <div className="h-56 overflow-hidden relative" onClick={() => navigate('/programs')}>
                 <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-sh-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               </div>
               <div className="p-8 flex-grow flex flex-col" onClick={() => navigate('/programs')}>
                 <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-sh-blue transition-colors">{program.title}</h3>
                 <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{program.description}</p>
                 <span className="text-sh-blue font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={14} />
                 </span>
               </div>
             </div>
          ))}
        </div>
        <div className="text-center mt-16 relative z-10">
           <button onClick={() => navigate('/programs')} className="px-10 py-4 border-2 border-sh-blue text-sh-blue rounded-full hover:bg-sh-blue hover:text-white transition-all font-bold text-lg shadow-sm hover:shadow-md">
             View All Programs
           </button>
        </div>
      </Section>

      {/* Testimonials Slider */}
      <Section bg="dark" className="relative overflow-hidden py-32">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        {/* Add gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sh-blue to-sh-blue-dark opacity-90"></div>
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              <EditableText id="home_testimonials_title" defaultText="Voices of Impact" />
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
           {testimonials.map((t) => (
             <div key={t.id} className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/10 relative group hover:bg-white/15 transition-colors shadow-lg">
               {isAdmin && (
                    <button 
                        onClick={() => openEdit('testimonials', t)}
                        className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-full hover:bg-sh-yellow hover:text-sh-blue transition-colors"
                    >
                        <Edit2 size={16} />
                    </button>
               )}
               <div className="flex mb-6 space-x-1">
                 {[1,2,3,4,5].map(s => <div key={s} className="text-sh-yellow fill-current">★</div>)}
               </div>
               <p className="text-white text-lg italic mb-8 leading-relaxed font-light">"{t.quote}"</p>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-sh-yellow rounded-full flex items-center justify-center text-sh-blue font-bold text-xl">
                    {t.name.charAt(0)}
                 </div>
                 <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-sm text-sh-yellow/80 uppercase tracking-wide font-medium">{t.role}</p>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="bg-gradient-to-br from-sh-yellow via-yellow-400 to-orange-400 py-24 text-center text-sh-blue-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-[2px]"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-block p-4 bg-white/20 rounded-full mb-8 backdrop-blur-sm shadow-sm">
             <Heart size={40} className="text-white" fill="white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 drop-shadow-sm text-white">
              <EditableText id="home_cta_title" defaultText="Ready to make a difference?" />
          </h2>
          <div className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
             <EditableText id="home_cta_subtitle" defaultText="Your support can provide a meal, a scholarship, or a safe place for a woman in need." tag="p"/>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button 
               onClick={() => navigate('/get-involved')}
               className="px-12 py-5 bg-white text-sh-blue-dark rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 shadow-xl transition-all duration-300"
             >
               Donate Now
             </button>
             <button 
               onClick={() => navigate('/contact')}
               className="px-12 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white hover:text-sh-blue transition-all duration-300"
             >
               Partner With Us
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};