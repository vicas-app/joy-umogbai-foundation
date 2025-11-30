import React from 'react';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import * as Icons from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { Edit2, Trash2, Plus, ArrowRight } from 'lucide-react';

export const Programs: React.FC = () => {
  const navigate = useNavigate();
  const { programs } = useData();
  const { user } = useAuth();
  const { openEdit, openNew, handleDelete } = useAdmin();
  const isAdmin = user && !user.isAnonymous;

  return (
    <div className="pt-20">
       <div className="bg-sh-blue py-24 text-center relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-sh-yellow/20 rounded-full blur-3xl"></div>
         </div>

        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 relative z-10">Our Programs</h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto px-4 font-light relative z-10">Holistic interventions designed to uplift, educate, and empower.</p>
        
        {isAdmin && (
            <button 
                onClick={() => openNew('programs')}
                className="absolute bottom-8 right-8 md:right-20 bg-sh-yellow text-sh-blue p-4 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 z-20 font-bold"
            >
                <Plus size={20} /> Add Program
            </button>
        )}
      </div>

      <Section>
        <div className="space-y-24">
          {programs.map((program, index) => {
            const Icon = (Icons as any)[program.iconName] || Icons.Heart;
            const isEven = index % 2 === 0;
            
            return (
              <div key={program.id} className={`flex flex-col lg:flex-row gap-12 items-center group ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                
                <div className="w-full lg:w-1/2 relative">
                    {isAdmin && (
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            <button 
                            onClick={() => openEdit('programs', program)}
                            className="p-2 bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                            onClick={() => handleDelete('programs', program.id)}
                            className="p-2 bg-white text-red-600 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                    
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[300px] md:h-[400px] w-full group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500">
                        <img 
                            src={program.imageUrl} 
                            alt={program.title} 
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-sh-blue/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    {/* Decorative Blob */}
                    <div className={`absolute -bottom-6 -z-10 w-2/3 h-2/3 rounded-full blur-3xl opacity-60 ${isEven ? '-left-6 bg-sh-yellow/30' : '-right-6 bg-sh-blue/20'}`}></div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-sh-blue/10 rounded-xl text-sh-blue shadow-sm">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{program.title}</h2>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                    {program.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                     <button 
                        onClick={() => navigate('/get-involved')}
                        className="px-8 py-3 bg-sh-blue text-white rounded-full font-bold hover:bg-sh-blue-dark transition-colors shadow-lg shadow-blue-100"
                    >
                        Support This Cause
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};