import Link from 'next/link';
import LightIcon from './icons/lightIcon';

export default function Navlinks() {
  return (
    <ul className=" pr-24 grid grid-cols-3 gap-3 ">
      <Link href="/Projects">Projects</Link>
      <Link href="/resume" target="_blank">
        Resume
      </Link>
      <Link href="/Contact">Contact</Link>
      <LightIcon colour="white" />
    </ul>
  );
}
