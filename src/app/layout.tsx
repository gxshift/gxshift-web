import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GXShift | Premium Gaming Services',
  description: 'Platform jasa grinding & rank boosting premium.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-gx-dark text-gx-text antialiased selection:bg-gx-neon selection:text-gx-dark`}>
        {children}
      </body>
    </html>
  );
}