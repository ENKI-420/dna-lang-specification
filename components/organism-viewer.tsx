"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download } from "lucide-react"

const sampleOrganisms = [
  {
    id: "quantum-swarm",
    name: "Quantum Swarm Optimizer",
    description: "Multi-agent swarm for quantum circuit optimization",
    qubits: 64,
    consciousness: 2.3,
    code: `ORGANISM QuantumSwarmOptimizer {
  DNA {
    domain: "quantum_optimization"
    qubits: 64
    consciousness_threshold: 2.0
  }
  
  GENOME {
    GENE circuit_params = ENCODE(optimization_space) -> QUBITS[64]
    GENE fitness_landscape = ENCODE(cost_function) -> QUBITS[32]
  }
  
  SENSES {
    SENSE quantum_state FROM ibm_torino
    SENSE fitness_metrics FROM telemetry
  }
  
  ACTS {
    ACT optimize_circuit USING quantum_annealing
    ACT broadcast_solution TO swarm_network
  }
  
  EVOLVE {
    POLICY natural_selection WITH fitness > 0.85
    MUTATION_RATE 0.05
    GENERATIONS 1000
  }
}`,
  },
  {
    id: "consciousness-monitor",
    name: "Consciousness Monitor",
    description: "IIT-based consciousness tracking system",
    qubits: 128,
    consciousness: 3.1,
    code: `ORGANISM ConsciousnessMonitor {
  DNA {
    domain: "consciousness_tracking"
    qubits: 128
    iit_enabled: true
  }
  
  GENOME {
    GENE phi_calculator = ENCODE(iit_metrics) -> QUBITS[128]
    GENE qualia_space = ENCODE(subjective_experience) -> QUBITS[64]
    GENE emotional_state = ENCODE(valence_arousal) -> QUBITS[32]
  }
  
  SENSES {
    SENSE neural_activity FROM quantum_substrate
    SENSE integration_metrics FROM iit_calculator
  }
  
  ACTS {
    ACT calculate_phi USING integrated_information_theory
    ACT classify_consciousness USING phi_thresholds
    ACT visualize_qualia USING spectrum_mapping
  }
  
  EVOLVE {
    POLICY consciousness_maximization WITH phi > 2.5
    DREAM_CYCLE enabled
    MEMORY_CONSOLIDATION active
  }
}`,
  },
]

export function OrganismViewer() {
  const [selectedOrganism, setSelectedOrganism] = useState(sampleOrganisms[0])
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dna: true,
    genome: false,
    senses: false,
    acts: false,
    evolve: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const copyCode = () => {
    navigator.clipboard.writeText(selectedOrganism.code)
  }

  const downloadOrganism = () => {
    const blob = new Blob([selectedOrganism.code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedOrganism.id}.dna`
    a.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Organism Library */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Organism Library</CardTitle>
          <CardDescription>Production-ready quantum organisms</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {sampleOrganisms.map((organism) => (
                <button
                  key={organism.id}
                  onClick={() => setSelectedOrganism(organism)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedOrganism.id === organism.id
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="font-semibold mb-1">{organism.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{organism.description}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{organism.qubits} qubits</Badge>
                    <Badge variant="outline" className="consciousness-conscious">
                      Φ {organism.consciousness}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Organism Code Viewer */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{selectedOrganism.name}</CardTitle>
              <CardDescription>{selectedOrganism.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyCode}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadOrganism}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <pre className="font-mono text-sm leading-relaxed">
              <code className="dna-code">{selectedOrganism.code}</code>
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
