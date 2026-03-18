import Comingsoon from '../coming-soon';
import Image from 'next/image';

const JcLab = () => (
  <main className="min-h-screen flex flex-col items-center justify-center px-6 text-white gap-12">
    {/* Page Title */}
    <h1 className="animate-fade-down text-7xl font-semibold mb-4 text-center lg:text-left w-full max-w-7xl">
      JcLab
    </h1>

    <div className="animate-fade flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-7xl w-full">
      <div className="text-xl font-extralight font-Inter max-w-lg lg:text-left">
        <p>
          Welcome to JcLab. Apart from coding and building cloud solutions, I
          started a personal project called <strong>JcLab</strong>, where I
          experiment with self-hosting services. This includes home automation,
          media servers, NAS, security cameras, Docker containers, and
          networking. I’m still learning the ropes of running a homelab, so stay
          tuned for updates and new experiments!
        </p>
      </div>

      <div className="flex-shrink-0">
        <Image loading='lazy'
          src="/JcLab.jpg"
          alt="JcLab Setup"
          width={600}
          height={800}
          className="animate-fade-up rounded-lg shadow-lg object-cover "
        />
      </div>
    </div>
  </main>
);

export default JcLab;
