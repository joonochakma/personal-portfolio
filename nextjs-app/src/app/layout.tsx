import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Joono Chakma',
  description: 'Created by Joono Chakma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="dark:bg-black bg-white dark:text-white text-black">
        {children}
      </body>
    </html>
  );
}
