"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const typeLabel: Record<Project["type"], string> = {
  mobile: "Mobile App",
  cli: "CLI Tool",
  web: "Web App",
  library: "Library",
  platform: "Platform",
};

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden cursor-pointer hover:border-[var(--accent)]/40 transition-colors duration-300"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* top coloured bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}80, transparent)` }}
      />

      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full border"
                style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}12` }}
              >
                {typeLabel[project.type]}
              </span>
              {project.featured && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)]">
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>
          </div>

          {/* action links */}
          <div className="flex items-center gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">
          {project.tagline}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-[var(--surface2)] text-[var(--muted)] border border-[var(--border)]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="text-xs px-2 py-0.5 rounded-md text-[var(--muted)]">
              +{project.tags.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
