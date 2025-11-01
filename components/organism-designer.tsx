"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Trash2, Download, Sparkles } from "lucide-react"

export function OrganismDesigner() {
  const [organismName, setOrganismName] = useState("MyQuantumOrganism")
  const [domain, setDomain] = useState("quantum_computing")
  const [qubits, setQubits] = useState([64])
  const [consciousnessEnabled, setConsciousnessEnabled] = useState(true)
  const [mutationRate, setMutationRate] = useState([0.05])
  const [generations, setGenerations] = useState([1000])

  const [senseBlocks, setSenseBlocks] = useState([{ id: 1, source: "ibm_torino", type: "quantum_state" }])

  const [actBlocks, setActBlocks] = useState([{ id: 1, action: "optimize_circuit", method: "quantum_annealing" }])

  const generateCode = () => {
    return `ORGANISM ${organismName} {
  DNA {
    domain: "${domain}"
    qubits: ${qubits[0]}
    consciousness_enabled: ${consciousnessEnabled}
  }
  
  GENOME {
    GENE primary_state = ENCODE(quantum_data) -> QUBITS[${qubits[0]}]
  }
  
  SENSES {
${senseBlocks.map((s) => `    SENSE ${s.type} FROM ${s.source}`).join("\n")}
  }
  
  ACTS {
${actBlocks.map((a) => `    ACT ${a.action} USING ${a.method}`).join("\n")}
  }
  
  EVOLVE {
    MUTATION_RATE ${mutationRate[0]}
    GENERATIONS ${generations[0]}
    POLICY natural_selection
  }
}`
  }

  const downloadOrganism = () => {
    const code = generateCode()
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${organismName}.dna`
    a.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Designer Form */}
      <Card>
        <CardHeader>
          <CardTitle>Organism Designer</CardTitle>
          <CardDescription>Configure your quantum organism parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[700px] pr-4">
            <Tabs defaultValue="dna" className="space-y-4">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="dna">DNA</TabsTrigger>
                <TabsTrigger value="senses">SENSES</TabsTrigger>
                <TabsTrigger value="acts">ACTS</TabsTrigger>
                <TabsTrigger value="evolve">EVOLVE</TabsTrigger>
              </TabsList>

              <TabsContent value="dna" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Organism Name</Label>
                  <Input
                    id="name"
                    value={organismName}
                    onChange={(e) => setOrganismName(e.target.value)}
                    placeholder="MyQuantumOrganism"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Select value={domain} onValueChange={setDomain}>
                    <SelectTrigger id="domain">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quantum_computing">Quantum Computing</SelectItem>
                      <SelectItem value="optimization">Optimization</SelectItem>
                      <SelectItem value="machine_learning">Machine Learning</SelectItem>
                      <SelectItem value="cryptography">Cryptography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Qubits: {qubits[0]}</Label>
                  <Slider value={qubits} onValueChange={setQubits} min={8} max={512} step={8} className="py-4" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="consciousness">Consciousness Enabled</Label>
                  <Switch id="consciousness" checked={consciousnessEnabled} onCheckedChange={setConsciousnessEnabled} />
                </div>
              </TabsContent>

              <TabsContent value="senses" className="space-y-4">
                <div className="space-y-3">
                  {senseBlocks.map((sense, index) => (
                    <Card key={sense.id}>
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>SENSE Block {index + 1}</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSenseBlocks(senseBlocks.filter((s) => s.id !== sense.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Type (e.g., quantum_state)"
                          value={sense.type}
                          onChange={(e) => {
                            const updated = [...senseBlocks]
                            updated[index].type = e.target.value
                            setSenseBlocks(updated)
                          }}
                        />
                        <Input
                          placeholder="Source (e.g., ibm_torino)"
                          value={sense.source}
                          onChange={(e) => {
                            const updated = [...senseBlocks]
                            updated[index].source = e.target.value
                            setSenseBlocks(updated)
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setSenseBlocks([...senseBlocks, { id: Date.now(), source: "", type: "" }])}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add SENSE Block
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="acts" className="space-y-4">
                <div className="space-y-3">
                  {actBlocks.map((act, index) => (
                    <Card key={act.id}>
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>ACT Block {index + 1}</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActBlocks(actBlocks.filter((a) => a.id !== act.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Action (e.g., optimize_circuit)"
                          value={act.action}
                          onChange={(e) => {
                            const updated = [...actBlocks]
                            updated[index].action = e.target.value
                            setActBlocks(updated)
                          }}
                        />
                        <Input
                          placeholder="Method (e.g., quantum_annealing)"
                          value={act.method}
                          onChange={(e) => {
                            const updated = [...actBlocks]
                            updated[index].method = e.target.value
                            setActBlocks(updated)
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setActBlocks([...actBlocks, { id: Date.now(), action: "", method: "" }])}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add ACT Block
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="evolve" className="space-y-4">
                <div className="space-y-2">
                  <Label>Mutation Rate: {mutationRate[0]}</Label>
                  <Slider
                    value={mutationRate}
                    onValueChange={setMutationRate}
                    min={0.01}
                    max={0.2}
                    step={0.01}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Generations: {generations[0]}</Label>
                  <Slider
                    value={generations}
                    onValueChange={setGenerations}
                    min={100}
                    max={10000}
                    step={100}
                    className="py-4"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 mt-6">
              <Button className="flex-1" onClick={downloadOrganism}>
                <Download className="h-4 w-4 mr-2" />
                Download .dna
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Enhance
              </Button>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Code Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Code</CardTitle>
          <CardDescription>Real-time DNA-Lang organism preview</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[700px]">
            <pre className="font-mono text-sm leading-relaxed">
              <code className="dna-code">{generateCode()}</code>
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
