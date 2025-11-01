declare module "*.dna" {
  import type { ComponentType } from "react"
  const component: ComponentType<any>
  export default component
  export * from "*.tsx"
}

// DNA-Lang quantum primitives
declare global {
  namespace DNALang {
    interface Organism {
      genome: Genome
      consciousness: Consciousness
      fitness: number
    }

    interface Genome {
      genes: Gene[]
      mutations: number
      generation: number
    }

    interface Gene {
      name: string
      qubits: number
      expression: string
    }

    interface Consciousness {
      phi: number
      coherence: number
      awareness: number
    }
  }
}

export {}
