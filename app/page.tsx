"use client";

import { useState } from "react";
import { projects, Project } from "@/lib/projects";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />

        {/* Projects */}
        <section id="projects" className="py-24 relative">
          {/* decorative background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <Image
              src="/generated/projects_divider_hd.png"
              alt=""
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)]">Projects</h2>
              <p className="mt-3 text-[var(--muted)]">Click any card for the full case study.</p>
            </motion.div>

            {/* Featured row */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featured.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelected(project)}
                />
              ))}
            </div>

            {/* Rest */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i + featured.length}
                  onClick={() => setSelected(project)}
                />
              ))}
            </div>
          </div>
        </section>

        <Skills />
        <Contact />
      </main>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
