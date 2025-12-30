import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Download, Share2, Sparkles, RefreshCw, Wand2 } from 'lucide-react';

interface FittingRoomProps {
  originalImage: string | null;
  generatedImage: string | null;
  isGenerating: boolean;
  onGenerate: () => void;
  canGenerate: boolean;
}

// Corner Decoration Component
const CornerFrame = ({ className }: { className?: string }) => (
  <div className={`absolute w-8 h-8 border-indigo-900/30 transition-all duration-500 group-hover:border-indigo-900/60 ${className}`} />
);

const FittingRoom: React.FC<FittingRoomProps> = ({
  originalImage,
  generatedImage,
  isGenerating,
  onGenerate,
  canGenerate
}) => {
  const [dyeLevel, setDyeLevel] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);
  const [showPoster, setShowPoster] = useState(false);

  // Animation Logic for the "Dyeing" Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGenerating) {
      setDyeLevel(0);
      interval = setInterval(() => {
        setDyeLevel((prev) => {
          if (prev >= 95) return prev; 
          return prev + 1; 
        });
      }, 50); 
    } else if (generatedImage) {
      setDyeLevel(100);
      setTimeout(() => setDyeLevel(0), 800); 
    } else {
      setDyeLevel(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating, generatedImage]);

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'inkflow-tryon.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col h-full relative group">
      
      {/* Container Background with Texture */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/50 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-50 mix-blend-multiply"></div>
        {/* Subtle decorative circle background */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-900 to-indigo-600 rounded-full"></div>
             <div>
               <h2 className="text-xl font-serif font-bold text-indigo-900 tracking-widest">镜花水月</h2>
               <p className="text-[10px] text-indigo-900/50 uppercase tracking-widest">Virtual Try-On</p>
             </div>
          </div>
          
          {generatedImage && !isGenerating && (
            <div className="flex gap-2 animate-in fade-in slide-in-from-right-4 duration-500">
              <button 
                className="w-10 h-10 flex items-center justify-center bg-white text-indigo-900 rounded-full shadow-sm border border-indigo-50 hover:bg-indigo-50 transition-colors"
                title="按住对比"
                onMouseDown={() => setShowOriginal(true)}
                onMouseUp={() => setShowOriginal(false)}
                onMouseLeave={() => setShowOriginal(false)}
                onTouchStart={() => setShowOriginal(true)}
                onTouchEnd={() => setShowOriginal(false)}
              >
                <ArrowLeftRight size={18} />
              </button>
              <button 
                onClick={handleDownload}
                className="w-10 h-10 flex items-center justify-center bg-white text-indigo-900 rounded-full shadow-sm border border-indigo-50 hover:bg-indigo-50 transition-colors"
              >
                <Download size={18} />
              </button>
              <button 
                className="w-10 h-10 flex items-center justify-center bg-indigo-900 text-white rounded-full shadow-md hover:bg-indigo-800 transition-colors"
                onClick={() => setShowPoster(true)}
              >
                <Share2 size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Main Canvas Frame */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#eef2f6] shadow-inner flex items-center justify-center group/canvas ring-4 ring-white ring-offset-2 ring-offset-indigo-50/50">
          
          {/* Traditional Corner Ornaments */}
          <CornerFrame className="top-4 left-4 border-t-2 border-l-2 rounded-tl-lg z-20" />
          <CornerFrame className="top-4 right-4 border-t-2 border-r-2 rounded-tr-lg z-20" />
          <CornerFrame className="bottom-4 left-4 border-b-2 border-l-2 rounded-bl-lg z-20" />
          <CornerFrame className="bottom-4 right-4 border-b-2 border-r-2 rounded-br-lg z-20" />

          {!originalImage ? (
            <div className="text-indigo-900/30 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-900/5 rounded-full blur-xl animate-pulse"></div>
                <div className="w-24 h-24 border border-indigo-900/20 rounded-full flex items-center justify-center relative bg-white/30 backdrop-blur-sm">
                  <span className="font-serif text-4xl opacity-50">镜</span>
                </div>
              </div>
              <p className="font-serif text-sm tracking-[0.2em] font-medium">待君入画</p>
              <p className="text-xs opacity-60 mt-2 font-sans">请先上传左侧灵感源</p>
            </div>
          ) : (
            <>
              {/* Image Display */}
              <img 
                src={showOriginal ? originalImage : (generatedImage || originalImage)} 
                alt="Main Display" 
                className={`
                  w-full h-full object-cover transition-all duration-700 ease-in-out
                  ${!generatedImage && !isGenerating ? 'grayscale-[80%] opacity-90 scale-95 blur-[1px]' : 'scale-100'} 
                `}
              />

              {/* Waiting Overlay */}
              {!generatedImage && !isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/50 shadow-lg">
                     <span className="text-indigo-900 font-serif tracking-widest text-sm">等待织造...</span>
                  </div>
                </div>
              )}

              {/* Dyeing Animation - Liquid Effect */}
              {(isGenerating || dyeLevel > 0) && (
                <div 
                  className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-indigo-900 via-indigo-900/95 to-indigo-800/90 backdrop-blur-[2px] transition-all duration-300 ease-out z-30 flex items-end justify-center pb-12"
                  style={{ height: `${dyeLevel}%` }}
                >
                  {/* Wave edge */}
                  <div className="absolute top-0 left-0 w-full h-12 -mt-6">
                     <svg className="w-full h-full text-indigo-800/90 fill-current" viewBox="0 0 100 25" preserveAspectRatio="none">
                        <path d="M0,25 C30,25 20,0 50,0 C80,0 70,25 100,25 Z" className="animate-pulse" />
                     </svg>
                  </div>
                  
                  {isGenerating && (
                    <div className="text-white font-serif tracking-widest flex flex-col items-center animate-bounce-slow">
                      <div className="relative w-16 h-16 mb-4">
                        <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping-slow"></div>
                        <div className="absolute inset-0 border-4 border-t-white border-white/10 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Wand2 size={20} className="text-white/80" />
                        </div>
                      </div>
                      <span className="text-2xl font-bold shadow-black/20 drop-shadow-lg">织造浸染中</span>
                      <span className="text-xs opacity-70 mt-2 tracking-[0.3em] uppercase">Processing</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Generate Button Area */}
        <div className="mt-8 z-10 relative">
          {/* Decorative lines beside button */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-indigo-100 -z-10"></div>
          
          <button
            onClick={onGenerate}
            disabled={!canGenerate || isGenerating}
            className={`
              mx-auto relative group overflow-hidden px-12 py-4 rounded-full font-serif font-bold text-lg tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl
              ${!canGenerate || isGenerating
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                : 'bg-indigo-900 text-white hover:shadow-indigo-900/40 hover:-translate-y-1'
              }
            `}
          >
            {/* Button internal texture/shine */}
            {!(!canGenerate || isGenerating) && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            )}
            
            {isGenerating ? (
              <span className="opacity-80">织造中...</span>
            ) : generatedImage ? (
              <>
                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 
                <span>重新织造</span>
              </>
            ) : (
              <>
                <Sparkles size={18} className="group-hover:scale-125 transition-transform duration-300" /> 
                <span>开始织造</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Poster Modal */}
      {showPoster && generatedImage && (
        <div className="absolute inset-0 z-50 bg-indigo-950/90 backdrop-blur-lg flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="bg-paper p-8 rounded-sm shadow-2xl max-w-sm w-full relative">
            <button 
              onClick={() => setShowPoster(false)} 
              className="absolute -top-10 right-0 text-white/50 hover:text-white"
            >
              关闭
            </button>
            
            <div className="border border-indigo-900/10 p-4 h-full relative">
               {/* Inner corner accents */}
               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-900"></div>
               <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-900"></div>
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-900"></div>
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-900"></div>

               <div className="mb-4 overflow-hidden grayscale-[10%]">
                 <img src={generatedImage} alt="Poster" className="w-full h-auto object-cover" />
               </div>
               
               <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-indigo-900 mb-1">墨韵智汇</h3>
                    <p className="text-[10px] uppercase tracking-widest text-indigo-900/60">Digital Heritage</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                     <div className="w-10 h-10 bg-cinnabar text-white rounded-sm flex items-center justify-center font-serif text-lg shadow-sm border border-red-800">
                      印
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FittingRoom;