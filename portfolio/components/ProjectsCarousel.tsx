'use client';

import { useState } from 'react';
import Link from 'next/link';

const projects = [
  {
    title: 'RecipeBox',
    description: 'A full-stack recipe manager built with Next.js. Allows creating, deleting, and editing recipes.',
    url: 'https://recipe-db-assignment-six.vercel.app',
    tech: ['Next.js', 'NextAuth', 'Postgres', 'Tailwind'],
    emoji: '🍳',
  },
  {
    title: 'Portfolio',
    description: 'The site you are on right now! Built with Next.js.',
    url: '#',
    tech: ['Next.js', 'NextAuth', 'Faker.js', 'Tailwind'],
    emoji: '💼',
  },
  {
    title: 'Test Projects',
    description: 'Test projects made with actual tests for tests!',
    url: '#',
    tech: [],
    emoji: '🚀',
  },
];

export default function ProjectsCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);
  const project = projects[current];

  return (
    <div className="relative">
      {/* Card */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 min-h-56 flex flex-col justify-between">
        <div>
          <div className="text-5xl mb-4">{project.emoji}</div>
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs bg-violet-900/50 text-violet-300 px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.url !== '#' && (
          <Link
            href={project.url}
            target="_blank"
            className="mt-6 inline-block text-sm text-violet-400 hover:text-violet-300 font-medium"
          >
            View Project →
          </Link>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button onClick={prev} className="text-gray-400 hover:text-white transition-colors px-3 py-1">
          ← Prev
        </button>
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-violet-500' : 'bg-gray-600'}`}
            />
          ))}
        </div>
        <button onClick={next} className="text-gray-400 hover:text-white transition-colors px-3 py-1">
          Next →
        </button>
      </div>
    </div>
  );
}