import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/Section';
import { Heart, Users, DollarSign, CheckCircle, Copy } from 'lucide-react';

export const GetInvolved: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
       <div className="bg-sh-blue-light py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-sh-blue mb-4">Get Involved</h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">Your generosity fuels our mission. Here is how you can help.</p>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Donation Column */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-sh-blue/10 p-3 rounded-full text-sh-blue">
                <DollarSign size={28} />
              </div>
              <h2 className="text-2xl font-bold text-sh-blue">Make a Donation</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Funds go directly towards IDP relief, scholarships for girls, and community skill acquisition programs.
            </p>

            {/* Bank Transfer Details */}
            <div className="bg-sh-blue-light p-8 rounded-2xl text-center border border-sh-blue/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-8">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Account Name</p>
                        <p className="text-2xl md:text-3xl font-serif font-bold text-sh-blue-dark">JOY UMOGBAI</p>
                    </div>

                    <div className="w-full h-px bg-sh-blue/10"></div>

                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Bank</p>
                        <p className="text-xl font-bold text-gray-800">STERLING BANK</p>
                    </div>

                    <div className="w-full h-px bg-sh-blue/10"></div>

                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Account Number</p>
                        <div 
                          className="flex items-center justify-center gap-3 group cursor-pointer active:scale-95 transition-transform" 
                          onClick={() => {
                            navigator.clipboard.writeText('0076117739');
                            alert('Account number copied to clipboard!');
                          }}
                          title="Click to copy"
                        >
                             <p className="font-mono font-bold text-3xl md:text-4xl text-sh-blue tracking-wider">0076117739</p>
                             <div className="p-2 bg-white rounded-full text-gray-400 group-hover:text-sh-blue shadow-sm transition-colors">
                                <Copy size={20} />
                             </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Click numbers to copy</p>
                    </div>
                </div>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-8 italic bg-gray-50 p-4 rounded-lg">
              "He who is kind to the poor lends to the LORD, and he will reward him for what he has done." <br/> <span className="font-bold not-italic text-xs mt-1 block">- Proverbs 19:17</span>
            </p>
          </div>

          {/* Volunteer / Partner Column */}
          <div className="space-y-8">
            <div className="bg-sh-blue-light p-8 rounded-2xl border border-sh-blue/10">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-white p-2 rounded-full text-sh-blue">
                   <Users size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-sh-blue">Volunteer With Us</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Join our team of passionate volunteers. Whether you are a medic, teacher, or just have a heart to serve, we need you.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-sh-blue"/> Participate in outreach events</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-sh-blue"/> Mentor young girls</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-sh-blue"/> Assist in administrative tasks</li>
              </ul>
              <button 
                onClick={() => navigate('/join?type=volunteer')}
                className="px-6 py-2 border-2 border-sh-blue text-sh-blue font-bold rounded-lg hover:bg-sh-blue hover:text-white transition-colors"
              >
                Apply to Volunteer
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                   <Heart size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-800">Partner / Corporate CSR</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Partner with Safe Haven for your Corporate Social Responsibility projects. Together, we can scale impact.
              </p>
              <button 
                onClick={() => navigate('/join?type=partner')}
                className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact for Partnership
              </button>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};