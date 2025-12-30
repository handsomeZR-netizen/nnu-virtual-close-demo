import React from 'react';
import { STYLE_GALLERY } from '../constants';
import { StyleOption } from '../types';
import { Check } from 'lucide-react';

interface StyleGalleryProps {
  selectedStyle: StyleOption | null;
  onSelect: (style: StyleOption) => void;
}

const StyleGallery: React.FC<StyleGalleryProps> = ({ selectedStyle, onSelect }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-indigo-50 pb-2">
        <h2 className="text-lg font-serif font-bold text-indigo-900 flex items-center gap-2">
          <div className="w-2 h-2 bg-cinnabar rotate-45"></div>
          款式画廊
        </h2>
        <span className="text-[10px] text-indigo-900/40 tracking-wider uppercase">Style Gallery</span>
      </div>

      <div className="w-full overflow-x-auto hide-scrollbar pb-6 pt-2">
        <div className="flex gap-5 min-w-max px-2">
          {STYLE_GALLERY.map((style) => {
            const isSelected = selectedStyle?.id === style.id;
            return (
              <button
                key={style.id}
                onClick={() => onSelect(style)}
                className={`
                  relative group flex flex-col items-start w-40 transition-all duration-500
                  ${isSelected ? 'translate-y-[-8px]' : 'hover:translate-y-[-4px] opacity-80 hover:opacity-100'}
                `}
              >
                {/* Card Container */}
                <div className={`
                  relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-md bg-white p-2
                  transition-all duration-300
                  ${isSelected ? 'shadow-xl shadow-indigo-900/20 ring-1 ring-indigo-900' : 'border border-gray-100'}
                `}>
                  
                  {/* Inner Image Frame */}
                  <div className="w-full h-full relative rounded-sm overflow-hidden">
                    <img 
                      src={style.previewImage} 
                      alt={style.name}
                      className={`
                        w-full h-full object-cover transition-transform duration-700 
                        ${isSelected ? 'scale-110' : 'group-hover:scale-110 grayscale-[30%]'}
                      `}
                    />
                    
                    {/* Blue Tint Overlay on Select */}
                    <div className={`
                      absolute inset-0 bg-indigo-900/20 transition-opacity duration-300
                      ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'}
                    `}></div>

                    {/* Selection Checkmark Badge */}
                    <div className={`
                      absolute top-2 right-2 w-6 h-6 bg-cinnabar text-white rounded-full flex items-center justify-center shadow-md transform transition-all duration-300
                      ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                    `}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>

                  {/* Category Tag - Floating */}
                  <div className={`
                    absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] text-indigo-900 font-bold shadow-sm whitespace-nowrap border border-indigo-50
                    transition-all duration-300
                    ${isSelected ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}
                  `}>
                    {style.category}
                  </div>
                </div>

                {/* Text Info */}
                <div className="text-center w-full px-1">
                  <h3 className={`font-serif font-bold text-sm truncate transition-colors ${isSelected ? 'text-indigo-900' : 'text-gray-500'}`}>
                    {style.name}
                  </h3>
                  <div className={`h-[1px] w-0 bg-cinnabar mx-auto mt-1 transition-all duration-500 ${isSelected ? 'w-8' : 'group-hover:w-4'}`}></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StyleGallery;