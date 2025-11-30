import React from 'react';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { Target, Heart, Sun, Shield, Users, Star, Award, HandHeart } from 'lucide-react';
import { EditableText } from '../components/EditableText';

export const About: React.FC = () => {
  const { teamMembers } = useData();
  // Fetch Joy's image directly from the team data for consistency
  const founder = teamMembers.find(m => m.name.includes('Joy'));

  const coreValues = [
    { name: 'Faith', desc: 'We trust in God’s leading and draw strength from His purpose in all that we do.', icon: Star },
    { name: 'Love', desc: 'Love is the foundation of our mission — it drives every act of service and compassion we show to others.', icon: Heart },
    { name: 'Integrity', desc: 'We uphold honesty, transparency, and moral excellence in all our dealings.', icon: Shield },
    { name: 'Compassion', desc: 'We lead with empathy and kindness, meeting people where they are with understanding and care.', icon: HandHeart },
    { name: 'Accountability', desc: 'We take full responsibility for our actions, resources, and the trust people place in us.', icon: Target },
    { name: 'Service', desc: 'We believe that true leadership begins with service and selflessness.', icon: Users },
    { name: 'Excellence', desc: 'We give our best in everything, no matter how small the task.', icon: Award },
    { name: 'Teamwork', desc: 'We value unity and collaboration, recognizing that we achieve more when we work together.', icon: Users },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-sh-blue-light py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-sh-blue mb-6 relative z-10">
            <EditableText id="about_header_title" defaultText="Our Story" />
        </h1>
        <div className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto px-4 relative z-10 font-light">
            <EditableText id="about_header_subtitle" defaultText="The journey of compassion, faith, and relentless service behind Safe Haven." tag="p"/>
        </div>
      </div>

      <Section>
        <div className="flex flex-col gap-16 items-center">
          {/* Founder Image Section - Now stacked and static */}
          <div className="w-full max-w-3xl">
             <div className="relative group">
               {/* Decorative backdrop */}
               <div className="absolute top-6 left-6 w-full h-full border-2 border-sh-yellow rounded-2xl -z-10 hidden md:block transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
               <img 
                 src={founder?.imageUrl} 
                 alt="Joy Umogbai" 
                 className="rounded-2xl shadow-2xl w-full h-[500px] lg:h-[650px] object-cover bg-gray-200"
               />
             </div>
          </div>

          {/* Founder Text Section - Now follows under the image */}
          <div className="w-full max-w-4xl">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8">
                <EditableText id="about_founder_title" defaultText="From the Founder's Heart" />
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg leading-loose font-light">
                <EditableText id="about_founder_p1" defaultText="The Joy Umogbai Foundation was born from a deep desire to make life better for women and children in vulnerable and underserved communities. What began as a simple outreach to an orphanage has grown into a movement of compassion, empowerment, and transformation. Growing up, my family often sent gifts and supplies to orphanages. I didn't know it then, but those small acts planted something in my heart." tag="p"/>

                 <EditableText id="about_founder_p2" defaultText="In 2020, during the COVID lockdown, I felt led to visit an orphanage in Port Harcourt. I had just learned to sew, so I made nose masks and hair bonnets, using the proceeds and social media donations to support the children at the orphanage. Walking into that orphanage, seeing their faces light up and hearing their laughter—it changed me. I left with tears in my eyes and a clear conviction that this was what I was created to do. In 2021, we were at the Ahoada community for a program hosted by Shell Petroleum, where we trained women in various income-generating skills. Before that, from 2018 to 2021, I had been actively learning and training under several skill acquisition platforms, including one organized by Hon. O.K. Chinda, right in the city of Port Harcourt. That experience marked the beginning of my empowerment journey and sparked a deep passion in me—to learn, to grow, and to help other women do the same." tag="p"/>

                 <EditableText id="about_founder_p3" defaultText="Since that day, I've never looked back. Giving became more than an act—it became part of who I am. Over the years, that small act of kindness grew into a vision much larger than myself. In 2024, what began as a simple outreach evolved into a full-fledged foundation. It has been nothing short of glorious. Each outreach, each smile, and each story reminds me that love still changes lives. That passion has now evolved into something greater: a Skill Acquisition and Resource Centre, where we will train women (young and old) children and youth for free—giving them not just skills, but confidence, purpose, and hope for a better future. Through the Joy Umogbai Foundation, we've reached women and children in communities that are often forgotten. We've listened to their stories, shared hope, and offered practical help through empowerment, mentorship, and education. I also continue to volunteer with other NGOs because I believe true impact happens when we join hands to serve humanity together." tag="p"/>
            </div>

            <div className="my-10">
                 <p className="text-gray-800 font-medium mb-4">
                  And at the heart of this vision lies a scripture that anchors our mission Matthew 11:28:
                </p>
                <div className="bg-sh-blue/5 p-8 rounded-xl border-l-4 border-sh-blue relative">
                  <span className="absolute top-4 left-4 text-6xl text-sh-blue/10 font-serif leading-none">"</span>
                  <p className="italic text-sh-blue-dark font-medium text-xl relative z-10">
                    Come unto me, all ye that labour and are heavy laden, and I will give you rest.
                  </p>
                </div>
            </div>

            <div className="text-gray-600 text-lg leading-loose font-light mb-8">
                 <EditableText id="about_founder_p4" defaultText="God laid it in my heart to create a safe space for women; a place where they can come together, find rest, healing, and strength. The Joy Umogbai Foundation is built on that promise, and we are backed by it in everything we do." tag="p"/>
            </div>

            <p className="text-sh-blue font-serif text-xl font-bold mb-12">
              This journey is my calling; it's the very call of my being bringing light, love and restoration to others, one person at a time.
            </p>
            
            <div className="flex items-center gap-6">
               <div className="h-px bg-gray-300 flex-grow"></div>
               <span className="font-serif text-2xl font-bold text-gray-900">Joy Umogbai</span>
               <div className="h-px bg-gray-300 flex-grow"></div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="cream">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Our Vision & Mission</h2>
          <div className="w-24 h-1.5 bg-sh-blue mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-sh-blue">
              <Target size={36} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <div className="text-gray-600 text-lg leading-relaxed">
               <EditableText id="about_mission_text" defaultText="To empower young women and teens through faith, mentorship, and care for less privileged children." tag="p"/>
            </div>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-8 text-sh-yellow">
              <Sun size={36} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
            <div className="text-gray-600 text-lg leading-relaxed">
                <EditableText id="about_vision_text" defaultText="To nurture young women and teens to find their purpose, thrive, and grow as leaders of today and tomorrow." tag="p"/>
            </div>
          </div>
        </div>

        <div className="text-center">
           <h3 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {coreValues.map((val) => (
               <div key={val.name} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                 <div className="flex justify-center mb-5 text-sh-blue">
                   <val.icon size={32} strokeWidth={1.5} />
                 </div>
                 <h4 className="font-bold text-xl text-gray-900 mb-3">{val.name}</h4>
                 <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </Section>
    </div>
  );
};