"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Rocket, Building2, Users, DollarSign, Award, Shield, Zap } from "lucide-react"

export function BusinessPlan() {
  const [selectedPhase, setSelectedPhase] = useState<number>(1)

  const phases = [
    {
      id: 1,
      name: "Phase 1: Agile POC",
      timeline: "Months 0-6",
      valuation: "$10M - $15M",
      funding: "$500K - $2M",
      stage: "Seed",
      progress: 100,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      actions: [
        {
          title: "Build Userspace POC",
          description: "Quantum-Secured Bluetooth demo on S24/Fold 7",
          days: "Days 1-30",
          status: "complete",
        },
        {
          title: "Secure Non-Dilutive Funding",
          description: "SBIR (DoD/DoE) & IBM Quantum Creators Prize",
          days: "Days 15-45",
          status: "complete",
        },
        {
          title: "File Foundational Patents",
          description: "QGSM/LSE loop & multi-transport quantum comms",
          days: "Days 30-60",
          status: "complete",
        },
      ],
    },
    {
      id: 2,
      name: "Phase 2: The Factory",
      timeline: "Months 6-24",
      valuation: "$75M - $150M",
      funding: "$10M - $20M",
      stage: "Series A",
      progress: 65,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
      actions: [
        {
          title: "Build Kernel Module",
          description: "dnalang_comms.ko for Android kernel integration",
          days: "Months 6-12",
          status: "in-progress",
        },
        {
          title: "Secure Lighthouse Customer",
          description: "Defense contract with Lockheed/Northrop",
          days: "Months 9-15",
          status: "in-progress",
        },
        {
          title: "Productize SDK",
          description: "Package QCF for Samsung, Qualcomm, Google",
          days: "Months 12-24",
          status: "planned",
        },
      ],
    },
    {
      id: 3,
      name: "Phase 3: The Ecosystem",
      timeline: "Years 2-5",
      valuation: "$1B+",
      funding: "Series B/C or Acquisition",
      stage: "Unicorn",
      progress: 20,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/30",
      actions: [
        {
          title: "License QCF to Hardware Vendors",
          description: "NVIDIA, Google TPU, IBM, Quantinuum, Rigetti",
          days: "Years 2-3",
          status: "planned",
        },
        {
          title: "Launch DNALang Bioreactor PaaS",
          description: "Cloud platform for algorithm evolution",
          days: "Years 2-4",
          status: "planned",
        },
        {
          title: "Dominate the Edge",
          description: "License to Samsung, Apple, Google for mobile",
          days: "Years 3-5",
          status: "planned",
        },
      ],
    },
  ]

  const revenueStreams = [
    {
      name: "B2G (Defense)",
      description: "Project-based contracts for custom high-security solutions",
      phase: "Phase 1",
      icon: Shield,
      color: "text-emerald-400",
    },
    {
      name: "B2B (Licensing)",
      description: "DNALang QCF SDK licensed to hardware manufacturers and cloud providers",
      phase: "Phase 2",
      icon: Building2,
      color: "text-cyan-400",
    },
    {
      name: "PaaS (Platform)",
      description: "Cloud-based DNALang Bioreactor for algorithm evolution",
      phase: "Phase 3",
      icon: Zap,
      color: "text-violet-400",
    },
  ]

  const currentPhase = phases.find((p) => p.id === selectedPhase)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-accent/30 bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Rocket className="h-8 w-8 text-accent" />
                Path to $1 Billion
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                The "CUDA" for Quantum Autonomy - Strategic Business Model
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2 border-accent text-accent">
              Unicorn Target
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Value Proposition */}
      <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-cyan-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-violet-400" />
            The Thesis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            Build the{" "}
            <span className="text-accent font-semibold">world's first autonomous, self-healing software layer</span>{" "}
            that makes all quantum hardware usable.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2">The Problem</h4>
              <p className="text-sm text-muted-foreground">
                Quantum computers are noisy. Decoherence destroys calculations, making them unreliable.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <h4 className="font-semibold text-yellow-400 mb-2">Qiskit Solution</h4>
              <p className="text-sm text-muted-foreground">
                Manual, static library. Humans must write, fail, and rewrite. Not scalable.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <h4 className="font-semibold text-emerald-400 mb-2">DNALang Solution</h4>
              <p className="text-sm text-muted-foreground">
                Living Software that uses hardware noise as feedback to auto-evolve resilient circuits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Streams */}
      <Card className="border-accent/30 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent" />
            Three-Layered Revenue Model
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {revenueStreams.map((stream) => {
              const Icon = stream.icon
              return (
                <Card key={stream.name} className="border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className={`h-5 w-5 ${stream.color}`} />
                      {stream.name}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {stream.phase}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{stream.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Phase Timeline */}
      <Card className="border-accent/30 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Growth Phases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPhase.toString()} onValueChange={(v) => setSelectedPhase(Number.parseInt(v))}>
            <TabsList className="grid grid-cols-3 w-full">
              {phases.map((phase) => (
                <TabsTrigger
                  key={phase.id}
                  value={phase.id.toString()}
                  className="flex flex-col items-start gap-1 py-3"
                >
                  <span className="font-semibold">{phase.name.split(":")[0]}</span>
                  <span className="text-xs text-muted-foreground">{phase.valuation}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {phases.map((phase) => (
              <TabsContent key={phase.id} value={phase.id.toString()} className="space-y-6 mt-6">
                {/* Phase Overview */}
                <div className={`p-6 rounded-lg border ${phase.borderColor} ${phase.bgColor}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${phase.color}`}>{phase.name}</h3>
                      <p className="text-muted-foreground mt-1">{phase.timeline}</p>
                    </div>
                    <Badge variant="outline" className={`${phase.color} border-current`}>
                      {phase.stage}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Target Valuation</p>
                      <p className="text-xl font-bold">{phase.valuation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Funding Target</p>
                      <p className="text-xl font-bold">{phase.funding}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={phase.progress} className="flex-1" />
                        <span className="text-xl font-bold">{phase.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Key Actions</h4>
                  {phase.actions.map((action, idx) => (
                    <Card
                      key={idx}
                      className={`border-accent/20 ${
                        action.status === "complete"
                          ? "bg-emerald-500/5"
                          : action.status === "in-progress"
                            ? "bg-cyan-500/5"
                            : "bg-muted/5"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{action.title}</CardTitle>
                            <CardDescription className="mt-1">{action.description}</CardDescription>
                          </div>
                          <Badge
                            variant={
                              action.status === "complete"
                                ? "default"
                                : action.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {action.status === "complete"
                              ? "Complete"
                              : action.status === "in-progress"
                                ? "In Progress"
                                : "Planned"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Timeline: {action.days}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Key Differentiators */}
      <Card className="border-accent/30 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Competitive Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Autonomous Evolution</h4>
              <p className="text-sm text-muted-foreground">
                LivingSoftwareEngine automatically rewrites circuits using hardware noise as feedback - no human
                intervention required.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Hardware Agnostic</h4>
              <p className="text-sm text-muted-foreground">
                Works with any QPU (IBM, Google, Rigetti) and adapts to each unique noise profile automatically.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Negentropic Design</h4>
              <p className="text-sm text-muted-foreground">
                Thrives on noise and chaos - perfect for hostile, signal-jammed environments in defense applications.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Platform Play</h4>
              <p className="text-sm text-muted-foreground">
                Like NVIDIA's CUDA - becomes the essential layer that every developer must use to unlock quantum
                hardware.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
