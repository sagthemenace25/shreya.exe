import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function Sculpture() {
  const mesh = useRef()
  const group = useRef()
  useFrame((state, delta) => {
    if (!mesh.current || !group.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.x += delta * 0.12
    mesh.current.rotation.y += delta * 0.18
    group.current.rotation.z = Math.sin(t * 0.22) * 0.12
    group.current.position.y = Math.sin(t * 0.7) * 0.12
    const x = (state.pointer.x || 0) * 0.18
    const y = (state.pointer.y || 0) * 0.12
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y, 0.025)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.025)
  })
  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.5}>
        <mesh ref={mesh} scale={1.55}>
          <icosahedronGeometry args={[1, 5]} />
          <MeshDistortMaterial color="#b8a9dc" metalness={0.78} roughness={0.16} distort={0.34} speed={1.7} />
        </mesh>
      </Float>
      <mesh rotation={[0.9, 0.2, 0.4]} scale={2.18}>
        <torusGeometry args={[1, 0.012, 16, 220]} />
        <meshStandardMaterial color="#e4dafa" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh rotation={[1.4, 0.5, -0.6]} scale={2.42}>
        <torusGeometry args={[1, 0.007, 12, 220]} />
        <meshStandardMaterial color="#8e7bb9" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  )
}

export default function Scene() {
  return (
    <div className="scene-wrap" aria-label="An animated lavender metallic sculpture">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 3, 4]} intensity={28} color="#d8c9ff" />
        <pointLight position={[-4, -2, 1]} intensity={18} color="#8c79c1" />
        <Suspense fallback={null}>
          <Sculpture />
          <Sparkles count={95} scale={7} size={1.8} speed={0.24} color="#cfc1f1" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}