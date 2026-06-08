import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPostBySlug } from '../content/loadPosts';
import { RenderBody } from '../content/renderBody';
import { PostHero } from '../components/PostHero';

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
      <PostHero hero={post.frontmatter.hero} />
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-6"
      >
        <time className="font-sans text-xs uppercase tracking-widest text-glow-soft/50">
          {post.frontmatter.date}
        </time>
        <h1
          className="mt-4 font-display text-4xl italic text-glow-soft md:text-5xl"
          style={{
            fontWeight: 350,
            fontVariationSettings: '"opsz" 144, "SOFT" 100',
            lineHeight: 1.1,
          }}
        >
          {post.frontmatter.title}
        </h1>
      </motion.header>
      <div className="mt-12">
        <RenderBody body={post.body} />
      </div>
      <div className="mt-20">
        <Link to="/writing" className="font-sans text-sm text-glow/80">
          ← writing
        </Link>
      </div>
    </article>
  );
}
