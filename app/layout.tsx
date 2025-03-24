import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';

// ✅ Load fonts with optimized settings
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

// ✅ Metadata for SEO
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'h-full min-h-screen bg-backgroundL dark:bg-backgroundD text-textL dark:text-textD antialiased selection:bg-accent/90',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
            <Toaster />
            <Header />
            <main className="h-full min-h-[calc(100vh-4rem)]">{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
