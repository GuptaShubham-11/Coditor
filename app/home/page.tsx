"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useSpring, useTransform } from "framer-motion";
import HeroSection from "@/components/hero/HeroSection";
import FeatureSection from "@/components/features/FeatureSection";
import TestimonialsSection from "@/components/features/TestimonialsSection";
import CTASection from "@/components/CTASection";
import HelloWorld from "@/components/3d/HelloWorld";
import { ArrowDownIcon } from "lucide-react";

export default function Home() {
    const [hasScrolled, setHasScrolled] = useState(false);
    const controls = useAnimation();

    // Track scroll progress
    const { scrollYProgress } = useScroll();
    const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0]), {
        stiffness: 100,
        damping: 20,
    });

    const smoothScale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 1.1]), {
        stiffness: 100,
        damping: 20,
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100 && !hasScrolled) {
                setHasScrolled(true);
                controls.start({ opacity: 0, scale: 1.1 });
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls, hasScrolled]);

    return (
        <main className="bg-backgroundL dark:bg-backgroundD text-textL dark:text-textD min-h-screen">
            {/* Intro Section (Smooth Fade on Scroll) */}
            {!hasScrolled && (
                <motion.div
                    style={{ opacity: smoothOpacity, scale: smoothScale }}
                    className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
                >
                    {/* 3D Text Section */}
                    <div className="w-full h-[50vh] mt-6">
                        <HelloWorld />
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl font-extrabold tracking-wide text-center text-white"
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
                        <p className="text-gray-400 text-sm">Scroll Down</p>
                        <ArrowDownIcon className="w-6 h-6 text-gray-400 animate-bounce" />
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
