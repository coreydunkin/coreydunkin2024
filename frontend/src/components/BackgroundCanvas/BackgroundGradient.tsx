import { useColorStore } from "@/stores/colorStore";
import { Color, Vector2 } from "three";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import fragmentShader from "@/components/BackgroundCanvas/fragmentShader";
import vertexShader from "@/components/BackgroundCanvas/vertexShader";

type Palette = {
  palette: string[];
};

const BackgroundGradient = ({ palette }: Palette) => {
  //let palette = ["#5e9fa3", "#dcd1b4", "#fab87f", "#f87e7b", "#b05574"];
  //let palette = useColorStore((state) => state.colorValues);
  let paletteColorObjects = palette.map((color: string) => new Color(color));

  //let paletteColorObjectsNew = paletteNew.map((color: string) => new Color(color));
  const targetColors = useRef(paletteColorObjects);
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  useEffect(() => {
    targetColors.current = palette.map((color: string) => new Color(color));
  }, [palette]);

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
    if (mesh.current?.material) {
      const meshMaterial = mesh.current.material as THREE.ShaderMaterial;
      meshMaterial.uniforms.u_time.value += 0.0002;
      meshMaterial.uniforms.u_Color.value =
        meshMaterial.uniforms.u_Color.value.map(
          (color: THREE.Color, index: number) => {
            if (color && targetColors.current[index]) {
              return color.lerp(targetColors.current[index], 0.01);
            }
            return color; // fallback
          },
        );
      // meshMaterial.uniforms.u_mouse.value = new Vector2(
      //   mousePosition.current.x,
      //   mousePosition.current.y,
      // );
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

export default BackgroundGradient;
