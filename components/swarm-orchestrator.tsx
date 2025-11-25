import { Activity, Shield, Zap, Brain, Radio } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MOCK_AGENTS, type AgentStatus } from "@/lib/coinbase-agent"

export function SwarmOrchestrator() {
  const getIcon = (role: string) => {
    if (role.includes("Sentiment")) return <Radio className="h-4 w-4" />
    if (role.includes("Predictive")) return <Brain className="h-4 w-4" />
    if (role.includes("Risk")) return <Shield className="h-4 w-4" />
    return <Zap className="h-4 w-4" />
  }

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case "executing":
        return "bg-primary text-primary-foreground animate-pulse"
      case "analyzing":
        return "bg-secondary text-secondary-foreground"
      case "learning":
        return "bg-blue-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Mesh Swarm Status
        </CardTitle>
        <Activity className="h-4 w-4 text-primary animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_AGENTS.map((agent) => (
          <div
            key={agent.id}
            className="group flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md bg-muted/50 text-foreground group-hover:text-primary transition-colors`}>
                {getIcon(agent.role)}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{agent.name}</p>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline-block">
                {agent.specialty}
              </span>
              <Badge variant="outline" className={`border-0 text-[10px] uppercase ${getStatusColor(agent.status)}`}>
                {agent.status}
              </Badge>
            </div>
          </div>
        ))}

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex justify-between items-center text-xs text-muted-foreground font-mono">
            <span>Swarm Coherence</span>
            <span className="text-primary">98.4%</span>
          </div>
          <div className="w-full bg-muted/50 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[98.4%] shadow-[0_0_10px_var(--color-primary)]" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
