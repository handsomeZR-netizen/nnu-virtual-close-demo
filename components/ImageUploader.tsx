import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Plus } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File, previewUrl: string) => void;
  currentImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, currentImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [onImageSelected]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelected(file, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 border-b border-indigo-50 pb-2">
        <h2 className="text-lg font-serif font-bold text-indigo-900 flex items-center gap-2">
          <div className="w-2 h-2 bg-cinnabar rotate-45"></div>
          上传灵感源
        </h2>
        <span className="text-[10px] text-indigo-900/40 tracking-wider uppercase">Inspiration</span>
      </div>

      <div
        className={`
          relative w-full aspect-square md:aspect-video rounded-xl overflow-hidden transition-all duration-500 cursor-pointer group
          ${isDragging 
            ? 'border-2 border-dashed border-indigo-500 bg-indigo-50 scale-[1.02]' 
            : 'border border-indigo-100 bg-white shadow-sm hover:shadow-md hover:border-indigo-300'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="absolute inset-0 bg-calico-pattern opacity-10 pointer-events-none"></div>
        
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />

        {currentImage ? (
          <>
             {/* Preview Image with Sketch Effect Filter */}
            <div className="w-full h-full p-2 bg-white">
                <div className="w-full h-full overflow-hidden rounded relative">
                    <img 
                    src={currentImage} 
                    alt="Uploaded" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* Overlay to unify tone */}
                    <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay"></div>
                </div>
            </div>
            
            {/* Change Button */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-indigo-100 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-900 shadow-lg flex items-center gap-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <ImageIcon size={14} /> 
              <span>更换照片</span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-900/60 p-6 text-center">
            {/* Decorative dashed circle */}
            <div className={`
              w-20 h-20 mb-6 rounded-full border border-dashed border-indigo-200 flex items-center justify-center
              group-hover:border-indigo-400 group-hover:scale-110 transition-all duration-300
              ${isDragging ? 'animate-spin-slow border-indigo-500' : ''}
            `}>
              <Plus size={24} className="text-indigo-300 group-hover:text-indigo-500" />
            </div>
            
            <p className="font-serif font-bold text-lg mb-2 text-indigo-900">点击或拖拽上传</p>
            <p className="text-xs text-indigo-900/40 tracking-wide max-w-[200px] leading-relaxed">
              支持全身或半身照<br/>建议背景简洁，光线均匀
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;