import React from 'react';
import { Section } from '../components/Section';
import { COMPANY_INFO } from '../constants';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { EditableText } from '../components/EditableText';

export const Contact: React.FC = () => {
  return (
    <div className="pt-20">
       <div className="bg-sh-blue text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <EditableText id="contact_header_title" defaultText="Contact Us" />
        </h1>
        <div className="text-sh-blue-light opacity-80">
            <EditableText id="contact_header_subtitle" defaultText="We'd love to hear from you." tag="p"/>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Info Side */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-sh-blue mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-sh-blue/10 p-3 rounded-full text-sh-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Visit Us</h3>
                  <p className="text-gray-600 max-w-xs">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sh-blue/10 p-3 rounded-full text-sh-blue">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">{COMPANY_INFO.phone1}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sh-blue/10 p-3 rounded-full text-sh-blue">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">{COMPANY_INFO.email}</p>
                </div>
              </div>
            </div>

            {/* Map Embed (Placeholder) */}
            <div className="mt-8 h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.096338575084!2d7.4697!3d9.0563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDMnMjIuNyJOIDfCsDI4JzExLjAiRQ!5e0!3m2!1sen!2sng!4v1634567890123!5m2!1sen!2sng" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy"
                 title="Office Location"
               ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-sh-blue mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sh-blue focus:border-transparent outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sh-blue focus:border-transparent outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sh-blue focus:border-transparent outline-none">
                  <option>General Inquiry</option>
                  <option>Volunteering</option>
                  <option>Partnership</option>
                  <option>Donation Help</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sh-blue focus:border-transparent outline-none" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full py-4 bg-sh-blue text-white font-bold rounded-lg hover:bg-sh-blue-dark transition-colors flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </Section>
    </div>
  );
};