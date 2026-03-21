'use client';

import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FiMail, FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-card-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()}{' '}
            <span className="gradient-text font-semibold">Vibhor Bansal</span>
            . Built with Next.js & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:vibhorbansal1312@gmail.com"
            className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
            aria-label="Email"
          >
            <FiMail size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/vibhor-bansal-b8533119a"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="https://github.com/vibhorbansal98"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
            aria-label="GitHub"
          >
            <FaGithub size={16} />
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all cursor-pointer ml-2"
            aria-label="Back to top"
          >
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
