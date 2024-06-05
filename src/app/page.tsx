import Image from 'next/image';
import Navbar from './navbar';
import Header from './header';

export default function Home() {
  return (
    <main>
      <Header />
      <Navbar />
    </main>
  );
}
