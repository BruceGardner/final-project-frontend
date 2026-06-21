import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fira  = Fira_Code({ subsets: ['latin'], variable: '--font-fira', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'My Portfolio', template: '%s | My Portfolio' },
  description: 'Full-stack developer portfolio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fira.variable}`}>
      <body className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}