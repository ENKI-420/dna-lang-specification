"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react"

interface Organism {
  id: number
  fitness: number
  generation: number
  genes: number[]
  alive: boolean
}

export function EvolutionSimulator() {
  const [population, setPopulation] = useState<Organism[]>([])
  const [generation, setGeneration] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [populationSize, setPopulationSize] = useState([50])
  const [mutationRate, setMutationRate] = useState([0.05])
  const [elitism, setElitism] = useState(true)
  const [selectionPressure, setSelectionPressure] = useState([0.7])
  const [fitnessHistory, setFitnessHistory] = useState<{ gen: number; avg: number; max: number }[]>([])

  // Initialize population
  const initializePopulation = () => {
    const newPop: Organism[] = []
    for (let i = 0; i < populationSize[0]; i++) {
      newPop.push({
        id: i,
        fitness: Math.random(),
        generation: 0,
        genes: Array.from({ length: 10 }, () => Math.random()),
        alive: true,
      })
    }
    setPopulation(newPop)
    setGeneration(0)
    setFitnessHistory([])
  }

  // Evolution step
  const evolveGeneration = () => {
    setPopulation((prev) => {
      // Calculate fitness
      const withFitness = prev.map((org) => ({
        ...org,
        fitness: org.genes.reduce((sum, gene) => sum + gene, 0) / org.genes.length,
      }))

      // Sort by fitness
      const sorted = [...withFitness].sort((a, b) => b.fitness - a.fitness)

      // Selection
      const survivors = sorted.slice(0, Math.floor(sorted.length * selectionPressure[0]))

      // Elitism - keep top performers
      const elite = elitism ? sorted.slice(0, Math.floor(sorted.length * 0.1)) : []

      // Breeding
      const offspring: Organism[] = []
      while (offspring.length + elite.length < populationSize[0]) {
        const parent1 = survivors[Math.floor(Math.random() * survivors.length)]
        const parent2 = survivors[Math.floor(Math.random() * survivors.length)]

        // Crossover
        const crossoverPoint = Math.floor(Math.random() * parent1.genes.length)
        const childGenes = [...parent1.genes.slice(0, crossoverPoint), ...parent2.genes.slice(crossoverPoint)]

        // Mutation
        const mutatedGenes = childGenes.map((gene) => (Math.random() < mutationRate[0] ? Math.random() : gene))

        offspring.push({
          id: Date.now() + offspring.length,
          fitness: 0,
          generation: generation + 1,
          genes: mutatedGenes,
          alive: true,
        })
      }

      return [...elite, ...offspring]
    })

    // Update fitness history
    const avgFitness = population.reduce((sum, org) => sum + org.fitness, 0) / population.length
    const maxFitness = Math.max(...population.map((org) => org.fitness))
    setFitnessHistory((prev) => [...prev.slice(-50), { gen: generation, avg: avgFitness, max: maxFitness }])

    setGeneration((prev) => prev + 1)
  }

  // Auto-evolution
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      evolveGeneration()
    }, 500)

    return () => clearInterval(interval)
  }, [isRunning, generation])

  // Initialize on mount
  useEffect(() => {
    initializePopulation()
  }, [])

  const topOrganisms = [...population].sort((a, b) => b.fitness - a.fitness).slice(0, 10)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Evolution Controls</CardTitle>
          <CardDescription>Configure genetic algorithm parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Population Size: {populationSize[0]}</Label>
            <Slider
              value={populationSize}
              onValueChange={setPopulationSize}
              min={10}
              max={200}
              step={10}
              disabled={isRunning}
            />
          </div>

          <div className="space-y-2">
            <Label>Mutation Rate: {(mutationRate[0] * 100).toFixed(0)}%</Label>
            <Slider value={mutationRate} onValueChange={setMutationRate} min={0.01} max={0.2} step={0.01} />
          </div>

          <div className="space-y-2">
            <Label>Selection Pressure: {(selectionPressure[0] * 100).toFixed(0)}%</Label>
            <Slider value={selectionPressure} onValueChange={setSelectionPressure} min={0.1} max={1.0} step={0.1} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="elitism">Elitism</Label>
            <Switch id="elitism" checked={elitism} onCheckedChange={setElitism} />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setIsRunning(!isRunning)} className="flex-1">
              {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isRunning ? "Pause" : "Run"}
            </Button>
            <Button onClick={evolveGeneration} variant="outline" disabled={isRunning} className="bg-transparent">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button onClick={initializePopulation} variant="outline" disabled={isRunning} className="bg-transparent">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Generation</span>
              <span className="font-bold">{generation}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Population</span>
              <span className="font-bold">{population.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg Fitness</span>
              <span className="font-bold">
                {(population.reduce((sum, org) => sum + org.fitness, 0) / population.length).toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Max Fitness</span>
              <span className="font-bold">{Math.max(...population.map((org) => org.fitness)).toFixed(3)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fitness Graph */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Fitness Landscape</CardTitle>
          <CardDescription>Population fitness evolution over generations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 border border-border rounded-lg p-4 mb-6">
            <svg width="100%" height="100%" className="overflow-visible">
              <defs>
                <linearGradient id="fitnessGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="oklch(0.65 0.18 145)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="oklch(0.65 0.18 145)" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Max fitness line */}
              {fitnessHistory.length > 1 && (
                <polyline
                  points={fitnessHistory
                    .map((point, i) => {
                      const x = (i / fitnessHistory.length) * 100
                      const y = 100 - point.max * 80
                      return `${x}%,${y}%`
                    })
                    .join(" ")}
                  fill="none"
                  stroke="oklch(0.65 0.18 145)"
                  strokeWidth="3"
                />
              )}

              {/* Avg fitness line */}
              {fitnessHistory.length > 1 && (
                <polyline
                  points={fitnessHistory
                    .map((point, i) => {
                      const x = (i / fitnessHistory.length) * 100
                      const y = 100 - point.avg * 80
                      return `${x}%,${y}%`
                    })
                    .join(" ")}
                  fill="none"
                  stroke="oklch(0.75 0.12 200)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}

              {/* Area fill */}
              {fitnessHistory.length > 1 && (
                <polygon
                  points={`0%,100% ${fitnessHistory
                    .map((point, i) => {
                      const x = (i / fitnessHistory.length) * 100
                      const y = 100 - point.max * 80
                      return `${x}%,${y}%`
                    })
                    .join(" ")} 100%,100%`}
                  fill="url(#fitnessGradient)"
                />
              )}
            </svg>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[oklch(0.65_0.18_145)]" />
              <span>Max Fitness</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[oklch(0.75_0.12_200)] border-dashed" />
              <span>Avg Fitness</span>
            </div>
          </div>

          {/* Top Organisms */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Top 10 Organisms</h3>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {topOrganisms.map((org, index) => (
                  <div key={org.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Badge variant={index === 0 ? "default" : "outline"}>#{index + 1}</Badge>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Organism {org.id}</div>
                      <div className="text-xs text-muted-foreground">Gen {org.generation}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{org.fitness.toFixed(3)}</div>
                      <div className="text-xs text-muted-foreground">fitness</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
