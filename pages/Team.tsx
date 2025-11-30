import React from 'react';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { Edit2, Trash2, Plus } from 'lucide-react';

export const Team: React.FC = () => {
  const { teamMembers } = useData();
  const { user } = useAuth();
  const { openEdit, openNew, handleDelete } = useAdmin();
  const isAdmin = user && !user.isAnonymous;

  return (
    <div className="pt-20">
      <div className="bg-sh-blue-light py-24 text-center relative group overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-sh-blue mb-6 relative z-10">Meet Our Team</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4 relative z-10 font-light">The dedicated hearts and hands behind the Safe Haven Foundation.</p>
        
        {isAdmin && (
            <button 
                onClick={() => openNew('team')}
                className="absolute bottom-6 right-6 md:right-20 bg-sh-blue text-white p-4 rounded-full shadow-xl hover:bg-sh-blue-dark hover:scale-105 transition-all flex items-center gap-2 z-20 font-bold"
            >
                <Plus size={20} /> Add Member
            </button>
        )}
      </div>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="group relative">
              {isAdmin && (
                  <div className="absolute top-2 right-2 z-20 flex gap-2">
                      <button 
                        onClick={() => openEdit('team', member)}
                        className="p-2 bg-white/90 text-blue-600 rounded-full shadow hover:bg-white"
                      >
                          <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete('team', member.id)}
                        className="p-2 bg-white/90 text-red-600 rounded-full shadow hover:bg-white"
                      >
                          <Trash2 size={16} />
                      </button>
                  </div>
              )}
              
              <div className="relative mb-6">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-lg bg-gray-100">
                    <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter saturate-[.85] group-hover:saturate-100"
                    />
                </div>
                {/* Hover Bio Overlay */}
                <div className="absolute inset-0 bg-sh-blue/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center p-6 text-center">
                    <p className="text-white font-light text-lg">{member.bio}</p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-sh-blue transition-colors">{member.name}</h3>
                <div className="inline-block px-3 py-1 bg-sh-blue-light text-sh-blue text-xs font-bold uppercase tracking-widest rounded-full">
                    {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};