"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import LinkedinIcon from "@/components/LinkedinIcon";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/Aariz1001",
    icon: GithubIcon,
    description: "Open source work",
  },
  {
    label: "Email",
    href: "mailto:m.aariz.shah@gmail.com",
    icon: Mail,
    description: "m.aariz.shah@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-aariz-waqas-a61157220/",
    icon: LinkedinIcon,
    description: "Connect professionally",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)]">Get in Touch</h2>
          <p className="mt-4 text-[var(--muted)] max-w-lg mx-auto">
            Open to AI engineering roles, co-founder conversations, and interesting problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {links.map(({ label, href, icon: Icon, description }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 w-full sm:w-auto px-6 py-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition-colors"
            >
              <div className="p-2 rounded-lg bg-[var(--surface2)] group-hover:bg-[var(--accent)]/10 transition-colors">
                <Icon className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[var(--text)]">{label}</div>
                <div className="text-xs text-[var(--muted)]">{description}</div>
              </div>
            </a>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
