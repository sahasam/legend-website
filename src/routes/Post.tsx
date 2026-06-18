import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPostBySlug } from '../content/loadPosts';
import { RenderBody } from '../content/renderBody';
import { PostHero } from '../components/PostHero';
import { ReadingDescent } from '../components/ReadingDescent';

export function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
        <p className="font-serif text-glow-soft/70">
          this drifted out of reach.{' '}
          <Link to="/writing" className="underline">
            back to writing
          </Link>
        </p>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-6 pt-28 pb-24">
      <ReadingDescent />
      <PostHero hero={post.frontmatter.hero} title={post.frontmatter.title} />
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-6"
      >
        <Link
          to="/writing"
          className="group mb-6 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-glow-soft/50 transition-colors hover:text-glow"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          Writing
        </Link>
        <time className="block font-sans text-xs uppercase tracking-widest text-glow-soft/50">
          {post.frontmatter.date}
        </time>
        <h1
          className="mt-4 font-sans text-4xl text-glow-soft md:text-5xl"
          style={{
            fontWeight: 300,
            lineHeight: 1.1,
          }}
        >
          {post.frontmatter.title}
        </h1>
      </motion.header>
      <div className="mt-12">
        <RenderBody body={post.body} />
      </div>
      <div className="mt-20 border-t border-glow/10 pt-10">
        <Link
          to="/writing"
          className="group inline-flex items-center gap-2 rounded-full border border-glow/30 px-5 py-2.5 font-sans text-sm text-glow/90 transition-colors hover:border-glow/60 hover:bg-glow/10 hover:text-glow"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          More writing
        </Link>
      </div>
    </article>
  );
}
