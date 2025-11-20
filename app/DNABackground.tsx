"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  color: string
  alpha: number
}

interface HelixPoint {
  x: number
  y: number
  z: number
  angle: number
  color: string
}

export default function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let helixPoints: HelixPoint[] = []
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    // Initialize particles for quantum field effect
    const initParticles = () => {
      particles = []
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? "#06b6d4" : "#10b981",
          alpha: Math.random() * 0.5 + 0.3,
        })
      }
    }

    // Initialize DNA helix structure
    const initHelix = () => {
      helixPoints = []
      const helixCount = 3 // Multiple helixes
      const pointsPerHelix = 80

      for (let h = 0; h < helixCount; h++) {
        const offsetX = (canvas.width / (helixCount + 1)) * (h + 1)
        const offsetAngle = (h * Math.PI * 2) / helixCount

        for (let i = 0; i < pointsPerHelix; i++) {
          const t = (i / pointsPerHelix) * Math.PI * 4
          const angle = t + offsetAngle

          helixPoints.push({
            x: offsetX,
            y: (i / pointsPerHelix) * canvas.height,
            z: Math.sin(angle) * 100,
            angle: angle,
            color: i % 2 === 0 ? "#06b6d4" : "#8b5cf6",
          })
        }
      }
    }

    initParticles()
    initHelix()

    const drawParticles = () => {
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0

        // Calculate size based on z-depth
        const scale = 1000 / (1000 + particle.z)
        const size = particle.size * scale

        // Draw particle with glow effect
        ctx.save()
        ctx.globalAlpha = particle.alpha * scale

        // Outer glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 3)
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.fillRect(particle.x - size * 3, particle.y - size * 3, size * 6, size * 6)

        // Core particle
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      // Draw connections between nearby particles
      ctx.strokeStyle = "#06b6d4"
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.save()
            ctx.globalAlpha = (1 - distance / 120) * 0.15
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
    }

    const drawHelix = () => {
      helixPoints.forEach((point, i) => {
        const nextPoint = helixPoints[i + 1]
        if (!nextPoint) return

        // Animate the helix rotation
        const animatedAngle = point.angle + time * 0.001
        const x = point.x + Math.cos(animatedAngle) * (point.z + 50)
        const y = point.y
        const nextX = nextPoint.x + Math.cos(nextPoint.angle + time * 0.001) * (nextPoint.z + 50)
        const nextY = nextPoint.y

        // Calculate depth for 3D effect
        const depth = (Math.sin(animatedAngle) + 1) / 2
        const alpha = 0.3 + depth * 0.4

        // Draw connecting strand
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.strokeStyle = point.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nextX, nextY)
        ctx.stroke()
        ctx.restore()

        // Draw base pair connections (rungs)
        if (i % 4 === 0) {
          const oppositeAngle = animatedAngle + Math.PI
          const oppositeX = point.x + Math.cos(oppositeAngle) * (point.z + 50)

          ctx.save()
          ctx.globalAlpha = alpha * 0.5
          ctx.strokeStyle = "#10b981"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(oppositeX, y)
          ctx.stroke()
          ctx.restore()
        }

        // Draw nucleotide nodes
        const nodeSize = 3 + depth * 2
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = point.color
        ctx.shadowBlur = 10
        ctx.shadowColor = point.color
        ctx.beginPath()
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    const animate = () => {
      time += 16

      // Clear with fade effect for motion blur
      ctx.fillStyle = "rgba(3, 7, 18, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawHelix()
      drawParticles()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, #030712, #0c1222, #030712)" }}
    />
  )
}
