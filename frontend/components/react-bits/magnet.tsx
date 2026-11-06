"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  className?: string;
}

export function Magnet({
  children,
  padding = 40,
  disabled = false,
  magnetStrength = 4.5,
  className = "",
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  // Efek magnet hanya untuk mouse/trackpad. Di perangkat sentuh (HP/tablet) tombol diam
  // supaya tidak "melompat" saat disentuh.
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const magnetOff = disabled || isTouch;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (magnetOff || !magnetRef.current) return;
    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distX = Math.abs(centerX - e.clientX);
    const distY = Math.abs(centerY - e.clientY);

    if (distX < width / 2 + padding && distY < height / 2 + padding) {
      setIsActive(true);
      const offsetX = (e.clientX - centerX) / magnetStrength;
      const offsetY = (e.clientY - centerY) / magnetStrength;
      setPosition({ x: offsetX, y: offsetY });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={
        magnetOff
          ? undefined
          : {
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              transition: isActive
                ? "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform",
            }
      }
    >
      {children}
    </div>
  );
}

