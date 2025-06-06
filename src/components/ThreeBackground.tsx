
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"
import { useThemeManager } from "@/hooks/useThemeManager"

export default function ThreeBackground() {
  const { getCurrentThemeData } = useThemeManager()
  const currentTheme = getCurrentThemeData()
  
  const starsRef = useRef<THREE.Points>(null)
  const brightStarsRef = useRef<THREE.Points>(null)
  const distantStarsRef = useRef<THREE.Points>(null)
  const nebulaRef = useRef<THREE.Points>(null)

  // Generate massive star field with multiple layers
  const starLayers = {
    main: { positions: new Float32Array(15000 * 3) },
    bright: { positions: new Float32Array(500 * 3) },
    distant: { positions: new Float32Array(20000 * 3) },
    nebula: { positions: new Float32Array(3000 * 3) },
  }

  // Generate star positions
  const radius = 5

  // Main stars
  for (let i = 0; i < starLayers.main.positions.length; i += 3) {
    const spherical = {
      radius: radius * (0.3 + Math.random() * 0.8),
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
    }
    starLayers.main.positions[i] = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
    starLayers.main.positions[i + 1] = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta)
    starLayers.main.positions[i + 2] = spherical.radius * Math.cos(spherical.phi)
  }

  // Bright stars
  for (let i = 0; i < starLayers.bright.positions.length; i += 3) {
    const spherical = {
      radius: radius * (0.4 + Math.random() * 0.6),
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
    }
    starLayers.bright.positions[i] = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
    starLayers.bright.positions[i + 1] = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta)
    starLayers.bright.positions[i + 2] = spherical.radius * Math.cos(spherical.phi)
  }

  // Distant stars
  for (let i = 0; i < starLayers.distant.positions.length; i += 3) {
    const spherical = {
      radius: radius * (0.8 + Math.random() * 0.5),
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
    }
    starLayers.distant.positions[i] = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
    starLayers.distant.positions[i + 1] = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta)
    starLayers.distant.positions[i + 2] = spherical.radius * Math.cos(spherical.phi)
  }

  // Nebula particles
  for (let i = 0; i < starLayers.nebula.positions.length; i += 3) {
    const spherical = {
      radius: radius * (0.6 + Math.random() * 0.4),
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
    }
    starLayers.nebula.positions[i] = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
    starLayers.nebula.positions[i + 1] = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta)
    starLayers.nebula.positions[i + 2] = spherical.radius * Math.cos(spherical.phi)
  }

  // Enhanced animation with theme-responsive effects
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    if (starsRef.current) {
      starsRef.current.rotation.x -= delta / 50
      starsRef.current.rotation.y -= delta / 60
      starsRef.current.rotation.z -= delta / 100

      const material = starsRef.current.material as THREE.PointsMaterial
      if (material) {
        material.opacity = 0.8 + Math.sin(time * 1.5) * 0.2
      }
    }

    if (brightStarsRef.current) {
      brightStarsRef.current.rotation.x -= delta / 30
      brightStarsRef.current.rotation.y -= delta / 35
      brightStarsRef.current.rotation.z += delta / 70

      const material = brightStarsRef.current.material as THREE.PointsMaterial
      if (material) {
        material.opacity = 0.9 + Math.sin(time * 2.5 + 1) * 0.3
      }
    }

    if (distantStarsRef.current) {
      distantStarsRef.current.rotation.x -= delta / 80
      distantStarsRef.current.rotation.y -= delta / 100
      distantStarsRef.current.rotation.z -= delta / 150

      const material = distantStarsRef.current.material as THREE.PointsMaterial
      if (material) {
        material.opacity = 0.5 + Math.sin(time * 0.8 + 2) * 0.15
      }
    }

    if (nebulaRef.current) {
      nebulaRef.current.rotation.x += delta / 120
      nebulaRef.current.rotation.y -= delta / 180
      nebulaRef.current.rotation.z += delta / 250

      const material = nebulaRef.current.material as THREE.PointsMaterial
      if (material) {
        material.opacity = 0.3 + Math.sin(time * 0.5) * 0.1
      }
    }
  })

  return (
    <group>
      {/* Nebula background */}
      <Points ref={nebulaRef} positions={starLayers.nebula.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={currentTheme?.colors.tertiaryContainer || '#9c27b0'}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.2}
        />
      </Points>

      {/* Distant background stars */}
      <Points ref={distantStarsRef} positions={starLayers.distant.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={currentTheme?.colors.secondary || '#3f51b5'}
          size={0.001}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      {/* Main star field */}
      <Points ref={starsRef} positions={starLayers.main.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={currentTheme?.colors.primary || '#7c4dff'}
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>

      {/* Bright hero stars */}
      <Points ref={brightStarsRef} positions={starLayers.bright.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={currentTheme?.colors.primaryContainer || '#b388ff'}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={1.0}
        />
      </Points>
    </group>
  )
}
