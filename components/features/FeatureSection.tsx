'use client';

import { motion } from 'framer-motion';
import { Code, Users, Video, GitBranch, Cloud } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Smart Code Editor',
    description:
      'Full-featured Monaco integration with AI-powered suggestions and real-time linting.',
    color: 'text-primary',
  },
  {
    icon: Users,
    title: 'Live Collaboration',
    description: 'Multi-user editing with presence indicators and shared cursors.',
    color: 'text-success',
  },
  {
    icon: Video,
    title: 'Video Conference',
    description: 'Integrated WebRTC video calls with screen sharing capabilities.',
    color: 'text-accent',
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Built-in Git integration with visual diff tools.',
    color: 'text-ring',
  },
  {
    icon: Cloud,
    title: 'Cloud Deploy',
    description: 'One-click deployments to major cloud providers.',
    color: 'text-primary',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 max-w-5xl mx-auto text-center">
      <motion.h2
        className="text-4xl font-bold text-textL dark:text-textD"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Powerful Developer Features
      </motion.h2>
      <motion.p
        className="text-lg text-textL dark:text-textD opacity-70 mt-3 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Everything you need for seamless development workflows and collaboration.
      </motion.p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 150, damping: 12 }}
      className="p-6 rounded-xl bg-backgroundL dark:bg-backgroundD border border-borderL dark:border-borderD 
                      flex flex-col items-center text-center gap-4 transition-all"
    >
      {/* Icon */}
      <feature.icon size={36} className={`${feature.color}`} />

      {/* Title */}
      <h3 className="text-lg font-semibold text-textL dark:text-textD">{feature.title}</h3>

      {/* Description */}
      <p className="text-sm text-textL dark:text-textD opacity-70">{feature.description}</p>
    </motion.div>
  );
}
