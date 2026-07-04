"use client";

// Isolated 3D brand layer. Deliberately NOT imported by anything under
// /dashboard — those routes are data-heavy CRUD screens for school admins
// on ordinary devices, and shipping a WebGL engine there would be dead
// weight. This lives only on marketing/showcase surfaces, and even there
// it's dynamically imported (see MarketingHero.tsx) so it's not in the
// initial bundle at all — it loads after first paint.

import { Engine, Scene, useBeforeRender } from "react-babylonjs";
import { Vector3, Color4, Color3, Mesh } from "@babylonjs/core";
import { useRef } from "react";

function BrandShape() {
  const meshRef = useRef<Mesh | null>(null);

  useBeforeRender((scene) => {
    if (!meshRef.current) return;
    const dt = scene.getEngine().getDeltaTime() / 1000;
    meshRef.current.rotation.y += 0.3 * dt;
    meshRef.current.rotation.x += 0.12 * dt;
  });

  return (
    <icoSphere ref={meshRef} name="brandShape" radius={2} subdivisions={3}>
      <standardMaterial
        name="brandMat"
        diffuseColor={new Color3(0.25, 0.45, 0.95)}
        specularColor={new Color3(0.6, 0.7, 1)}
      />
    </icoSphere>
  );
}

export default function Hero3D() {
  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="hero-3d-canvas"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Scene clearColor={new Color4(0.02, 0.02, 0.04, 1)}>
        <arcRotateCamera
          name="camera1"
          target={Vector3.Zero()}
          alpha={Math.PI / 2.5}
          beta={Math.PI / 2.8}
          radius={8}
          minZ={0.1}
          lowerRadiusLimit={8}
          upperRadiusLimit={8}
          panningSensibility={0}
        />
        <hemisphericLight name="light1" intensity={0.9} direction={Vector3.Up()} />
        <pointLight name="accent" position={new Vector3(3, 3, -3)} intensity={0.6} />

        {/* Placeholder brand geometry — swap for the real Alfinega mark
            once the design is finalized. The point of this component is
            the render pipeline and lazy-load boundary, not the final art. */}
        <BrandShape />
      </Scene>
    </Engine>
  );
}
