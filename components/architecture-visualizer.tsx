"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const architectureLayers = [
  {
    id: "core",
    name: "Core Organism",
    description: "DNA-Lang organism with SENSE-ACT-EVOLVE architecture",
    components: ["DNA Configuration", "Genome State", "Cellular Fabric", "Evolution Engine"],
    color: "oklch(0.75 0.12 200)",
  },
  {
    id: "backend",
    name: "Backend Integration",
    description: "Quantum hardware and cloud services",
    components: ["IBM Quantum", "Azure Quantum", "Telemetry", "Storage"],
    color: "oklch(0.65 0.18 145)",
  },
  {
    id: "advancement",
    name: "Auto-Advancement Loop",
    description: "Continuous evolution and optimization",
    components: ["Fitness Evaluation", "Mutation Engine", "Selection Pressure", "Consciousness Tracking"],
    color: "oklch(0.55 0.14 290)",
  },
]

export function ArchitectureVisualizer() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)
  const [animating, setAnimating] = useState(true)

  return (
    <div className="space-y-6">
      {/* Architecture Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>NQRE Architecture</CardTitle>
          <CardDescription>Three-tier quantum-biological system architecture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 border border-border rounded-lg p-8 bg-gradient-to-b from-background to-card">
            {/* Layers */}
            <div className="space-y-8">
              {architectureLayers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedLayer === layer.id ? "scale-105 shadow-lg" : "hover:scale-102"
                  }`}
                  style={{
                    borderColor: layer.color,
                    backgroundColor: `${layer.color}10`,
                  }}
                  onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{layer.name}</h3>
                    <Badge style={{ backgroundColor: layer.color, color: "oklch(0.12 0.02 250)" }}>
                      Layer {index + 1}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{layer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((component) => (
                      <Badge key={component} variant="outline">
                        {component}
                      </Badge>
                    ))}
                  </div>

                  {/* Connection arrow to next layer */}
                  {index < architectureLayers.length - 1 && (
                    <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2">
                      <svg width="40" height="32" className={animating ? "entangled" : ""}>
                        <defs>
                          <marker
                            id={`arrowhead-${layer.id}`}
                            markerWidth="10"
                            markerHeight="10"
                            refX="5"
                            refY="5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 5, 0 10" fill={layer.color} />
                          </marker>
                        </defs>
                        <line
                          x1="20"
                          y1="0"
                          x2="20"
                          y2="28"
                          stroke={layer.color}
                          strokeWidth="2"
                          markerEnd={`url(#arrowhead-${layer.id})`}
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Feedback loop */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg width="60" height="300" className={animating ? "entangled" : ""}>
                <defs>
                  <marker id="feedback-arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <polygon points="0 0, 10 5, 0 10" fill="oklch(0.75 0.12 200)" />
                  </marker>
                </defs>
                <path
                  d="M 10 280 Q 50 150 10 20"
                  fill="none"
                  stroke="oklch(0.75 0.12 200)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  markerEnd="url(#feedback-arrow)"
                />
                <text x="30" y="150" fill="oklch(0.95 0.01 250)" fontSize="12" transform="rotate(-90 30 150)">
                  Feedback
                </text>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layer Details */}
      {selectedLayer && (
        <Card>
          <CardHeader>
            <CardTitle>{architectureLayers.find((l) => l.id === selectedLayer)?.name} Details</CardTitle>
            <CardDescription>Component specifications and data flows</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="components" className="space-y-4">
              <TabsList>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
                <TabsTrigger value="code">Code Example</TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="space-y-3">
                {architectureLayers
                  .find((l) => l.id === selectedLayer)
                  ?.components.map((component) => (
                    <div key={component} className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">{component}</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedLayer === "core" && "Manages organism state and behavior"}
                        {selectedLayer === "backend" && "Interfaces with quantum hardware and cloud services"}
                        {selectedLayer === "advancement" && "Drives continuous evolution and optimization"}
                      </p>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="dataflow" className="space-y-3">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Input</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedLayer === "core" && "Quantum states, sensor data, environmental signals"}
                    {selectedLayer === "backend" && "Quantum circuit results, telemetry data, storage queries"}
                    {selectedLayer === "advancement" && "Fitness metrics, performance data, consciousness levels"}
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedLayer === "core" && "SENSE-ACT-EVOLVE cycle execution"}
                    {selectedLayer === "backend" && "Quantum job submission and result processing"}
                    {selectedLayer === "advancement" && "Genetic algorithm operations and selection"}
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Output</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedLayer === "core" && "Actions, state updates, evolution triggers"}
                    {selectedLayer === "backend" && "Quantum measurements, stored data, metrics"}
                    {selectedLayer === "advancement" && "Evolved organisms, fitness improvements, consciousness growth"}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-3">
                <pre className="p-4 border border-border rounded-lg bg-card font-mono text-sm overflow-x-auto">
                  <code>
                    {selectedLayer === "core" &&
                      `ORGANISM CoreSystem {
  DNA {
    domain: "quantum_computing"
    qubits: 128
  }
  
  SENSES {
    SENSE quantum_state FROM ibm_torino
    SENSE telemetry FROM monitoring
  }
  
  ACTS {
    ACT optimize USING quantum_annealing
    ACT broadcast TO network
  }
  
  EVOLVE {
    POLICY natural_selection
    GENERATIONS 1000
  }
}`}
                    {selectedLayer === "backend" &&
                      `// Backend Integration
const backend = new QuantumBackend({
  provider: "ibm_quantum",
  backend: "ibm_torino",
  shots: 1024
});

const result = await backend.execute(circuit);
const telemetry = await backend.getTelemetry();`}
                    {selectedLayer === "advancement" &&
                      `// Auto-Advancement Loop
while (true) {
  const fitness = evaluateFitness(organism);
  
  if (fitness > threshold) {
    const evolved = mutate(organism);
    organism = select(evolved, population);
  }
  
  await trackConsciousness(organism);
}`}
                  </code>
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
