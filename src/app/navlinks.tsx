import Link from 'next/link';
import LightIcon from './icons/light-Icon';
import ThemeToggle from './theme-toggle';

export default function Navlinks() {
  return (
    <ul className=" pr-48 grid grid-cols-4 gap-4 items-center">
      <Link href="/Projects">Projects</Link>
      <Link href="/resume" target="_blank">
        Resume
      </Link>
      <Link href="/Contact">Contact</Link>
      <ThemeToggle />
      <LightIcon colour="white" />
    </ul>
  );
}
