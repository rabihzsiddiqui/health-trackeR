"use client";

import { useEffect } from "react";

export default function PwaUpdater() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((registration) => {
        const activate = (sw: ServiceWorker) =>
          sw.postMessage({ type: "SKIP_WAITING" });

        if (registration.waiting) activate(registration.waiting);

        registration.addEventListener("updatefound", () => {
          const sw = registration.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (sw.state === "installed" && navigator.serviceWorker.controller) {
              activate(sw);
            }
          });
        });

        const onFocus = () => registration.update().catch(() => {});
        window.addEventListener("focus", onFocus);
        return () => window.removeEventListener("focus", onFocus);
      })
      .catch(() => {});

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  }, []);

  return null;
}
