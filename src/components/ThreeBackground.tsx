
import { useRef, useMemo, Suspense } from "react"
import { useFrame, Canvas } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"
import { useThemeManager } from "@/hooks/useThemeManager"

function StarField() {
  const { getCurrentThemeData } = useThemeManager()
  const currentTheme = getCurrentThemeData()
  
  const starsRef = useRef<THREE.Points>(null)
  const brightStarsRef = useRef<THREE.Points>(null)
  const distantStarsRef = useRef<THREE.Points>(null)

  // Generate star positions using useMemo to prevent recreation on every render
  const starData = useMemo(() => {
    const radius = 5
    const mainStars = new Float32Array(8000 * 3)
    const brightStars = new Float32Array(300 * 3)
    const distantStars = new Float32Array(12000 * 3)

    // Generate main stars
    for (let i = 0; i < mainStars.length; i += 3) {
      const spherical = {
        radius: radius * (0.3 + Math.random() * 0.8),
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
      }
      mainStars[i] = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
      mainStars[i + 1] = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta)
      mainStars[i + 2] = spherical.radius * Math.cos(spherical.phi)
    }

    // Generate bright stars
    for (let i = 0; i < brightStars.length; i += 3) {
      const spherical = {
        radius: radius * (0.4 + Math.random() * 0.6),
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
      }
      brightStars[i] = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
      brightStars[i + 1] = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta)
      brightStars[i + 2] = spherical.radius * Math.cos(spherical.phi)
    }

    // Generate distant stars
    for (let i = 0; i < distantStars.length; i += 3) {
      const spherical = {
        radius: radius * (0.8 + Math.random() * 0.5),
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
      }
      distantStars[i] = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
      distantStars[i + 1] = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta)
      distantStars[i + 2] = spherical.radius * Math.cos(spherical.phi)
    }

    return { mainStars, brightStars, distantStars }
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    if (starsRef.current) {
      starsRef.current.rotation.x -= delta / 50
      starsRef.current.rotation.y -= delta / 60
      starsRef.current.rotation.z -= delta / 100
    }

    if (brightStarsRef.current) {
      brightStarsRef.current.rotation.x -= delta / 30
      brightStarsRef.current.rotation.y -= delta / 35
      brightStarsRef.current.rotation.z += delta / 70
    }

    if (distantStarsRef.current) {
      distantStarsRef.current.rotation.x -= delta / 80
      distantStarsRef.current.rotation.y -= delta / 100
      distantStarsRef.current.rotation.z -= delta / 150
    }
  })

  return (
    <group>
      {/* Distant background stars */}
      <Points ref={distantStarsRef} positions={starData.distantStars} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={currentTheme?.colors.secondary || '#3f51b5'}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      {/* Main star field */}
      <Points ref={starsRef} positions={starData.mainStars} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={currentTheme?.colors.primary || '#7c4dff'}
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>

      {/* Bright hero stars */}
      <Points ref={brightStarsRef} positions={starData.brightStars} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={currentTheme?.colors.primaryContainer || '#b388ff'}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={1.0}
        />
      </Points>
    </group>
  )
}

// Fallback component for when WebGL fails
function FallbackBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-variant opacity-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,77,255,0.1),transparent_50%)]" />
    </div>
  )
}

export default function ThreeBackground() {
  return (
    <Suspense fallback={<FallbackBackground />}>
      <StarField />
    </Suspense>
  )
}
