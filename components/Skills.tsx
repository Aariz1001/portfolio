"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { skills } from "@/lib/projects";

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* decorative accent — matching hero wave style */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Image
          src="/generated/skills_accent_hd.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)]">Skills</h2>
          <p className="mt-3 text-[var(--muted)]">Technologies and tools I work with regularly.</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map(({ category, items }, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1 rounded-full bg-[var(--surface2)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
