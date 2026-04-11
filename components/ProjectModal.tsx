"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { useEffect } from "react";
import { Project } from "@/lib/projects";
import PhoneMockup from "./PhoneMockup";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            key="panel"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* top bar */}
              <div
                className="h-1 w-full rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }}
              />

              <div className="p-6 sm:p-8">
                {/* close */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] pr-12">
                  {project.title}
                </h2>
                <p className="mt-2 text-[var(--muted)] text-base">{project.tagline}</p>

                {/* links */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-8">
                  {/* long description */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="prose prose-sm max-w-none text-[var(--muted)] leading-relaxed whitespace-pre-line"
                    >
                      {project.longDescription}
                    </div>

                    {/* tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-md bg-[var(--surface2)] text-[var(--muted)] border border-[var(--border)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* phone mockup for mobile projects */}
                  {project.type === "mobile" && project.screenshots && project.screenshots.length > 0 && (
                    <div className="flex justify-center sm:justify-end shrink-0">
                      <PhoneMockup screenshots={project.screenshots} accentColor={project.color} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
