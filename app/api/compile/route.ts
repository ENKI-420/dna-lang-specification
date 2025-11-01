import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ success: false, error: "No code provided" }, { status: 400 })
    }

    // Compile DNA-Lang code using the integrated compiler
    const result = compileDNALang(code)
    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Compilation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
        error_type: "ServerError",
      },
      { status: 500 },
    )
  }
}

function compileDNALang(code: string): any {
  try {
    // Tokenize
    const tokens = tokenize(code)

    // Parse
    const ast = parse(tokens)

    // Generate Qiskit code
    const qiskitCode = generateQiskit(ast)

    // Count qubits
    const numQubits = countQubits(ast)

    return {
      success: true,
      qiskit_code: qiskitCode,
      num_qubits: numQubits,
      ast: ast,
      tokens: tokens.slice(0, 50).map((t) => ({
        type: t.type,
        value: t.value,
        line: t.line,
      })),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Compilation failed",
      error_type: error instanceof Error ? error.constructor.name : "Error",
    }
  }
}

interface Token {
  type: string
  value: string
  line: number
  column: number
}

function tokenize(source: string): Token[] {
  const keywords = new Set([
    "organism",
    "genome",
    "gene",
    "encode",
    "qubits",
    "quantum_state",
    "state",
    "superpose",
    "entangle",
    "measure",
    "control",
    "if",
    "apply",
    "evolve",
    "fitness",
  ])

  const patterns = [
    { type: "NUMBER", regex: /\d+\.?\d*/ },
    { type: "STRING", regex: /"[^"]*"/ },
    { type: "IDENTIFIER", regex: /[a-zA-Z_][a-zA-Z0-9_]*/ },
    { type: "ARROW", regex: /->/ },
    { type: "LBRACE", regex: /\{/ },
    { type: "RBRACE", regex: /\}/ },
    { type: "LPAREN", regex: /\(/ },
    { type: "RPAREN", regex: /\)/ },
    { type: "LBRACKET", regex: /\[/ },
    { type: "RBRACKET", regex: /\]/ },
    { type: "SEMICOLON", regex: /;/ },
    { type: "COLON", regex: /:/ },
    { type: "COMMA", regex: /,/ },
    { type: "EQUALS", regex: /==/ },
    { type: "ASSIGN", regex: /=/ },
    { type: "PIPE", regex: /\|/ },
    { type: "GT", regex: />/ },
    { type: "LT", regex: /</ },
    { type: "PLUS", regex: /\+/ },
    { type: "MINUS", regex: /-/ },
    { type: "STAR", regex: /\*/ },
    { type: "SLASH", regex: /\// },
  ]

  const tokens: Token[] = []
  let pos = 0
  let line = 1
  let column = 1

  while (pos < source.length) {
    // Skip whitespace
    if (/\s/.test(source[pos])) {
      if (source[pos] === "\n") {
        line++
        column = 1
      } else {
        column++
      }
      pos++
      continue
    }

    // Skip comments
    if (source[pos] === "#") {
      while (pos < source.length && source[pos] !== "\n") {
        pos++
      }
      continue
    }

    let matched = false
    for (const { type, regex } of patterns) {
      const match = source.slice(pos).match(new RegExp(`^${regex.source}`))
      if (match) {
        let tokenType = type
        const value = match[0]

        // Check if identifier is keyword
        if (type === "IDENTIFIER" && keywords.has(value)) {
          tokenType = value.toUpperCase()
        }

        tokens.push({ type: tokenType, value, line, column })
        pos += value.length
        column += value.length
        matched = true
        break
      }
    }

    if (!matched) {
      throw new Error(`Unexpected character '${source[pos]}' at line ${line}, column ${column}`)
    }
  }

  return tokens
}

function parse(tokens: Token[]): any {
  let pos = 0

  function current() {
    return tokens[pos]
  }

  function consume(expectedType: string) {
    const token = current()
    if (!token || token.type !== expectedType) {
      throw new Error(`Expected ${expectedType}, got ${token?.type || "EOF"}`)
    }
    pos++
    return token
  }

  function parseProgram() {
    const organisms = []
    while (current()) {
      if (current().type === "ORGANISM") {
        organisms.push(parseOrganism())
      } else {
        pos++
      }
    }
    return { type: "PROGRAM", organisms }
  }

  function parseOrganism() {
    consume("ORGANISM")
    const name = consume("IDENTIFIER").value
    consume("LBRACE")

    const genome = []
    const quantumState = []
    let fitness = null

    while (current() && current().type !== "RBRACE") {
      if (current().type === "GENOME") {
        genome.push(...parseGenome())
      } else if (current().type === "QUANTUM_STATE") {
        quantumState.push(...parseQuantumState())
      } else if (current().type === "FITNESS") {
        fitness = parseFitness()
      } else {
        pos++
      }
    }

    consume("RBRACE")
    return { type: "ORGANISM", name, genome, quantumState, fitness }
  }

  function parseGenome() {
    consume("GENOME")
    consume("LBRACE")

    const genes = []
    while (current() && current().type !== "RBRACE") {
      if (current().type === "GENE") {
        genes.push(parseGene())
      } else {
        pos++
      }
    }

    consume("RBRACE")
    return genes
  }

  function parseGene() {
    consume("GENE")
    const name = consume("IDENTIFIER").value
    consume("ASSIGN")
    consume("ENCODE")
    consume("LPAREN")
    const dataRef = consume("IDENTIFIER").value
    consume("RPAREN")
    consume("ARROW")
    consume("QUBITS")
    consume("LBRACKET")
    const numQubits = Number.parseInt(consume("NUMBER").value)
    consume("RBRACKET")
    consume("SEMICOLON")

    return { type: "GENE", name, dataRef, numQubits }
  }

  function parseQuantumState() {
    consume("QUANTUM_STATE")
    consume("LBRACE")

    const operations = []
    while (current() && current().type !== "RBRACE") {
      if (current().type === "STATE") {
        operations.push(parseState())
      } else if (current().type === "ENTANGLE") {
        operations.push(parseEntangle())
      } else if (current().type === "MEASURE") {
        operations.push(parseMeasure())
      } else {
        pos++
      }
    }

    consume("RBRACE")
    return operations
  }

  function parseState() {
    consume("STATE")
    const name = consume("IDENTIFIER").value
    consume("ASSIGN")
    consume("SUPERPOSE")
    consume("LPAREN")

    const params = []
    while (current() && current().type !== "RPAREN") {
      if (current().type === "COMMA") {
        consume("COMMA")
      } else {
        params.push(current().value)
        pos++
      }
    }

    consume("RPAREN")
    consume("SEMICOLON")

    return { type: "STATE", name, params }
  }

  function parseEntangle() {
    consume("ENTANGLE")
    consume("LPAREN")
    const q1 = parseQubitRef()
    consume("COMMA")
    const q2 = parseQubitRef()
    consume("RPAREN")
    consume("SEMICOLON")

    return { type: "ENTANGLE", qubit1: q1, qubit2: q2 }
  }

  function parseMeasure() {
    consume("MEASURE")
    consume("LPAREN")
    const qubit = parseQubitRef()
    consume("RPAREN")
    consume("ARROW")
    const result = consume("IDENTIFIER").value
    consume("SEMICOLON")

    return { type: "MEASURE", qubit, result }
  }

  function parseQubitRef() {
    consume("IDENTIFIER")
    consume("LBRACKET")
    const index = Number.parseInt(consume("NUMBER").value)
    consume("RBRACKET")
    return index
  }

  function parseFitness() {
    consume("FITNESS")
    consume("ASSIGN")

    const expr = []
    while (current() && current().type !== "SEMICOLON") {
      expr.push(current().value)
      pos++
    }

    consume("SEMICOLON")
    return expr.join(" ")
  }

  return parseProgram()
}

function generateQiskit(ast: any): string {
  const lines = [
    "from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister",
    "from qiskit.quantum_info import Statevector",
    "import numpy as np",
    "",
  ]

  for (const organism of ast.organisms) {
    lines.push(`# Organism: ${organism.name}`)
    lines.push("")

    const numQubits = organism.genome.reduce((sum: number, gene: any) => sum + gene.numQubits, 0)
    lines.push(`qc = QuantumCircuit(${numQubits})`)
    lines.push("")

    if (organism.genome.length > 0) {
      lines.push("# Genome encoding")
      for (const gene of organism.genome) {
        lines.push(`# Gene ${gene.name}: encode ${gene.dataRef} into ${gene.numQubits} qubits`)
      }
      lines.push("")
    }

    if (organism.quantumState.length > 0) {
      lines.push("# Quantum state preparation")
      for (const op of organism.quantumState) {
        if (op.type === "STATE") {
          lines.push(`# Superposition: ${op.params.join(", ")}`)
          lines.push("qc.h(0)  # Hadamard for superposition")
        } else if (op.type === "ENTANGLE") {
          lines.push(`qc.cx(${op.qubit1}, ${op.qubit2})  # Entangle qubits ${op.qubit1} and ${op.qubit2}`)
        } else if (op.type === "MEASURE") {
          lines.push("qc.measure_all()")
        }
      }
      lines.push("")
    }

    if (organism.fitness) {
      lines.push(`# Fitness function: ${organism.fitness}`)
      lines.push("")
    }
  }

  return lines.join("\n")
}

function countQubits(ast: any): number {
  let total = 0
  for (const organism of ast.organisms) {
    for (const gene of organism.genome) {
      total += gene.numQubits
    }
  }
  return total
}
