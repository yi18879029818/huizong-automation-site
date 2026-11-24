# Dual roller lift robot product page redesign

## Request and observed problems

The user finds the current page too AI-like and fragmented and requests a more substantial industrial presentation. The live desktop and mobile page was inspected on 2026-11-24. Its product render is small, three equal rounded feature cards repeat generic copy, two separate specification boxes divide closely related data and a further large CTA box adds another visual stop. Existing site chrome and product navigation remain in scope only for compatibility.

## Recommended design

Use a continuous industrial product presentation with three main sections, restrained white/light-grey surfaces, navy typography and a single orange action accent. No new gradients, decorative icons, feature-card grid, testimonial blocks or invented performance statistics.

### 1. Product hero

- A large, open hero occupying most of the initial viewport.
- The product render occupies roughly 60 percent of the desktop composition. Remove its rounded frame and border; use CSS framing to reduce empty background while retaining the entire machine and original geometry.
- Left-aligned product name with a short explanation of the real application, followed by one primary contact action and a restrained link to the workflow.
- Product name remains Dual Roller Lift Robot. Supporting copy emphasizes mobile loading for nameplate laser marking rather than generic carrier-handling language.
- Avoid numeric highlights whose applicability to this particular machine has not been verified.

### 2. Full-width working demonstration

- Use the user's replacement `D:/展会项目/英文版.mp4` in full (95.32 seconds). It contains the complete workflow and English captions without Chinese subtitles. Preserve the full 16:9 frame.
- The video is user-controlled, with a real poster frame, no sound autoplay and a responsive landscape player. Prepare a web derivative below the existing Cloudflare 25 MiB asset limit after approval.
- Follow the large video with one compact process line and a short explanatory paragraph, not another card grid.
- Exact sequence supported by the footage: receive a tray from the fixed station, raise the tray, move to and align with the marking machine, visually locate the workstation, place the nameplates in the fixture, let the machine mark them, retrieve the completed nameplates, move to the collection position and release them into a separate collection box.
- Do not claim that completed nameplates are returned to tray stacks. The segment does not demonstrate simultaneous dual-gripper exchange, multi-machine dispatch or a measured 0.6 mm placement result.

### 3. Unified technical information

- One open, full-width technical table with thin divider rules and compact group labels. Remove the pair of rounded parameter panels.
- Retain the distinction between project-specific roller/lift configuration and mobile-base reference values. No new payload, lift-stroke or dimensions are invented.
- Integrate a short project-enquiry sentence and one contact link at the end. Remove the separate dark CTA box.

## Alternatives considered

1. Recommended: product-render-led hero followed by a large working video. This preserves the user's product image and uses the real process as the main evidence.
2. Video-led first viewport: a paused demonstration fills the hero. This gives the process immediate prominence, but the specific product shape is less clear and increases initial media weight.
3. Minimal white catalog layout: large render plus a single table, with the video lower down. This is the lightest option but gives less emphasis to the workflow the user just clarified.

## Copy and localization

Keep English as the source and synchronize French, German and Spanish. Preserve current URLs, canonical/hreflang, navigation entries and inquiry behavior. Use concrete process descriptions, restrained headings and short paragraphs. Do not carry over generic slogans from the current feature cards.

## Implementation after design approval

- Update the focused product detail component, product data, page-scoped CSS and locale dictionaries/page keys.
- Add only the required video derivative and poster to the parent public source directory. Preserve the user's original render and video.
- Verify initial viewport framing, video playback, full-machine visibility, technical information, navigation, four languages, desktop/mobile layouts, reduced-motion behavior, accessibility and metadata.
- Commit and push to main before OpenNext build and Cloudflare deployment. Verify the actual live page and media after release, then update WORK_LOG and HANDOFF.

## Approval state

Approved on 2026-11-24: the user authorized the proposed direction, workflow copy and video screenshots. The user then requested no Chinese subtitles and supplied the English replacement video. Implementation follows that file without cropping. Implemented and publicly verified on 2026-11-24, including the full English video, all four languages and the focused byte-range delivery fix.
