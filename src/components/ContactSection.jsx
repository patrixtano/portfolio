import { motion } from 'framer-motion';
import { Mail, Instagram, Youtube, Github } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-black text-white py-24 px-4">
      {/* Heading */}
      <motion.h2
        className="font-cyber text-cyan-400 text-4xl mb-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        kde
      </motion.h2>

      {/* icons */}
      <motion.div
        className="flex justify-center gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          { href: 'https://instagram.com/patrixtano', icon: Instagram },
          { href: 'https://github.com/patrixtano',   icon: Github   },
        ].map(({ href, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glitch p-3 bg-cyan-700 hover:bg-cyan-500 rounded-full"
          >
            <Icon size={24} />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
