"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* hero background image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/generated/hero_bg_hd.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/60 via-transparent to-[var(--bg)]" />
      </div>

      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#2d6a4f] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#40916c] opacity-[0.06] blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-32 w-full">
        <div className="flex flex-col-reverse sm:flex-row items-center sm:items-center gap-10 sm:gap-14">

          {/* text column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 min-w-0"
          >
            <motion.h1
              variants={item}
              className="text-5xl sm:text-7xl font-bold tracking-tight text-[var(--text)] leading-[1.08]"
            >
              Aariz Waqas
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3 text-xl sm:text-2xl font-medium text-[var(--accent)]"
            >
              AI Engineer
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 text-base text-[var(--muted)] leading-relaxed max-w-md"
            >
              I build AI systems that ship — from a monetised nutrition app on the App Store
              to autonomous agent pipelines, voice AI platforms, and RAG infrastructure.
              Full-stack where needed, always focused on systems that work in production.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex items-center gap-4 flex-wrap">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-[var(--border)] text-[var(--text)] text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-16 flex items-center gap-6 text-xs text-[var(--muted)] font-mono"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open to work
              </span>
              <span>Glasgow, UK</span>
            </motion.div>
          </motion.div>

          {/* photo column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="shrink-0"
          >
            <div
              className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden"
              style={{
                boxShadow: "0 0 0 2px #2d6a4f50, 0 0 48px #2d6a4f18",
              }}
            >
              <Image
                src="/photo.jpg"
                alt="Aariz Waqas"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 176px, 208px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
