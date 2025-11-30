import React, { useRef } from 'react';
import { Save, Upload, X, Plus, Link as LinkIcon } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export const EditModal: React.FC = () => {
  const { isModalOpen, editingItem, activeCollection, closeModal, handleSave, handleImageUpload, handleGalleryImageAdd, handleGalleryImageRemove, uploading, setEditingItem } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isModalOpen || !editingItem) return null;

  const renderFormFields = () => {
    switch (activeCollection) {
      case 'team':
        return (
          <>
            <input placeholder="Name" className="w-full p-2 border rounded" value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
            <input placeholder="Role" className="w-full p-2 border rounded" value={editingItem.role || ''} onChange={e => setEditingItem({...editingItem, role: e.target.value})} />
            <textarea placeholder="Bio" className="w-full p-2 border rounded" value={editingItem.bio || ''} onChange={e => setEditingItem({...editingItem, bio: e.target.value})} />
          </>
        );
      case 'programs':
        return (
          <>
            <input placeholder="Title" className="w-full p-2 border rounded" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
            <textarea placeholder="Description" className="w-full p-2 border rounded" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
            <input placeholder="Icon Name (e.g., Heart, Shield)" className="w-full p-2 border rounded" value={editingItem.iconName || ''} onChange={e => setEditingItem({...editingItem, iconName: e.target.value})} />
          </>
        );
      case 'testimonials':
        return (
          <>
            <input placeholder="Name" className="w-full p-2 border rounded" value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
            <input placeholder="Role" className="w-full p-2 border rounded" value={editingItem.role || ''} onChange={e => setEditingItem({...editingItem, role: e.target.value})} />
            <textarea placeholder="Quote" className="w-full p-2 border rounded" value={editingItem.quote || ''} onChange={e => setEditingItem({...editingItem, quote: e.target.value})} />
          </>
        );
      case 'metrics':
        return (
          <>
            <input placeholder="Label (e.g., Lives Touched)" className="w-full p-2 border rounded" value={editingItem.label || ''} onChange={e => setEditingItem({...editingItem, label: e.target.value})} />
            <input placeholder="Value (e.g., 500+)" className="w-full p-2 border rounded" value={editingItem.value || ''} onChange={e => setEditingItem({...editingItem, value: e.target.value})} />
            <input placeholder="Description" className="w-full p-2 border rounded" value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
          </>
        );
      case 'gallery':
        const images = editingItem.images || (editingItem.imageUrl ? [editingItem.imageUrl] : []);
        return (
          <>
             <input placeholder="Title" className="w-full p-2 border rounded" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
             <input placeholder="Category" className="w-full p-2 border rounded" value={editingItem.category || ''} onChange={e => setEditingItem({...editingItem, category: e.target.value})} />
             
             <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                <div className="grid grid-cols-3 gap-2">
                    {images.map((img: string, idx: number) => (
                        <div key={idx} className="relative aspect-square group">
                            <img src={img} className="w-full h-full object-cover rounded border border-gray-200" alt={`Gallery ${idx}`} />
                            <button 
                                type="button"
                                onClick={() => handleGalleryImageRemove(idx)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50 aspect-square transition-colors">
                        <Plus size={24} className="text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">{uploading ? '...' : 'Add'}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleGalleryImageAdd} disabled={uploading} />
                    </label>
                </div>
             </div>
          </>
        );
      case 'hero_images':
        return (
            <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Upload a high-quality landscape image for the home page slider.</p>
            </div>
        );
      case 'content':
        const isLink = editingItem.id?.startsWith('link_');
        return (
            <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isLink ? 'Destination URL' : 'Edit Text Content'}
                </label>
                {isLink ? (
                     <div className="relative">
                        <input 
                            type="url"
                            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-sh-blue outline-none font-mono text-sm" 
                            value={editingItem.text || ''} 
                            onChange={e => setEditingItem({...editingItem, text: e.target.value})} 
                            placeholder="https://"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <LinkIcon size={16} />
                        </div>
                    </div>
                ) : (
                    <textarea 
                        rows={6}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sh-blue outline-none" 
                        value={editingItem.text || ''} 
                        onChange={e => setEditingItem({...editingItem, text: e.target.value})} 
                    />
                )}
                 {isLink && <p className="text-xs text-gray-500 mt-1">Users will be redirected to this URL when they click the button.</p>}
            </>
        )
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100] fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 capitalize">{editingItem.id && activeCollection !== 'content' ? 'Edit' : activeCollection === 'content' ? (editingItem.id?.startsWith('link_') ? 'Edit Link' : 'Edit Content') : 'Add'} {activeCollection === 'content' ? '' : activeCollection.replace('_', ' ')}</h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          {renderFormFields()}

          {/* Generic Image Upload for non-gallery items */}
          {['team', 'programs', 'hero_images'].includes(activeCollection) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="flex items-center gap-4">
                {editingItem.imageUrl && <img src={editingItem.imageUrl} className="w-16 h-16 object-cover rounded" alt="Preview" />}
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 text-sm"
                  disabled={uploading}
                >
                  <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={closeModal} className="flex-1 py-3 border rounded hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={uploading} className="flex-1 py-3 bg-sh-blue text-white rounded hover:bg-sh-blue-dark flex justify-center items-center gap-2">
              <Save size={18} /> {uploading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};