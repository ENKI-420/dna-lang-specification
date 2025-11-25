"use client"

import { useState, useEffect } from "react"
import { BookOpen, GraduationCap, ChevronRight, PlayCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateMarketScenario } from "@/lib/coinbase-agent"

export function EducationPanel({ isActive }: { isActive: boolean }) {
  const [scenario, setScenario] = useState<ReturnType<typeof generateMarketScenario> | null>(null)

  useEffect(() => {
    if (isActive) {
      // Initial scenario
      setScenario(generateMarketScenario())
      const interval = setInterval(() => {
        setScenario(generateMarketScenario())
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <Card className="h-full border-l border-border bg-card/95 backdrop-blur shadow-2xl">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <CardTitle>University Mode</CardTitle>
        </div>
        <CardDescription>Real-time analysis of Swarm logic</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Lesson</h3>
              <div className="text-lg font-semibold">{scenario?.event || "Initializing..."}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{scenario?.lesson}</p>
            </div>

            <Card className="bg-muted/30 border-primary/20">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-mono text-primary flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Live Action Trace
                </CardTitle>
              </CardHeader>
              <CardContent className="py-3 text-xs font-mono bg-black/20">{scenario?.action}</CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Curriculum</h3>
              {[
                "Quantum Probability in Finance",
                "Risk Management & Position Sizing",
                "Algorithmic Execution Strategies",
                "Market Microstructure Analysis",
              ].map((course, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 cursor-pointer group transition-colors border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium">{course}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border bg-muted/20">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <BookOpen className="mr-2 h-4 w-4" />
            Start Full Course
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
