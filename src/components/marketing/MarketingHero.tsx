"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

// next/dynamic + ssr:false means the Babylon.js engine is never part of
// the server-rendered HTML or the initial JS bundle. It's fetched only
// after this component mounts client-side, and only on pages that
// actually render it (marketing pages, not dashboards).
const Hero3D = dynamic(() => import("@/components/3d/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-neutral-600 text-sm">
      Loading…
    </div>
  ),
});

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: string, cb: () => void) => void;
  removeEventListener?: (type: string, cb: () => void) => void;
};

function getConnection(): NetworkInformation | undefined {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

// Respect low-end devices / slow connections explicitly rather than
// assuming everyone can afford a WebGL engine — relevant given the actual
// user base (secondary students, shared/older Android devices).
// useSyncExternalStore is the correct primitive here: navigator.connection
// is an external system, and this also reacts live if the connection
// quality changes mid-session instead of checking once at mount.
function subscribe(callback: () => void) {
  const conn = getConnection();
  conn?.addEventListener?.("change", callback);
  return () => conn?.removeEventListener?.("change", callback);
}

function getSnapshot(): boolean {
  const conn = getConnection();
  const slow = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
  return !conn?.saveData && !slow;
}

// Server snapshot: never render 3D during SSR — the dynamic import is
// ssr:false anyway, so this just keeps hydration consistent.
function getServerSnapshot(): boolean {
  return false;
}

export default function MarketingHero() {
  const shouldRender3D = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
      {shouldRender3D ? (
        <Hero3D />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm px-6 text-center">
          3D preview disabled to save data on your connection.
        </div>
      )}
    </div>
  );
}
