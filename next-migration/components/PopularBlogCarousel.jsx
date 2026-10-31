"use client";

import { useRef } from "react";

import { InlineIcon } from "@/components/inline-icon";

export default function PopularBlogCarousel({ posts }) {
  const trackRef = useRef(null);

  if (!posts?.length) {
    return null;
  }

  function move(direction) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      left: direction * Math.max(track.clientWidth * 0.72, 320),
    });
  }

  return (
    <div className="relative">
      <div className="mb-7 flex justify-end gap-3">
        <button
          aria-controls="popular-blog-track"
          aria-label="Previous popular articles"
          className="hsa-ui-carousel-button"
          onClick={() => move(-1)}
          type="button"
        >
          <InlineIcon className="h-5 w-5" name="chevron_left" />
        </button>
        <button
          aria-controls="popular-blog-track"
          aria-label="Next popular articles"
          className="hsa-ui-carousel-button"
          onClick={() => move(1)}
          type="button"
        >
          <InlineIcon className="h-5 w-5" name="chevron_right" />
        </button>
      </div>

      <div
        aria-label="Popular articles"
        className="hsa-popular-carousel-track no-scrollbar snap-x snap-mandatory"
        id="popular-blog-track"
        ref={trackRef}
        role="region"
        tabIndex={0}
      >
        {posts.map((post) => (
          <article
            className="hsa-ui-card hsa-popular-article-card group snap-start overflow-hidden"
            key={post.href}
          >
            <a
              aria-label={`Read ${post.title}`}
              className="block aspect-[16/10] overflow-hidden bg-surface-container-low"
              href={post.href}
            >
              <img
                alt={post.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                height="941"
                loading="lazy"
                src={post.image}
                width="1672"
              />
            </a>
            <div className="flex flex-1 flex-col p-7 md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {post.topic}
              </p>
              <h3 className="mt-4 text-[1.4rem] font-black leading-[1.16] tracking-tight text-secondary">
                <a className="transition-colors hover:text-primary" href={post.href}>
                  {post.title}
                </a>
              </h3>
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-on-surface-variant">
                {post.excerpt}
              </p>
              <a
                className="mt-7 inline-flex items-center gap-2 self-start text-xs font-black uppercase tracking-[0.16em] text-primary transition-transform duration-200 hover:translate-x-0.5"
                href={post.href}
              >
                Read Article
                <InlineIcon className="h-4 w-4" name="arrow_forward" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
