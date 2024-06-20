import './globals.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';

export default function RootLayout({ children }) {
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
