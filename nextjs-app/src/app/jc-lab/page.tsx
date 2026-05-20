
import Image from 'next/image';
import Link from 'next/link';


const JcLab = () => (
  <main className="min-h-screen flex flex-col items-center justify-center px-6 dark:bg-black bg-white dark:text-white text-black  gap-12 font-Inter">
    {/* Page Title */}
    <h1 className="animate-fade-down text-7xl font-semibold mb-4 text-center lg:text-left w-full max-w-7xl">
      JcLab
    </h1>

    {/* Intro Section */}
    <div className="animate-fade flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-7xl w-full">
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-6 text-xl font-extralight max-w-lg lg:text-left">
        <p>
          Welcome to JcLab. Apart from coding and building cloud solutions, I
          started a personal project called <strong>JcLab</strong>, where I
          experiment with self-hosting services including automation, NAS,
          Docker containers, networking, and homelab experiments.
          <br />
          <br />
          My core storage system runs on a TrueNAS machine, which serves as the
          primary data hub and performs monthly backups to AWS S3 Glacier for
          long-term archival and durability. On top of this, the TrueNAS server
          hosts services such as Jellyfin for media streaming, Navidrome for
          music streaming, and Tailscale for secure VPN access. I’m also
          planning to expand the ecosystem with Nextcloud for file collaboration
          and Immich as a dedicated photo management platform.
          <br />
          <br />
          I also run Home Assistant on a Raspberry Pi for smart home
          automation and integration across devices. In addition, I run a
          Mailcow instance on a Mac mini to manage my self-hosted email server.
        </p>

        <div className="group relative w-fit p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
          {/* Hover bloom effect */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[400%] group-hover:h-[400%] group-hover:scale-100 transition-all duration-700 ease-out" />
          </div>

          {/* Button */}
          <Link
            href="/blogs"
            aria-label="Blogs"
            className="relative z-10 flex items-center dark:bg-black bg-white px-6 py-2 rounded-md transition-colors duration-500 group-hover:bg-transparent"
          >
            <span className="font-thin font-Inter whitespace-nowrap">
              Blogs
            </span>
          </Link>
        </div>
      </div>

      {/* RIGHT COLUMN (IMAGE) */}
      <div className="flex-shrink-0">
        <Image
          src="/JcLab.jpg"
          alt="JcLab Setup"
          width={600}
          height={800}
          className="animate-fade-up rounded-lg shadow-lg object-cover"
        />
      </div>
    </div>
  </main>
);

export default JcLab;