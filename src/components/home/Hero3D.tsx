'use client';

import { useEffect } from 'react';
import { Vector3, Tools } from '@babylonjs/core';
import type { ArcRotateCamera } from '@babylonjs/core';
import { useScene } from 'reactylon';

export default function Hero3D() {
  const scene = useScene();

  useEffect(() => {
    const camera = scene.activeCamera as ArcRotateCamera;
    if (camera) {
      camera.alpha = Tools.ToRadians(45);
      camera.beta = Tools.ToRadians(65);
      camera.radius = 6;
      camera.lowerRadiusLimit = 3;
      camera.upperRadiusLimit = 12;
      camera.panningSensibility = 0;

      let frame: number;
      function rotate() {
        camera.alpha += 0.003;
      }
      scene.registerBeforeRender(rotate);
      frame = scene.getEngine().framesPerSecond;
      return () => {
        scene.unregisterBeforeRender(rotate);
      };
    }
  }, [scene]);

  return (
    <>
      <hemisphericLight name="ambient" direction={new Vector3(0, 1, 0)} intensity={0.3} />
      <pointLight
        name="glow"
        position={new Vector3(2, 3, -2)}
        intensity={1.2}
      />
      <transformNode name="heroGroup" position={new Vector3(0, 0.5, 0)}>
        <torusKnot
          name="knot"
          options={{ radius: 1.2, tube: 0.35, radialSegments: 128, tubularSegments: 64 }}
        >
        </torusKnot>
      </transformNode>
    </>
  );
}
