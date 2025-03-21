"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import s from "./BackgroundCanvas.module.scss";
import { Vector2, Color } from "three";
import fragmentShader from "@/components/BackgroundCanvas/fragmentShader";
import vertexShader from "@/components/BackgroundCanvas/vertexShader";
import { usePathname } from "next/navigation";
import { useColorStore } from "@/stores/colorStore";
import BackgroundGradient from "@/components/BackgroundCanvas/BackgroundGradient";
import { COLOR_GRADIENT } from "@/utils/constants";
import { motion } from "framer-motion";

type BackgroundCanvasProps = {
  palette: string[];
  opacity: number;
  pageClass: string;
};

const Gradient = () => {
  let palette = ["#5e9fa3", "#dcd1b4", "#fab87f", "#f87e7b", "#b05574"];

  let paletteNew = useColorStore((state) => state.colorValues);


  let paletteColorObjects = palette.map((color: string) => new Color(color));
  let paletteColorObjectsNew = paletteNew.map(
    (color: string) => new Color(color),
  );
  const mesh = useRef<THREE.Mesh | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_Color: { value: paletteColorObjects },
      u_mouse: { value: new Vector2(0, 0) },
    }),
    [],
  );

  const uniformsTest = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_Color: { value: paletteColorObjectsNew },
      u_mouse: { value: new Vector2(0, 0) },
    }),
    [],
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    if (mesh.current?.material) {
      const meshMaterial = mesh.current.material as THREE.ShaderMaterial;
      meshMaterial.uniforms.u_time.value += 0.0002;
      meshMaterial.uniforms.u_mouse.value = new Vector2(
        mousePosition.current.x,
        mousePosition.current.y,
      );
    }
  });
  return (
    <>
      <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
        <planeGeometry args={[1.5, 1.5, 100, 100]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
    </>
  );
};

const BackgroundCanvas = () => {
  const pathname = usePathname();
  const pageClass = pathname !== "/" ? "darken" : "default";
  let palette = useColorStore((state) => state.colorValues);

  return (
    <>
      <BackgroundCanvasContainer
        palette={pathname.startsWith("/portfolio") ? palette : COLOR_GRADIENT}
        opacity={100}
        pageClass={pageClass}
      />
    </>
  );
};

export const BackgroundCanvasContainer = ({
  palette,
  opacity,
  pageClass,
}: BackgroundCanvasProps) => {
  let gradient = `linear-gradient(${palette[0]}, ${palette[1]}, ${palette[2]}, ${palette[3]}, ${palette[4]})`;
  let color = `${palette[0]}`;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: 0,
        ease: [0.6, 0.01, 0.05, 0.9],
      }}
      className={`${s.backgroundCanvas} ${s[pageClass]} opacity-${opacity}`}
      style={{ background: color }}
    >
      <Canvas camera={{ position: [0.0, 0.0, 0.15] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <BackgroundGradient palette={palette} />
      </Canvas>
    </motion.div>
  );
};

export default BackgroundCanvas;
