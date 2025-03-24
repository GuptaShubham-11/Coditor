"use client";

import { motion } from "framer-motion";
import { Code, Users, Video } from "lucide-react";

const features = [
    {
        icon: <Code size={48} className="text-primary dark:text-secondary" />,
        title: "Powerful Code Editor",
        description: "Experience a seamless coding environment with Monaco Editor, syntax highlighting, and intelligent suggestions."
    },
    {
        icon: <Users size={48} className="text-primary dark:text-secondary" />,
        title: "Real-time Collaboration",
        description: "Collaborate with teammates in real-time using Liveblocks/WebSockets, ensuring instant code updates."
    },
    {
        icon: <Video size={48} className="text-primary dark:text-secondary" />,
        title: "Integrated Video Calls",
        description: "Communicate effortlessly with built-in video conferencing powered by WebRTC/Daily.co/Agora."
    }
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 animate-gradient-xy"></div>
            </div>

            {/* Section Heading */}
            <motion.h2
                className="text-5xl font-bold text-textL dark:text-textD"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Why Choose Coditor?
            </motion.h2>
            <motion.p
                className="text-xl text-textL dark:text-textD opacity-80 mt-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                A next-gen online code editor designed for seamless collaboration, real-time coding, and communication.
            </motion.p>

            {/* Feature Cards */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        className="p-8 bg-backgroundL dark:bg-backgroundD rounded-2xl border border-borderL dark:border-borderD relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 0px 30px rgba(59, 130, 246, 0.3)", // Glowing effect
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Gradient Border Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Icon */}
                        <motion.div
                            className="flex justify-center mb-6"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {feature.icon}
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl font-semibold text-textL dark:text-textD mb-4">{feature.title}</h3>

                        {/* Description */}
                        <p className="text-lg text-textL dark:text-textD opacity-80">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}