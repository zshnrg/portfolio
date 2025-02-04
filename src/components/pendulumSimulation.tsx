"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface PendulumSimulationProps {
  ballRadius?: number;
  ballSVG?: string | null;
  ballColor?: string;
  barLength?: number;
  barWidth?: number;
  barColor?: string;
  barStiffness?: number;
  barDamping?: number;
  maxAngle?: number;
  idleAngle?: number;
  idlePeriod?: number;
  idleTimeout?: number;
  sensitivity?: number;
}

export default function PendulumSimulation({
  ballRadius=100,
  ballSVG=null,
  ballColor="black",
  barLength=500,
  barWidth=3,
  barColor="black",
  barStiffness=200,
  barDamping=10,
  maxAngle=50,
  idleAngle=5,
  idlePeriod=2000,
  idleTimeout=1000,
  sensitivity=0.5,
}: PendulumSimulationProps) {

  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteracting = useRef(false);
  const [angle, setAngle] = useState(0); // Sudut pendulum
  const pendulumControls = useAnimation(); // Animasi pendulum
  const controls = useAnimation();

  // Fungsi untuk menghasilkan path batang pendulum yang melengkung
  const getPendulumPath = (angle: number) => {
    const rad = (angle * Math.PI) / 180; // Konversi sudut ke radian
    const curveX = ballRadius + Math.sin(rad) * ballRadius; // Hitung posisi X kurva
    const curveY = (ballRadius + barLength / 3) + Math.cos(rad) * (barLength * 0.2); // **Ubah titik bawah ke titik atas**
    return `M${ballRadius} ${ballRadius} Q${curveX} ${curveY} ${ballRadius} ${ballRadius + barLength}`; // **Perbarui path agar bola tetap terhubung**
  };

  const startIdleAnimation = async () => {
    if (isUserInteracting.current) return; // **Prevent idle if user is still interacting**
    
    const animatePendulum = async (targetAngle: number) => {
      await Promise.all([
        controls.start({ d: getPendulumPath(-targetAngle), transition: { duration: idlePeriod / 1000, ease: "easeInOut" } }),
        pendulumControls.start({ rotate: targetAngle, transition: { duration: idlePeriod / 1000, ease: "easeInOut" } }),
      ]);
    };

    while (!isUserInteracting.current) {
      await animatePendulum(-idleAngle);
      await animatePendulum(idleAngle);
    }
  };

  const handleHover = (event: React.MouseEvent) => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    isUserInteracting.current = true; // **Mark as user interacting**

    const { movementX } = event;
    const newAngle = Math.max(-maxAngle, Math.min(maxAngle, angle + movementX * sensitivity));
    setAngle(newAngle);
    controls.start({ d: getPendulumPath(-newAngle), transition: { duration: 0.1 } });
    pendulumControls.start({ rotate: newAngle });
  };

  const handleHoverEnd = async () => {
    isUserInteracting.current = false; // **Mark as no interaction**
    
    pendulumControls.start({ rotate: 0, transition: { type: "spring", stiffness: barStiffness, damping: barDamping } });
    controls.start({ d: getPendulumPath(0), transition: { type: "spring", stiffness: barStiffness, damping: barDamping } });
    
    setAngle(0);

    // **Start timeout to resume idle animation**
    idleTimeoutRef.current = setTimeout(() => {
      startIdleAnimation();
    }, idleTimeout);
  };

  useEffect(() => {
    startIdleAnimation();
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      onMouseMove={handleHover}
      onMouseLeave={handleHoverEnd}
      style={{ width: 2 * ballRadius, height: barLength + ballRadius }}
    >
      <motion.svg
        width={ ballRadius * 2 }
        height={ (barLength + ballRadius) * 2 }
        overflow={"visible"}
        viewBox={`0 0 ${ballRadius * 2} ${(barLength + ballRadius) * 2}`}
        style={{ originX: "50%", originY: "0%" }}
        animate={pendulumControls}
      >
        {/* Path untuk batang pendulum yang melengkung */}
        <motion.path
          d={getPendulumPath(angle)}
          stroke={barColor}
          strokeWidth={barWidth}
          fill="transparent"
          animate={controls}
        />
        {/* **Bola dipindahkan ke atas (cy = 10) ** */}
        {ballSVG ? (
          <foreignObject
            x={ballRadius - ballRadius} 
            y={ballRadius - ballRadius} 
            width={ballRadius * 2}
            height={ballRadius * 2}
          >
            {ballSVG}
          </foreignObject>
        ) : (
          // Default Circle
          <circle cx={ballRadius} cy={ballRadius} r={ballRadius} fill={ballColor} />
        )}
      </motion.svg>
    </motion.div>
  );
}