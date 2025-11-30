import React, { createContext, useContext, useState } from 'react';
import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, addDoc, getDocs } from 'firebase/firestore';
import { uploadToCloudinary } from '../utils/cloudinary';
import { useData } from './DataContext';

interface AdminContextType {
  isModalOpen: boolean;
  editingItem: any;
  activeCollection: string;
  uploading: boolean;
  openEdit: (collectionName: string, item: any) => void;
  openNew: (collectionName: string) => void;
  closeModal: () => void;
  handleSave: (e: React.FormEvent) => Promise<void>;
  handleDelete: (collectionName: string, id: string) => Promise<void>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleGalleryImageAdd: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleGalleryImageRemove: (index: number) => void;
  setEditingItem: (item: any) => void;
  updateLogo: (file: File) => Promise<void>;
  uploadGlobalImage: (key: string, file: File) => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children?: React.ReactNode }) => {
  const { refreshData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeCollection, setActiveCollection] = useState('');
  const [uploading, setUploading] = useState(false);

  const openEdit = (collectionName: string, item: any) => {
    setActiveCollection(collectionName);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const openNew = (collectionName: string) => {
    setActiveCollection(collectionName);
    setEditingItem({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const colRef = collection(db, activeCollection);
      
      // Handle generic content updates specifically
      if (activeCollection === 'content') {
        await setDoc(doc(db, 'content', editingItem.id), { text: editingItem.text }, { merge: true });
        await refreshData();
        closeModal();
        setUploading(false);
        return;
      }

      if (editingItem.id) {
        await setDoc(doc(db, activeCollection, editingItem.id), editingItem, { merge: true });
      } else {
        if (activeCollection === 'metrics' && editingItem.label) {
            const id = editingItem.label.toLowerCase().replace(/\s+/g, '_');
            await setDoc(doc(db, activeCollection, id), editingItem);
        } else {
            await addDoc(colRef, editingItem);
        }
      }

      await refreshData();
      closeModal();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save changes.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      await refreshData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(e.target.files[0]);
        setEditingItem({ ...editingItem, imageUrl: url });
      } catch (error) {
        alert("Image upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleGalleryImageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(e.target.files[0]);
        const currentImages = editingItem.images || (editingItem.imageUrl ? [editingItem.imageUrl] : []);
        const newImages = [...currentImages, url];
        setEditingItem({ 
            ...editingItem, 
            images: newImages, 
            imageUrl: newImages[0] 
        });
      } catch (error) {
        alert("Image upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleGalleryImageRemove = (index: number) => {
      const currentImages = editingItem.images || (editingItem.imageUrl ? [editingItem.imageUrl] : []);
      const newImages = currentImages.filter((_: any, i: number) => i !== index);
      setEditingItem({ 
            ...editingItem, 
            images: newImages, 
            imageUrl: newImages.length > 0 ? newImages[0] : '' 
      });
  }

  const updateLogo = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      await setDoc(doc(db, 'settings', 'global'), { logoUrl: url }, { merge: true });
      await refreshData();
    } catch (error) {
      console.error("Logo update failed", error);
      alert("Failed to update logo");
    } finally {
      setUploading(false);
    }
  }

  const uploadGlobalImage = async (key: string, file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      await setDoc(doc(db, 'settings', 'global'), { [key]: url }, { merge: true });
      await refreshData();
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Failed to update image");
    } finally {
      setUploading(false);
    }
  }

  return (
    <AdminContext.Provider value={{
      isModalOpen, editingItem, activeCollection, uploading,
      openEdit, openNew, closeModal, handleSave, handleDelete, handleImageUpload, handleGalleryImageAdd, handleGalleryImageRemove, setEditingItem, updateLogo, uploadGlobalImage
    }}>
      {children}
    </AdminContext.Provider>
  );
};
