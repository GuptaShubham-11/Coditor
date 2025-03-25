'use client';

import { motion, useSpring, useMotionValue, useAnimation } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Monitor, Server, Palette, Terminal } from 'lucide-react';

const testimonials = [
  {
    name: 'Alice Johnson',
    role: 'Frontend Developer',
    feedback:
      'Coditor has completely transformed the way I collaborate on code. The real-time syncing is flawless!',
    icon: <Monitor size={30} />,
  },
  {
    name: 'Mark Spencer',
    role: 'Software Engineer',
    feedback:
      'Having an integrated code editor and video call feature in one place is a game changer. Highly recommend!',
    icon: <Code size={30} />,
  },
  {
    name: 'Sophia Lee',
    role: 'Full Stack Developer',
    feedback:
      'The seamless UI and intuitive collaboration tools make Coditor my go-to online code editor.',
    icon: <Terminal size={30} />,
  },
  {
    name: 'David Kim',
    role: 'Backend Developer',
    feedback: "The best collaborative coding tool I've ever used. It just works!",
    icon: <Server size={30} />,
  },
  {
    name: 'Emma Brown',
    role: 'UI/UX Designer',
    feedback:
      'Coditor’s design is beautiful, and the usability is top-notch. Love the real-time features!',
    icon: <Palette size={30} />,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-6 max-w-7xl mx-auto text-center relative overflow-hidden"
    >
      {/* Section Heading */}
      <motion.h2
        className="text-5xl font-bold text-textL dark:text-textD"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Our Users Say
      </motion.h2>
      <motion.p
        className="text-xl text-textL dark:text-textD opacity-80 mt-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Trusted by developers worldwide for seamless real-time coding and collaboration.
      </motion.p>

      {/* Testimonial Cards */}
      <div className="mt-16 flex flex-wrap justify-center gap-8">
        {testimonials.map((user, index) => (
          <TestimonialCard key={index} user={user} index={index} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ user, index }: { user: any; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set(offsetX / 5);
    y.set(offsetY / 5);
  };

  const handleMouseLeave = () => {
    controls.start({ scale: 1 });
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    controls.start({ scale: 1.05 });
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className="w-[300px] p-6 border rounded-xl bg-backgroundL dark:bg-backgroundD shadow-lg cursor-pointer relative"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        zIndex: isHovered ? 10 : index + 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={controls}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-center mb-4 text-primary">{user.icon}</div>
      <h3 className="text-xl font-semibold text-textL dark:text-textD">{user.name}</h3>
      <p className="text-sm text-textL dark:text-textD opacity-75">{user.role}</p>
      <p className="text-md text-textL dark:text-textD opacity-80 mt-2 italic">"{user.feedback}"</p>
    </motion.div>
  );
}
