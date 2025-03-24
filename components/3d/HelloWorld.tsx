"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function TextElement() {
    const textRef = useRef<THREE.Mesh>(null);
    const [textSize, setTextSize] = useState(1.5);

    // Responsive text size
    useEffect(() => {
        const handleResize = () => {
            setTextSize(window.innerWidth < 768 ? 0.5 : 1.5);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Smooth rotation animation
    useFrame(({ clock }) => {
        if (textRef.current) {
            const elapsed = clock.getElapsedTime();
            textRef.current.rotation.y = Math.sin(elapsed * 0.3) * 0.3;
            textRef.current.rotation.x = Math.cos(elapsed * 0.2) * 0.2;
        }
    });

    return (
        <Center>
            <Text3D
                ref={textRef}
                font={"/fonts/Inter_Bold.json"}
                size={textSize}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                Hello!, World
                <meshStandardMaterial
                    color="#00aaff"
                    metalness={0.7}
                    roughness={0.1}
                    emissive="#0044ff"
                    emissiveIntensity={0.5}
                />
            </Text3D>
        </Center>
    );
}

export default function HelloWorld() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="relative w-full h-52 sm:h-60 md:h-72 lg:h-80 !bg-transparent">
            <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
                <OrbitControls enableZoom={false} enableRotate={!isMobile} />
                <TextElement />
            </Canvas>
        </div>
    );
}
