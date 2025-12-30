import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleGallery from './components/StyleGallery';
import FittingRoom from './components/FittingRoom';
import { StyleOption } from './types';
import { generateTryOnImage } from './services/imageGenerationService';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setUploadedFile(file);
    setUploadedImage(previewUrl);
    setGeneratedImage(null); 
  };

  const handleStyleSelect = (style: StyleOption) => {
    setSelectedStyle(style);
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedStyle) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const url = await generateTryOnImage(uploadedFile, selectedStyle);
      setGeneratedImage(url);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("生成失败，请稍后重试。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper bg-noise flex flex-col font-serif relative overflow-x-hidden">
      
      {/* Global Background Elements (Atmosphere) */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Large blurred ink spots */}
         <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-50/60 rounded-full blur-[120px] mix-blend-multiply"></div>
         {/* Pattern Overlay */}
         <div className="absolute top-20 right-10 w-32 h-32 bg-calico-pattern opacity-10 rounded-full"></div>
      </div>

      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:px-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Inspiration & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Uploader Section */}
          <section className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-shadow duration-500">
            <ImageUploader 
              onImageSelected={handleImageSelect} 
              currentImage={uploadedImage} 
            />
          </section>

          {/* Gallery Section */}
          <section className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/60 shadow-sm flex-1 flex flex-col hover:shadow-md transition-shadow duration-500">
            <StyleGallery 
              selectedStyle={selectedStyle} 
              onSelect={handleStyleSelect} 
            />
            
            {/* Style Description Detail - Enhanced */}
            {selectedStyle ? (
              <div className="mt-auto pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-5 bg-gradient-to-br from-indigo-50/80 to-white rounded-xl border border-indigo-100 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-calico-pattern opacity-10 pointer-events-none"></div>
                  
                  <h4 className="text-indigo-900 font-bold mb-3 flex items-center justify-between">
                    <span className="text-lg">{selectedStyle.name}</span>
                    <span className="text-[10px] px-2 py-1 bg-white border border-indigo-100 rounded text-indigo-800 shadow-sm">
                      {selectedStyle.category}
                    </span>
                  </h4>
                  <p className="text-sm text-indigo-900/70 leading-relaxed font-sans text-justify">
                    {selectedStyle.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedStyle.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-indigo-100/50 text-indigo-600 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
                <div className="mt-auto pt-6 flex justify-center opacity-30">
                    <div className="text-center">
                        <div className="text-4xl mb-2">❦</div>
                        <p className="text-xs tracking-widest">选择一款式样以预览详情</p>
                    </div>
                </div>
            )}
          </section>
        </div>

        {/* Right Column: Fitting Room & Results */}
        <div className="lg:col-span-7 h-[650px] lg:h-auto lg:min-h-[750px] sticky top-24">
          <FittingRoom 
            originalImage={uploadedImage}
            generatedImage={generatedImage}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            canGenerate={!!uploadedImage && !!selectedStyle}
          />
        </div>
      </main>

      <footer className="py-8 text-center relative z-10 border-t border-indigo-900/5 mt-8">
        <div className="w-8 h-8 mx-auto mb-4 opacity-20 bg-indigo-900 rounded-full flex items-center justify-center text-white font-serif">墨</div>
        <p className="text-indigo-900/40 text-xs tracking-[0.2em]">© 2024 InkFlow 墨韵智汇 | Non-legacy Digital Activation</p>
      </footer>
    </div>
  );
};

export default App;