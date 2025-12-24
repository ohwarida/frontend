'use client'

import React, { useRef, useEffect } from 'react'

// --- Types (외부 파일 의존성 제거 및 내부 정의) ---
interface WaveConfig {
  y: number // Wave vertical position offset
  length: number // Frequency of the wave
  amplitude: number // Height of the wave
  speed: number // Animation speed
  colors: string[] // Gradient colors
  offset: number // Phase offset
  composite?: GlobalCompositeOperation // Blending mode for glass effect
}

interface Particle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  alpha: number
  oscillationOffset: number
}

const Background3: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let increment = 0

    // --- Configuration: Particles (Light Dust) ---
    const particles: Particle[] = []
    const PARTICLE_COUNT = 60

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: Math.random() * 0.2 + 0.05,
          speedY: Math.random() * -0.2 - 0.05,
          alpha: Math.random() * 0.7 + 0.3,
          oscillationOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    // --- Configuration: WWDC Glass Prism Waves ---
    // Uses specific blend modes to simulate light passing through glass
    const waves: WaveConfig[] = [
      // 1. Dark Refraction Base (Adds volume/shadow)
      {
        y: 60,
        length: 0.0015,
        amplitude: 240,
        speed: 0.001,
        colors: [
          'rgba(255, 255, 255, 0)',
          'rgba(20, 10, 40, 0.03)',
          'rgba(40, 20, 80, 0.05)',
          'rgba(255, 255, 255, 0)',
        ],
        offset: 0,
        composite: 'multiply',
      },
      // 2. Main Rainbow Spectrum (Vivid Dispersion)
      // Mimics the WWDC rainbow arc colors
      {
        y: 0,
        length: 0.0025,
        amplitude: 200,
        speed: 0.002,
        colors: [
          'rgba(255, 255, 255, 0)',
          'rgba(255, 100, 100, 0.5)', // Soft Red
          'rgba(255, 200, 0, 0.5)', // Amber
          'rgba(100, 255, 150, 0.4)', // Green
          'rgba(50, 200, 255, 0.5)', // Cyan
          'rgba(100, 100, 255, 0.6)', // Indigo
          'rgba(200, 100, 255, 0.5)', // Violet
          'rgba(255, 255, 255, 0)',
        ],
        offset: 80,
        composite: 'hard-light', // Makes colors vivid on white background
      },
      // 3. Caustic Highlights (Sharp edges of glass)
      {
        y: -30,
        length: 0.003,
        amplitude: 150,
        speed: 0.0035,
        colors: [
          'rgba(255, 255, 255, 0)',
          'rgba(200, 240, 255, 0.3)',
          'rgba(255, 255, 255, 0.9)', // Pure white shine
          'rgba(240, 200, 255, 0.3)',
          'rgba(255, 255, 255, 0)',
        ],
        offset: 180,
        composite: 'color-dodge', // Glowing effect
      },
      // 4. Iridescent Coating (Subtle surface color)
      {
        y: -10,
        length: 0.004,
        amplitude: 120,
        speed: 0.004,
        colors: [
          'rgba(255, 255, 255, 0)',
          'rgba(50, 255, 255, 0.2)',
          'rgba(255, 50, 255, 0.2)',
          'rgba(255, 255, 255, 0)',
        ],
        offset: 250,
        composite: 'overlay',
      },
    ]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const drawWave = (wave: WaveConfig, t: number) => {
      if (!ctx) return

      ctx.save()

      if (wave.composite) {
        ctx.globalCompositeOperation = wave.composite
      }

      const width = canvas.width * 2.5
      const startX = -canvas.width
      const baseY = canvas.height * 0.6

      ctx.beginPath()
      ctx.moveTo(startX, canvas.height * 2)

      // Wave drawing logic with optical distortion
      for (let i = startX; i < width; i += 10) {
        const phase = i * wave.length + t * wave.speed + wave.offset

        // Distort sine wave to look like refracted glass
        const compression = Math.sin(phase * 0.5) * 0.3
        const rawSine = Math.sin(phase + compression)

        let distortedY = rawSine
        if (rawSine > 0) {
          distortedY = Math.pow(rawSine, 1.2) // Sharpen peaks
        } else {
          distortedY = -Math.pow(Math.abs(rawSine), 0.8) // Flatten troughs
        }

        const harmonic = Math.sin(phase * 3) * 0.05 // Add subtle detail
        const y = (distortedY + harmonic) * wave.amplitude + wave.y + baseY

        ctx.lineTo(i, y)
      }

      ctx.lineTo(width, canvas.height * 2)
      ctx.lineTo(startX, canvas.height * 2)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(startX, 0, width, 0)
      wave.colors.forEach((c, i) => {
        gradient.addColorStop(i / (wave.colors.length - 1), c)
      })

      ctx.fillStyle = gradient
      ctx.fill()

      ctx.restore()
    }

    const drawParticles = () => {
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      particles.forEach((p) => {
        const oscillation = Math.sin(increment * 0.02 + p.oscillationOffset)

        p.x += p.speedX + oscillation * 0.3
        p.y += p.speedY + Math.cos(increment * 0.01) * 0.1

        // Boundary wrap
        if (p.y < -10) p.y = canvas.height + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.x < -10) p.x = canvas.width + 10

        ctx.beginPath()
        // Prismatic coloring based on X position
        const hue = (p.x / canvas.width) * 180 + 160
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5)

        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
        grad.addColorStop(0.4, `hsla(${hue}, 80%, 70%, ${p.alpha})`)
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.fillStyle = grad
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
    }

    const render = () => {
      // Clear & Background
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGrad.addColorStop(0, '#ffffff')
      bgGrad.addColorStop(1, '#f3f4f6')

      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      // Rotate for diagonal flow
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(-Math.PI / 6)
      ctx.translate(-canvas.width / 2, -canvas.height / 2)

      waves.forEach((wave) => {
        drawWave(wave, increment)
      })

      ctx.restore()

      drawParticles()

      increment += 1
      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />

      {/* Optional: Noise Texture for realism (Requires bg-noise utility or image) */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      ></div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.4)_100%)]"></div>
    </div>
  )
}

export default Background3
