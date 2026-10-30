import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment, Sparkles, MeshTransmissionMaterial } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

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

export default function Scene() {
  return (
    <div className="scene-wrap" aria-label="An animated lavender liquid-metal sculpture">
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
