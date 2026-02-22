import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const confessionLines = [
  'I raised my voice.',
  'I let anger control me.',
  'I crossed a boundary.',
  'I hurt you.',
  'That was wrong.',
];

const commitments = [
  'I will pause when I feel anger.',
  'I will walk away instead of raising my voice.',
  'I will protect your peace.',
  'I will never cross that line again.',
  'I am working on becoming a better man for you.',
];

const nicknames = ['My Devu…', 'My Dika…', 'My Gatti…', 'My Bachhu…'];

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
      Array.from({ length: 30 }, (_, id) => ({
        id,
        size: Math.random() * 8 + 3,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 12 + 14,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/50 blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: '-10%',
          }}
          animate={{ y: ['0vh', '120vh'], x: [0, 24, -22, 10, 0], opacity: [0, 0.8, 0.8, 0] }}
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

function RomanticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <motion.span
        className="absolute h-4 w-4 rounded-full bg-rose/70 shadow-[0_0_18px_rgba(215,122,153,0.9)]"
        animate={{ x: position.x - 8, y: position.y - 8 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.2 }}
      />
      <motion.span
        className="absolute h-2 w-2 rounded-full bg-white/80"
        animate={{ x: position.x - 4, y: position.y - 4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.3 }}
      />
    </div>
  );
}

function Section({ title, className = '', children, ...props }) {
  return (
    <section className={`relative mx-auto w-full max-w-5xl px-6 py-20 md:py-28 ${className}`} {...props}>
      <motion.h2
        className="font-display text-4xl font-semibold text-plum md:text-6xl"
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
  const [heroExit, setHeroExit] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [burstMode, setBurstMode] = useState(false);
  const [interactiveRevealed, setInteractiveRevealed] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);
  const [secretRevealed, setSecretRevealed] = useState(false);

  useEffect(() => {
    const spawnHeart = (event) => {
      const heart = {
        id: Date.now() + Math.random(),
        x: event.clientX,
        y: event.clientY,
        size: 12 + Math.random() * 16,
      };
      setHearts((prev) => [...prev.slice(-80), heart]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((item) => item.id !== heart.id));
      }, 1700);
    };

    window.addEventListener('click', spawnHeart);
    return () => window.removeEventListener('click', spawnHeart);
  }, []);

  const handleHeroButton = () => {
    setHeroExit(true);
    setTimeout(() => {
      document.getElementById('line-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHeroExit(false);
    }, 560);
  };

  const romanticBurst = async () => {
    setBurstMode(true);
    setInteractiveRevealed(true);
    setTimeout(() => setBurstMode(false), 3000);

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const context = new AudioCtx();
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(659.25, context.currentTime + 0.45);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.1);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 1.12);
    } catch {
      // Audio may be blocked in some environments.
    }
  };

  const handleSecretClick = () => {
    setSecretClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setSecretRevealed(true);
        return 0;
      }
      return next;
    });
  };

  return (
    <main className="relative overflow-hidden bg-gradient-romance text-plum">
      <RomanticCursor />
      <FloatingParticles />

      {burstMode && <div className="pointer-events-none fixed inset-0 z-40 bg-rose/20 blur-3xl" />}

      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="absolute text-rose/80 drop-shadow-[0_0_10px_rgba(215,122,153,0.7)]"
            initial={{ x: heart.x, y: heart.y, opacity: 0, scale: 0.5 }}
            animate={{
              x: heart.x + (Math.random() * 40 - 20),
              y: heart.y - 120,
              opacity: [0, 1, 0],
              scale: [0.6, 1.2, 1],
            }}
            transition={{ duration: 1.7, ease: 'easeOut' }}
            style={{ fontSize: heart.size }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
        <motion.div
          className="absolute inset-0 bg-[length:250%_250%]"
          animate={{
            backgroundImage: [
              'linear-gradient(125deg, #fbdde6 0%, #dccdf6 45%, #fff7ef 100%)',
              'linear-gradient(140deg, #f8d4e6 0%, #e6dafb 48%, #fffaf4 100%)',
              'linear-gradient(125deg, #fbdde6 0%, #dccdf6 45%, #fff7ef 100%)',
            ],
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="relative z-10 max-w-4xl rounded-[2rem] border border-white/60 bg-white/45 p-10 text-center shadow-soft backdrop-blur-xl md:p-16"
          animate={heroExit ? { scale: 1.04, opacity: 0, filter: 'blur(7px)' } : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.p className="text-xs uppercase tracking-[0.3em] text-rose md:text-sm" variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            A Letter of Accountability
          </motion.p>
          <motion.h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-7xl" variants={fadeUp} initial="hidden" animate="visible" custom={0.25}>
            For My Devanshi{' '}
            <motion.span className="inline-block" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              ❤️
            </motion.span>
          </motion.h1>
          <motion.p className="mx-auto mt-5 max-w-3xl text-xl md:text-3xl" variants={fadeUp} initial="hidden" animate="visible" custom={0.45}>
            The girl I hurt…
            <br />
            and the girl who still deserves nothing but respect.
          </motion.p>
          <motion.p className="mx-auto mt-8 max-w-2xl text-base text-plum/80 md:text-xl" variants={fadeUp} initial="hidden" animate="visible" custom={0.6}>
            This is not to convince you. This is to take responsibility.
          </motion.p>
          <motion.button
            type="button"
            onClick={handleHeroButton}
            className="mt-10 rounded-full bg-rose px-8 py-3 text-base font-medium text-white shadow-lg shadow-rose/35 transition hover:-translate-y-0.5 hover:shadow-xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.75}
            whileHover={{ scale: 1.03 }}
          >
            Read With an Open Heart
          </motion.button>
        </motion.div>
      </section>

      <Section title="I Crossed a Line." id="line-section">
        <motion.div
          initial={{ opacity: 0, scaleY: 0.7, transformOrigin: 'top center' }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-rose/20 bg-white/65 p-8 shadow-soft backdrop-blur-lg"
        >
          {confessionLines.map((line, index) => (
            <motion.p
              key={line}
              className="font-display text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            className="mt-7 text-base italic text-plum/75 md:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.05, duration: 0.7 }}
          >
            No excuses. No justifications. Just honesty.
          </motion.p>
        </motion.div>
      </Section>

      <Section title="You Deserved Better" className="bg-white/25">
        <p className="font-display text-3xl md:text-5xl">You deserved calm love.</p>
        <p className="font-display text-3xl md:text-5xl">You deserved safety.</p>
        <p className="font-display text-3xl md:text-5xl">You deserved respect.</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {nicknames.map((name, index) => (
            <motion.p
              key={name}
              className="relative rounded-2xl border border-rose/25 bg-white/55 px-6 py-4 text-2xl font-medium shadow-soft"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.12 * index, type: 'spring', stiffness: 220, damping: 16 }}
            >
              {name}
              <span className="absolute -right-1 -top-2 text-sm text-rose/70">✦</span>
            </motion.p>
          ))}
        </div>

        <p className="pt-2 text-xl text-plum/90 md:text-2xl">You never deserved that tone from me.</p>
      </Section>

      <section className="relative overflow-hidden bg-[#2a1f35] py-28 text-center text-[#f3e9ff]">
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_25%_20%,#ffffff_1px,transparent_1px)] [background-size:120px_120px]" />
        <motion.div
          className="relative mx-auto max-w-3xl px-6"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{ willChange: 'transform' }}
        >
          <p className="font-display text-4xl md:text-6xl">Even when I was wrong…</p>
          <p className="mt-6 text-2xl md:text-4xl">my love for you was never small.</p>
        </motion.div>
      </section>

      <Section title="What Changes Now.">
        <motion.ul className="space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          {commitments.map((line, index) => (
            <motion.li key={line} className="rounded-2xl border border-rose/20 bg-white/70 px-5 py-4 shadow-soft" variants={fadeUp} custom={index * 0.12}>
              {line}
            </motion.li>
          ))}
        </motion.ul>
        <p className="pt-4 font-display text-3xl md:text-4xl">Because love without respect is not love.</p>
      </Section>

      <section className="mx-auto w-full max-w-4xl px-6 pb-28 pt-4 text-center md:pb-36">
        <motion.div
          className="rounded-[2rem] border border-white/70 bg-white/65 p-10 shadow-soft backdrop-blur-md md:p-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <button
            type="button"
            onClick={romanticBurst}
            className="rounded-full bg-rose px-8 py-3 font-medium text-white shadow-lg shadow-rose/35 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Still love me a little?
          </button>

          <motion.div
            initial={false}
            animate={{ opacity: interactiveRevealed ? 1 : 0, y: interactiveRevealed ? 0 : 20, height: interactiveRevealed ? 'auto' : 0 }}
            transition={{ duration: 0.65 }}
            className="overflow-hidden"
          >
            <p className="mt-8 rounded-2xl bg-lavender/35 px-6 py-5 text-xl text-plum/90">
              Then I promise…
              <br />I will spend my life protecting that love.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <button
        type="button"
        onClick={handleSecretClick}
        className="fixed bottom-5 right-5 z-50 rounded-full border border-white/70 bg-white/70 px-3 py-2 text-rose shadow-soft backdrop-blur-md"
        aria-label="Secret love note"
      >
        ♥
      </button>

      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-20 z-50 px-6 text-center"
        initial={false}
        animate={{ opacity: secretRevealed ? 1 : 0, y: secretRevealed ? 0 : 20 }}
      >
        <p className="mx-auto max-w-xl rounded-2xl bg-[#fff7fb]/80 px-6 py-4 text-lg text-plum shadow-soft backdrop-blur-md">
          You are my safest place. And I promise to become yours.
        </p>
      </motion.div>
    </main>
  );
}
