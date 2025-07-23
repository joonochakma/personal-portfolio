// components/PhoneFrameMedia.tsx
'use client';
import Image from 'next/image';

type PhoneFrameMediaProps = {
  mediaType: 'image' | 'video';
  src: string;
  alt?: string;
  frameSrc?: string;
  className?: string;
};

export default function PhoneFrameMedia({
  mediaType,
  src,
  alt = 'App preview',
  frameSrc = '/phoneFrame.svg',
  className = '',
}: PhoneFrameMediaProps) {
  return (
    <div
      className={`relative w-[180px] sm:w-[216px] md:w-[240px] aspect-[9/18] ${className}`}
    >
      {/* Overlay frame on top */}
      <Image
        src={frameSrc}
        alt={alt}
        fill
        className="z-10 object-contain pointer-events-none"
        priority
      />

      {/* Content inside phone screen */}
      <div
        className="absolute z-0 overflow-hidden rounded-[1.5rem]"
        style={{
          top: '2.2%',
          left: '5%',
          width: '90%',
          height: '96%',
        }}
      >
        {mediaType === 'video' ? (
          <video
            src={src}
            className="w-full h-full object-cover"
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={500}
            height={1000}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
