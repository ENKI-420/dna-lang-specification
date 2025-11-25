"use client"

import { useState, useEffect } from "react"
import { TrendingUp, RefreshCcw, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TradingInterface({ mode }: { mode: "autonomous" | "educational" }) {
  const [btcPrice, setBtcPrice] = useState(42000)

  // Simulate live price feed
  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice((prev) => prev + (Math.random() - 0.5) * 50)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Portfolio Header */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">$94,500.00</div>
            <p className="text-xs text-muted-foreground">+20.1% from last epoch</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Alpha</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-green-500">+$1,234.00</div>
            <p className="text-xs text-muted-foreground">Swarm efficiency: 94%</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <RefreshCcw className="h-4 w-4 text-purple-500 animate-spin-slow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">4/4</div>
            <p className="text-xs text-muted-foreground">Full coherence achieved</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BTC/USD</CardTitle>
            <span className="text-xs font-mono text-muted-foreground">LIVE</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-primary">${btcPrice.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Quantum Confidence: 87%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart Area */}
      <Card className="flex-1 bg-card/50 border-border/50 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <CardHeader className="relative z-10 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Market Analysis</CardTitle>
            <CardDescription>Quantum-Enhanced Technical Indicators</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              1H
            </Button>
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              4H
            </Button>
            <Button variant="outline" size="sm" className="h-8 bg-primary/20 text-primary border-primary/50">
              1D
            </Button>
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              1W
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 h-[400px] flex items-center justify-center border-t border-border/50 bg-black/20">
          <div className="text-muted-foreground flex flex-col items-center gap-4">
            <p className="text-sm">Quantum Probability Cloud Rendering...</p>
            {/* Visual placeholder for chart */}
            <div className="w-[600px] h-[200px] flex items-end gap-1 opacity-50">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-primary/50 hover:bg-primary transition-all duration-300 w-full rounded-t-sm"
                  style={{ height: `${30 + Math.random() * 50}%` }}
                />
              ))}
            </div>
          </div>

          {mode === "autonomous" && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-primary/30 p-4 rounded-lg w-64">
              <h4 className="text-xs font-semibold text-primary mb-2 uppercase">Pending Swarm Actions</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Buy BTC</span>
                  <span className="text-green-500">+$12,000</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Hedge ETH</span>
                  <span className="text-yellow-500">-$3,400</span>
                </div>
                <div className="h-1 bg-muted rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-primary w-2/3 animate-[shimmer_2s_infinite]" />
                </div>
                <p className="text-[10px] text-muted-foreground text-right mt-1">Executing in 1.2s</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
