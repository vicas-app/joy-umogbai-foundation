import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { useData } from '../contexts/DataContext';
import { X, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { GalleryItem } from '../types';

interface GalleryCardProps {
    item: GalleryItem;
    isAdmin: boolean;
    openEdit: (col: string, item: any) => void;
    handleDelete: (col: string, id: string) => void;
    setSelectedImage: (url: string) => void;
}

// Individual Gallery Card Component to handle slideshow state
const GalleryCard: React.FC<GalleryCardProps> = ({ item, isAdmin, openEdit, handleDelete, setSelectedImage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = item.images && item.images.length > 0 ? item.images : [item.imageUrl];

    // Reset index if images change
    useEffect(() => {
        if(currentIndex >= images.length) setCurrentIndex(0);
    }, [images.length]);

    const next = (e: React.MouseEvent) => { 
        e.stopPropagation(); 
        setCurrentIndex((i) => (i + 1) % images.length); 
    };
    
    const prev = (e: React.MouseEvent) => { 
        e.stopPropagation(); 
        setCurrentIndex((i) => (i - 1 + images.length) % images.length); 
    };

    const handleImageClick = () => {
        setSelectedImage(images[currentIndex]);
    };

    return (
        <div className="relative group cursor-pointer overflow-hidden rounded-xl h-64 md:h-80 shadow-md bg-gray-100">
             {isAdmin && (
                <div className="absolute top-2 right-2 z-30 flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openEdit('gallery', item); }}
                      className="p-2 bg-white/90 text-blue-600 rounded-full shadow hover:bg-white transition-colors"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete('gallery', item.id); }}
                      className="p-2 bg-white/90 text-red-600 rounded-full shadow hover:bg-white transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}

            <img 
              src={images[currentIndex]} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onClick={handleImageClick}
            />
            
            {/* Slideshow Controls */}
            {images.length > 1 && (
                <>
                    <button 
                        onClick={prev} 
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
                    >
                        <ChevronLeft size={20}/>
                    </button>
                    <button 
                        onClick={next} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
                    >
                        <ChevronRight size={20}/>
                    </button>
                    {/* Dots Indicator */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
                        {images.map((_, i) => (
                            <div key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-white shadow-sm' : 'bg-white/40'}`} />
                        ))}
                    </div>
                </>
            )}

            {/* Info Overlay (Only visible when not hovering controls) */}
            <div 
              className="absolute inset-0 bg-sh-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 pointer-events-none"
            >
              <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">{item.title}</h3>
              <span className="text-sh-yellow font-semibold text-sm drop-shadow-md">{item.category}</span>
              {images.length > 1 && (
                  <span className="text-white/80 text-xs mt-1">{images.length} photos</span>
              )}
            </div>
        </div>
    );
};

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { galleryItems } = useData();
  const { user } = useAuth();
  const { openNew, openEdit, handleDelete } = useAdmin();
  const isAdmin = user && !user.isAnonymous;

  return (
    <div className="pt-20">
      <div className="bg-sh-blue py-16 text-center text-white relative">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Gallery</h1>
        <p className="text-sh-blue-light max-w-2xl mx-auto px-4 opacity-90">Capturing moments of hope, joy, and transformation.</p>
        
        {isAdmin && (
            <button 
                onClick={() => openNew('gallery')}
                className="absolute bottom-4 right-4 md:right-20 bg-sh-yellow text-sh-blue p-3 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 font-bold z-50"
            >
                <Plus size={20} /> Add Photo
            </button>
        )}
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <GalleryCard 
                key={item.id} 
                item={item} 
                isAdmin={!!isAdmin}
                openEdit={openEdit}
                handleDelete={handleDelete}
                setSelectedImage={setSelectedImage}
            />
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 fade-in">
          <button 
            className="absolute top-6 right-6 text-white hover:text-sh-yellow transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};