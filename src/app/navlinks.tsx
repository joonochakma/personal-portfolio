import Link from 'next/link';

export default function Navlinks() {
  return (
    <ul>
      <Link href="/Projects">Projects</Link>;,
      <Link href="/Resume">Resume</Link>;,
      <Link href="/Contact">Contact</Link>;
    </ul>
  );
}
