'use client';

import { Engine } from 'reactylon/web';
import { Scene } from 'reactylon';
import Content from './Content';

export default function Home() {
  return (
    <Engine>
      <Scene onSceneReady={scene => scene.createDefaultCameraOrLight(true, undefined, true)}>
        <Content />
      </Scene>
    </Engine>
  );
}
