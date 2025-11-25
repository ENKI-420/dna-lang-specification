"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal, Send, Cpu, Activity, Shield } from "lucide-react"

interface LogEntry {
  id: number
  timestamp: string
  type: "info" | "success" | "warning" | "error" | "system"
  message: string
}

export function TerminalInterface() {
  const [input, setInput] = useState("")
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: new Date().toLocaleTimeString(),
      type: "system",
      message: "DNA-Lang Quantum Kernel v4.2.0 initialized",
    },
    {
      id: 2,
      timestamp: new Date().toLocaleTimeString(),
      type: "info",
      message: "Connected to IBM Torino Quantum Processor",
    },
    {
      id: 3,
      timestamp: new Date().toLocaleTimeString(),
      type: "success",
      message: "Biological substrate stable. Mitosis rate: nominal.",
    },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.trim()
    const newLog: LogEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      type: "info",
      message: `> ${cmd}`,
    }

    setLogs((prev) => [...prev, newLog])
    setInput("")

    // Simulate command processing
    setTimeout(() => {
      processCommand(cmd)
    }, 500)
  }

  const processCommand = (cmd: string) => {
    const response: LogEntry = {
      id: Date.now() + 1,
      timestamp: new Date().toLocaleTimeString(),
      type: "info",
      message: "",
    }

    const lowerCmd = cmd.toLowerCase()

    if (lowerCmd === "help") {
      response.message = `Available commands:
- status: Check system health and quantum coherence
- evolve: Trigger forced evolution cycle
- synthesize: Generate new protein/code structures
- clear: Clear terminal output
- version: Show kernel version`
    } else if (lowerCmd === "status") {
      response.type = "success"
      response.message = `SYSTEM STATUS:
[OK] Quantum Coherence: 99.9%
[OK] Biological Age: Gen 42
[OK] Immune System: Active (0 threats)
[OK] Entanglement Density: 8.4 qubits/nm`
    } else if (lowerCmd.startsWith("evolve")) {
      response.type = "warning"
      response.message = `Initiating forced evolution cycle...
Mutation rate set to 0.15
Selecting fittest organisms...
Evolution complete. Generation incremented.`
    } else if (lowerCmd === "synthesize") {
      response.type = "success"
      response.message = `Synthesizing new code proteins...
Folding structures...
Optimization complete. New capabilities unlocked.`
    } else if (lowerCmd === "clear") {
      setLogs([])
      return
    } else if (lowerCmd === "version") {
      response.message = "DNA-Lang v4.2.0 (Quantum-Biological Build)"
    } else {
      response.type = "error"
      response.message = `Command not recognized: ${cmd}. Type 'help' for available commands.`
    }

    setLogs((prev) => [...prev, response])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* System Stats Sidebar */}
      <Card className="lg:col-span-1 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-sm font-mono uppercase text-muted-foreground">System Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <Cpu className="h-4 w-4" />
              <span className="font-mono text-sm">QPU Load</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-accent w-[45%] animate-pulse" />
            </div>
            <div className="text-xs text-right font-mono">45%</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-chart-1">
              <Activity className="h-4 w-4" />
              <span className="font-mono text-sm">Bio-Activity</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-chart-1 w-[78%] animate-pulse" />
            </div>
            <div className="text-xs text-right font-mono">78%</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-chart-2">
              <Shield className="h-4 w-4" />
              <span className="font-mono text-sm">Immune Integrity</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-chart-2 w-[99%]" />
            </div>
            <div className="text-xs text-right font-mono">99.9%</div>
          </div>
        </CardContent>
      </Card>

      {/* Terminal Window */}
      <Card className="lg:col-span-3 flex flex-col overflow-hidden border-accent/20 shadow-[0_0_30px_rgba(0,217,255,0.1)]">
        <CardHeader className="bg-muted/50 border-b border-border py-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-accent" />
            <span className="font-mono text-sm">dnalang-cli — bash — 80x24</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col min-h-0 bg-black/40">
          <ScrollArea className="flex-1 p-4 font-mono text-sm">
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-muted-foreground shrink-0">[{log.timestamp}]</span>
                  <span
                    className={
                      log.type === "error"
                        ? "text-destructive"
                        : log.type === "success"
                          ? "text-green-400"
                          : log.type === "warning"
                            ? "text-yellow-400"
                            : log.type === "system"
                              ? "text-accent font-bold"
                              : "text-foreground"
                    }
                  >
                    {log.message.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </span>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border bg-card/50">
            <form onSubmit={handleCommand} className="flex gap-2">
              <span className="text-accent font-mono py-2">$</span>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="font-mono border-none bg-transparent focus-visible:ring-0 px-0"
                placeholder="Type a command..."
                autoFocus
              />
              <button type="submit" className="text-accent hover:text-accent/80">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
