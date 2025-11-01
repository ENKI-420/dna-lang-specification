"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Qubit {
  id: number
  x: number
  y: number
  z: number
  state: [number, number] // [alpha, beta] for |0⟩ and |1⟩
  coherence: number
  entangled: number[]
}

export function QuantumVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qubits, setQubits] = useState<Qubit[]>([])
  const [selectedQubit, setSelectedQubit] = useState<number | null>(null)
  const [decoherenceRate, setDecoherenceRate] = useState([0.01])
  const [isRunning, setIsRunning] = useState(true)
  const [entanglementStrength, setEntanglementStrength] = useState(0.85)
  const [teleportationRate, setTeleportationRate] = useState(0.92)

  // Initialize qubits
  useEffect(() => {
    const initialQubits: Qubit[] = []
    const numQubits = 8
    const radius = 150

    for (let i = 0; i < numQubits; i++) {
      const angle = (i / numQubits) * Math.PI * 2
      initialQubits.push({
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: (Math.random() - 0.5) * 100,
        state: [Math.cos(Math.random() * Math.PI), Math.sin(Math.random() * Math.PI)],
        coherence: 1.0,
        entangled: i < numQubits - 1 ? [i + 1] : [0],
      })
    }

    setQubits(initialQubits)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setQubits((prev) =>
        prev.map((qubit) => ({
          ...qubit,
          coherence: Math.max(0, qubit.coherence - decoherenceRate[0]),
          state: [qubit.state[0] + (Math.random() - 0.5) * 0.01, qubit.state[1] + (Math.random() - 0.5) * 0.01] as [
            number,
            number,
          ],
        })),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [isRunning, decoherenceRate])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Clear canvas
    ctx.fillStyle = "oklch(0.12 0.02 250)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw entanglement lines
    qubits.forEach((qubit) => {
      qubit.entangled.forEach((targetId) => {
        const target = qubits[targetId]
        if (target) {
          ctx.strokeStyle = `oklch(0.75 0.12 200 / ${qubit.coherence * 0.5})`
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(centerX + qubit.x, centerY + qubit.y)
          ctx.lineTo(centerX + target.x, centerY + target.y)
          ctx.stroke()
          ctx.setLineDash([])
        }
      })
    })

    // Draw qubits
    qubits.forEach((qubit) => {
      const isSelected = selectedQubit === qubit.id
      const size = isSelected ? 16 : 12

      // Qubit glow
      const gradient = ctx.createRadialGradient(
        centerX + qubit.x,
        centerY + qubit.y,
        0,
        centerX + qubit.x,
        centerY + qubit.y,
        size * 2,
      )
      gradient.addColorStop(0, `oklch(0.75 0.12 200 / ${qubit.coherence})`)
      gradient.addColorStop(1, "oklch(0.75 0.12 200 / 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(centerX + qubit.x - size * 2, centerY + qubit.y - size * 2, size * 4, size * 4)

      // Qubit core
      ctx.fillStyle = `oklch(0.75 0.12 200 / ${qubit.coherence})`
      ctx.beginPath()
      ctx.arc(centerX + qubit.x, centerY + qubit.y, size, 0, Math.PI * 2)
      ctx.fill()

      // State vector
      const vectorLength = 30
      const vectorX = qubit.state[0] * vectorLength
      const vectorY = qubit.state[1] * vectorLength
      ctx.strokeStyle = `oklch(0.65 0.18 145 / ${qubit.coherence})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX + qubit.x, centerY + qubit.y)
      ctx.lineTo(centerX + qubit.x + vectorX, centerY + qubit.y + vectorY)
      ctx.stroke()

      // Qubit label
      ctx.fillStyle = "oklch(0.95 0.01 250)"
      ctx.font = "12px JetBrains Mono"
      ctx.textAlign = "center"
      ctx.fillText(`Q${qubit.id}`, centerX + qubit.x, centerY + qubit.y - size - 5)
    })
  }, [qubits, selectedQubit])

  const applyGate = (gate: string) => {
    if (selectedQubit === null) return

    setQubits((prev) =>
      prev.map((qubit) => {
        if (qubit.id !== selectedQubit) return qubit

        let newState: [number, number] = [...qubit.state]

        switch (gate) {
          case "H": // Hadamard
            newState = [
              (qubit.state[0] + qubit.state[1]) / Math.sqrt(2),
              (qubit.state[0] - qubit.state[1]) / Math.sqrt(2),
            ]
            break
          case "X": // Pauli-X
            newState = [qubit.state[1], qubit.state[0]]
            break
          case "Y": // Pauli-Y
            newState = [-qubit.state[1], qubit.state[0]]
            break
          case "Z": // Pauli-Z
            newState = [qubit.state[0], -qubit.state[1]]
            break
        }

        return { ...qubit, state: newState }
      }),
    )
  }

  const resetSimulation = () => {
    setQubits((prev) =>
      prev.map((qubit) => ({
        ...qubit,
        coherence: 1.0,
        state: [1, 0] as [number, number],
      })),
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visualization Canvas */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Quantum State Visualization</CardTitle>
          <CardDescription>Real-time 3D qubit orbits and entanglement</CardDescription>
        </CardHeader>
        <CardContent>
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full border border-border rounded-lg cursor-crosshair"
            onClick={(e) => {
              const canvas = canvasRef.current
              if (!canvas) return

              const rect = canvas.getBoundingClientRect()
              const x = ((e.clientX - rect.left) / rect.width) * canvas.width - canvas.width / 2
              const y = ((e.clientY - rect.top) / rect.height) * canvas.height - canvas.height / 2

              // Find closest qubit
              let closest = null
              let minDist = Number.POSITIVE_INFINITY

              qubits.forEach((qubit) => {
                const dist = Math.sqrt((qubit.x - x) ** 2 + (qubit.y - y) ** 2)
                if (dist < minDist && dist < 30) {
                  minDist = dist
                  closest = qubit.id
                }
              })

              setSelectedQubit(closest)
            }}
          />

          <div className="mt-4 flex items-center gap-4">
            <Button onClick={() => setIsRunning(!isRunning)} variant={isRunning ? "default" : "outline"}>
              {isRunning ? "Pause" : "Resume"}
            </Button>
            <Button onClick={resetSimulation} variant="outline">
              Reset
            </Button>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-2">
                Decoherence Rate: {decoherenceRate[0].toFixed(3)}
              </div>
              <Slider value={decoherenceRate} onValueChange={setDecoherenceRate} min={0.001} max={0.05} step={0.001} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls and Telemetry */}
      <Card>
        <CardHeader>
          <CardTitle>Quantum Controls</CardTitle>
          <CardDescription>Apply gates and monitor telemetry</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gates" className="space-y-4">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="gates">Gates</TabsTrigger>
              <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
            </TabsList>

            <TabsContent value="gates" className="space-y-4">
              {selectedQubit !== null ? (
                <>
                  <div className="text-sm font-medium mb-2">
                    Selected: <Badge>Qubit {selectedQubit}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => applyGate("H")} variant="outline" className="bg-transparent">
                      Hadamard (H)
                    </Button>
                    <Button onClick={() => applyGate("X")} variant="outline" className="bg-transparent">
                      Pauli-X
                    </Button>
                    <Button onClick={() => applyGate("Y")} variant="outline" className="bg-transparent">
                      Pauli-Y
                    </Button>
                    <Button onClick={() => applyGate("Z")} variant="outline" className="bg-transparent">
                      Pauli-Z
                    </Button>
                  </div>

                  {selectedQubit !== null && qubits[selectedQubit] && (
                    <div className="mt-4 p-4 border border-border rounded-lg space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">State:</span> |ψ⟩ ={" "}
                        {qubits[selectedQubit].state[0].toFixed(3)}|0⟩ + {qubits[selectedQubit].state[1].toFixed(3)}|1⟩
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Coherence:</span>{" "}
                        {(qubits[selectedQubit].coherence * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Entangled with:</span> Q
                        {qubits[selectedQubit].entangled.join(", Q")}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-muted-foreground py-8">Click a qubit to select it</div>
              )}
            </TabsContent>

            <TabsContent value="telemetry" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <div className="text-sm text-muted-foreground">Average Coherence</div>
                  <div className="text-2xl font-bold">
                    {((qubits.reduce((sum, q) => sum + q.coherence, 0) / qubits.length) * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="p-3 border border-border rounded-lg">
                  <div className="text-sm text-muted-foreground">Entanglement Strength</div>
                  <div className="text-2xl font-bold">{(entanglementStrength * 100).toFixed(1)}%</div>
                </div>

                <div className="p-3 border border-border rounded-lg">
                  <div className="text-sm text-muted-foreground">Bell State Fidelity</div>
                  <div className="text-2xl font-bold">{(teleportationRate * 100).toFixed(1)}%</div>
                </div>

                <div className="p-3 border border-border rounded-lg">
                  <div className="text-sm text-muted-foreground">Active Qubits</div>
                  <div className="text-2xl font-bold">
                    {qubits.filter((q) => q.coherence > 0.5).length}/{qubits.length}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
