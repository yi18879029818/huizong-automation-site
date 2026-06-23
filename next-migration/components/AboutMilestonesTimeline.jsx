"use client";

import { useMemo, useRef, useState } from "react";

export default function AboutMilestonesTimeline({ milestones }) {
  const initialYear = milestones?.[0]?.year ?? "";
  const [activeYear, setActiveYear] = useState(initialYear);
  const detailRef = useRef(null);

  const activeMilestone = useMemo(() => {
    return milestones.find((item) => item.year === activeYear) ?? milestones[0];
  }, [activeYear, milestones]);

  function handleSelect(year) {
    setActiveYear(year);

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
  }

  if (!activeMilestone) {
    return null;
  }

  return (
    <div className="mt-12">
      <div
        className="grid gap-8 lg:grid-cols-[minmax(250px,0.34fr)_minmax(0,1fr)] lg:items-center"
        ref={detailRef}
      >
        <div className="rounded-[2rem] bg-white p-8 text-center text-primary shadow-[0_28px_80px_rgba(0,0,0,0.28)] md:p-10">
          <div className="text-[4rem] font-black leading-none tracking-tight text-secondary md:text-[4.75rem]">
            {activeMilestone.year}
          </div>
          <div className="mt-5 text-[11px] font-black uppercase tracking-[0.28em] text-secondary">
            {activeMilestone.label}
          </div>
        </div>

        <div className="max-w-4xl">
          <p className="text-xl leading-9 text-white/92 md:text-[2rem] md:leading-[1.45]">
            {activeMilestone.title}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-primary-fixed-dim md:text-base">
            {activeMilestone.detail}
          </p>
        </div>
      </div>

      <div className="mt-12 hidden lg:flex lg:items-center">
        {milestones.map((item, index) => {
          const isActive = item.year === activeYear;

          return (
            <div
              className="flex min-w-0 flex-1 items-center"
              key={`${item.year}-timeline-pill`}
            >
              <button
                aria-pressed={isActive}
                className={`inline-flex min-w-[7rem] items-center justify-center rounded-[0.9rem] px-6 py-4 text-xl font-black tracking-tight shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition-colors ${
                  isActive
                    ? "bg-white text-secondary"
                    : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/18"
                }`}
                onClick={() => handleSelect(item.year)}
                type="button"
              >
                {item.year}
              </button>
              {index < milestones.length - 1 ? (
                <div className="h-px flex-1 border-t border-dotted border-white/55" />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3 overflow-x-auto pb-2 lg:hidden">
        {milestones.map((item) => {
          const isActive = item.year === activeYear;

          return (
            <button
              aria-pressed={isActive}
              className={`inline-flex shrink-0 items-center justify-center rounded-[0.9rem] px-5 py-3 text-base font-black tracking-tight transition-colors ${
                isActive
                  ? "bg-white text-secondary"
                  : "bg-white/10 text-white backdrop-blur-sm"
              }`}
              key={`${item.year}-timeline-mobile`}
              onClick={() => handleSelect(item.year)}
              type="button"
            >
              {item.year}
            </button>
          );
        })}
      </div>
    </div>
  );
}
