import React from 'react';
import { ScrollText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <>
      <header className="relative z-50 bg-paper/90 backdrop-blur-md border-b border-indigo-900/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Stamp */}
            <div className="w-12 h-12 bg-indigo-900 rounded-lg flex items-center justify-center text-paper shadow-lg shadow-indigo-900/20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="border border-white/30 w-10 h-10 flex items-center justify-center rounded">
                <span className="font-serif text-2xl font-bold">墨</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-indigo-900 tracking-[0.2em] font-serif">
                墨韵智汇
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-8 h-[1px] bg-cinnabar"></span>
                <p className="text-[10px] text-indigo-900/60 uppercase tracking-widest font-medium">
                  InkFlow · Mirror Flower Water Moon
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-indigo-100 shadow-sm">
             <div className="p-1.5 bg-indigo-50 rounded-full text-indigo-900">
               <ScrollText size={14} />
             </div>
             <span className="text-xs text-indigo-900 font-bold tracking-widest">非遗数字活化方案</span>
          </div>
        </div>
        
        {/* Decorative Pattern Strip (Bottom Edge) */}
        <div className="h-1 w-full bg-calico-pattern opacity-30"></div>
      </header>
    </>
  );
};

export default Header;