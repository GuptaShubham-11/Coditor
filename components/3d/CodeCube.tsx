"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, Trail } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

const themeColors = {
    light: { text: "#1A1B26", primary: "#3B82F6", secondary: "#8B5CF6", accent: "#E07A5F" },
    dark: { text: "#E8E9ED", primary: "#3B82F6", secondary: "#8B5CF6", accent: "#E07A5F" }
};

function Cube() {
    const cubeRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.2;
            cubeRef.current.rotation.y = clock.getElapsedTime() * 0.5;
        }
    });

    const texts = ["Collaboration", "Code", "Video Call", "Editor", "</>", "{}"];
    const mode = "dark";

    return (
        <mesh ref={cubeRef}>
            <RoundedBox args={[5, 5, 5]} radius={0.3} smoothness={9}>
                <meshStandardMaterial color="transparent" metalness={0.8} roughness={0.1} emissive="black" />
            </RoundedBox>

            {texts.map((text, index) => {
                const position = new THREE.Vector3();
                const rotation = new THREE.Euler();

                switch (index) {
                    case 0: position.set(0, 0, -2.8); rotation.y = Math.PI; break;
                    case 1: position.set(0, 0, 2.8); break;
                    case 2: position.set(0, 2.8, 0); rotation.x = -Math.PI / 2; break;
                    case 3: position.set(0, -2.8, 0); rotation.x = Math.PI / 2; break;
                    case 4: position.set(2.8, 0, 0); rotation.y = Math.PI / 2; break;
                    case 5: position.set(-2.8, 0, 0); rotation.y = -Math.PI / 2; break;
                }

                return (
                    <Text
                        key={index}
                        position={position}
                        rotation={rotation}
                        fontSize={0.65}
                        color={themeColors[mode].text}
                        outlineColor={themeColors[mode].text}
                        outlineWidth={0.05}
                        anchorX="center"
                        anchorY="middle"
                        fillOpacity={1}
                        textAlign="center"
                    >
                        {text}
                    </Text>
                );
            })}
        </mesh>
    );
}

function OrbitingStar({ radius, speed, height, color, direction }: any) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime() * speed;
            const angle = Math.sin(t * 2) * height;
            const sinT = Math.sin(t);
            const cosT = Math.cos(t);

            switch (direction) {
                case "horizontal":
                    ref.current.position.set(radius * cosT, angle, radius * sinT);
                    break;
                case "vertical":
                    ref.current.position.set(angle, radius * cosT, radius * sinT);
                    break;
                case "diagonal1":
                    ref.current.position.set(radius * cosT, radius * sinT, angle);
                    break;
                case "diagonal2":
                    ref.current.position.set(-radius * cosT, radius * sinT, angle);
                    break;
            }

            ref.current.rotation.x += 0.04;
            ref.current.rotation.y += 0.06;
        }
    });

    return (
        <Trail width={0.45} color={color} length={3} attenuation={(t) => t * t}>
            <mesh ref={ref} position={[radius, 0, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial emissive={color} color="white" />
            </mesh>
        </Trail>
    );
}

export default function CodeCube() {
    return (
        <div className="w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] flex justify-center items-center">
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
                <color attach="transparent" args={["#000000"]} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1.8} color="#ffffff" castShadow />
                <OrbitControls enableZoom={false} enableRotate={true} />
                <EffectComposer>
                    <Bloom intensity={0.7} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
                    <Vignette eskil={false} offset={0.1} darkness={0.5} />
                </EffectComposer>
                <Cube />
                <OrbitingStar radius={4} speed={0.6} height={1} color="#3B82F6" direction="horizontal" />
                <OrbitingStar radius={4} speed={0.35} height={1} color="#8B5CF6" direction="vertical" />
                <OrbitingStar radius={4} speed={0.5} height={1} color="#E07A5F" direction="diagonal1" />
                <OrbitingStar radius={4} speed={0.8} height={1} color="#3B82F6" direction="diagonal2" />
            </Canvas>
        </div>
    );
}
