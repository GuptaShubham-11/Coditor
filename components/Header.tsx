'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const navItems = [
    { name: 'Features', href: '/features' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className="bg-backgroundL/80 dark:bg-backgroundD/80 backdrop-blur-md border-b border-borderL dark:border-borderD sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all hover:brightness-125"
          >
            Coditor
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className="text-textL dark:text-textD hover:text-primary dark:hover:text-secondary transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary dark:bg-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6 hover:bg-secondaryL dark:hover:bg-secondaryD/50 rounded-lg transition">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
