'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import projects from '@/data/projects';
import ProjectCard from './ProjectCard';
import SectionHeader from '@/components/SectionHeader';

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen">
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white to-blue-50/60 animate-gradient bg-[length:400%_400%]" />
        <div className="absolute inset-0 bg-dots-kik opacity-90" />
        <div className="absolute inset-0 bg-grain" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,#4BB27228_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_10%_80%,#009FE312_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-noise" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <SectionHeader
              label="Проєкти"
              title="Авторські ігри"
              subtitle="Проєкти платформи KIK вдома — статуси, збір коштів, оновлення."
            />
          </motion.div>
        </div>
      </section>

      <section ref={sectionRef} className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 -mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 80, delay: i * 0.06 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
