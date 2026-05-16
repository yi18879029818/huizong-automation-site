"use client";

import { useEffect, useState } from "react";

const WAREHOUSE_NODES = [
  {
    id: "inbound",
    title: "Inbound",
    description:
      "Receive pallets, cartons, and production materials from docks or upstream production lines.",
    x: 8,
    y: 68,
    align: "left",
  },
  {
    id: "asrs",
    title: "ASRS",
    description:
      "Automate storage and retrieval with high-density racking and warehouse execution control.",
    x: 25,
    y: 24,
    align: "center",
  },
  {
    id: "picking",
    title: "Picking",
    description:
      "Coordinate goods-to-person, case picking, and replenishment workflows.",
    x: 47,
    y: 42,
    align: "center",
  },
  {
    id: "packing",
    title: "Packing",
    description:
      "Route completed orders to packing stations with real-time task synchronization.",
    x: 66,
    y: 73,
    align: "center",
  },
  {
    id: "outbound",
    title: "Outbound",
    description:
      "Dispatch finished orders to shipping lanes, staging areas, or truck loading zones.",
    x: 92,
    y: 34,
    align: "right",
  },
];

const AGV_CYCLE_DURATION_MS = 16000;
const AGV_STAGE_PATH_ID = "warehouse-flow-route";
const AGV_STAGE_PATH_D =
  "M 72 328 H 198 Q 232 328 232 296 V 136 Q 232 106 266 106 H 456 Q 490 106 490 138 V 196 Q 490 228 526 228 H 656 Q 690 228 690 260 V 338 Q 690 366 724 366 H 872 Q 904 366 904 334 V 166";

export default function WarehouseFlowSimulation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const stepDuration = AGV_CYCLE_DURATION_MS / WAREHOUSE_NODES.length;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % WAREHOUSE_NODES.length);
    }, stepDuration);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="bg-surface-container-lowest py-24 px-8"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(340px,0.48fr)] lg:items-end">
          <div>
            <span className="mb-3 inline-block text-xs font-black tracking-[0.3em] text-secondary">
              Smart Warehouse Flow Simulation
            </span>
            <h3 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-secondary">
              Visualize connected warehouse orchestration.
            </h3>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-on-surface-variant opacity-90">
            Visualize how AGV fleets coordinate inbound receiving, automated
            storage, picking, packing, and outbound workflows in one connected
            warehouse operation.
          </p>
        </div>

        <div
          className="hsa-flow-shell grid gap-8 border border-outline-variant/20 bg-white p-5 md:p-8 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)]"
        >
          <div className="hsa-flow-stage-wrap">
            <div className="hsa-flow-stage">
              <div className="hsa-flow-grid" aria-hidden="true" />

              <svg
                className="hsa-flow-paths"
                viewBox="0 0 1000 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  id={AGV_STAGE_PATH_ID}
                  d={AGV_STAGE_PATH_D}
                  className="hsa-flow-path-base"
                  pathLength="100"
                />
                <path
                  d={AGV_STAGE_PATH_D}
                  className="hsa-flow-path-dash"
                  pathLength="100"
                />
                <g className="hsa-flow-agv" aria-hidden="true">
                  <rect
                    x="-14"
                    y="-10"
                    width="28"
                    height="20"
                    rx="6"
                    className="hsa-flow-agv-body"
                  />
                  <rect
                    x="-6"
                    y="-4"
                    width="12"
                    height="8"
                    rx="2.5"
                    className="hsa-flow-agv-cabin"
                  />
                  <circle cx="-8" cy="12" r="3.2" className="hsa-flow-agv-wheel" />
                  <circle cx="8" cy="12" r="3.2" className="hsa-flow-agv-wheel" />
                  <animateMotion
                    dur={`${AGV_CYCLE_DURATION_MS}ms`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#${AGV_STAGE_PATH_ID}`} />
                  </animateMotion>
                </g>
              </svg>

              <span className="hsa-flow-arrow hsa-flow-arrow-one" aria-hidden="true">
                →
              </span>
              <span className="hsa-flow-arrow hsa-flow-arrow-two" aria-hidden="true">
                →
              </span>
              <span className="hsa-flow-arrow hsa-flow-arrow-three" aria-hidden="true">
                →
              </span>

              {WAREHOUSE_NODES.map((node, index) => (
                <button
                  key={node.id}
                  type="button"
                  className={`hsa-flow-node hsa-flow-node-${node.align} ${
                    activeIndex === index ? "is-active" : ""
                  }`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    "--reveal-delay": `${index * 90}ms`,
                  }}
                  data-node-id={node.id}
                  data-motion-static=""
                >
                  <span className="hsa-flow-node-kicker">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{node.title}</strong>
                  <span className="hsa-flow-node-tip">{node.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 self-center">
            {WAREHOUSE_NODES.map((node, index) => (
              <div
                key={`${node.id}-summary`}
                className={`hsa-flow-summary ${activeIndex === index ? "is-active" : ""}`}
                style={{ "--reveal-delay": `${80 + index * 80}ms` }}
              >
                <div className="hsa-flow-summary-index">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4>{node.title}</h4>
                  <p>{node.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hsa-flow-shell {
          box-shadow: 0 24px 60px rgba(0, 23, 54, 0.06);
        }

        .hsa-flow-stage-wrap {
          min-width: 0;
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          animation: hsa-flow-reveal 600ms ease-out 80ms forwards;
        }

        .hsa-flow-stage {
          position: relative;
          min-height: 560px;
          overflow: hidden;
          border: 1px solid rgba(0, 23, 54, 0.08);
          background:
            radial-gradient(circle at top right, rgba(254, 107, 0, 0.08), transparent 28%),
            linear-gradient(180deg, #fbfcfe 0%, #f4f7fb 100%);
        }

        .hsa-flow-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 23, 54, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 23, 54, 0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.35));
          opacity: 0.38;
        }

        .hsa-flow-paths {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .hsa-flow-path-base {
          stroke: rgba(0, 23, 54, 0.18);
          stroke-width: 7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .hsa-flow-path-dash {
          stroke: #fe6b00;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: 5 13;
          animation: hsa-flow-dash var(--agv-duration, 16s) linear infinite;
          filter: drop-shadow(0 0 12px rgba(254, 107, 0, 0.16));
        }

        .hsa-flow-agv {
          filter: drop-shadow(0 10px 18px rgba(254, 107, 0, 0.26));
          z-index: 4;
        }

        .hsa-flow-agv-body {
          fill: #fe6b00;
        }

        .hsa-flow-agv-cabin {
          fill: #ffd5b3;
        }

        .hsa-flow-agv-wheel {
          fill: #001736;
        }

        .hsa-flow-arrow {
          position: absolute;
          color: rgba(254, 107, 0, 0.8);
          font-size: 18px;
          font-weight: 800;
          animation: hsa-flow-arrow var(--agv-duration, 16s) linear infinite;
          z-index: 2;
        }

        .hsa-flow-arrow-one {
          left: 17%;
          top: 58%;
          transform: rotate(-90deg);
        }

        .hsa-flow-arrow-two {
          left: 50%;
          top: 30%;
          transform: rotate(0deg);
          animation-delay: -5.3s;
        }

        .hsa-flow-arrow-three {
          left: 82%;
          top: 56%;
          transform: rotate(-90deg);
          animation-delay: -10.6s;
        }

        .hsa-flow-node {
          position: absolute;
          width: min(160px, calc(100% - 40px));
          padding: 14px 14px 12px;
          border: 1px solid rgba(0, 23, 54, 0.12);
          background: rgba(255, 255, 255, 0.94);
          color: #001736;
          text-align: left;
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 36px rgba(0, 23, 54, 0.08);
          z-index: 3;
          opacity: 0;
          animation: hsa-flow-node-reveal 600ms ease-out var(--reveal-delay, 0ms) forwards;
        }

        .hsa-flow-node-left {
          transform: translate3d(0, -50%, 0);
        }

        .hsa-flow-node-center {
          transform: translate3d(-50%, -50%, 0);
        }

        .hsa-flow-node-right {
          transform: translate3d(-100%, -50%, 0);
        }

        .hsa-flow-node::before {
          content: "";
          position: absolute;
          top: 50%;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: #fe6b00;
          border: 4px solid rgba(255, 255, 255, 0.92);
          box-shadow: 0 0 0 8px rgba(254, 107, 0, 0.12);
          transform: translateY(-50%);
        }

        .hsa-flow-node-left::before {
          right: -8px;
        }

        .hsa-flow-node-center::before {
          left: 50%;
          bottom: -16px;
          top: auto;
          transform: translate(-50%, 0);
        }

        .hsa-flow-node-right::before {
          left: -8px;
        }

        .hsa-flow-node strong {
          display: block;
          margin-top: 3px;
          font: 800 0.94rem/1.15 Manrope, sans-serif;
          letter-spacing: -0.02em;
        }

        .hsa-flow-node-kicker {
          display: inline-flex;
          color: #fe6b00;
          font: 800 0.68rem/1 Inter, sans-serif;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .hsa-flow-node-tip {
          position: absolute;
          left: 0;
          width: 210px;
          top: calc(100% + 12px);
          opacity: 0;
          pointer-events: none;
          padding: 12px 14px;
          background: #001736;
          color: rgba(255, 255, 255, 0.9);
          font: 500 0.78rem/1.55 Inter, sans-serif;
          transform: translateY(8px);
          transition: opacity 0.22s ease, transform 0.22s ease;
          box-shadow: 0 18px 36px rgba(0, 23, 54, 0.2);
          z-index: 5;
        }

        .hsa-flow-node-center .hsa-flow-node-tip {
          left: 50%;
          transform: translate(-50%, 8px);
        }

        .hsa-flow-node-right .hsa-flow-node-tip {
          right: 0;
          left: auto;
        }

        .hsa-flow-node[data-node-id="asrs"] .hsa-flow-node-tip {
          left: 50%;
          transform: translate(-42%, 8px);
        }

        .hsa-flow-node[data-node-id="picking"] .hsa-flow-node-tip {
          left: 50%;
          transform: translate(-50%, 8px);
        }

        .hsa-flow-node[data-node-id="packing"] .hsa-flow-node-tip {
          top: auto;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translate(-50%, -8px);
        }

        .hsa-flow-node[data-node-id="outbound"] .hsa-flow-node-tip {
          left: auto;
          right: 0;
        }

        .hsa-flow-node:hover .hsa-flow-node-tip,
        .hsa-flow-node:focus-visible .hsa-flow-node-tip {
          opacity: 1;
          transform: translateY(0);
        }

        .hsa-flow-node-center:hover .hsa-flow-node-tip,
        .hsa-flow-node-center:focus-visible .hsa-flow-node-tip {
          transform: translate(-50%, 0);
        }

        .hsa-flow-node[data-node-id="asrs"]:hover .hsa-flow-node-tip,
        .hsa-flow-node[data-node-id="asrs"]:focus-visible .hsa-flow-node-tip {
          transform: translate(-42%, 0);
        }

        .hsa-flow-node[data-node-id="packing"]:hover .hsa-flow-node-tip,
        .hsa-flow-node[data-node-id="packing"]:focus-visible .hsa-flow-node-tip {
          transform: translate(-50%, 0);
        }

        .hsa-flow-node.is-active {
          border-color: rgba(254, 107, 0, 0.42);
          box-shadow: 0 24px 42px rgba(254, 107, 0, 0.14);
        }

        .hsa-flow-summary {
          display: grid;
          grid-template-columns: 52px minmax(0, 1fr);
          gap: 14px;
          align-items: start;
          border: 1px solid rgba(0, 23, 54, 0.08);
          background: linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
          padding: 16px 18px;
          opacity: 0;
          transform: translate3d(0, 24px, 0);
          animation: hsa-flow-reveal 600ms ease-out var(--reveal-delay, 0ms) forwards;
        }

        .hsa-flow-summary-index {
          display: grid;
          place-items: center;
          height: 44px;
          background: rgba(0, 23, 54, 0.05);
          color: #001736;
          font: 800 0.8rem/1 Inter, sans-serif;
          letter-spacing: 0.2em;
        }

        .hsa-flow-summary h4 {
          margin: 0 0 6px;
          color: #001736;
          font: 800 1rem/1.2 Manrope, sans-serif;
        }

        .hsa-flow-summary p {
          margin: 0;
          color: #5f6774;
          font: 500 0.88rem/1.6 Inter, sans-serif;
        }

        .hsa-flow-summary.is-active {
          border-color: rgba(254, 107, 0, 0.34);
          box-shadow: 0 18px 36px rgba(254, 107, 0, 0.08);
        }

        .hsa-flow-summary.is-active .hsa-flow-summary-index {
          background: linear-gradient(135deg, #ff9f2f, #fe6b00);
          color: #ffffff;
        }

        @keyframes hsa-flow-dash {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -180;
          }
        }

        @keyframes hsa-flow-reveal {
          from {
            opacity: 0;
            transform: translate3d(0, 24px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes hsa-flow-node-reveal {
          from {
            opacity: 0;
            filter: blur(2px);
          }

          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes hsa-flow-arrow {
          0%,
          100% {
            opacity: 0.28;
          }

          50% {
            opacity: 1;
          }
        }

        @media (max-width: 1100px) {
          .hsa-flow-stage {
            min-height: 620px;
          }

          .hsa-flow-node {
            width: min(150px, calc(100% - 28px));
          }
        }

        @media (max-width: 820px) {
          .hsa-flow-stage {
            min-height: 700px;
          }

          .hsa-flow-node {
            width: 136px;
            padding: 12px 12px 10px;
          }

          .hsa-flow-node strong {
            font-size: 0.86rem;
          }

          .hsa-flow-node-tip {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hsa-flow-stage {
            min-height: 740px;
          }

          .hsa-flow-node {
            width: 124px;
          }

          .hsa-flow-node-left {
            transform: translate3d(0, -50%, 0);
          }

          .hsa-flow-node-center {
            transform: translate3d(-50%, -50%, 0);
          }

          .hsa-flow-node-right {
            transform: translate3d(-100%, -50%, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hsa-flow-stage-wrap,
          .hsa-flow-node,
          .hsa-flow-summary,
          .hsa-flow-path-dash,
          .hsa-flow-arrow {
            animation: none !important;
          }

          .hsa-flow-stage-wrap,
          .hsa-flow-node,
          .hsa-flow-summary {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
