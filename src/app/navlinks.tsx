import Link from 'next/link';

import ThemeToggle from './theme-toggle';

export default function Navlinks() {
  return (
    <ul className=" pr-48 grid grid-cols-4 gap-4 items-center ">
      <Link href="/projects" className="hover:opacity-70 transition-opacity">
        Projects
      </Link>
      <Link
        href="/resume"
        target="_blank"
        className="hover:opacity-70 transition-opacity"
      >
        Resume
      </Link>
      <Link href="/Contact" className="hover:opacity-70 transition-opacity">
        Contact
      </Link>
      <ThemeToggle />
    </ul>
  );
}
