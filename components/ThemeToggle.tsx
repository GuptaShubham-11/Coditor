'use client';

import { useTheme } from 'next-themes';
import { useThemeStore } from '@/store/theme';
import { Lightbulb, LightbulbOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme(); // Use resolvedTheme for correct initial value
  const { theme: zustandTheme, setTheme: setZustandTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (resolvedTheme) {
      setZustandTheme(resolvedTheme);
    }
  }, [resolvedTheme, setZustandTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setZustandTheme(newTheme);
  };

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition-all duration-300 hover:bg-borderL dark:hover:bg-borderD"
      aria-label="Toggle Theme"
    >
      {zustandTheme === 'dark' ? <LightbulbOff /> : <Lightbulb />}
    </button>
  );
}
