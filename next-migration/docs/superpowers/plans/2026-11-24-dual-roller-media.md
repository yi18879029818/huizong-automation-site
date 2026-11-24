# Dual roller robot workflow media

- Approved replacement source: `D:/展会项目/英文版.mp4`, 174,938,445 bytes, 2560×1440, 95.318005 seconds. Source SHA-256: `21bcbdd246aec8a8107e35094855b5c400101d38206f69178cb000fed908b15e`.
- The entire English source is used. No Chinese subtitles were observed in the reviewed workflow frames. No crop, inpainting or generated mechanical content is used. Original files remain unchanged.
- Web derivative: `public/videos/dual-roller-laser-marking-workflow.mp4`, 20,467,891 bytes, 1600×900, 25 fps, H.264/yuv420p, AAC 96 kbps, faststart, 95.32 seconds. SHA-256: `2da60a347650e8fa563bb89c7cf6897033ede119e84c71da2e55d88403939581`.
- FFmpeg video options: `-vf scale=1600:900,fps=25 -c:v libx264 -preset medium -crf 25 -maxrate 1800k -bufsize 3600k -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart`.
- Poster from 26s, width1600. Tray transfer still from12s, marking station47s, collection90s; each width960, 16:9, WebP quality85.
- Reviewed workflow: tray receipt, lift, travel and alignment, fixture loading, machine marking, retrieval and separate collection box. The last source shot shows the marked plate.
- Validation: ffprobe duration/codec/dimensions/size and complete ffmpeg decode passed. Native Chrome playback and seek passed in the product page regression. Media stays below Cloudflare's25MiB asset limit.
