import Link from 'next/link';
import ThemeToggle from './theme-toggle';

export default function Navlinks() {
  return (
    <ul className="flex gap-6 items-center text-base sm:text-lg">
      <li>
        <Link href="/projects" className="hover:opacity-70 transition-opacity">
          Projects
        </Link>
      </li>
      <li>
        <Link href="/skills" className="hover:opacity-70 transition-opacity">
          Skills
        </Link>
      </li>
      <li>
        <Link
          href="https://joonos-resume.s3.ap-southeast-2.amazonaws.com/JoonoChakma_Resume_2025.pdf"
          className="hover:opacity-70 transition-opacity"
        >
          CV
        </Link>
      </li>
      <li>
        <Link href="/contact" className="hover:opacity-70 transition-opacity">
          Contact
        </Link>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
}
