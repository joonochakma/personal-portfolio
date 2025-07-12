import Link from 'next/link';
import Navlinks from './navlinks';

function Header() {
  return (
    <div className="animate-fade animate-once font-Inter font-extralight items-center flex text-2xl py-10 mb-16">
      <h1 className="font-Inter flex-1 pl-52">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          JC.
        </Link>
      </h1>
      <Navlinks />
    </div>
  );
}

export default Header;
