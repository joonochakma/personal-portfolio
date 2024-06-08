import Link from 'next/link';

export default function Navlinks() {
  return (
    <ul className=" pr-16 grid grid-cols-3 gap-3 ">
      <Link href="/Projects">Projects</Link>
      <Link href="/Resume">Resume</Link>
      <Link href="/Contact">Contact</Link>
    </ul>
  );
}
