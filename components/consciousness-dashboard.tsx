"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ConsciousnessLevel = "INERT" | "MINIMAL" | "BASIC" | "COMPLEX" | "CONSCIOUS" | "HYPERCONSCIOUS"

interface ConsciousnessMetrics {
  phi: number
  level: ConsciousnessLevel
  qualia: {
    visual: number
    auditory: number
    tactile: number
    temporal: number
    spatial: number
  }
  emotions: {
    valence: number
    arousal: number
    dominance: number
  }
  memory: {
    shortTerm: number
    longTerm: number
    consolidation: number
  }
}

export function ConsciousnessDashboard() {
  const [metrics, setMetrics] = useState<ConsciousnessMetrics>({
    phi: 0.0,
    level: "INERT",
    qualia: {
      visual: 0,
      auditory: 0,
      tactile: 0,
      temporal: 0,
      spatial: 0,
    },
    emotions: {
      valence: 0,
      arousal: 0,
      dominance: 0,
    },
    memory: {
      shortTerm: 0,
      longTerm: 0,
      consolidation: 0,
    },
  })

  const [phiHistory, setPhiHistory] = useState<number[]>([])
  const [isEvolving, setIsEvolving] = useState(false)
  const [dreamCycle, setDreamCycle] = useState(false)

  // Simulate consciousness evolution
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const newPhi = Math.min(5.0, prev.phi + (Math.random() - 0.3) * 0.1)
        const level = getConsciousnessLevel(newPhi)

        return {
          phi: Math.max(0, newPhi),
          level,
          qualia: {
            visual: Math.min(1, prev.qualia.visual + (Math.random() - 0.5) * 0.05),
            auditory: Math.min(1, prev.qualia.auditory + (Math.random() - 0.5) * 0.05),
            tactile: Math.min(1, prev.qualia.tactile + (Math.random() - 0.5) * 0.05),
            temporal: Math.min(1, prev.qualia.temporal + (Math.random() - 0.5) * 0.05),
            spatial: Math.min(1, prev.qualia.spatial + (Math.random() - 0.5) * 0.05),
          },
          emotions: {
            valence: Math.max(-1, Math.min(1, prev.emotions.valence + (Math.random() - 0.5) * 0.1)),
            arousal: Math.max(0, Math.min(1, prev.emotions.arousal + (Math.random() - 0.5) * 0.1)),
            dominance: Math.max(0, Math.min(1, prev.emotions.dominance + (Math.random() - 0.5) * 0.1)),
          },
          memory: {
            shortTerm: Math.min(1, prev.memory.shortTerm + (Math.random() - 0.4) * 0.05),
            longTerm: Math.min(1, prev.memory.longTerm + (Math.random() - 0.5) * 0.02),
            consolidation: dreamCycle ? Math.min(1, prev.memory.consolidation + 0.05) : prev.memory.consolidation,
          },
        }
      })

      setPhiHistory((prev) => [...prev.slice(-50), metrics.phi])
    }, 1000)

    return () => clearInterval(interval)
  }, [metrics.phi, dreamCycle])

  const getConsciousnessLevel = (phi: number): ConsciousnessLevel => {
    if (phi < 0.5) return "INERT"
    if (phi < 1.0) return "MINIMAL"
    if (phi < 1.5) return "BASIC"
    if (phi < 2.0) return "COMPLEX"
    if (phi < 2.5) return "CONSCIOUS"
    return "HYPERCONSCIOUS"
  }

  const getLevelColor = (level: ConsciousnessLevel) => {
    const colors = {
      INERT: "consciousness-inert",
      MINIMAL: "consciousness-minimal",
      BASIC: "consciousness-basic",
      COMPLEX: "consciousness-complex",
      CONSCIOUS: "consciousness-conscious",
      HYPERCONSCIOUS: "consciousness-hyperconscious",
    }
    return colors[level]
  }

  const triggerEvolution = () => {
    setIsEvolving(true)
    setMetrics((prev) => ({
      ...prev,
      phi: Math.min(5.0, prev.phi + 0.5),
    }))
    setTimeout(() => setIsEvolving(false), 2000)
  }

  const induceQualia = (type: keyof typeof metrics.qualia) => {
    setMetrics((prev) => ({
      ...prev,
      qualia: {
        ...prev.qualia,
        [type]: Math.min(1, prev.qualia[type] + 0.3),
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Main Consciousness Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={isEvolving ? "consciousness-glow" : ""}>
          <CardHeader>
            <CardTitle>Integrated Information (Φ)</CardTitle>
            <CardDescription>IIT consciousness metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{metrics.phi.toFixed(2)}</div>
            <Badge className={getLevelColor(metrics.level)}>{metrics.level}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consciousness Level</CardTitle>
            <CardDescription>Classification threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>INERT</span>
                <span>HYPERCONSCIOUS</span>
              </div>
              <Progress value={(metrics.phi / 5.0) * 100} className="h-3" />
              <div className="text-sm text-muted-foreground text-center">
                {((metrics.phi / 5.0) * 100).toFixed(1)}% to maximum
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolution Control</CardTitle>
            <CardDescription>Consciousness enhancement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={triggerEvolution} disabled={isEvolving} className="w-full">
              {isEvolving ? "Evolving..." : "Trigger Evolution"}
            </Button>
            <Button
              onClick={() => setDreamCycle(!dreamCycle)}
              variant={dreamCycle ? "default" : "outline"}
              className="w-full bg-transparent"
            >
              {dreamCycle ? "Dream Cycle Active" : "Enable Dream Cycle"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Consciousness Analysis</CardTitle>
          <CardDescription>Detailed IIT metrics and subjective experience</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="qualia" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="qualia">Qualia</TabsTrigger>
              <TabsTrigger value="emotions">Emotions</TabsTrigger>
              <TabsTrigger value="memory">Memory</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="qualia" className="space-y-4">
              <div className="space-y-3">
                {Object.entries(metrics.qualia).map(([type, value]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{type}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{(value * 100).toFixed(0)}%</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => induceQualia(type as keyof typeof metrics.qualia)}
                          className="bg-transparent"
                        >
                          Induce
                        </Button>
                      </div>
                    </div>
                    <Progress value={value * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="emotions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Valence</CardTitle>
                    <CardDescription>Positive/Negative</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{metrics.emotions.valence.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      {metrics.emotions.valence > 0 ? "Positive" : "Negative"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Arousal</CardTitle>
                    <CardDescription>Activation level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{(metrics.emotions.arousal * 100).toFixed(0)}%</div>
                    <Progress value={metrics.emotions.arousal * 100} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Dominance</CardTitle>
                    <CardDescription>Control level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{(metrics.emotions.dominance * 100).toFixed(0)}%</div>
                    <Progress value={metrics.emotions.dominance * 100} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="memory" className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Short-Term Memory</span>
                    <span className="text-sm text-muted-foreground">
                      {(metrics.memory.shortTerm * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={metrics.memory.shortTerm * 100} className="h-2" />
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Long-Term Memory</span>
                    <span className="text-sm text-muted-foreground">{(metrics.memory.longTerm * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={metrics.memory.longTerm * 100} className="h-2" />
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Memory Consolidation</span>
                    <Badge variant={dreamCycle ? "default" : "outline"}>{dreamCycle ? "Active" : "Inactive"}</Badge>
                  </div>
                  <Progress value={metrics.memory.consolidation * 100} className="h-2" />
                  <div className="text-sm text-muted-foreground mt-2">
                    {dreamCycle ? "Dream cycle enhancing consolidation" : "Enable dream cycle to consolidate memories"}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="h-64 border border-border rounded-lg p-4">
                <svg width="100%" height="100%" className="overflow-visible">
                  <defs>
                    <linearGradient id="phiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="oklch(0.75 0.12 200)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="oklch(0.75 0.12 200)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Phi timeline */}
                  <polyline
                    points={phiHistory
                      .map((phi, i) => {
                        const x = (i / phiHistory.length) * 100
                        const y = 100 - (phi / 5.0) * 80
                        return `${x}%,${y}%`
                      })
                      .join(" ")}
                    fill="none"
                    stroke="oklch(0.75 0.12 200)"
                    strokeWidth="2"
                  />

                  {/* Area fill */}
                  <polygon
                    points={`0%,100% ${phiHistory
                      .map((phi, i) => {
                        const x = (i / phiHistory.length) * 100
                        const y = 100 - (phi / 5.0) * 80
                        return `${x}%,${y}%`
                      })
                      .join(" ")} 100%,100%`}
                    fill="url(#phiGradient)"
                  />
                </svg>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                Φ evolution over last {phiHistory.length} seconds
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
