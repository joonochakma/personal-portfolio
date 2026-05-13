import Link from 'next/link';
import Navlinks from './navlinks';

function Header() {
  return (
    <header
      className=" fixed dark:bg-black  top-0 left-0 right-0 z-50 
      animate-fade animate-once
      font-Inter font-extralight
      flex items-center justify-between
      px-6 sm:px-6 md:px-20 lg:px-32 xl:px-52
      py-3 sm:py-10
      text-xl sm:text-2xl light:bg-white light:text-black"
    >
      <h1>
        <Link
          href="/"
          className="transition-colors hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:via-sky-400 hover:to-pink-500 hover:bg-clip-text"
        >
          JC.
        </Link>
      </h1>

      <Navlinks />
    </header>
  );
}

export default Header;
