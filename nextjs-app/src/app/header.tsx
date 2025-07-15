import Link from 'next/link';
import Navlinks from './navlinks';

function Header() {
  return (
    <div className="animate-fade animate-once font-Inter font-extralight flex items-center justify-between px-6 sm:px-12 md:px-20 lg:px-32 xl:px-52 text-xl sm:text-2xl py-6 sm:py-10 mb-12 sm:mb-16">
      <h1 className="font-Inter">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          JC.
        </Link>
      </h1>
      <Navlinks />
    </div>
  );
}

export default Header;
