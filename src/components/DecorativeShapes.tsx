'use client';

import { motion } from 'motion/react';

const PARTICLES = [
  { size: 120, x: '10%', y: '15%', color: 'bg-[#009FE3]/20', delay: 0, duration: 7 },
  { size: 80, x: '85%', y: '25%', color: 'bg-[#4BB272]/25', delay: 1, duration: 8 },
  { size: 60, x: '5%', y: '60%', color: 'bg-[#009FE3]/15', delay: 2, duration: 6 },
  { size: 100, x: '90%', y: '70%', color: 'bg-[#4BB272]/20', delay: 0.5, duration: 9 },
  { size: 40, x: '50%', y: '10%', color: 'bg-[#009FE3]/30', delay: 1.5, duration: 5 },
  { size: 70, x: '25%', y: '80%', color: 'bg-[#4BB272]/15', delay: 2.5, duration: 7 },
  { size: 50, x: '75%', y: '45%', color: 'bg-[#009FE3]/25', delay: 1, duration: 6 },
  { size: 90, x: '15%', y: '40%', color: 'bg-[#4BB272]/20', delay: 0, duration: 8 },
  { size: 35, x: '60%', y: '85%', color: 'bg-[#009FE3]/20', delay: 0.8, duration: 5 },
  { size: 55, x: '92%', y: '15%', color: 'bg-[#4BB272]/25', delay: 1.2, duration: 7 },
];

const STARS = [
  { x: '20%', y: '20%', size: 12, delay: 0 },
  { x: '80%', y: '30%', size: 8, delay: 0.5 },
  { x: '40%', y: '70%', size: 10, delay: 1 },
  { x: '70%', y: '80%', size: 6, delay: 1.5 },
  { x: '10%', y: '50%', size: 8, delay: 0.3 },
  { x: '95%', y: '60%', size: 10, delay: 0.8 },
  { x: '55%', y: '35%', size: 6, delay: 0.2 },
  { x: '30%', y: '90%', size: 8, delay: 1.2 },
];

export function HeroDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#009FE3]/12 via-transparent via-40% to-[#4BB272]/12 animate-gradient bg-[length:200%_200%]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_30%_20%,#009FE328_0%,transparent_50%)] animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_70%_80%,#4BB27220_0%,transparent_50%)] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/40 to-transparent" />

      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-2xl ${p.color}`}
          style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
          animate={{ y: [0, -25, 0], x: [0, 10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {STARS.map((s, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-[#009FE3]"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: s.delay }}
        >
          ★
        </motion.div>
      ))}

      <motion.div
        className="absolute w-12 sm:w-16 h-12 sm:h-16 border-2 border-[#009FE3]/30 rounded-2xl"
        style={{ top: '25%', right: '15%' }}
        animate={{ rotate: 360, y: [0, -15, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity } }}
      />
      <motion.div
        className="absolute w-10 sm:w-12 h-10 sm:h-12 bg-[#4BB272]/20 rounded-full"
        style={{ bottom: '30%', left: '8%' }}
        animate={{ scale: [1, 1.2, 1], y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-6 sm:w-8 h-6 sm:h-8 border-2 border-[#4BB272]/40 rounded-lg"
        style={{ top: '60%', right: '25%' }}
        animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-8 sm:w-10 h-8 sm:h-10 bg-[#009FE3]/15 rounded-full"
        style={{ top: '75%', right: '5%' }}
        animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      />
      {/* Додаткові геометричні фігури */}
      <motion.div
        className="absolute w-4 h-4 border-2 border-[#009FE3]/25 rounded-sm"
        style={{ top: '15%', left: '20%' }}
        animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-3 h-3 bg-[#4BB272]/30 rounded-full"
        style={{ bottom: '20%', right: '40%' }}
        animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute w-14 h-14 sm:w-20 sm:h-20 border-2 border-[#4BB272]/20 rounded-3xl"
        style={{ top: '50%', left: '3%' }}
        animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -10, 0] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, y: { duration: 6, repeat: Infinity } }}
      />
    </div>
  );
}

/** Woolhaven-style: сніжинки, ефірні форми, сильніший glow */
const SNOWFLAKES = [
  { x: '8%', y: '15%', size: 12, delay: 0 },
  { x: '92%', y: '22%', size: 8, delay: 0.5 },
  { x: '15%', y: '45%', size: 10, delay: 1 },
  { x: '88%', y: '55%', size: 6, delay: 1.5 },
  { x: '25%', y: '80%', size: 8, delay: 0.3 },
  { x: '75%', y: '12%', size: 10, delay: 0.8 },
  { x: '5%', y: '70%', size: 6, delay: 0.2 },
  { x: '95%', y: '85%', size: 8, delay: 1.2 },
  { x: '50%', y: '30%', size: 6, delay: 0.6 },
  { x: '40%', y: '90%', size: 8, delay: 0.4 },
];

/** Світла стилістика видавництва — голубий + білий */
export function HeroDecorationsLight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_30%_20%,rgba(0,159,227,0.12)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_70%_80%,rgba(0,159,227,0.06)_0%,transparent_50%)]" />
      {SNOWFLAKES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-[#009FE3]/40"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size, fontSize: s.size }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2], rotate: [0, 180] }}
          transition={{ duration: 5 + i * 0.3, repeat: Infinity, delay: s.delay }}
        >
          ✦
        </motion.div>
      ))}
      <motion.div
        className="absolute w-16 h-16 sm:w-20 sm:h-20 border-2 border-[#009FE3]/20 rounded-2xl"
        style={{ top: '12%', right: '10%' }}
        animate={{ rotate: 360, y: [0, -10, 0] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, y: { duration: 6, repeat: Infinity } }}
      />
      <motion.div
        className="absolute w-12 h-12 border-2 border-[#009FE3]/15 rounded-xl"
        style={{ bottom: '25%', left: '8%' }}
        animate={{ rotate: -360, scale: [1, 1.05, 1] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, scale: { duration: 5, repeat: Infinity } }}
      />
    </div>
  );
}

export function HeroDecorationsDark() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Vignette — темні краї як Woolhaven */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_50%,transparent_45%,rgba(0,0,0,0.5)_100%)]" />
      {/* Сніжинки / floating particles */}
      {SNOWFLAKES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-[#009FE3]/60 drop-shadow-[0_0_6px_rgba(0,159,227,0.4)]"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size, fontSize: s.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180],
          }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: s.delay }}
        >
          ✦
        </motion.div>
      ))}
      {/* Blobs — сильніший glow */}
      {[
        { size: 500, x: '-15%', y: '-25%', color: 'rgba(0,159,227,0.2)', blur: 140 },
        { size: 400, x: '60%', y: '40%', color: 'rgba(75,178,114,0.15)', blur: 120 },
        { size: 350, x: '10%', y: '70%', color: 'rgba(20,184,166,0.12)', blur: 100 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: b.color,
            filter: `blur(${b.blur}px)`,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i }}
        />
      ))}
      {/* Геометричні форми */}
      <motion.div
        className="absolute w-20 h-20 sm:w-28 sm:h-28 border-[3px] border-[#009FE3]/30 rounded-2xl"
        style={{ top: '10%', right: '8%' }}
        animate={{ rotate: 360, y: [0, -15, 0] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity } }}
      />
      <motion.div
        className="absolute w-14 h-14 sm:w-18 sm:h-18 border-[3px] border-[#4BB272]/30 rounded-xl"
        style={{ bottom: '20%', left: '6%' }}
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 35, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
      />
      <motion.div
        className="absolute w-8 h-8 border-2 border-[#009FE3]/40 rounded-lg"
        style={{ top: '65%', right: '18%' }}
        animate={{ rotate: [0, 180, 360], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-10 h-10 bg-[#4BB272]/15 rounded-full border-2 border-[#4BB272]/30"
        style={{ top: '38%', left: '5%' }}
        animate={{ scale: [1, 1.2, 1], y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}

const KIK_LEAVES = [
  { x: '8%', y: '15%', size: 12, rotate: -15, delay: 0 },
  { x: '92%', y: '25%', size: 10, rotate: 25, delay: 0.5 },
  { x: '15%', y: '55%', size: 8, rotate: 10, delay: 1 },
  { x: '88%', y: '65%', size: 6, rotate: -20, delay: 1.5 },
  { x: '5%', y: '85%', size: 10, rotate: 5, delay: 0.3 },
  { x: '95%', y: '12%', size: 8, rotate: -15, delay: 0.8 },
  { x: '25%', y: '35%', size: 6, rotate: 30, delay: 0.2 },
  { x: '75%', y: '80%', size: 10, rotate: -25, delay: 1.2 },
];

export function KikDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_20%_30%,rgba(75,178,114,0.2)_0%,transparent_50%)] animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_70%,rgba(0,159,227,0.12)_0%,transparent_50%)] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#4BB272]/20 blur-xl"
          style={{
            width: 60 + i * 15,
            height: 60 + i * 15,
            left: `${15 + i * 20}%`,
            top: `${25 + i * 12}%`,
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      {/* Органічні елементи — листя */}
      {KIK_LEAVES.map((l, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute text-[#4BB272]/35"
          style={{ left: l.x, top: l.y, width: l.size, height: l.size, fontSize: l.size, transform: `rotate(${l.rotate}deg)` }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2], rotate: [l.rotate, l.rotate + 15, l.rotate] }}
          transition={{ duration: 5 + i * 0.3, repeat: Infinity, delay: l.delay }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
}
