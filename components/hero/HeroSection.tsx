'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CodeCube from '../3d/CodeCube';

export default function HeroSection() {
    return (
        <main className="bg-backgroundL dark:bg-backgroundD text-textL dark:text-textD flex flex-col items-center px-6 md:px-12 relative overflow-hidden">
            {/* Hero Section */}
            <section className="text-center max-w-4xl w-full space-y-8">
                {/* 3D Code Cube */}
                <motion.div
                    className="w-full flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <CodeCube />
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    Code, Collaborate, Create.
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    className="text-xl md:text-2xl text-textL dark:text-textD opacity-80 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                >
                    Real-time collaborative coding with seamless video calls and powerful tools.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className="mt-8 flex flex-wrap justify-center gap-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                >
                    <Link href="/register">
                        <button className="px-8 py-4 bg-primary text-white rounded-2xl font-semibold shadow-lg hover:bg-opacity-90 hover:scale-[1.05] transition-all duration-300 text-base md:text-lg">
                            Start Coding
                        </button>
                    </Link>
                    <Link href="#features">
                        <button className="px-8 py-4 border-2 border-borderL dark:border-borderD rounded-2xl font-semibold hover:bg-borderL dark:hover:bg-borderD hover:text-textD dark:hover:text-textL transition-all duration-300 text-base md:text-lg">
                            Learn More
                        </button>
                    </Link>
                </motion.div>
            </section>

            {/* Decorative Gradient Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 animate-gradient-xy"></div>
            </div>
        </main>
    );
}