import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

function Pencil({ position }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.55) * 0.12 - 0.48
      ref.current.rotation.y += delta * 0.12
    }
  })
  return (
    <Float speed={1.35} rotationIntensity={0.2} floatIntensity={0.55}>
      <group ref={ref} position={position} scale={0.72}>
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 1.25, 12]} />
          <meshPhysicalMaterial color="#c9b7ec" metalness={0.72} roughness={0.22} clearcoat={1} />
        </mesh>
        <mesh position={[0, 1.12, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.075, 0.2, 12]} />
          <meshStandardMaterial color="#eadfff" metalness={0.5} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.235, 0]}>
          <coneGeometry args={[0.018, 0.09, 8]} />
          <meshStandardMaterial color="#282332" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.17, 0]}>
          <cylinderGeometry args={[0.078, 0.078, 0.16, 16]} />
          <meshStandardMaterial color="#a99acb" metalness={0.85} roughness={0.18} />
        </mesh>
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.08, 16]} />
          <meshStandardMaterial color="#e8d8ef" metalness={0.25} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

function Guitar({ position }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.42) * 0.08 + 0.2
    ref.current.rotation.y += delta * 0.08
  })
  return (
    <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.48}>
      <group ref={ref} position={position} scale={0.57} rotation={[0.15, 0.1, 0.25]}>
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.62, 40, 32]} />
          <meshPhysicalMaterial color="#9b79bd" metalness={0.55} roughness={0.22} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0.1, 0.02]} scale={[0.78, 0.68, 0.72]}>
          <sphereGeometry args={[0.55, 40, 32]} />
          <meshPhysicalMaterial color="#c7a8df" metalness={0.48} roughness={0.2} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0.52, 0.02]} scale={[0.48, 0.55, 0.72]}>
          <sphereGeometry args={[0.48, 40, 32]} />
          <meshPhysicalMaterial color="#b28dce" metalness={0.52} roughness={0.2} clearcoat={1} />
        </mesh>
        <mesh position={[0, 1.34, 0]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.16, 1.75, 0.13]} />
          <meshStandardMaterial color="#d7c5ee" metalness={0.75} roughness={0.22} />
        </mesh>
        <mesh position={[0, 2.28, 0]}>
          <boxGeometry args={[0.3, 0.42, 0.16]} />
          <meshPhysicalMaterial color="#a99acb" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.12, 0.405]}>
          <circleGeometry args={[0.19, 40]} />
          <meshStandardMaterial color="#282333" metalness={0.3} roughness={0.4} />
        </mesh>
        {[ -0.055, -0.018, 0.018, 0.055 ].map((x) => (
          <mesh key={x} position={[x, 0.88, 0.095]}>
            <boxGeometry args={[0.009, 2.65, 0.009]} />
            <meshStandardMaterial color="#f5efff" metalness={0.9} roughness={0.18} />
          </mesh>
        ))}
        {[-0.22, -0.11, 0, 0.11, 0.22].map((y) => (
          <mesh key={y} position={[0, 1.34 + y, 0.09]}>
            <boxGeometry args={[0.17, 0.012, 0.012]} />
            <meshStandardMaterial color="#8c79ad" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Globe({ position }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.18
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })
  return (
    <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.42}>
      <group ref={ref} position={position} scale={0.62}>
        <mesh>
          <sphereGeometry args={[0.72, 48, 48]} />
          <meshPhysicalMaterial color="#9885c3" metalness={0.42} roughness={0.28} clearcoat={1} />
        </mesh>
        {Array.from({ length: 5 }, (_, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, (i - 2) * 0.34]}>
            <torusGeometry args={[0.724, 0.008, 8, 96]} />
            <meshStandardMaterial color="#e8dcff" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 4, Math.PI / 2]}>
            <torusGeometry args={[0.724, 0.007, 8, 96, Math.PI]} />
            <meshStandardMaterial color="#c9b8eb" metalness={0.9} roughness={0.22} />
          </mesh>
        ))}
        <mesh rotation={[0.4, 0.2, -0.5]}>
          <torusGeometry args={[0.91, 0.012, 8, 120]} />
          <meshStandardMaterial color="#f0e8ff" metalness={1} roughness={0.16} />
        </mesh>
      </group>
    </Float>
  )
}

function Sculpture() {
  const blob = useRef()
  const group = useRef()
  const satellite = useRef()
  const knot = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (blob.current) {
      blob.current.rotation.x += delta * 0.09
      blob.current.rotation.y += delta * 0.14
    }
    if (group.current) {
      group.current.rotation.z = Math.sin(t * 0.2) * 0.1
      group.current.position.y = Math.sin(t * 0.55) * 0.12
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.16, 0.025)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.2, 0.025)
    }
    if (satellite.current) {
      satellite.current.position.x = Math.cos(t * 0.42) * 2.25
      satellite.current.position.y = Math.sin(t * 0.42) * 1.35
      satellite.current.position.z = Math.sin(t * 0.7) * 0.5
    }
    if (knot.current) {
      knot.current.rotation.x += delta * 0.12
      knot.current.rotation.y -= delta * 0.16
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.15} rotationIntensity={0.16} floatIntensity={0.42}>
        <mesh ref={blob} scale={1.48}>
          <sphereGeometry args={[1, 128, 128]} />
          <MeshDistortMaterial color="#b9a9df" metalness={0.88} roughness={0.12} distort={0.48} speed={1.35} />
        </mesh>
      </Float>
      <mesh rotation={[0.9, 0.2, 0.4]} scale={2.12}>
        <torusGeometry args={[1, 0.012, 20, 320]} />
        <meshStandardMaterial color="#eee5ff" metalness={1} roughness={0.16} />
      </mesh>
      <mesh rotation={[1.4, 0.5, -0.6]} scale={2.38}>
        <torusGeometry args={[1, 0.008, 16, 320]} />
        <meshStandardMaterial color="#8f7cbd" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh ref={knot} position={[-2.05, -1.1, -0.5]} scale={0.28}>
        <torusKnotGeometry args={[0.72, 0.2, 160, 20, 2, 5]} />
        <meshPhysicalMaterial color="#d8c9fa" metalness={0.82} roughness={0.18} clearcoat={1} />
      </mesh>
      <mesh ref={satellite} scale={0.2}>
        <icosahedronGeometry args={[1, 4]} />
        <meshPhysicalMaterial color="#f0eaff" metalness={0.72} roughness={0.1} clearcoat={1} />
      </mesh>
      <Float speed={2} floatIntensity={0.7}>
        <mesh position={[2.15, 1.35, -0.65]} scale={0.13}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial color="#a99acb" metalness={0.6} roughness={0.08} />
        </mesh>
      </Float>
      <Pencil position={[2.45, 1.35, 0.3]} />
      <Guitar position={[2.55, -1.55, 0.25]} />
      <Globe position={[-2.5, 1.45, -0.35]} />
    </group>
  )
}

function ParticleField() {
  const points = useRef()
  const positions = useMemo(() => {
    const values = new Float32Array(420 * 3)
    for (let i = 0; i < 420; i++) {
      const radius = 2.8 + Math.random() * 3.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      values[i * 3 + 2] = radius * Math.cos(phi)
    }
    return values
  }, [])
  useFrame((state, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.012
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, state.pointer.y * 0.035, 0.02)
  })
  return <points ref={points}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#cbbcf0" size={0.018} transparent opacity={0.7} sizeAttenuation />
  </points>
}

export function MiniObject({ type }) {
  const object = type === 'pencil'
    ? <Pencil position={[0, -0.45, 0]} />
    : type === 'guitar'
      ? <Guitar position={[0, -0.8, 0]} />
      : <Globe position={[0, 0, 0]} />
  return <div className="mini-object" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 4.2], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.1} />
      <pointLight position={[3, 3, 4]} intensity={22} color="#e4d6ff" />
      <pointLight position={[-3, -2, 2]} intensity={12} color="#8c79c1" />
      <Suspense fallback={null}>{object}</Suspense>
    </Canvas>
  </div>
}

export default function Scene() {
  return (
    <div className="scene-wrap" aria-label="An animated lavender liquid-metal sculpture with a floating pencil, guitar and globe">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} performance={{ min: 0.55 }}>
        <ambientLight intensity={0.75} />
        <pointLight position={[4, 3, 4]} intensity={32} color="#e4d6ff" />
        <pointLight position={[-4, -2, 1]} intensity={22} color="#8c79c1" />
        <pointLight position={[0, 4, -3]} intensity={14} color="#c6e0ff" />
        <Suspense fallback={null}>
          <Sculpture />
          <ParticleField />
          <Sparkles count={110} scale={8} size={2} speed={0.22} color="#d8cbff" />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
