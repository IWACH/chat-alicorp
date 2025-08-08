"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { isBrowser } from "@/core/utils/isBrowser.util";

import { worker } from "./handlers";

const ENABLE_MSW = process.env.NEXT_PUBLIC_ENABLE_MSW === "true";

function MSWProvider({ children }: PropsWithChildren) {
  const hasStartedRef = useRef(false);
  const [isReady, setIsReady] = useState(!ENABLE_MSW);

  useEffect(() => {
    if (!ENABLE_MSW) return;
    if (!isBrowser) return;
    if (!worker) return;
    if (hasStartedRef.current) return;

    hasStartedRef.current = true;

    worker
      .start({ onUnhandledRequest: "bypass", quiet: true })
      .then(() => setIsReady(true))
      .catch(() => setIsReady(true));
  }, []);

  if (ENABLE_MSW && !isReady) {
    return null;
  }

  return children;
}

export default MSWProvider;
