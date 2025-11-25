// Mocking Coinbase AgentKit for the prototype
// In production, this would import from @coinbase/agentkit

export type AgentStatus = "idle" | "analyzing" | "executing" | "learning"

export interface AgentAction {
  id: string
  type: "trade" | "transfer" | "stake" | "analyze"
  asset: string
  amount?: number
  confidence: number // 0-1 (Quantum Probability)
  reasoning: string
  timestamp: number
}

export interface PortfolioAsset {
  symbol: string
  balance: number
  valueUsd: number
  allocation: number // Percentage
}

// Simulated Swarm State
export const MOCK_PORTFOLIO: PortfolioAsset[] = [
  { symbol: "BTC", balance: 0.45, valueUsd: 42000, allocation: 45 },
  { symbol: "ETH", balance: 12.5, valueUsd: 32000, allocation: 35 },
  { symbol: "SOL", balance: 150, valueUsd: 15000, allocation: 15 },
  { symbol: "USDC", balance: 5000, valueUsd: 5000, allocation: 5 },
]

export const MOCK_AGENTS = [
  {
    id: "ag-01",
    name: "Alpha-Scout",
    role: "Sentiment Analysis",
    status: "analyzing" as AgentStatus,
    specialty: "NLP/Social",
  },
  {
    id: "ag-02",
    name: "Quantum-Quant",
    role: "Predictive Modeling",
    status: "executing" as AgentStatus,
    specialty: "Stochastic Calc",
  },
  {
    id: "ag-03",
    name: "Shield-Risk",
    role: "Risk Management",
    status: "idle" as AgentStatus,
    specialty: "Drawdown Control",
  },
  {
    id: "ag-04",
    name: "Execution-Prime",
    role: "Order Routing",
    status: "idle" as AgentStatus,
    specialty: "Coinbase API",
  },
]

export const generateMarketScenario = () => {
  // Simulates a market event for the "Education Mode"
  const scenarios = [
    {
      event: "Flash Crash Detected",
      impact: "High Volatility",
      action: "Agent 'Shield-Risk' initiated hedging protocol via USDC rotation.",
      lesson:
        "In high volatility (VIX > 30), capital preservation takes precedence over alpha generation. The swarm moves to stablecoins to reduce delta exposure.",
    },
    {
      event: "Arbitrage Opportunity",
      impact: "Price Discrepancy",
      action: "Agent 'Quantum-Quant' identified 0.5% spread on ETH-USD pair.",
      lesson:
        "High-frequency triangular arbitrage requires <50ms execution. The mesh network bypasses central orchestration for direct peer-to-peer execution.",
    },
    {
      event: "Sentiment Spike",
      impact: "Bullish Divergence",
      action: "Agent 'Alpha-Scout' detected 3-sigma sentiment increase on Social Layer.",
      lesson:
        "Sentiment analysis often leads price action. The swarm uses Bayesian updating to increase position sizing when sentiment confirms technicals.",
    },
  ]
  return scenarios[Math.floor(Math.random() * scenarios.length)]
}
