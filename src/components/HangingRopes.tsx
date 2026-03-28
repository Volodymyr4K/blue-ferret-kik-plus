'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export default function HangingRopes() {
  const [pulled, setPulled] = useState<number[]>([]);

  const ropes = [
    { id: 1, x: '20%', length: 80 },
    { id: 2, x: '50%', length: 100 },
    { id: 3, x: '80%', length: 60 },
  ];

  const togglePull = (id: number) => {
    setPulled((p) => (p.includes(id) ? p.filter((i) => i !== id) : [...p, id]));
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-36 sm:h-40 pointer-events-auto">
      {ropes.map((rope) => (
        <div
          key={rope.id}
          className="absolute top-0 cursor-grab active:cursor-grabbing"
          style={{ left: rope.x, transform: 'translateX(-50%)' }}
          onMouseDown={() => togglePull(rope.id)}
          onTouchStart={() => togglePull(rope.id)}
        >
          <motion.div
            animate={{
              height: pulled.includes(rope.id) ? rope.length + 25 : rope.length,
              rotate: pulled.includes(rope.id) ? 8 : 0,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="w-2 sm:w-1.5 rounded-full bg-amber-800/95 mx-auto origin-top"
            style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
          />
          <motion.div
            animate={{ scale: pulled.includes(rope.id) ? 1.3 : 1 }}
            className="w-3 h-3 rounded-full bg-amber-700 -ml-1.5"
            style={{ marginLeft: '50%' }}
          />
        </div>
      ))}
    </div>
  );
}
