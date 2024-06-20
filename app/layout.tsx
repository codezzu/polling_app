import './globals.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <title>Sosyal Turnuva</title>
      </Head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
