import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * props
 *   src         – image path
 *   size        – Tailwind w/h classes (e.g. "w-24 h-24")
 *   className   – additional positioning classes ("left-10 top-20")
 *
 *   startX/Y    – initial offsets in px (default 0)
 *   deltaX/Y    – how many px to travel over the full page scroll
 *   rotateDeg   – degrees to rotate over full page scroll (optional)
 */
export default function ParallaxFloat({
  src,
  size = 'w-24 h-24',
  className = '',

  startX = 0,
  startY = 0,
  deltaX = 0,    // positive = move right
  deltaY = 300,  // positive = move down (default “falling”)
  rotateDeg = 0,
  z = 5,         // layer position
}) {
  const { scrollY } = useScroll();
  const pageLen = 8000;               // arbitrary large scroll range

  const x = useTransform(scrollY, [0, pageLen], [startX, startX + deltaX]);
  const y = useTransform(scrollY, [0, pageLen], [startY, startY + deltaY]);
  const rotate = useTransform(scrollY, [0, pageLen], ['0deg', `${rotateDeg}deg`]);

  return (
    <motion.img
      src={src}
      style={{ x, y, rotate, zIndex: z }}
      className={`pointer-events-none select-none fixed ${size} ${className}`}
      draggable={false}
      alt=""
    />
  );
}