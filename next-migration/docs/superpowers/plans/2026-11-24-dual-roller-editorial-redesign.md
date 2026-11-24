# Continuous product presentation implementation

**Goal:** Replace the fragmented dual roller robot detail page with the approved three-section presentation and the demonstrated nameplate-marking workflow.

**Architecture:** Retain the product route and registry. Update the focused product component and add a scoped CSS module, using existing locale context. Prepare derivatives of the supplied video and preserve the original.

**Stack:** Next.js 14, React, CSS modules, existing locale dictionaries, FFmpeg, OpenNext, Cloudflare Workers.

## Constraints

- Keep the complete product geometry and existing transparent image.
- Use the demonstrated process; completed nameplates go into a separate collection box.
- Do not claim measured placement precision, simultaneous gripper exchange or multi-machine dispatch from this video.
- Preserve reference/configurable parameter distinctions and all four language routes.
- Source commits must reach main before deployment. Video must remain below 25 MiB.

## Tasks

- [x] Update `scripts/check-dual-roller-robot.mjs` to require three main sections, no feature cards, one thirteen-row table, the video, accessible contact links and an enlarged whole-machine hero. Watch the structural assertions fail against the current build.
- [x] Prepare `public/videos/dual-roller-laser-marking-workflow.mp4` from the full replacement English source (95.32 seconds), H.264/yuv420p, 1600×900, 25 fps, faststart, bounded bitrate. Extract a poster and three process stills into `public/products/dual-roller-workflow`. Probe sizes/duration and decode the video fully.
- [x] Rewrite `components/products/DualRollerLiftRobot.jsx`, add `DualRollerLiftRobot.module.css` and refine `lib/dual-roller-lift-robot.mjs`. Use a wide unframed product hero, one large video followed by a compact process narrative with real stills, and one technical table with an integrated enquiry action. Scope all style changes to this product.
- [x] Add matching French, German and Spanish copy and page keys. Build, then check all four languages at desktop/mobile widths, playback/seeking, screenshot composition, original parameter values, no overflow, catalog navigation and metadata. Run the existing unit and locale regression checks.
- [x] Commit and push the verified source, package and deploy. Verify public page and media independently, including a video byte-range response, then update WORK_LOG, HANDOFF and the project progress.

Completed on 2026-11-24. Final source7346482; Worker7e5dce8e-1d02-4215-8550-f5f03a2907fa. Final checks and the focused byte-range recovery are recorded in WORK_LOG and HANDOFF.
