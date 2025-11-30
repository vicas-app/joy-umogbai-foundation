import React from 'react';
import { useData } from '../contexts/DataContext';
import { useAdmin } from '../contexts/AdminContext';
import { useAuth } from '../contexts/AuthContext';
import { Edit2 } from 'lucide-react';

interface EditableTextProps {
  id: string;
  defaultText: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({ id, defaultText, className = '', tag: Tag = 'span' }) => {
  const { getContent } = useData();
  const { openEdit } = useAdmin();
  const { user } = useAuth();
  
  const isAdmin = user && !user.isAnonymous;
  const text = getContent(id, defaultText);

  if (!isAdmin) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={`${className} relative group cursor-pointer border-2 border-transparent hover:border-sh-blue/30 hover:bg-sh-blue/5 rounded px-1 -mx-1 transition-all`}
         onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openEdit('content', { id, text });
         }}
    >
      {text}
      <span className="absolute -top-3 -right-3 bg-white shadow-md rounded-full p-1 text-sh-blue opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2 size={12} />
      </span>
    </Tag>
  );
};