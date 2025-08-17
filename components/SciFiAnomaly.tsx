'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SciFiAnomalyProps {
  audioLevel: number;
  beatIntensity: number;
  rotationSpeed: number;
  resolution: number;
  distortion: number;
  audioReactivity: number;
}

export function SciFiAnomaly({ 
  audioLevel, 
  beatIntensity,
  rotationSpeed, 
  resolution, 
  distortion, 
  audioReactivity 
}: SciFiAnomalyProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(0);
  const smoothedLevelRef = useRef(0);
  const smoothedBeatRef = useRef(0);
  const beatPhaseRef = useRef(0);
  const lastLevelRef = useRef(0);

  // Create geometry based on resolution
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, Math.max(1, Math.floor(resolution / 8)));
  }, [resolution]);

  // Shader material for the main anomaly
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xff4e42) },
        audioLevel: { value: 0 },
        beatIntensity: { value: 0 },
        smoothedLevel: { value: 0 },
        smoothedBeat: { value: 0 },
        beatPhase: { value: 0 },
        distortion: { value: distortion }
      },
      vertexShader: `
        uniform float time;        
        uniform float audioLevel;  
        uniform float beatIntensity; 
        uniform float smoothedLevel; 
        uniform float smoothedBeat; 
        uniform float beatPhase; 
        uniform float distortion;
        varying vec3 vNormal; 
        varying vec3 vPosition; 
        varying float vBeatEffect; 
        
        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          i = mod289(i);
          vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }
        
        void main(){
          vNormal = normalize(normalMatrix * normal);
          vec3 basePos = position;
          float r = length(basePos);
          float t = time * 0.6;
          // Multi-octave noise (fbm)
          float n1 = snoise(basePos * 0.6 + vec3(0.0,0.0,t));
            float n2 = snoise(basePos * 1.2 + vec3(0.0,0.0,t*1.3));
            float n3 = snoise(basePos * 2.1 + vec3(0.0,0.0,t*1.7));
          float fbm = (n1*0.55 + n2*0.3 + n3*0.15);
          // Radial traveling wave synced with beat phase
          float wave = sin(r*3.5 - beatPhase*2.2) * smoothedBeat * 0.28;
          float subtleWave = sin(r*7.0 + t*1.2) * smoothedLevel * 0.08;
          float displacement = (fbm * 0.35 * distortion * (1.0 + smoothedLevel*0.9)) + wave + subtleWave;
          // Gentle breathing independent of beats
          displacement += 0.05 * sin(t*0.8) * (0.5 + smoothedLevel*0.5);
          vec3 displaced = basePos + normalize(basePos) * displacement;
          // Beat pulse scale (smoothed)
          float beatScale = 1.0 + smoothedBeat * 0.22;
          displaced *= beatScale;
          vBeatEffect = smoothedBeat;
          vPosition = displaced;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced,1.0);
        }
      `,
      fragmentShader: `
        uniform float time; 
        uniform vec3 color; 
        uniform float smoothedLevel; 
        uniform float smoothedBeat; 
        varying vec3 vNormal; 
        varying vec3 vPosition; 
        varying float vBeatEffect; 
        void main(){
          vec3 V = normalize(cameraPosition - vPosition);
          float fres = 1.0 - max(0.0, dot(V, normalize(vNormal)));
          fres = pow(fres, 2.2 + smoothedLevel*2.5);
          float wavePulse = 0.6 + 0.4 * sin(time*1.6 + smoothedBeat*3.0);
          vec3 beatCol = mix(color, vec3(1.0,0.75,0.4), smoothedBeat*0.65);
          vec3 finalCol = beatCol * fres * wavePulse * (1.0 + smoothedLevel*0.9 + smoothedBeat*1.3);
          float alpha = fres * (0.55 + smoothedBeat*0.25) * (1.0 - smoothedLevel*0.15);
          gl_FragColor = vec4(finalCol, alpha);
        }
      `,
      wireframe: true,
      transparent: true
    });
  }, [distortion]);

  // Glow material
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xff4e42) },
        audioLevel: { value: 0 },
        beatIntensity: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float audioLevel;
        uniform float beatIntensity;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          
          // Scale glow effect based on beat intensity
          float scaleFactor = 1.0 + audioLevel * 0.2 + beatIntensity * 0.4;
          vPosition = position * scaleFactor;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 color;
        uniform float time;
        uniform float audioLevel;
        uniform float beatIntensity;
        
        void main() {
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
          fresnel = pow(fresnel, 3.0 + audioLevel * 3.0);
          
          float pulse = 0.5 + 0.5 * sin(time * 2.0);
          float audioFactor = 1.0 + audioLevel * 3.0 + beatIntensity * 5.0;
          
          // Beat color flash
          vec3 beatColor = vec3(0.8, 0.8, 0.8); // Light gray for beat flash
          vec3 finalColor = mix(color, beatColor, beatIntensity * 0.6) * fresnel * (0.8 + 0.2 * pulse) * audioFactor;
          
          float alpha = fresnel * (0.3 * audioFactor) * (1.0 - audioLevel * 0.2 + beatIntensity * 0.4);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    clockRef.current += delta;
    // Exponential smoothing factors
    const levelTarget = audioLevel;
    const beatTarget = beatIntensity;
    const levelSmoothFactor = 1.0 - Math.pow(0.001, delta); // frame-rate independent
    const beatSmoothFactor = 1.0 - Math.pow(0.0005, delta);
    smoothedLevelRef.current += (levelTarget - smoothedLevelRef.current) * levelSmoothFactor;
    smoothedBeatRef.current += (beatTarget - smoothedBeatRef.current) * beatSmoothFactor;
    // Beat phase advances faster on stronger beats creating traveling waves
    beatPhaseRef.current += delta * (0.6 + smoothedBeatRef.current * 3.5);

    if (meshRef.current && material.uniforms) {
      material.uniforms.time.value = clockRef.current;
      material.uniforms.audioLevel.value = audioLevel;
      material.uniforms.beatIntensity.value = beatIntensity;
      material.uniforms.smoothedLevel.value = smoothedLevelRef.current;
      material.uniforms.smoothedBeat.value = smoothedBeatRef.current;
      material.uniforms.beatPhase.value = beatPhaseRef.current;
      material.uniforms.distortion.value = distortion;

      const audioRotationFactor = 1 + smoothedLevelRef.current * audioReactivity;
      const beatRotationBoost = 1 + smoothedBeatRef.current * 2.2; 
      meshRef.current.rotation.y += 0.0045 * rotationSpeed * audioRotationFactor * beatRotationBoost;
      meshRef.current.rotation.z += 0.0018 * rotationSpeed * audioRotationFactor * beatRotationBoost;

      const targetScale = 1 + smoothedBeatRef.current * 0.25 + smoothedLevelRef.current * 0.05;
      const currentScale = meshRef.current.scale.x;
      const scaleLerp = 1.0 - Math.pow(0.002, delta);
      const newScale = currentScale + (targetScale - currentScale) * scaleLerp;
      meshRef.current.scale.setScalar(newScale);
    }

    if (glowRef.current && glowMaterial.uniforms) {
      glowMaterial.uniforms.time.value = clockRef.current;
      glowMaterial.uniforms.audioLevel.value = smoothedLevelRef.current;
      glowMaterial.uniforms.beatIntensity.value = smoothedBeatRef.current;

      const targetGlowScale = 1 + smoothedBeatRef.current * 0.18 + smoothedLevelRef.current * 0.04;
      const currentGlowScale = glowRef.current.scale.x;
      const scaleLerpG = 1.0 - Math.pow(0.0025, delta);
      const newGlowScale = currentGlowScale + (targetGlowScale - currentGlowScale) * scaleLerpG;
      glowRef.current.scale.setScalar(newGlowScale);
    }
  });

  return (
    <group>
      {/* Main wireframe anomaly */}
      <mesh ref={meshRef} geometry={geometry} material={material as any} />
      
      {/* Glow effect */}
      <mesh ref={glowRef} material={glowMaterial as any}>
        <sphereGeometry args={[2.4, 32, 32]} />
      </mesh>
    </group>
  );
}
