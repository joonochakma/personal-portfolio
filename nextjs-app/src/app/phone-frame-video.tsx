import Image from 'next/image';

export default function PhoneFrameVideo({
  videoSrc,
  frameSrc = '/phoneFrame.svg',
  alt = 'App demo',
  className = '',
}: PhoneFrameVideoProps) {
  return (
    <div
      className={`relative w-[180px] sm:w-[216px] md:w-[240px] aspect-[9/18] ${className}`}
    >
      {/* Video container behind */}
      <div
        className="absolute rounded-[1.5rem] overflow-hidden inset-0"
        style={{
          top: '2.2%',
          left: '5%',
          width: '90%',
          height: '96%',
          zIndex: 0,
          position: 'absolute',
        }}
      >
        <video
          src={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Phone SVG frame on top */}
      <Image
        src={frameSrc}
        alt={alt}
        fill
        className="z-10 object-contain pointer-events-none"
        priority
      />
    </div>
  );
}
