"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import s from "./BackgroundCanvas.module.scss";
import { Vector2, Color } from "three";
import fragmentShader from "@/components/BackgroundCanvas/fragmentShader";
import vertexShader from "@/components/BackgroundCanvas/vertexShader";
import { OrbitControls, Text } from "@react-three/drei";

const Gradient = () => {
  // let colors = require('nice-color-palettes');
  // let ind = Math.floor(Math.random() * colors.length);
  // let palette = colors[ind];
  // console.log(colors[ind])
  let palette = ["#5e9fa3", "#dcd1b4", "#fab87f", "#f87e7b", "#b05574"];
  //palette = ['#5e9fa3', '#ffae00ff', '#fab87f', '#f87e7b', '#b05574'];
  //palette = ['#5e9fa3', '#ffea2f', '#fab87f', '#f87e7b', '#b05574'];

  let paletteColorObjects = palette.map((color: string) => new Color(color));

  // This reference will give us direct access to the mesh
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

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    //const { clock } = state;
    if (mesh.current?.material) {
      const meshMaterial = mesh.current.material as THREE.ShaderMaterial;
      let storedTime = JSON.parse(sessionStorage.getItem("u_time") || "0");
      meshMaterial.uniforms.u_time.value = storedTime + 0.0002;
      sessionStorage.setItem(
        "u_time",
        JSON.stringify(meshMaterial.uniforms.u_time.value),
      );
      meshMaterial.uniforms.u_mouse.value = new Vector2(
        mousePosition.current.x,
        mousePosition.current.y,
      );
    }
  });

  // TODO:
  /*
   * 1. Create a NEW canvas, that sits in the background
   * 2. This canvas has different shaders/vertexes
   * 3. its larger but sits behind
   * 4. only has a gradient, doesn't warp
   */
  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
      <planeGeometry args={[1.5, 1.5, 100, 100]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

const BackgroundCanvas = () => {
  // TODO:
  // 1. Gradient will control the background on different pages
  // 2. Client page etc

  // const [gradientColors, setGradientColors] = useState([]);
  //
  // useEffect(() => {
  //   const colors = require('nice-color-palettes');
  //   const ind = Math.floor(Math.random() * colors.length);
  //   const palette = ['#0083A4FF', '#AA1851FF','#AA1851FF', '#0083A4FF'].reverse();
  //   setGradientColors(palette);
  // }, []);

  return (
    <div className={s.backgroundCanvas}>
      <Canvas camera={{ position: [0.0, 0.0, 0.2] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
        <Gradient />
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;
