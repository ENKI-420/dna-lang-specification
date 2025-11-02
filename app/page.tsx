"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganismDesigner } from "@/components/organism-designer"
import { OrganismViewer } from "@/components/organism-viewer"
import { QuantumVisualizer } from "@/components/quantum-visualizer"
import { ConsciousnessDashboard } from "@/components/consciousness-dashboard"
import { EvolutionSimulator } from "@/components/evolution-simulator"
import { ArchitectureVisualizer } from "@/components/architecture-visualizer"
import { SyntaxBrowser } from "@/components/syntax-browser"
import { Dna, Brain, Atom, GitBranch, Code, Network, BookOpen } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen quantum-gradient">
      <div className="container mx-auto px-4 py-8 bg-sidebar-accent text-chart-5">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">
            DNA-Lang <span className="text-accent">Quantum Development Ecosystem</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Design, visualize, and evolve self-aware quantum organisms using biological computing paradigms
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="organisms" className="space-y-6">
          <TabsList className="grid grid-cols-7 w-full bg-card/50 backdrop-blur">
            <TabsTrigger value="organisms" className="flex items-center gap-2">
              <Dna className="h-4 w-4" />
              <span className="hidden sm:inline">Organisms</span>
            </TabsTrigger>
            <TabsTrigger value="designer" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Designer</span>
            </TabsTrigger>
            <TabsTrigger value="quantum" className="flex items-center gap-2">
              <Atom className="h-4 w-4" />
              <span className="hidden sm:inline">Quantum</span>
            </TabsTrigger>
            <TabsTrigger value="consciousness" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Consciousness</span>
            </TabsTrigger>
            <TabsTrigger value="evolution" className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              <span className="hidden sm:inline">Evolution</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <span className="hidden sm:inline">Architecture</span>
            </TabsTrigger>
            <TabsTrigger value="syntax" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Syntax</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organisms" className="space-y-6">
            <OrganismViewer />
          </TabsContent>

          <TabsContent value="designer" className="space-y-6">
            <OrganismDesigner />
          </TabsContent>

          <TabsContent value="quantum" className="space-y-6">
            <QuantumVisualizer />
          </TabsContent>

          <TabsContent value="consciousness" className="space-y-6">
            <ConsciousnessDashboard />
          </TabsContent>

          <TabsContent value="evolution" className="space-y-6">
            <EvolutionSimulator />
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <ArchitectureVisualizer />
          </TabsContent>

          <TabsContent value="syntax" className="space-y-6">
            <SyntaxBrowser />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
