'use client';

import Image from 'next/image';
import { useRef, useState, useCallback, useEffect } from 'react';
import uiContent from '@/data/ui-content';

interface RotatableBoxProps {
  frontImage?: string;
  backImage?: string;
  topImage?: string;
  bottomImage?: string;
  leftSideImage?: string;
  rightSideImage?: string;
  color?: string;
  sideLabel?: string;
  depthScale?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  initialRotation?: { x: number; y: number };
  interactive?: boolean;
  className?: string;
}

export default function RotatableBox({
  frontImage,
  backImage,
  topImage,
  bottomImage,
  leftSideImage,
  rightSideImage,
  color = '#283D57',
  sideLabel = uiContent.branding.defaultSideLabel,
  depthScale = 0.72,
  dimensions,
  initialRotation = { x: -7, y: -13 },
  interactive = true,
  className = '',
}: RotatableBoxProps) {
  const [rotation, setRotation] = useState(initialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const inertiaRef = useRef({ vx: 0, vy: 0, active: false });
  const lastPos = useRef({ x: 0, y: 0 });

  // Geometry calibrated to physical box dimensions (W x H x D).
  const boxSize = dimensions ?? { width: 2457, height: 2183, depth: 834 };
  const FRONT_RATIO = boxSize.width / boxSize.height;
  const DEPTH_RATIO = boxSize.depth / boxSize.width;
  const H = 258;
  const W = Math.round(H * FRONT_RATIO);
  const rawDepth = Math.round(W * DEPTH_RATIO);
  const D = Math.max(56, Math.round(rawDepth * depthScale));

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
          x: Math.max(-30, Math.min(30, prev.x - dy * 0.2)),
          y: prev.y + dx * 0.22,
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
    setRotation(initialRotation);
  }, [initialRotation]);

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
          x: Math.max(-32, Math.min(32, prev.x - inertiaRef.current.vy * 0.16)),
          y: prev.y + inertiaRef.current.vx * 0.15,
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

  const baseRgb = {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };

  const shade = (factor: number) => {
    return `rgb(${Math.round(baseRgb.r * factor)},${Math.round(baseRgb.g * factor)},${Math.round(baseRgb.b * factor)})`;
  };
  const tint = (factor: number, alpha: number) =>
    `rgba(${Math.round(baseRgb.r * factor)},${Math.round(baseRgb.g * factor)},${Math.round(baseRgb.b * factor)},${alpha})`;

  const panelTone = shade(0.9);

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
    borderRadius: 2,
    overflow: 'hidden',
    ...extra,
  });

  return (
    <div
      className={`select-none touch-none ${className}`}
      style={{
        perspective: 1750,
        background: `
          radial-gradient(130% 80% at 50% -20%, rgba(255,255,255,0.1) 0%, transparent 46%),
          radial-gradient(110% 76% at 50% 122%, rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},0.24) 0%, transparent 58%),
          linear-gradient(180deg, ${shade(0.32)} 0%, ${shade(0.26)} 44%, ${shade(0.22)} 100%)
        `,
        border: `1px solid rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},0.36)`,
        boxShadow:
          `inset 0 1px 0 rgba(255,255,255,0.12), 0 30px 58px -34px rgba(0,0,0,0.72), 0 0 0 1px rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},0.2)`,
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
            : `translateZ(0) rotateX(${initialRotation.x}deg) rotateY(${initialRotation.y}deg)`,
          transition: !isDragging ? 'transform 0.08s ease-out' : 'none',
          willChange: 'transform',
        }}
      >
        {/* ─── Front ─── */}
        <div style={face(W, H, `translateZ(${D / 2}px)`, color)}>
          {frontImage ? (
            <Image
              src={frontImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ backgroundColor: panelTone, filter: 'saturate(1.04) contrast(1.03)' }}
              draggable={false}
              priority
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
              background: `linear-gradient(180deg, ${tint(0.34, 0.42)} 0%, ${tint(0.46, 0.1)} 36%, ${tint(0.48, 0.1)} 64%, ${tint(0.34, 0.3)} 100%)`,
            }}
          />
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
        </div>

        {/* ─── Back ─── */}
        <div style={face(W, H, `rotateY(180deg) translateZ(${D / 2}px)`, shade(0.85))}>
          {backImage ? (
            <Image
              src={backImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ backgroundColor: panelTone, filter: 'saturate(1.04) contrast(1.03)' }}
              draggable={false}
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
            style={{
              background: `linear-gradient(180deg, ${tint(0.35, 0.24)} 0%, ${tint(0.45, 0.08)} 36%, ${tint(0.45, 0.1)} 64%, ${tint(0.34, 0.2)} 100%)`,
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
            <Image
              src={rightSideImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ backgroundColor: panelTone, filter: 'saturate(1.04) contrast(1.03)' }}
              draggable={false}
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
            <Image
              src={leftSideImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ backgroundColor: panelTone, filter: 'saturate(1.04) contrast(1.03)' }}
              draggable={false}
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
            <Image
              src={topImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ backgroundColor: panelTone, transform: 'none', filter: 'saturate(1.04) contrast(1.03)' }}
              draggable={false}
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
          {bottomImage ? (
            <Image
              src={bottomImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ backgroundColor: panelTone, filter: 'saturate(1.04) contrast(1.03)' }}
              draggable={false}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${shade(0.48)} 0%, ${shade(0.35)} 100%)`,
              }}
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 20px -5px rgba(0,0,0,0.62)' }}
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
            marginTop: H / 2 + Math.max(5, Math.round(D * 0.07)),
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
