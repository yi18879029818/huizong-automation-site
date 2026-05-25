"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes/index.mjs";
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_STUDIO_BASE_PATH
} from "./lib/sanity/env.mjs";

export default defineConfig({
  name: "coolyne-studio",
  title: "coolyne Studio",
  projectId: SANITY_PROJECT_ID || "missing-project-id",
  dataset: SANITY_DATASET || "production",
  apiVersion: SANITY_API_VERSION,
  basePath: SANITY_STUDIO_BASE_PATH,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
