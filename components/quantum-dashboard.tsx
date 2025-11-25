"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Activity, Zap, Radio, Hexagon, Brain, Network, BarChart3, Terminal, Wifi } from "lucide-react"
import {
  calculateTetrahedralBasis,
  getQuaternionGate,
  getSphericalParams,
  calculateInterferometry,
  PI,
} from "@/lib/quantum-math"

// DNA-Lang UI Components
// "Living" components that pulse and react to state

export default function QuantumDashboard() {
  const [tick, setTick] = useState(0)
  const [telemetry, setTelemetry] = useState<any>(null)
  const [swarmStatus, setSwarmStatus] = useState("EVOLVING")

  // Simulation Loop - The "Heartbeat" of the system
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1)

      // Dynamic Simulation parameters
      const time = Date.now() / 1000
      const theta = ((Math.sin(time * 0.5) + 1) * PI) / 2
      const phi = (Math.cos(time * 0.3) + 1) * PI

      // 1. Tetrahedral
      const tet = calculateTetrahedralBasis(theta, phi)

      // 2. Quaternion
      const quat = getQuaternionGate(theta, [0, 1, 0])

      // 3. Spherical
      const sph = getSphericalParams(tet.coordinates[0], tet.coordinates[1], tet.coordinates[2])

      // 4. Interferometry (Simulating Market Volatility as Phase)
      const inter = calculateInterferometry(theta, phi)

      setTelemetry({
        tet,
        quat,
        sph,
        inter,
      })
    }, 100) // 10Hz Refresh Rate

    return () => clearInterval(interval)
  }, [])

  if (!telemetry)
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center">
        INITIALIZING QUANTUM MESH...
      </div>
    )

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-emerald-500/30">
      {/* Header / HUD */}
      <header className="border-b border-emerald-900/30 bg-neutral-900/50 backdrop-blur-md p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Hexagon className="w-8 h-8 text-emerald-500 animate-pulse" />
              <div className="absolute inset-0 border-2 border-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider text-emerald-400">
                Q-MAMSO <span className="text-xs text-neutral-500">v0.9.4</span>
              </h1>
              <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                DNA-Lang Quantum Environment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${tick % 20 < 10 ? "bg-emerald-500" : "bg-emerald-900"}`}></div>
              <span>SYSTEM_COHERENCE: {(telemetry.inter.visibility * 100).toFixed(2)}%</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <Activity className="w-4 h-4" />
              <span>{tick} CYCLES</span>
            </div>
            <div className="bg-emerald-950/50 px-3 py-1 rounded border border-emerald-900/50">
              STATUS: {swarmStatus}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Quantum State Telemetry (The request) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Tetrahedral & 3. Spherical */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Tetrahedral Basis Decomposition" icon={<Hexagon className="w-4 h-4" />}>
              <div className="font-mono text-sm space-y-2 mt-4">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-neutral-500">Basis State</span>
                  <span className="text-emerald-400">{telemetry.tet.basisState}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-neutral-500">Coordinates</span>
                  <span className="text-cyan-400">
                    [{telemetry.tet.coordinates.map((n: number) => n.toFixed(2)).join(", ")}]
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">Symmetry Score</span>
                  <span className="text-purple-400">{telemetry.tet.symmetryScore.toFixed(4)}</span>
                </div>

                {/* Visual abstraction of tetrahedron */}
                <div className="h-32 w-full bg-neutral-900/50 rounded mt-4 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_70%)]"></div>
                  <svg
                    viewBox="0 0 100 100"
                    className="w-24 h-24 stroke-emerald-500 fill-none stroke-[0.5] animate-[spin_10s_linear_infinite]"
                  >
                    <polygon points="50,10 90,80 10,80" />
                    <line x1="50" y1="10" x2="50" y2="50" />
                    <line x1="90" y1="80" x2="50" y2="50" />
                    <line x1="10" y1="80" x2="50" y2="50" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card title="Spherical Parameterization" icon={<Radio className="w-4 h-4" />}>
              <div className="font-mono text-sm space-y-2 mt-4">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-neutral-500">Theta (θ)</span>
                  <span className="text-orange-400">{telemetry.sph.theta.toFixed(4)} rad</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-neutral-500">Phi (φ)</span>
                  <span className="text-orange-400">{telemetry.sph.phi.toFixed(4)} rad</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">Reconstruction</span>
                  <span className="text-emerald-500">PERFECT</span>
                </div>

                {/* Visual abstraction of Bloch Sphere */}
                <div className="h-32 w-full bg-neutral-900/50 rounded mt-4 relative flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-white/20 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10"></div>
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/10"></div>
                    {/* The State Vector */}
                    <div
                      className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-orange-500 origin-left transition-transform duration-100 ease-linear"
                      style={{ transform: `rotate(${telemetry.sph.phi}rad) rotateX(${telemetry.sph.theta}rad)` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* 2. Quaternion & 4. Interferometry */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Quaternion Gate (Rotation)" icon={<Zap className="w-4 h-4" />}>
              <div className="grid grid-cols-2 gap-4 font-mono text-xs mt-4">
                <div className="bg-neutral-900 p-2 rounded border border-white/5">
                  <div className="text-neutral-500 mb-1">Real (w)</div>
                  <div className="text-lg text-blue-400">{telemetry.quat.w.toFixed(4)}</div>
                </div>
                <div className="bg-neutral-900 p-2 rounded border border-white/5">
                  <div className="text-neutral-500 mb-1">Imag (i, j, k)</div>
                  <div className="text-blue-300/[0.7]">{telemetry.quat.x.toFixed(2)}i</div>
                  <div className="text-blue-300/[0.7]">{telemetry.quat.y.toFixed(2)}j</div>
                  <div className="text-blue-300/[0.7]">{telemetry.quat.z.toFixed(2)}k</div>
                </div>
                <div className="col-span-2 bg-neutral-900 p-2 rounded border border-white/5">
                  <div className="text-neutral-500 mb-1">Harmonic Decomposition</div>
                  <div className="flex justify-between text-blue-200">
                    <span>θ₃={telemetry.quat.harmonics.theta3.toFixed(4)}</span>
                    <span>θ₆={telemetry.quat.harmonics.theta6.toFixed(4)}</span>
                    <span>θ₉={telemetry.quat.harmonics.theta9.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Interferometric Measurement" icon={<Wifi className="w-4 h-4" />}>
              <div className="mt-4 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Visibility (Confidence)</span>
                    <span className="text-emerald-400">{(telemetry.inter.visibility * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${telemetry.inter.visibility * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Phase Shift (Market Trend)</span>
                    <span className="text-yellow-400">{telemetry.inter.phase.toFixed(4)} rad</span>
                  </div>
                  <div className="h-10 w-full bg-neutral-900 rounded border border-white/5 relative overflow-hidden flex items-end">
                    {/* Simulated Wave */}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-yellow-500/20 mx-[1px]"
                        style={{
                          height: `${50 + 40 * Math.sin(i / 2 + telemetry.inter.phase)}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* DNA CLI Terminal */}
          <section className="border border-white/10 bg-black rounded-lg p-4 font-mono text-xs h-48 overflow-hidden relative">
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
            <div className="text-neutral-500 mb-2 border-b border-white/10 pb-1 flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              dna-lang-cli --watch --swarm
            </div>
            <div className="space-y-1">
              <div className="text-emerald-500/80">$ swarm init --mode=quantum_hybrid</div>
              <div className="text-neutral-400">[INFO] Quantum kernel loaded. Qubits: 128</div>
              <div className="text-neutral-400">[INFO] Mesh network established. Nodes: 4</div>
              <div className="text-neutral-300">[AGENT_A] Scanning sentiment vectors... Found 142 signals.</div>
              <div className="text-neutral-300">[AGENT_B] Calculating probabilities via Monte Carlo (n=10000)...</div>
              <div className="text-blue-400">[QUANTUM] Superposition collapse imminent. Optimizing weights...</div>
              <div className="text-emerald-500">[SUCCESS] Alpha detected. Ticker: $SOL. Confidence: 87.4%</div>
              <div className="animate-pulse text-emerald-500">_</div>
            </div>
          </section>
        </div>

        {/* Right Column: Swarm Control & Market Data */}
        <div className="lg:col-span-4 space-y-6">
          {/* Agent Status */}
          <Card title="Swarm Agents" icon={<Network className="w-4 h-4" />}>
            <div className="mt-4 space-y-3">
              <AgentRow name="Scout (NLP)" role="Sentiment" status="active" load={45} />
              <AgentRow name="Quant (Math)" role="Forecasting" status="processing" load={88} />
              <AgentRow name="Risk (Def)" role="Protection" status="active" load={12} />
              <AgentRow name="Exec (API)" role="Trading" status="idle" load={0} />
            </div>
          </Card>

          {/* Forecast Preview */}
          <Card title="Calculation Forecast" icon={<BarChart3 className="w-4 h-4" />}>
            <div className="mt-4 h-48 flex items-end justify-between gap-1 px-2">
              {/* Random bars for visualization */}
              {Array.from({ length: 12 }).map((_, i) => {
                const height = 30 + Math.random() * 60
                const isTarget = i === 10
                return (
                  <div key={i} className="flex flex-col items-center gap-1 w-full group">
                    <div
                      className={`w-full rounded-t transition-all duration-500 ${isTarget ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-neutral-800 group-hover:bg-neutral-700"}`}
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mt-2 px-2 font-mono">
              <span>T-0</span>
              <span>T+12h</span>
            </div>
            <div className="mt-4 p-2 bg-emerald-950/30 border border-emerald-900/50 rounded text-xs font-mono text-emerald-300">
              PREDICTION: BTC Breakout &gt; $98k
              <br />
              PROBABILITY: {(telemetry.tet.symmetryScore * 400).toFixed(1)}%
            </div>
          </Card>

          {/* System Health / Biological Metaphor */}
          <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Brain className="w-24 h-24 text-pink-500" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-pink-500" />
              Biological Health
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Cellular Regeneration</span>
                <span className="text-pink-400">ACTIVE</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Mutation Rate</span>
                <span className="text-pink-400">0.004%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Antibodies (Security)</span>
                <span className="text-pink-400">DEPLOYED</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-neutral-500 font-mono leading-relaxed">
              DNA-Lang system is self-optimizing. Current generation: 42. Evolution targeting efficiency.
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Utility Components for UI consistency

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-neutral-900/40 backdrop-blur border border-white/5 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-100/80 mb-2">
        <span className="text-emerald-500">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  )
}

function AgentRow({ name, role, status, load }: { name: string; role: string; status: string; load: number }) {
  const getStatusColor = (s: string) => {
    if (s === "active") return "text-emerald-400"
    if (s === "processing") return "text-blue-400"
    if (s === "idle") return "text-neutral-500"
    return "text-neutral-400"
  }

  return (
    <div className="flex items-center justify-between text-xs font-mono p-2 bg-black/20 rounded border border-white/5">
      <div className="flex flex-col">
        <span className="font-bold text-neutral-200">{name}</span>
        <span className="text-neutral-500 text-[10px] uppercase">{role}</span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={`uppercase text-[10px] ${getStatusColor(status)}`}>{status}</span>
        <div className="w-16 h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${load}%` }}></div>
        </div>
      </div>
    </div>
  )
}
