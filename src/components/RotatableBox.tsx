'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface RotatableBoxProps {
  frontImage?: string;
  backImage?: string;
  topImage?: string;
  leftSideImage?: string;
  rightSideImage?: string;
  color?: string;
  sideLabel?: string;
  interactive?: boolean;
  className?: string;
}

export default function RotatableBox({
  frontImage,
  backImage,
  topImage,
  leftSideImage,
  rightSideImage,
  color = '#283D57',
  sideLabel = 'Тримайся',
  interactive = true,
  className = '',
}: RotatableBoxProps) {
  const [rotation, setRotation] = useState({ x: -11, y: -18 });
  const [isDragging, setIsDragging] = useState(false);
  const inertiaRef = useRef({ vx: 0, vy: 0, active: false });
  const lastPos = useRef({ x: 0, y: 0 });

  // Board game box proportions (landscape, thinner depth)
  const W = 304;
  const H = 228;
  const D = 50;

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!interactive) return;
    e.preventDefault();
    inertiaRef.current.active = false;
    inertiaRef.current.vx = 0;
    inertiaRef.current.vy = 0;
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [interactive]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      inertiaRef.current.vx = dx * 0.4;
      inertiaRef.current.vy = dy * 0.4;
      setRotation((prev) => {
        return {
          x: Math.max(-34, Math.min(34, prev.x - dy * 0.24)),
          y: prev.y + dx * 0.28,
        };
      });
    },
    [isDragging]
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    inertiaRef.current.active = true;
  }, [isDragging]);

  const onDoubleClick = useCallback(() => {
    inertiaRef.current.active = false;
    inertiaRef.current.vx = 0;
    inertiaRef.current.vy = 0;
    setRotation({ x: -11, y: -18 });
  }, []);

  // Inertia after drag
  useEffect(() => {
    if (!inertiaRef.current.active) return;
    let raf: number;
    const tick = () => {
      const damp = 0.935;
      inertiaRef.current.vx *= damp;
      inertiaRef.current.vy *= damp;
      const speed = Math.hypot(inertiaRef.current.vx, inertiaRef.current.vy);
      setRotation((prev) => {
        return {
          x: Math.max(-36, Math.min(36, prev.x - inertiaRef.current.vy * 0.2)),
          y: prev.y + inertiaRef.current.vx * 0.2,
        };
      });
      if (speed > 0.25) {
        raf = requestAnimationFrame(tick);
      } else {
        inertiaRef.current.active = false;
        inertiaRef.current.vx = 0;
        inertiaRef.current.vy = 0;
        return;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDragging]);

  const shade = (factor: number) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgb(${Math.round(r * factor)},${Math.round(g * factor)},${Math.round(b * factor)})`;
  };

  const face = (
    w: number,
    h: number,
    transform: string,
    bg: string,
    extra?: React.CSSProperties
  ): React.CSSProperties => ({
    position: 'absolute',
    width: w,
    height: h,
    left: '50%',
    top: '50%',
    marginLeft: -w / 2,
    marginTop: -h / 2,
    transform,
    backfaceVisibility: 'hidden',
    backgroundColor: bg,
    borderRadius: 4,
    overflow: 'hidden',
    ...extra,
  });

  return (
    <div
      className={`select-none touch-none ${className}`}
      style={{
        perspective: 1500,
        background: `
          radial-gradient(circle at 50% -20%, rgba(255,255,255,0.16) 0%, transparent 44%),
          radial-gradient(circle at 50% 118%, rgba(0,159,227,0.2) 0%, transparent 56%),
          linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(8,16,28,0.26) 100%)
        `,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.16), 0 30px 58px -34px rgba(0,0,0,0.72), 0 0 0 1px rgba(0,159,227,0.12)',
        borderRadius: 24,
        padding: '24px 20px 22px',
      }}
    >
      <div
        onPointerDown={interactive ? onPointerDown : undefined}
        onPointerMove={interactive ? onPointerMove : undefined}
        onPointerUp={interactive ? onPointerUp : undefined}
        onPointerCancel={interactive ? onPointerUp : undefined}
        onPointerLeave={interactive ? onPointerUp : undefined}
        onDoubleClick={interactive ? onDoubleClick : undefined}
        className={interactive ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}
        style={{
          width: W,
          height: H,
          margin: '18px auto',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: interactive
            ? `translateZ(0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : 'translateZ(0) rotateX(-11deg) rotateY(-18deg)',
          transition: !isDragging ? 'transform 0.08s ease-out' : 'none',
          willChange: 'transform',
        }}
      >
        {/* ─── Front ─── */}
        <div style={face(W, H, `translateZ(${D / 2}px)`, color)}>
          {frontImage ? (
            <img
              src={frontImage}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
              loading="eager"
              decoding="async"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-white/40 font-bold">
              Front
            </span>
          )}
          {/* Subtle glare */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, transparent 32%, transparent 68%, rgba(255,255,255,0.05) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 26px -10px rgba(0,0,0,0.45)' }}
          />
          <div
            className="absolute inset-[7px] rounded-[3px] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)' }}
          />
        </div>

        {/* ─── Back ─── */}
        <div style={face(W, H, `rotateY(180deg) translateZ(${D / 2}px)`, shade(0.85))}>
          {backImage ? (
            <img
              src={backImage}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05) 0%, transparent 50%),
                  linear-gradient(180deg, ${shade(0.9)} 0%, ${shade(0.75)} 100%)
                `,
              }}
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 45%, transparent 68%, rgba(255,255,255,0.04) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 24px -10px rgba(0,0,0,0.46)' }}
          />
        </div>

        {/* ─── Right side ─── */}
        <div style={face(D, H, `rotateY(90deg) translateZ(${W / 2}px)`, shade(0.78))}>
          {rightSideImage ? (
            <img
              src={rightSideImage}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, ${shade(0.68)}, ${shade(0.84)}, ${shade(0.72)})`,
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 4px,
                    rgba(255,255,255,0.35) 4px,
                    rgba(255,255,255,0.35) 5px
                  )`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-white/30 font-bold text-[10px] tracking-[0.22em] uppercase"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {sideLabel}
                </span>
              </div>
            </>
          )}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/25 via-transparent to-black/35" />
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 17px -6px rgba(0,0,0,0.52)' }} />
        </div>

        {/* ─── Left side ─── */}
        <div style={face(D, H, `rotateY(-90deg) translateZ(${W / 2}px)`, shade(0.78))}>
          {leftSideImage ? (
            <img
              src={leftSideImage}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, ${shade(0.72)}, ${shade(0.84)}, ${shade(0.68)})`,
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 4px,
                    rgba(255,255,255,0.35) 4px,
                    rgba(255,255,255,0.35) 5px
                  )`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-white/30 font-bold text-[10px] tracking-[0.22em] uppercase"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  Blue Ferret
                </span>
              </div>
            </>
          )}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/35 via-transparent to-black/20" />
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 17px -6px rgba(0,0,0,0.52)' }} />
        </div>

        {/* ─── Top ─── */}
        <div style={face(W, D, `rotateX(90deg) translateZ(${H / 2}px)`, shade(0.92))}>
          {topImage ? (
            <img
              src={topImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ transform: 'none' }}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${shade(0.95)}, ${shade(0.85)})`,
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.14) 0%, transparent 42%)',
            }}
          />
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 14px -4px rgba(0,0,0,0.34)' }} />
        </div>

        {/* ─── Bottom ─── */}
        <div style={face(W, D, `rotateX(-90deg) translateZ(${H / 2}px)`, shade(0.45))}>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${shade(0.48)} 0%, ${shade(0.35)} 100%)`,
              boxShadow: 'inset 0 0 20px -5px rgba(0,0,0,0.62)',
            }}
          />
        </div>

        {/* ─── Drop shadow ─── */}
        <div
          style={{
            position: 'absolute', width: W * 0.92,
            height: D * 1.1,
            left: '50%',
            top: '50%',
            marginLeft: -(W * 0.92) / 2,
            marginTop: H / 2 + 8,
            transform: `rotateX(-90deg) translateZ(-${H / 2 + 2}px)`,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 72%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />
      </div>

    </div>
  );
}
