'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import HeroSection from '@/components/hero/HeroSection';
import FeatureSection from '@/components/features/FeatureSection';
import TestimonialsSection from '@/components/features/TestimonialsSection';
import CTASection from '@/components/CTASection';
import HelloWorld from '@/components/3d/HelloWorld';
import { ArrowDownIcon } from 'lucide-react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth transition effects
  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.15], [1, 0]), {
    stiffness: 100,
    damping: 20,
  });

  const smoothScale = useSpring(useTransform(scrollYProgress, [0, 0.15], [1, 1.1]), {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    // Show intro only if user is at the top on refresh
    if (window.scrollY === 0) {
      setShowIntro(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowIntro(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-backgroundL text-textL dark:bg-backgroundD dark:text-textD">
      {/* Intro Section (Appears only on refresh when at top) */}
      {showIntro && (
        <motion.div
          style={{ opacity: smoothOpacity, scale: smoothScale }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-backgroundD dark:bg-backgroundL z-50"
        >
          {/* 3D Text Section */}
          <div className="w-full h-[50vh] mt-6">
            <HelloWorld />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold tracking-wide text-center text-textD dark:text-textL"
          >
            Welcome to Coditor 🚀
          </motion.h1>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 flex flex-col items-center"
          >
            <p className="text-secondaryD dark:text-secondaryL text-sm">Scroll Down</p>
            <ArrowDownIcon className="w-6 h-6 text-ringD dark:text-ringL animate-bounce" />
          </motion.div>
        </motion.div>
      )}

      {/* Main Content Sections */}
      <HeroSection />
      <FeatureSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
