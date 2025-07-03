import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxAbout() {
  // reference for scroll-progress
  const ref = useRef(null);

  // map scroll progress to a Y-translation (0 → 30 %)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],   // when top hits top, when bottom hits top
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[url('/parallax.png')] bg-cover bg-center"
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl mb-4 font-cyber"
        >
          Kto&nbsp;som
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-xl text-lg drop-shadow"
        >
          kto
        </motion.p>
      </div>
    </section>
  );
}
