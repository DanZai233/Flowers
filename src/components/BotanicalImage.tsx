import React, { useState } from 'react';
import { Flower as FlowerIcon } from 'lucide-react';

interface BotanicalImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  cssFilter?: string;
  overlayClass?: string;
  flowerName?: string;
  colorHex?: string;
  aspectRatioClass?: string;
  onClick?: () => void;
}

export const BotanicalImage: React.FC<BotanicalImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden bg-[#f4f1ea]',
  cssFilter = 'none',
  overlayClass,
  flowerName,
  colorHex,
  aspectRatioClass,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={`${containerClassName} ${aspectRatioClass || ''}`}
      onClick={onClick}
    >
      {/* Skeleton Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#ebe7df] flex flex-col items-center justify-center p-4 overflow-hidden z-10">
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

          {/* Archival Skeleton Placeholder Graphic */}
          <div className="relative flex flex-col items-center justify-center space-y-2 opacity-60">
            <div className="w-10 h-10 rounded-full border border-stone-300 bg-white/60 flex items-center justify-center shadow-2xs">
              <FlowerIcon className="w-5 h-5 text-stone-400 animate-pulse" />
            </div>
            {flowerName && (
              <span className="text-[11px] font-serif-sc text-stone-500 font-medium">
                {flowerName}
              </span>
            )}
            <span className="text-[9px] font-mono tracking-widest text-stone-400 uppercase">
              SPECIMEN LOADING
            </span>
          </div>
        </div>
      )}

      {/* Fallback Container if Image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 bg-[#f7f5f0] border border-stone-200 flex flex-col items-center justify-center p-4 text-center space-y-2">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 shadow-2xs"
            style={{ backgroundColor: colorHex ? `${colorHex}25` : '#f5f5f4' }}
          >
            <FlowerIcon 
              className="w-5 h-5" 
              style={{ color: colorHex || '#78716c' }} 
            />
          </div>
          <span className="text-xs font-serif-sc font-medium text-stone-800">
            {flowerName || alt}
          </span>
          <span className="text-[10px] font-mono text-stone-400">
            NATURAL HERBARIUM RECORD
          </span>
        </div>
      ) : (
        /* Actual Image with smooth transition & filter */
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
            setHasError(true);
          }}
          style={{ filter: cssFilter }}
          className={`${className} transition-all duration-500 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
          }`}
        />
      )}

      {/* Optional Filter Overlay Texture / Tint */}
      {isLoaded && !hasError && overlayClass && (
        <div className={`absolute inset-0 ${overlayClass}`} />
      )}
    </div>
  );
};
