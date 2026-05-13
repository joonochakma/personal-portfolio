import Link from 'next/link';
import ThemeToggle from './theme-toggle';

const linkStyle =
  'transition-all duration-300 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:via-sky-400 hover:to-pink-500 hover:bg-clip-text';

export default function Navlinks() {
  return (
    <ul className="flex gap-6 items-center text-base sm:text-lg">
      <li>
        <Link href="/projects" className={linkStyle}>
          Projects
        </Link>
      </li>

      <li>
        <Link href="/skills" className={linkStyle}>
          Skills
        </Link>
      </li>

      <li>
        <Link href="/jc-lab" className={linkStyle}>
          JcLab
        </Link>
      </li>

      <li>
        <Link href="/blogs" className={linkStyle}>
          Blogs
        </Link>
      </li>
      <li>
        <Link
          href="https://joonos-resume.s3.ap-southeast-2.amazonaws.com/JoonoChakma_Resume.pdf"
          className={linkStyle}
        >
          CV
        </Link>
      </li>

      <li>
        <Link href="/contact" className={linkStyle}>
          Contact
        </Link>
      </li>

      {/* No hover animation applied */}
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
}
