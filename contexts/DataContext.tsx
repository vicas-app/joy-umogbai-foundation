import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TeamMember, Program, Testimonial, Metric, GalleryItem, ContentItem, AppSettings, HeroImage } from '../types';
import { useAuth } from './AuthContext';
import { TESTIMONIALS } from '../constants';

interface DataContextType {
  teamMembers: TeamMember[];
  programs: Program[];
  testimonials: Testimonial[];
  metrics: Metric[];
  galleryItems: GalleryItem[];
  heroImages: HeroImage[];
  settings: AppSettings;
  content: Record<string, string>; // Map id -> text
  refreshData: () => Promise<void>;
  loading: boolean;
  getContent: (id: string, defaultText: string) => string;
}

const DataContext = createContext<DataContextType>({
  teamMembers: [],
  programs: [],
  testimonials: [],
  metrics: [],
  galleryItems: [],
  heroImages: [],
  settings: {},
  content: {},
  refreshData: async () => {},
  loading: false,
  getContent: (_, text) => text,
});

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useAuth();
  const [data, setData] = useState({
    teamMembers: [] as TeamMember[],
    programs: [] as Program[],
    testimonials: [] as Testimonial[],
    metrics: [] as Metric[],
    galleryItems: [] as GalleryItem[],
    heroImages: [] as HeroImage[],
    settings: {} as AppSettings,
    content: {} as Record<string, string>,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [teamSnap, progSnap, testSnap, metricSnap, gallerySnap, contentSnap, settingsSnap, heroSnap] = await Promise.all([
        getDocs(collection(db, 'team')),
        getDocs(collection(db, 'programs')),
        getDocs(collection(db, 'testimonials')),
        getDocs(collection(db, 'metrics')),
        getDocs(collection(db, 'gallery')),
        getDocs(collection(db, 'content')),
        getDoc(doc(db, 'settings', 'global')),
        getDocs(collection(db, 'hero_images')),
      ]);

      // Use constants as fallback if Firestore is empty for testimonials
      const testimonialsData = testSnap.empty 
        ? TESTIMONIALS 
        : testSnap.docs.map(d => ({ ...d.data(), id: d.id } as Testimonial));

      const newData = {
        teamMembers: teamSnap.docs.map(d => ({ ...d.data(), id: d.id } as TeamMember)),
        programs: progSnap.docs.map(d => ({ ...d.data(), id: d.id } as Program)),
        testimonials: testimonialsData,
        metrics: metricSnap.docs.map(d => ({ ...d.data(), id: d.id } as Metric)), 
        galleryItems: gallerySnap.docs.map(d => ({ ...d.data(), id: d.id } as GalleryItem)),
        heroImages: heroSnap.docs.map(d => ({ ...d.data(), id: d.id } as HeroImage)),
        settings: settingsSnap.exists() ? (settingsSnap.data() as AppSettings) : {},
        content: {} as Record<string, string>,
      };

      if (!contentSnap.empty) {
        contentSnap.docs.forEach(doc => {
          newData.content[doc.id] = doc.data().text;
        });
      }

      setData(newData);
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        console.warn("Using static content (Firestore access requires login or open security rules).");
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const getContent = (id: string, defaultText: string) => {
    return data.content[id] || defaultText;
  };

  return (
    <DataContext.Provider value={{ ...data, refreshData: fetchData, loading, getContent }}>
      {children}
    </DataContext.Provider>
  );
};