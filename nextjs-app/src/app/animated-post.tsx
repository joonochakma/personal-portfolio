'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function AnimatedPost({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false, // Allow repeated animations when scrolling up/down
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
