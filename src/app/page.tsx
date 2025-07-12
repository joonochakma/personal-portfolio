import Navbar from './navbar';
import Header from './header';
import Socials from './socials';

export default function Home() {
  return (
    <main>
      <Header />
      <p className=" font-extralight font-Inter px-52 py-9">Hey. Im</p>
      <Navbar />
      <p className=" font-extralight font-Inter text-wrap w-full pl-52 pr-52 py-9">
        I'm a passionate software developer based in Melbourne, Australia.
        Currently, I am honing my skills and expanding my knowledge at Swinburne
        University of Technology. My journey into the world of software
        development is fueled by a deep curiosity and a love for technology.
        When I'm not coding, you can find me capturing moments through
        photography or creating melodies with my music. Welcome to my portfolio,
        where I showcase my projects and the creative solutions I've developed
        along the way.
      </p>
      <Socials />
    </main>
  );
}
