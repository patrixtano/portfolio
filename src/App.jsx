import { useState, useEffect } from 'react';
import Gallery         from './components/Gallery';
import { galleries }   from './data/galleryData';
import ParallaxAbout   from './components/ParallaxAbout';
import ContactSection  from './components/ContactSection';
import ParallaxFloat   from './components/ParallaxFloat';
import backgroundVideo from '/background.mp4?url';
export default function App() {
  const [openCat, setOpenCat] = useState(null);

  // ───── Inject oneko.js locally ─────
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/oneko/oneko.js';
    script.dataset.cat = '/oneko/oneko.gif';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
      if (window.ONEKO_DESTROY) window.ONEKO_DESTROY();
    };
  }, []);

  return (
    <>
      {/* ───── Background Video ───── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-screen h-screen object-cover z-[-10]"
        style={{
          objectFit: 'fill', // try this instead of "cover"
          transform: 'translateZ(0)',
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      {/* ───── Floating PNG layers ───── */}
      <ParallaxFloat
        src="/float/float1.png"
        size="w-100 h-auto"
        className="left-10 top-20"
        deltaX={2000}
        deltaY={-5000}
        startX={100}
        z={4}
      />
      <ParallaxFloat
        src="/float/float2.png"
        size="w-90 h-auto"
        className="top-1/3 left-[-10%]"
        deltaX={10000}
        deltaY={-5000}
        startX={300}

        z={4}
      />
      <ParallaxFloat
        src="/float/float3.png"
        size="w-120 h-auto"
        className="right-5 bottom-60"
        deltaX={-4000}
        deltaY={-6000}
        rotateDeg={0}
        z={4}
      />

      {/* ───── HERO ───── */}
      <div className="relative w-full h-screen overflow-hidden font-cyber">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl mb-6 text-cyan-400 drop-shadow-lg">
            Welcome to My Art Portfolio
          </h1>
          <p className="mb-8 text-lg max-w-xl drop-shadow">
            Explore my creations in 3D, motion design, and animation.
          </p>

          {/* Category buttons */}
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

        {openCat && (
          <Gallery items={galleries[openCat]} onClose={() => setOpenCat(null)} />
        )}
      </div>

      {/* ───── ABOUT / CONTACT ───── */}
      <ParallaxAbout />
      <ContactSection />
    </>
  );
}
