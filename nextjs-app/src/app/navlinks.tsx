import Link from 'next/link';
import ThemeToggle from './theme-toggle';

export default function Navlinks() {
  return (
    <ul className="flex gap-6 items-center text-base sm:text-lg">
      <li>
        <Link
          href="/projects"
          className="transition-colors hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:from-20% hover:via-sky-400 hover:via-30% hover:to-pink-500 hover:to-75% hover:bg-clip-text"
        >
          Projects
        </Link>
      </li>
      <li>
        <Link
          href="/skills"
          className="transition-colors hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:from-20% hover:via-sky-400 hover:via-30% hover:to-pink-500 hover:to-75% hover:bg-clip-text
"
        >
          Skills
        </Link>
      </li>
      <li>
        <Link
          href="https://joonos-resume.s3.ap-southeast-2.amazonaws.com/JoonoChakma_Resume_2025.pdf"
          className="transition-colors hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:from-20% hover:via-sky-400 hover:via-30% hover:to-pink-500 hover:to-75% hover:bg-clip-text"
        >
          CV
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="transition-colors hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:from-20% hover:via-sky-400 hover:via-30% hover:to-pink-500 hover:to-75% hover:bg-clip-text"
        >
          Contact
        </Link>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
}
