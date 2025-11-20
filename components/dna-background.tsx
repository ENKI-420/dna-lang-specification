"use client"

import { useEffect, useRef } from "react"

export function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // DNA Helix parameters
    const helixRadius = 80
    const helixHeight = canvas.height * 2
    const helixSpeed = 0.0005
    const particleCount = 150
    let time = 0

    // Particle system for quantum effects
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }> = []

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: ["#00d9ff", "#7c3aed", "#10b981"][Math.floor(Math.random() * 3)],
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(10, 14, 26, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += helixSpeed

      // Draw DNA helix
      const centerX = canvas.width / 2
      const segments = 100

      for (let i = 0; i < segments; i++) {
        const t = (i / segments) * Math.PI * 4 + time * 10
        const y = (i / segments) * helixHeight - ((time * 100) % helixHeight)

        if (y > -50 && y < canvas.height + 50) {
          // Left strand
          const x1 = centerX + Math.cos(t) * helixRadius
          const z1 = Math.sin(t) * helixRadius

          // Right strand
          const x2 = centerX + Math.cos(t + Math.PI) * helixRadius
          const z2 = Math.sin(t + Math.PI) * helixRadius

          // Calculate opacity based on z-depth
          const opacity1 = (z1 + helixRadius) / (helixRadius * 2)
          const opacity2 = (z2 + helixRadius) / (helixRadius * 2)

          // Draw connecting lines (base pairs)
          if (i % 5 === 0) {
            ctx.strokeStyle = `rgba(0, 217, 255, ${opacity1 * 0.3})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x1, y)
            ctx.lineTo(x2, y)
            ctx.stroke()
          }

          // Draw strand points
          ctx.fillStyle = `rgba(16, 185, 129, ${opacity1 * 0.8})`
          ctx.beginPath()
          ctx.arc(x1, y, 3, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = `rgba(124, 58, 237, ${opacity2 * 0.8})`
          ctx.beginPath()
          ctx.arc(x2, y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 217, 255, ${(1 - distance / 100) * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #1e293b 50%, #0f172a 100%)" }}
    />
  )
}
