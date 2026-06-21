import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import { articles } from '@/lib/articles';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
          Bruce Gardner
        </h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto mb-10">
          Full-stack developer
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="#projects" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            See My Work
          </Link>
          <Link href="#contact" className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Get In Touch
          </Link>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-2">Projects</h2>
        <p className="text-gray-400 mb-8">Things I&apos;ve built.</p>
        <ProjectsCarousel />
      </section>

      {/* ── Articles ── */}
      <section id="articles" className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-2">Articles</h2>
        <p className="text-gray-400 mb-8">Thoughts and write-ups on things I&apos;ve learned.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group bg-gray-800 border border-gray-700 hover:border-violet-500 rounded-2xl p-6 flex flex-col transition-colors"
            >
              <span className="text-xs text-violet-400 font-mono mb-2">{article.tag}</span>
              <h3 className="text-white font-semibold mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 flex-1">{article.excerpt}</p>
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>{article.readTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-600 text-sm py-8 border-t border-gray-800">
        Built with Next.js · {new Date().getFullYear()}
      </footer>
    </div>
  );
}