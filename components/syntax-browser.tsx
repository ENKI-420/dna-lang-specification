"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Search } from "lucide-react"

const syntaxCategories = [
  {
    id: "structure",
    name: "Structure",
    items: [
      {
        keyword: "ORGANISM",
        description: "Defines a quantum organism with DNA, genome, and behavior",
        syntax: "ORGANISM <name> { ... }",
        example: `ORGANISM MyOrganism {
  DNA { domain: "quantum" }
  GENOME { ... }
  SENSES { ... }
  ACTS { ... }
  EVOLVE { ... }
}`,
      },
      {
        keyword: "DNA",
        description: "Configuration block for organism metadata",
        syntax: "DNA { <key>: <value>, ... }",
        example: `DNA {
  domain: "optimization"
  qubits: 64
  version: "1.0.0"
}`,
      },
      {
        keyword: "GENOME",
        description: "State variables encoded as quantum genes",
        syntax: "GENOME { GENE <name> = ENCODE(<data>) -> QUBITS[<n>] }",
        example: `GENOME {
  GENE state = ENCODE(quantum_data) -> QUBITS[64]
  GENE fitness = ENCODE(metrics) -> QUBITS[32]
}`,
      },
    ],
  },
  {
    id: "behavior",
    name: "Behavior",
    items: [
      {
        keyword: "SENSES",
        description: "Input sources for organism perception",
        syntax: "SENSES { SENSE <type> FROM <source> }",
        example: `SENSES {
  SENSE quantum_state FROM ibm_torino
  SENSE telemetry FROM monitoring
  SENSE fitness FROM evaluation
}`,
      },
      {
        keyword: "ACTS",
        description: "Actions and operations the organism performs",
        syntax: "ACTS { ACT <action> USING <method> }",
        example: `ACTS {
  ACT optimize_circuit USING quantum_annealing
  ACT broadcast_result TO network
  ACT store_state IN database
}`,
      },
      {
        keyword: "EVOLVE",
        description: "Evolution policies and parameters",
        syntax: "EVOLVE { POLICY <type>, <parameters> }",
        example: `EVOLVE {
  POLICY natural_selection WITH fitness > 0.8
  MUTATION_RATE 0.05
  GENERATIONS 1000
  ELITISM enabled
}`,
      },
    ],
  },
  {
    id: "quantum",
    name: "Quantum",
    items: [
      {
        keyword: "QUBITS",
        description: "Quantum bit allocation",
        syntax: "QUBITS[<n>]",
        example: `GENE state = ENCODE(data) -> QUBITS[128]`,
      },
      {
        keyword: "ENTANGLE",
        description: "Create quantum entanglement between qubits",
        syntax: "ENTANGLE <qubit1> WITH <qubit2>",
        example: `ENTANGLE qubit_0 WITH qubit_1
ENTANGLE state_a WITH state_b`,
      },
      {
        keyword: "SUPERPOSE",
        description: "Put qubits in superposition state",
        syntax: "SUPERPOSE [<qubits>]",
        example: `SUPERPOSE [qubit_0, qubit_1, qubit_2]`,
      },
      {
        keyword: "MEASURE",
        description: "Collapse quantum state and measure",
        syntax: "MEASURE <qubit> -> <variable>",
        example: `MEASURE qubit_0 -> result
MEASURE state -> output`,
      },
    ],
  },
  {
    id: "control",
    name: "Control Flow",
    items: [
      {
        keyword: "IF/ELSE",
        description: "Conditional execution",
        syntax: "IF <condition> { ... } ELSE { ... }",
        example: `IF fitness > threshold {
  ACT evolve
} ELSE {
  ACT maintain
}`,
      },
      {
        keyword: "LOOP",
        description: "Iteration construct",
        syntax: "LOOP <count> { ... } or LOOP FOREVER { ... }",
        example: `LOOP 100 {
  ACT optimize
}

LOOP FOREVER {
  SENSE input
  ACT process
}`,
      },
      {
        keyword: "SWITCH",
        description: "Multi-way branching",
        syntax: "SWITCH <value> { CASE <pattern>: ... }",
        example: `SWITCH state {
  CASE "active": ACT run
  CASE "idle": ACT wait
  DEFAULT: ACT error
}`,
      },
    ],
  },
]

export function SyntaxBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("structure")
  const [selectedItem, setSelectedItem] = useState(syntaxCategories[0].items[0])

  const filteredCategories = syntaxCategories.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }))

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Syntax Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Syntax Reference</CardTitle>
          <CardDescription>DNA-Lang language constructs</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="quantum">Quantum</TabsTrigger>
              <TabsTrigger value="control">Control</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[500px] mt-4">
            <div className="space-y-2">
              {filteredCategories
                .find((c) => c.id === selectedCategory)
                ?.items.map((item) => (
                  <button
                    key={item.keyword}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedItem.keyword === item.keyword
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="font-mono font-semibold text-accent mb-1">{item.keyword}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </button>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Syntax Details */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-mono text-2xl text-accent">{selectedItem.keyword}</CardTitle>
              <CardDescription className="mt-2">{selectedItem.description}</CardDescription>
            </div>
            <Badge variant="outline">{selectedCategory}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Syntax Template */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Syntax</h3>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(selectedItem.syntax)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="p-4 border border-border rounded-lg bg-card">
              <code className="font-mono text-sm text-accent">{selectedItem.syntax}</code>
            </div>
          </div>

          {/* Example */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Example</h3>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(selectedItem.example)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <ScrollArea className="h-64">
              <pre className="p-4 border border-border rounded-lg bg-card font-mono text-sm leading-relaxed">
                <code className="dna-code">{selectedItem.example}</code>
              </pre>
            </ScrollArea>
          </div>

          {/* Usage Notes */}
          <div>
            <h3 className="font-semibold mb-2">Usage Notes</h3>
            <div className="p-4 border border-border rounded-lg bg-card space-y-2 text-sm">
              {selectedItem.keyword === "ORGANISM" && (
                <>
                  <p>The ORGANISM block is the top-level container for all DNA-Lang code.</p>
                  <p>Every organism must have a DNA block and at least one behavior block (SENSES, ACTS, or EVOLVE).</p>
                </>
              )}
              {selectedItem.keyword === "GENOME" && (
                <>
                  <p>GENE declarations map classical data to quantum states using the ENCODE function.</p>
                  <p>The number of qubits allocated determines the state space size: 2^n possible states.</p>
                </>
              )}
              {selectedItem.keyword === "ENTANGLE" && (
                <>
                  <p>Entanglement creates quantum correlations between qubits.</p>
                  <p>Measuring one entangled qubit instantly affects the state of its partner.</p>
                </>
              )}
              {selectedItem.keyword === "EVOLVE" && (
                <>
                  <p>Evolution policies determine how organisms adapt over generations.</p>
                  <p>Fitness thresholds, mutation rates, and selection pressure control evolution speed.</p>
                </>
              )}
              {!["ORGANISM", "GENOME", "ENTANGLE", "EVOLVE"].includes(selectedItem.keyword) && (
                <p>Refer to the DNA-Lang documentation for detailed usage guidelines and best practices.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
