"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-24 px-6 text-center relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 animate-gradient-xy"></div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
            >
                {/* Heading */}
                <motion.h2
                    className="text-5xl font-bold text-textL dark:text-textD"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Ready to Code Smarter?
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    className="text-xl text-textL dark:text-textD opacity-80 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Start collaborating in real-time with Coditor and boost your productivity.
                </motion.p>

                {/* Button */}
                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}