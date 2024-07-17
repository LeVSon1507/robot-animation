'use client';

import { Canvas, useThree } from '@react-three/fiber';
import Model from './Model';
import { Suspense } from 'react';
import { useProgress, Html, ScrollControls } from '@react-three/drei';
import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';

function Loader() {
   const { progress, active } = useProgress();

   return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

function Effects() {
   const { scene, camera } = useThree();

   return (
      <EffectComposer>
         <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
         {/* <DepthOfField focusDistance={0.1} focalLength={0.2} bokehScale={2} /> */}
         {/* <Vignette eskil={false} offset={0.1} darkness={0.6} /> */}
      </EffectComposer>
   );
}

export default function Scene() {
   return (
      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className='relative h-svh'>
         <directionalLight position={[-5, -5, 5]} intensity={4} />
         <Suspense fallback={<Loader />}>
            <ScrollControls damping={0.5} pages={3}>
               <Model />
               <Effects />
            </ScrollControls>
         </Suspense>
      </Canvas>
   );
}
