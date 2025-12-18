import Link from 'next/link';
import Comingsoon from '../coming-soon';

const Resume = () => (
  <main>
    <Comingsoon />
    <Link href="https://joonos-resume.s3.ap-southeast-2.amazonaws.com/JoonoChakma_Resume_2025.pdf">
      Resume
    </Link>
  </main>
);
export default Resume;
