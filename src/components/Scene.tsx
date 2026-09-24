import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Html, OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Component, Suspense, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

/* ============================================================
   Procedural texture helpers (generated at runtime — no assets)
   ============================================================ */

function makePcbTexture(accent: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 340;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0c3a2b";
  ctx.fillRect(0, 0, 512, 340);
  for (let i = 0; i < 1100; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.028})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 340, 1.4, 1.4);
  }
  ctx.strokeStyle = "rgba(52, 168, 110, 0.9)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 14; i++) {
    const y = 24 + i * 22;
    ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(110 + Math.random() * 90, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(300, y); ctx.lineTo(430 + Math.random() * 60, y); ctx.stroke();
  }
  ctx.fillStyle = "#d4af37";
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.arc(30 + Math.random() * 450, 20 + Math.random() * 300, 3.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(226,232,240,.9)";
  ctx.font = "bold 26px monospace";
  ctx.fillText("FIRAS-32", 30, 62);
  ctx.font = "13px monospace";
  ctx.fillText("PFE BOARD · REV B", 30, 84);
  ctx.fillText("CAN · UART · I2C · SPI", 300, 320);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.strokeRect(360, 30, 120, 70);
  ctx.fillStyle = accent;
  ctx.font = "bold 15px monospace";
  ctx.fillText("RF", 405, 72);
  for (const [x, y] of [[18, 18], [494, 18], [18, 322], [494, 322]] as [number, number][]) {
    ctx.fillStyle = "#04150e";
    ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(226,232,240,.5)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function makeChipTexture(label: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0a0a10";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(255,255,255,.07)";
  ctx.strokeRect(10, 10, 236, 236);
  ctx.fillStyle = "#b8c0cc";
  ctx.font = "bold 33px monospace";
  ctx.textAlign = "center";
  ctx.fillText(label, 128, 116);
  ctx.font = "17px monospace";
  ctx.fillStyle = "#5b6572";
  ctx.fillText("ARM CORTEX-M4", 128, 150);
  ctx.fillText("LQFP-64", 128, 176);
  ctx.fillStyle = "#9aa4b2";
  ctx.beginPath(); ctx.arc(34, 34, 7, 0, Math.PI * 2); ctx.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeScreenTexture(title: string, lines: string[], accent = "#67e8f9"): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 160;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#020d16";
  ctx.fillRect(0, 0, 256, 160);
  ctx.fillStyle = "rgba(103,232,249,0.05)";
  for (let y = 0; y < 160; y += 4) ctx.fillRect(0, y, 256, 1);
  ctx.fillStyle = accent;
  ctx.font = "bold 15px monospace";
  ctx.fillText(title, 12, 22);
  ctx.fillRect(12, 28, 232, 2);
  ctx.font = "12px monospace";
  ctx.fillStyle = "#a5f3fc";
  lines.forEach((line, i) => ctx.fillText(line, 12, 54 + i * 21));
  lines.forEach((_, i) => {
    const w = 26 + ((i * 41) % 58);
    ctx.globalAlpha = 0.7;
    ctx.fillRect(256 - 14 - w, 46 + i * 21, w, 8);
    ctx.globalAlpha = 1;
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeTagTexture(text: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 96;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 96);
  ctx.strokeStyle = "rgba(30,41,59,.95)";
  ctx.lineWidth = 5;
  const r = 16;
  ctx.beginPath();
  ctx.moveTo(10 + r, 8);
  ctx.lineTo(246 - r, 8); ctx.quadraticCurveTo(248, 8, 248, 10 + r);
  ctx.lineTo(248, 86 - r); ctx.quadraticCurveTo(248, 88, 246 - r, 88);
  ctx.lineTo(10 + r, 88); ctx.quadraticCurveTo(8, 88, 8, 86 - r);
  ctx.lineTo(8, 10 + r); ctx.quadraticCurveTo(8, 8, 10 + r, 8);
  ctx.stroke();
  ctx.fillStyle = "#334155";
  ctx.font = "bold 32px monospace";
  ctx.textAlign = "center";
  ctx.fillText(text, 128, 60);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeLeafTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 128; c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 256, 0, 0);
  g.addColorStop(0, "#1d5c2e");
  g.addColorStop(1, "#45a658");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(64, 250);
  ctx.bezierCurveTo(8, 190, 8, 90, 64, 6);
  ctx.bezierCurveTo(120, 90, 120, 190, 64, 250);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.28)";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(64, 240); ctx.lineTo(64, 16); ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ============================================================
   Small animated parts
   ============================================================ */

function BlinkingLed({ position, color, offset = 0, size = 0.034 }: { position: [number, number, number]; color: string; offset?: number; size?: number }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (mat.current) mat.current.emissiveIntensity = 1.4 + Math.sin(state.clock.elapsedTime * 4 + offset) * 1.2;
  });
  return (
    <mesh position={position}>
      <cylinderGeometry args={[size, size, size * 1.5, 14]} />
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={1.4} roughness={0.3} />
    </mesh>
  );
}

function ChaserLed({ position, color, index }: { position: [number, number, number]; color: string; index: number }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    const pulse = Math.max(0, Math.sin(state.clock.elapsedTime * 2.4 - index * 0.55));
    if (mat.current) mat.current.emissiveIntensity = 0.25 + pulse * 2.4;
  });
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.02, 12, 12]} />
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

/* ============================================================
   Realistic procedural components
   ============================================================ */

function DevBoard({ accent = "#22d3ee" }: { accent?: string }) {
  const pcb = useMemo(() => makePcbTexture(accent), [accent]);
  const chip = useMemo(() => makeChipTexture("STM32F4"), []);
  const pins = [-0.18, -0.06, 0.06, 0.18];
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[1.8, 0.07, 1.2]} />
        <meshStandardMaterial color="#123f30" roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.037, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.78, 1.18]} />
        <meshStandardMaterial map={pcb} roughness={0.5} />
      </mesh>
      {/* MCU */}
      <mesh position={[-0.25, 0.08, 0]} castShadow>
        <boxGeometry args={[0.5, 0.075, 0.5]} />
        <meshStandardMaterial color="#0b0b10" roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[-0.25, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.44, 0.44]} />
        <meshStandardMaterial map={chip} roughness={0.3} metalness={0.5} />
      </mesh>
      {pins.map((z) => (
        <group key={z}>
          <mesh position={[-0.54, 0.062, z]}><boxGeometry args={[0.07, 0.022, 0.05]} /><meshStandardMaterial color="#c9ccd4" metalness={0.9} roughness={0.25} /></mesh>
          <mesh position={[0.04, 0.062, z]}><boxGeometry args={[0.07, 0.022, 0.05]} /><meshStandardMaterial color="#c9ccd4" metalness={0.9} roughness={0.25} /></mesh>
        </group>
      ))}
      {/* pin headers */}
      {Array.from({ length: 10 }).map((_, i) => {
        const x = -0.76 + i * 0.169;
        return (
          <group key={i}>
            <mesh position={[x, 0.09, 0.5]} castShadow><boxGeometry args={[0.075, 0.1, 0.075]} /><meshStandardMaterial color="#1a1d24" roughness={0.5} /></mesh>
            <mesh position={[x, 0.148, 0.5]}><boxGeometry args={[0.032, 0.02, 0.032]} /><meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} /></mesh>
            <mesh position={[x, 0.09, -0.5]} castShadow><boxGeometry args={[0.075, 0.1, 0.075]} /><meshStandardMaterial color="#1a1d24" roughness={0.5} /></mesh>
            <mesh position={[x, 0.148, -0.5]}><boxGeometry args={[0.032, 0.02, 0.032]} /><meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} /></mesh>
          </group>
        );
      })}
      {/* USB-C */}
      <mesh position={[0.86, 0.075, 0]} castShadow>
        <boxGeometry args={[0.14, 0.1, 0.34]} />
        <meshStandardMaterial color="#b9bec7" metalness={0.95} roughness={0.3} />
      </mesh>
      {/* crystal */}
      <mesh position={[-0.25, 0.065, -0.36]} castShadow>
        <boxGeometry args={[0.24, 0.055, 0.1]} />
        <meshStandardMaterial color="#c9ccd4" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* electrolytic capacitors */}
      {([[0.45, 0.28], [0.62, 0.28]] as [number, number][]).map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.1, 0]} castShadow><cylinderGeometry args={[0.055, 0.055, 0.13, 20]} /><meshStandardMaterial color="#1d4ed8" roughness={0.4} /></mesh>
          <mesh position={[0, 0.168, 0]}><cylinderGeometry args={[0.052, 0.052, 0.005, 20]} /><meshStandardMaterial color="#c9ccd4" metalness={0.85} roughness={0.3} /></mesh>
        </group>
      ))}
      {/* resistors */}
      {([[-0.72, -0.3], [-0.55, -0.3], [-0.72, 0.12], [0.3, -0.1]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.055, z]}><boxGeometry args={[0.1, 0.035, 0.032]} /><meshStandardMaterial color="#c8a165" roughness={0.6} /></mesh>
      ))}
      <BlinkingLed position={[0.32, 0.075, -0.42]} color="#ef4444" />
      <BlinkingLed position={[0.47, 0.075, -0.42]} color="#34d399" offset={1.6} />
      <BlinkingLed position={[0.62, 0.075, -0.42]} color={accent} offset={3.2} />
    </group>
  );
}

function ServerUnit({ accent = "#60a5fa" }: { accent?: string }) {
  const screen = useMemo(() => makeScreenTexture("FIRAS-DC", ["CPU   42%", "MEM   61%", "NET   1.2k/s", "ALL SYSTEMS GO"]), []);
  const fans = useRef<(THREE.Group | null)[]>([]);
  useFrame((_, d) => fans.current.forEach((f) => f && (f.rotation.y += d * 7)));
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[1.9, 0.55, 1.2]} />
        <meshStandardMaterial color="#151a22" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.605]}>
        <planeGeometry args={[1.86, 0.51]} />
        <meshStandardMaterial color="#0c0f14" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-0.5, 0.03, 0.612]}>
        <planeGeometry args={[0.72, 0.36]} />
        <meshStandardMaterial map={screen} emissive="#67e8f9" emissiveMap={screen} emissiveIntensity={0.85} toneMapped={false} />
      </mesh>
      {[0.3, 0.56, 0.82].map((x) => (
        <mesh key={x} position={[x - 0.1, 0.1, 0.61]}><boxGeometry args={[0.2, 0.1, 0.02]} /><meshStandardMaterial color="#05070b" roughness={0.6} /></mesh>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <ChaserLed key={i} position={[-0.05 + i * 0.15, -0.17, 0.612]} color={i % 2 ? accent : "#34d399"} index={i} />
      ))}
      <mesh position={[-1.03, 0, 0]}><boxGeometry args={[0.09, 0.5, 1.0]} /><meshStandardMaterial color="#232a35" metalness={0.9} roughness={0.3} /></mesh>
      <mesh position={[1.03, 0, 0]}><boxGeometry args={[0.09, 0.5, 1.0]} /><meshStandardMaterial color="#232a35" metalness={0.9} roughness={0.3} /></mesh>
      {[-0.45, 0.45].map((x, i) => (
        <group key={i} position={[x, 0.285, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.19, 0.018, 10, 28]} /><meshStandardMaterial color="#0a0d12" /></mesh>
          <group ref={(el) => { fans.current[i] = el; }} position={[0, 0.005, 0]}>
            <mesh><boxGeometry args={[0.3, 0.012, 0.05]} /><meshStandardMaterial color="#39424f" /></mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}><boxGeometry args={[0.3, 0.012, 0.05]} /><meshStandardMaterial color="#39424f" /></mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

function BatteryPack({ accent = "#a78bfa" }: { accent?: string }) {
  const lcd = useMemo(() => makeScreenTexture("FIRAS-CELL", ["CHARGE   78%", "VOLT     4.02V", "TEMP     31C", "MODE     SOLAR"], "#c4b5fd"), []);
  const wireRed = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.42, 0.1, 0.22), new THREE.Vector3(0.62, 0.02, 0.36), new THREE.Vector3(0.7, 0.12, 0.1),
  ]), []);
  const wireBlack = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.42, 0.1, -0.22), new THREE.Vector3(0.6, 0, -0.38), new THREE.Vector3(0.7, 0.12, -0.1),
  ]), []);
  return (
    <group>
      <mesh position={[0, 0.02, 0]}><boxGeometry args={[0.85, 0.05, 0.8]} /><meshStandardMaterial color="#11161e" roughness={0.5} metalness={0.4} /></mesh>
      {[-0.24, 0, 0.24].map((z, i) => (
        <group key={i} position={[0, 0.14, z]}>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.095, 0.095, 0.62, 24]} />
            <meshStandardMaterial color={i === 1 ? "#0e7490" : "#155e75"} metalness={0.55} roughness={0.35} />
          </mesh>
          <mesh position={[0.31, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.096, 0.096, 0.02, 24]} /><meshStandardMaterial color="#c9ccd4" metalness={0.95} roughness={0.25} /></mesh>
          <mesh position={[0.32, 0, 0]}><sphereGeometry args={[0.04, 12, 12]} /><meshStandardMaterial color="#c9ccd4" metalness={0.95} roughness={0.25} /></mesh>
        </group>
      ))}
      <mesh><tubeGeometry args={[wireRed, 24, 0.015, 8, false]} /><meshStandardMaterial color="#dc2626" roughness={0.6} /></mesh>
      <mesh><tubeGeometry args={[wireBlack, 24, 0.015, 8, false]} /><meshStandardMaterial color="#18181b" roughness={0.6} /></mesh>
      <mesh position={[0, 0.42, -0.5]}>
        <torusGeometry args={[0.3, 0.018, 10, 48, Math.PI * 1.5]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0, 0.42, -0.49]}>
        <planeGeometry args={[0.44, 0.27]} />
        <meshStandardMaterial map={lcd} emissive="#c4b5fd" emissiveMap={lcd} emissiveIntensity={0.7} toneMapped={false} />
      </mesh>
    </group>
  );
}

function SensorModule({ accent = "#34d399" }: { accent?: string }) {
  const tag = useMemo(() => makeTagTexture("SOIL-01"), []);
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.95, 0.55, 0.5]} />
        <meshStandardMaterial color="#e8ecf1" roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.06, 0.251]}><boxGeometry args={[0.95, 0.014, 0.006]} /><meshStandardMaterial color="#c3cad3" /></mesh>
      <mesh position={[0.12, 0.1, 0.252]}>
        <planeGeometry args={[0.42, 0.24]} />
        <meshStandardMaterial color="#1f2937" roughness={0.7} />
      </mesh>
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, cIdx) => (
          <mesh key={`${r}-${cIdx}`} position={[-0.04 + cIdx * 0.08, 0.05 + r * 0.07, 0.256]}>
            <circleGeometry args={[0.014, 10]} />
            <meshStandardMaterial color="#0b1220" />
          </mesh>
        ))
      )}
      {[-0.12, 0.12].map((x) => (
        <group key={x}>
          <mesh position={[x, -0.4, 0]}><cylinderGeometry args={[0.018, 0.014, 0.28, 10]} /><meshStandardMaterial color="#c9ccd4" metalness={0.95} roughness={0.25} /></mesh>
          <mesh position={[x, -0.56, 0]}><coneGeometry args={[0.014, 0.07, 10]} /><meshStandardMaterial color="#9aa2ad" metalness={0.95} roughness={0.3} /></mesh>
        </group>
      ))}
      <BlinkingLed position={[0.38, 0.16, 0.26]} color={accent} size={0.026} />
      <mesh position={[-0.28, 0.14, 0.252]}>
        <planeGeometry args={[0.3, 0.12]} />
        <meshStandardMaterial map={tag} transparent />
      </mesh>
    </group>
  );
}

function Plant() {
  const leaf = useMemo(() => makeLeafTexture(), []);
  return (
    <group position={[0.55, -0.25, 0.25]} scale={0.85}>
      <mesh castShadow position={[0, 0.12, 0]}><cylinderGeometry args={[0.16, 0.12, 0.24, 20]} /><meshStandardMaterial color="#9a4a2f" roughness={0.8} /></mesh>
      <mesh position={[0, 0.245, 0]}><cylinderGeometry args={[0.15, 0.15, 0.02, 20]} /><meshStandardMaterial color="#2a1d14" roughness={1} /></mesh>
      <mesh position={[0, 0.42, 0]}><cylinderGeometry args={[0.018, 0.026, 0.36, 8]} /><meshStandardMaterial color="#3f7a3a" /></mesh>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.11, 0.55 + (i % 3) * 0.035, Math.sin(a) * 0.11]} rotation={[0.55, -a + Math.PI / 2, 0.3]}>
            <planeGeometry args={[0.15, 0.32]} />
            <meshStandardMaterial map={leaf} transparent alphaTest={0.4} side={THREE.DoubleSide} roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}

function Core() {
  const wire = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (wire.current) { wire.current.rotation.y += delta * 0.3; wire.current.rotation.x += delta * 0.12; }
    if (ringA.current) { ringA.current.rotation.z += delta * 0.5; ringA.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.35; }
    if (ringB.current) ringB.current.rotation.z -= delta * 0.35;
    if (inner.current) (inner.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.15 + Math.sin(t * 1.7) * 0.4;
  });
  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.2}>
      <mesh ref={inner}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#22d3ee" emissiveIntensity={1.2} roughness={0.15} />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.9} wireframe transparent opacity={0.7} />
      </mesh>
      <mesh ref={ringA}>
        <torusGeometry args={[1.05, 0.012, 8, 64]} />
        <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ringB} rotation={[-Math.PI / 4, 0.4, 0]}>
        <torusGeometry args={[1.22, 0.008, 8, 64]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.9} />
      </mesh>
      <pointLight color="#22d3ee" intensity={26} distance={10} decay={2} />
    </Float>
  );
}

/* ============================================================
   GLB slot — drop real models in /public/models to auto-upgrade
   ============================================================ */

class GlbBoundary extends Component<{ fallback: ReactNode; children?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function GlbModel({ url, size = 1.7 }: { url: string; size?: number }) {
  const { scene } = useGLTF(url);
  const obj = useMemo(() => scene.clone(true), [scene]);
  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(obj);
    const sV = new THREE.Vector3();
    box.getSize(sV);
    const s = size / (Math.max(sV.x, sV.y, sV.z) || 1);
    obj.scale.setScalar(s);
    const center = box.getCenter(new THREE.Vector3()).multiplyScalar(s);
    obj.position.sub(center);
    obj.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) { mesh.castShadow = true; mesh.receiveShadow = true; }
    });
  }, [obj, size]);
  return <primitive object={obj} />;
}

function OptionalGlb({ url, size, fallback }: { url: string; size?: number; fallback: ReactNode }) {
  return (
    <GlbBoundary key={url} fallback={fallback}>
      <Suspense fallback={fallback}>
        <GlbModel url={url} size={size} />
      </Suspense>
    </GlbBoundary>
  );
}

/* ============================================================
   Station wrapper
   ============================================================ */

type StationProps = {
  position: [number, number, number];
  label: string;
  color: string;
  onSelect: () => void;
  children: ReactNode;
};

function Station({ position, label, color, onSelect, children }: StationProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    const target = hovered ? 1.12 : 1;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, target, delta * 8));
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    >
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.45}>
        {children}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.72, 0]}>
          <ringGeometry args={[0.55, 0.72, 40]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.85 : 0.28} />
        </mesh>
        <Html position={[0, 0.95, 0]} center distanceFactor={7}>
          <button className="scene-label" onClick={onSelect}>{label}</button>
        </Html>
      </Float>
    </group>
  );
}

/* ============================================================
   Scene
   ============================================================ */

export function Scene({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="scene-wrapper">
      <Canvas camera={{ position: [0, 3.6, 8.4], fov: 40 }} dpr={[1, 1.75]}>
        <color attach="background" args={["#050b16"]} />
        <fog attach="fog" args={["#050b16", 10, 26]} />
        <hemisphereLight args={["#7dd3fc", "#0b1220", 0.55]} />
        <directionalLight position={[5, 8, 4]} intensity={2.4} color="#b9e6ff" />
        <pointLight position={[-5, 3, -3]} intensity={30} distance={16} decay={2} color="#2563eb" />
        <pointLight position={[4, 2, 4]} intensity={18} distance={12} decay={2} color="#22d3ee" />
        <Stars radius={38} depth={18} count={1600} factor={2.4} saturation={0} fade />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.37, 0]}>
          <circleGeometry args={[9, 64]} />
          <meshStandardMaterial color="#081426" roughness={0.9} metalness={0.2} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.365, 0]}>
          <ringGeometry args={[6.4, 6.48, 96]} />
          <meshBasicMaterial color="#164e63" transparent opacity={0.6} />
        </mesh>
        <gridHelper args={[20, 20, "#17304b", "#0d1c30"]} position={[0, -1.36, 0]} />
        <ContactShadows position={[0, -1.35, 0]} opacity={0.6} scale={18} blur={2.4} far={3.4} resolution={512} color="#010b14" />
        <Core />
        <Station position={[-2.9, 0.15, 0.3]} label="EMBEDDED / STM32" color="#22d3ee" onSelect={() => onSelect("embedded")}>
          <OptionalGlb url="/models/embedded.glb" fallback={<DevBoard accent="#22d3ee" />} />
        </Station>
        <Station position={[2.9, 0.15, 0.3]} label="IOT / AGRICULTURE" color="#34d399" onSelect={() => onSelect("agriculture")}>
          <OptionalGlb url="/models/iot.glb" fallback={<group><SensorModule accent="#34d399" /><Plant /></group>} />
        </Station>
        <Station position={[-2.9, 0.15, -2.9]} label="AI / ENERGY" color="#a78bfa" onSelect={() => onSelect("energy")}>
          <OptionalGlb url="/models/energy.glb" fallback={<BatteryPack accent="#a78bfa" />} />
        </Station>
        <Station position={[2.9, 0.15, -2.9]} label="CLOUD / DEVOPS" color="#60a5fa" onSelect={() => onSelect("cloudstack")}>
          <OptionalGlb url="/models/cloud.glb" fallback={<ServerUnit accent="#60a5fa" />} />
        </Station>
        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={0.7}
          enablePan={false}
          enableDamping
          minDistance={4.5}
          maxDistance={13}
          maxPolarAngle={1.45}
          target={[0, 0.2, -1]}
        />
      </Canvas>
    </div>
  );
}