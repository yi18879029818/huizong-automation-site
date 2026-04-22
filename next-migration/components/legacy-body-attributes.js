"use client";

import { useEffect } from "react";

export function LegacyBodyAttributes({ bodyClassName, bodyDataset }) {
  useEffect(() => {
    const body = document.body;
    const previousClassName = body.className;
    const previousDataset = {};

    Object.keys(bodyDataset).forEach((key) => {
      previousDataset[key] = body.dataset[key];
    });

    body.className = bodyClassName || "";

    Object.entries(bodyDataset).forEach(([key, value]) => {
      if (value) {
        body.dataset[key] = value;
      } else {
        delete body.dataset[key];
      }
    });

    return () => {
      body.className = previousClassName;

      Object.keys(bodyDataset).forEach((key) => {
        const value = previousDataset[key];

        if (value === undefined) {
          delete body.dataset[key];
        } else {
          body.dataset[key] = value;
        }
      });
    };
  }, [bodyClassName, bodyDataset]);

  return null;
}
