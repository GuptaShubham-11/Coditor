'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CodeCube from '../3d/CodeCube';
import { Button } from '../ui/button';

export default function HeroSection() {
  return (
    <main className="bg-backgroundL dark:bg-backgroundD text-textL dark:text-textD flex flex-col items-center px-6 md:px-12 relative overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between space-y-10 md:space-y-0 pt-16 pb-24">
        {/* Left: Text & Buttons */}
        <motion.div
          className="w-full md:w-1/2 text-left space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Main Heading */}
          <h1 className="text-5xl md:text-[3.75rem] font-extrabold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text leading-tight">
            Code, Collaborate, Create.
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-textL dark:text-textD opacity-80">
            Real-time collaborative coding with seamless video calls and powerful tools.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/register">
              <Button className="px-8 py-6 text-textD bg-primary rounded font-semibold hover:bg-accent dark:hover:bg-secondary transition-all duration-300 text-lg">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button className="px-8 py-6 border border-secondaryL dark:border-secondaryD bg-transparent hover:bg-secondaryL dark:hover:bg-secondaryD rounded font-semibold hover:text-textL transition-all duration-300 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right: 3D Code Cube */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <CodeCube />
        </motion.div>
      </section>

      {/* Decorative Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-gradient-xy"></div>
      </div>
    </main>
  );
}
