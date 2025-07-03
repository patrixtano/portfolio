import { useState, useEffect } from 'react';
import Gallery         from './components/Gallery';
import { galleries }   from './data/galleryData';
import ParallaxAbout   from './components/ParallaxAbout';
import ContactSection  from './components/ContactSection';
import ParallaxFloat   from './components/ParallaxFloat';

export default function App() {
  const [openCat, setOpenCat] = useState(null);

  /* ───── inject local oneko.js once, then push it to background ───── */
  useEffect(() => {
    // don’t add the script twice
    if (document.getElementById('oneko-canvas')) return;

    const script = document.createElement('script');
    script.src   = '/oneko/oneko.js';      // in /public/oneko/
    script.dataset.cat = '/oneko/oneko.gif';
    script.async = true;

    script.onload = () => {
      // oneko creates <canvas id="oneko-canvas"> automatically
      const canvas = document.getElementById('oneko-canvas');
      if (canvas) {
        canvas.style.zIndex = '1';         // video (0) UI (10)
        canvas.style.pointerEvents = 'none';
      }
    };

    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  /* ─────────────────── UI BELOW ─────────────────── */
  return (
    <>
      {/* Floating PNG layers */}
      <ParallaxFloat
        src="/float/float1.png"
        size="w-16 h-16"
        className="left-10 top-10"
        deltaX={10000}
        deltaY={6000}
        startX={-200}
        rotateDeg={720}
        z={4}
      />
      <ParallaxFloat
        src="/float/float2.png"
        size="w-32 h-32"
        className="top-1/3 left-[-10%]"
        deltaX={10000}
        deltaY={-3000}
        z={4}
      />
      <ParallaxFloat
        src="/float/float3.png"
        size="w-40 h-40"
        className="right-5 bottom-20"
        startY={20}
        startX={200}
        deltaY={-6000}
        deltaX={-4000}
        rotateDeg={-90}
        z={4}
      />

      {/* hero with background video */}
      <div className="relative w-full h-screen overflow-hidden font-cyber">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl mb-6 text-cyan-400 drop-shadow-lg">
            @PATRIXTANO
          </h1>
          <p className="mb-8 text-lg max-w-xl drop-shadow">
            nejaky uvod
          </p>

          {/* glitch-hover category buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            {Object.keys(galleries).map((cat) => (
              <button
                key={cat}
                onClick={() => setOpenCat(cat)}
                className="btn-glitch
                           px-6 py-3 rounded-md font-bold shadow-md
                           transition-transform duration-200
                           bg-cyan-700 hover:bg-cyan-500 hover:scale-105"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* light-box overlay */}
        {openCat && (
          <Gallery
            items={galleries[openCat]}
            onClose={() => setOpenCat(null)}
          />
        )}
      </div>

      <ParallaxAbout />
      <ContactSection />
    </>
  );
}
