import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: 'easeOut', delay },
  }),
};

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        size: Math.random() * 8 + 4,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 6,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/45 blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: '-10%',
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: [0, 20, -20, 10, 0],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function Section({ title, children, className = '', ...props }) {
  return (
    <section
      className={`relative mx-auto w-full max-w-4xl px-6 py-20 md:py-28 ${className}`}
      {...props}
    >
      <motion.h2
        className="font-display text-4xl font-semibold text-plum md:text-5xl"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {title}
      </motion.h2>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-plum/90 md:text-xl">{children}</div>
    </section>
  );
}

export default function App() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <main className="relative overflow-hidden">
      <FloatingParticles />

      <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blush/30 via-lavender/20 to-cream/70" />
        <motion.div
          className="relative z-10 max-w-4xl rounded-3xl border border-white/60 bg-white/50 p-10 text-center shadow-soft backdrop-blur-md md:p-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <motion.p
            className="mb-4 text-sm uppercase tracking-[0.32em] text-rose md:text-base"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            A Letter of Accountability
          </motion.p>
          <motion.h1
            className="font-display text-5xl font-semibold leading-tight text-plum md:text-7xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
          >
            For My Devanshi ❤️
            <span className="mt-3 block text-3xl md:text-5xl">The girl I hurt… and the girl I respect.</span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg text-plum/80 md:text-2xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            This is not to convince you. This is to take responsibility.
          </motion.p>
          <motion.a
            href="#line"
            className="mt-10 inline-flex rounded-full bg-rose px-8 py-3 text-base font-medium text-white shadow-lg shadow-rose/30 transition hover:-translate-y-0.5 hover:bg-rose/90"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.65}
          >
            Read With an Open Heart
          </motion.a>
        </motion.div>
      </section>

      <Section title="I Crossed a Line." className="scroll-mt-20" id="line">
        {[
          'I shouted.',
          'I let anger control me.',
          'I disrespected you.',
          'That was wrong.',
        ].map((line, index) => (
          <motion.p
            key={line}
            className="font-display text-4xl font-medium md:text-5xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            custom={index * 0.15}
          >
            {line}
          </motion.p>
        ))}
      </Section>

      <Section title="You Deserved Better">
        {[
          'Devu, I know words cannot erase what I made you feel. I created hurt where you offered love, and that truth belongs to me.',
          'Dika, you deserved safety in my voice, not fear from my anger. I failed that responsibility, and I am not running from it.',
          'Gatti, your heart should never have to brace itself around me. I understand that trust breaks quietly, and I broke it loudly.',
          'Bachhu, I respect you enough to be honest: I was wrong, and I am committed to becoming someone who brings calm, not pain.',
        ].map((paragraph, index) => (
          <motion.p
            key={paragraph}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={index * 0.2}
          >
            {paragraph}
          </motion.p>
        ))}
      </Section>

      <Section title="What Changes Now">
        <motion.ul
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {[
            'I will pause when angry.',
            'I will never shout at you again.',
            'I will protect your peace.',
            'I will work on controlling my anger.',
          ].map((commitment, index) => (
            <motion.li
              key={commitment}
              className="flex items-start gap-3 rounded-2xl border border-rose/20 bg-white/60 px-5 py-4 text-lg shadow-soft"
              variants={fadeUp}
              custom={index * 0.15}
            >
              <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-rose" />
              <span>{commitment}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      <section className="mx-auto w-full max-w-4xl px-6 pb-24 pt-8 text-center md:pb-32">
        <motion.div
          className="rounded-3xl border border-white/70 bg-white/65 p-10 shadow-soft backdrop-blur-md md:p-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <p className="font-display text-3xl md:text-4xl">
            I am not asking you to forget. I am asking for a chance to grow.
          </p>
          <p className="mt-5 text-xl text-plum/90 md:text-2xl">
            I promise the next version of me will protect your heart — not hurt it.
          </p>

          <button
            type="button"
            onClick={() => setShowMessage((prev) => !prev)}
            className="mt-10 rounded-full border border-rose/30 bg-rose/90 px-8 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-rose"
          >
            Still love me a little?
          </button>

          <motion.div
            initial={false}
            animate={{
              opacity: showMessage ? 1 : 0,
              height: showMessage ? 'auto' : 0,
              marginTop: showMessage ? 24 : 0,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="rounded-2xl bg-lavender/35 px-6 py-5 text-lg text-plum/90">
              No matter what you decide, Devanshi, I will keep growing into a man who chooses patience,
              respect, and tenderness every single day.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
