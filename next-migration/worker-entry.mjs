import application from "./.open-next/worker.js";
import { serveVideoAsset } from "./lib/video-asset-range.mjs";
import { workflowVideo } from "./lib/dual-roller-workflow-media.mjs";

export * from "./.open-next/worker.js";

export default {
  fetch(request, env, context) {
    if (new URL(request.url).pathname === workflowVideo.path && ["GET", "HEAD"].includes(request.method)) {
      return serveVideoAsset(request, env.ASSETS, workflowVideo.bytes);
    }
    return application.fetch(request, env, context);
  }
};
