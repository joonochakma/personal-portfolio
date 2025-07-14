import Link from 'next/link';
import Header from './header';

const Comingsoon = () => (
  <main>
    <Header />
    <div className="flex flex-col items-center justify-center pt-12 text-center gap-6">
      <h1 className="font-Inter text-4xl">
        <Link
          href="/"
          className="hover:opacity-70 transition-opacity animate-fade-up animate-duration-[2000ms] animate-delay-200 animate-ease-in-out animate-normal"
        >
          JC.
        </Link>
      </h1>
      <div className="text-7xl animate-fade-up animate-duration-[2000ms] animate-delay-200 animate-ease-in-out animate-normal font-Inter">
        <h1>Coming Soon</h1>
      </div>
    </div>
  </main>
);

export default Comingsoon;
