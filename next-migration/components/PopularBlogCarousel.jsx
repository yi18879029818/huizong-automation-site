"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

import { InlineIcon } from "@/components/inline-icon";
import {
  getLoopedCarouselIndex,
  getNormalizedPhysicalIndex,
} from "@/lib/popular-carousel-loop.mjs";

const LOOP_CLONE_COUNT = 3;
const SCROLL_SETTLE_MS = 460;
const MANUAL_SCROLL_SETTLE_MS = 140;

function PopularArticleCard({ item, index, setCardRef }) {
  const { isClone, post } = item;
  const media = (
    <img
      alt={isClone ? "" : post.imageAlt}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
      height="941"
      loading="lazy"
      src={post.image}
      width="1672"
    />
  );

  return (
    <article
      aria-hidden={isClone ? "true" : undefined}
      className="hsa-ui-card hsa-popular-article-card group snap-start overflow-hidden"
      data-carousel-clone={isClone ? "true" : "false"}
      ref={(node) => setCardRef(index, node)}
    >
      {isClone ? (
        <div className="block aspect-[16/10] overflow-hidden bg-surface-container-low">
          {media}
        </div>
      ) : (
        <a
          aria-label={`Read ${post.title}`}
          className="block aspect-[16/10] overflow-hidden bg-surface-container-low"
          href={post.href}
        >
          {media}
        </a>
      )}

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          {post.topic}
        </p>
        <h3 className="mt-4 text-[1.4rem] font-black leading-[1.16] tracking-tight text-secondary">
          {isClone ? (
            <span>{post.title}</span>
          ) : (
            <a className="transition-colors hover:text-primary" href={post.href}>
              {post.title}
            </a>
          )}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-on-surface-variant">
          {post.excerpt}
        </p>
        {isClone ? (
          <span className="mt-7 inline-flex items-center gap-2 self-start text-xs font-black uppercase tracking-[0.16em] text-primary">
            Read Article
            <InlineIcon className="h-4 w-4" name="arrow_forward" />
          </span>
        ) : (
          <a
            className="mt-7 inline-flex items-center gap-2 self-start text-xs font-black uppercase tracking-[0.16em] text-primary transition-transform duration-200 hover:translate-x-0.5"
            href={post.href}
          >
            Read Article
            <InlineIcon className="h-4 w-4" name="arrow_forward" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function PopularBlogCarousel({ posts }) {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const physicalIndexRef = useRef(0);
  const logicalIndexRef = useRef(0);
  const motionTimerRef = useRef(null);
  const manualTimerRef = useRef(null);
  const scriptedScrollRef = useRef(false);
  const cloneCount = Math.min(LOOP_CLONE_COUNT, posts?.length ?? 0);

  const loopItems = useMemo(() => {
    if (!posts?.length) {
      return [];
    }

    const before = posts.slice(-cloneCount).map((post, index) => ({
      isClone: true,
      key: `before-${post.href}-${index}`,
      post,
    }));
    const originals = posts.map((post) => ({
      isClone: false,
      key: `original-${post.href}`,
      post,
    }));
    const after = posts.slice(0, cloneCount).map((post, index) => ({
      isClone: true,
      key: `after-${post.href}-${index}`,
      post,
    }));

    return [...before, ...originals, ...after];
  }, [cloneCount, posts]);

  function getCardLeft(index) {
    const track = trackRef.current;
    const card = cardRefs.current[index];

    if (!track || !card) {
      return null;
    }

    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    return track.scrollLeft + cardRect.left - trackRect.left;
  }

  function scrollToPhysicalIndex(index, behavior = "smooth") {
    const track = trackRef.current;
    const left = getCardLeft(index);

    if (!track || left === null) {
      return;
    }

    track.scrollTo({ behavior, left });
  }

  function normalizePhysicalIndex(index) {
    const normalizedIndex = getNormalizedPhysicalIndex(
      index,
      posts.length,
      cloneCount,
    );

    if (normalizedIndex !== index) {
      scrollToPhysicalIndex(normalizedIndex, "auto");
    }

    physicalIndexRef.current = normalizedIndex;
    logicalIndexRef.current =
      (normalizedIndex - cloneCount + posts.length) % posts.length;
  }

  useLayoutEffect(() => {
    if (!posts?.length) {
      return;
    }

    physicalIndexRef.current = cloneCount;
    logicalIndexRef.current = 0;
    scrollToPhysicalIndex(cloneCount, "auto");
  }, [cloneCount, posts]);

  useEffect(
    () => () => {
      window.clearTimeout(motionTimerRef.current);
      window.clearTimeout(manualTimerRef.current);
    },
    [],
  );

  if (!posts?.length) {
    return null;
  }

  function move(direction) {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const normalizedCurrent = getNormalizedPhysicalIndex(
      physicalIndexRef.current,
      posts.length,
      cloneCount,
    );

    if (normalizedCurrent !== physicalIndexRef.current) {
      scrollToPhysicalIndex(normalizedCurrent, "auto");
    }

    const targetPhysicalIndex = normalizedCurrent + direction;
    const targetLogicalIndex = getLoopedCarouselIndex(
      logicalIndexRef.current,
      direction,
      posts.length,
    );

    window.clearTimeout(motionTimerRef.current);
    scriptedScrollRef.current = true;
    physicalIndexRef.current = targetPhysicalIndex;
    logicalIndexRef.current = targetLogicalIndex;
    scrollToPhysicalIndex(
      targetPhysicalIndex,
      reduceMotion ? "auto" : "smooth",
    );

    motionTimerRef.current = window.setTimeout(
      () => {
        normalizePhysicalIndex(targetPhysicalIndex);
        scriptedScrollRef.current = false;
      },
      reduceMotion ? 0 : SCROLL_SETTLE_MS,
    );
  }

  function handleTrackScroll() {
    if (scriptedScrollRef.current) {
      return;
    }

    window.clearTimeout(manualTimerRef.current);
    manualTimerRef.current = window.setTimeout(() => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      let nearestIndex = physicalIndexRef.current;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const cardLeft = getCardLeft(index);

        if (cardLeft === null) {
          return;
        }

        const distance = Math.abs(track.scrollLeft - cardLeft);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      normalizePhysicalIndex(nearestIndex);
    }, MANUAL_SCROLL_SETTLE_MS);
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
        onScroll={handleTrackScroll}
        ref={trackRef}
        role="region"
        tabIndex={0}
      >
        {loopItems.map((item, index) => (
          <PopularArticleCard
            index={index}
            item={item}
            key={item.key}
            setCardRef={(cardIndex, node) => {
              cardRefs.current[cardIndex] = node;
            }}
          />
        ))}
      </div>
    </div>
  );
}
