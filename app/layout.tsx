import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { cn } from '@/lib/utils'; // Ensure utility for handling classNames

// ✅ Load fonts with optimized weights & subsets
const geistSans = Geist({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

// ✅ Metadata for SEO & better structure
export const metadata: Metadata = {
  title: 'Coditor - Online Code Editor',
  description: 'Coditor is a real-time collaborative online code editor.',
  keywords:
    'online code editor, collaborative coding, real-time coding, code editor with video call',
  authors: [{ name: 'Coditor' }],
};

// ✅ Root Layout Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          'h-full bg-background text-text antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
