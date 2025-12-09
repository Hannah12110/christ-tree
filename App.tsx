import React, { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';
import { Experience } from './components/Experience';
import { GestureController } from './components/GestureController';
import { TreeState, InteractionState } from './types';

function App() {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.FORMED);
  
  // Shared interaction state
  const interactionRef = useRef<InteractionState>({
    x: 0,
    y: 0,
    isDown: false,
    isHandDetected: false
  });

  const toggleState = () => {
    setTreeState((prev) => (prev === TreeState.FORMED ? TreeState.CHAOS : TreeState.FORMED));
  };

  return (
   <div className="relative w-full h-screen bg-slate-900 touch-none">
      
  {/* Gesture Controller (Webcam Logic) - 保持注释状态以修复Vercel黑屏问题 */}
  {/* <GestureController interactionRef={interactionRef} /> */}

  {/* 3D Canvas */}
  <Canvas
       // 👇 添加以下属性
  gl={{ antialias: true, alpha: false, logarithmicDepthBuffer: true }}
  dpr={[1, 2]} // 强制设置像素比
  linear // 强制使用线性色彩空间
>
  <Suspense fallback={null}>
    {/* ... 你的 Experience 和其他组件 ... */}
  </Suspense>
</Canvas>
      <Loader />

      {/* Luxury UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-8 md:p-12 flex flex-col justify-between">
        
        {/* Header - Top Left */}
        <header className="self-start text-left pointer-events-auto">
          <h1 className="font-serif text-3xl md:text-5xl text-amber-400 tracking-wider drop-shadow-lg" style={{ fontFamily: '"Cinzel", serif' }}>
            THE GRAND TREE
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-transparent mt-2"></div>
        </header>

        {/* Controls - Bottom Right */}
        <div className="self-end flex flex-col items-end space-y-6 pointer-events-auto mb-4">
          
          <button
            onClick={toggleState}
            className={`
              group relative px-8 py-3 overflow-hidden rounded-none
              border-b-2 border-amber-500/50 bg-black/40 backdrop-blur-md
              transition-all duration-500 ease-out
              hover:bg-amber-900/40 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]
            `}
          >
            <span className="relative z-10 font-serif text-amber-100 tracking-widest text-lg group-hover:text-white transition-colors">
              {treeState === TreeState.FORMED ? 'UNLEASH CHAOS' : 'ASSEMBLE FORM'}
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent z-0"></div>
          </button>

          <p className="text-emerald-400/60 text-xs font-serif tracking-widest text-right">
            SWIPE TO SPIN &nbsp; • &nbsp; TOUCH TO ATTRACT <br/>
            <span className="opacity-50 text-[10px]">GRAND LUXURY INTERACTIVE • PINCH TO GRAB</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;