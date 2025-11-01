"""
DNA-Lang Compiler and Interpreter
Quantum Bioinformatics Programming Language
"""
import re
import json
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
import sys

# ============================================================================
# LEXER
# ============================================================================
@dataclass
class Token:
    type: str
    value: str
    line: int
    column: int

class Lexer:
    """Tokenizes DNA-Lang source code"""
    
    KEYWORDS = {
        'organism', 'genome', 'gene', 'encode', 'qubits',
        'quantum_state', 'state', 'superpose', 'entangle', 'measure',
        'control', 'if', 'apply', 'evolve', 'fitness',
        'E_Dampening', 'Darwinism', 'compiler'
    }
    
    TOKEN_PATTERNS = [
        ('NUMBER', r'\d+\.?\d*'),
        ('STRING', r'"[^"]*"'),
        ('IDENTIFIER', r'[a-zA-Z_][a-zA-Z0-9_]*'),
        ('ARROW', r'->'),
        ('LBRACE', r'\{'),
        ('RBRACE', r'\}'),
        ('LPAREN', r'\('),
        ('RPAREN', r'\)'),
        ('LBRACKET', r'\['),
        ('RBRACKET', r'\]'),
        ('SEMICOLON', r';'),
        ('COLON', r':'),
        ('COMMA', r','),
        ('EQUALS', r'=='),
        ('ASSIGN', r'='),
        ('GT', r'>'),
        ('LT', r'<'),
        ('NE', r'!='),
        ('PLUS', r'\+'),
        ('MINUS', r'-'),
        ('STAR', r'\*'),
        ('SLASH', r'/'),
        ('PIPE', r'\|'),
        ('WHITESPACE', r'[ \t]+'),
        ('NEWLINE', r'\n'),
        ('COMMENT', r'#[^\n]*'),
    ]
    
    def __init__(self, source: str):
        self.source = source
        self.tokens: List[Token] = []
        self.line = 1
        self.column = 1
    
    def tokenize(self) -> List[Token]:
        """Convert source code into tokens"""
        pos = 0
        while pos < len(self.source):
            matched = False
            
            for token_type, pattern in self.TOKEN_PATTERNS:
                regex = re.compile(pattern)
                match = regex.match(self.source, pos)
                
                if match:
                    value = match.group(0)
                    
                    if token_type not in ('WHITESPACE', 'COMMENT'):
                        if token_type == 'IDENTIFIER' and value in self.KEYWORDS:
                            token_type = value.upper()
                        
                        self.tokens.append(Token(token_type, value, self.line, self.column))
                    
                    if token_type == 'NEWLINE':
                        self.line += 1
                        self.column = 1
                    else:
                        self.column += len(value)
                    
                    pos = match.end()
                    matched = True
                    break
            
            if not matched:
                raise SyntaxError(f"Unexpected character '{self.source[pos]}' at line {self.line}, column {self.column}")
        
        return self.tokens

# ============================================================================
# PARSER
# ============================================================================
@dataclass
class ASTNode:
    type: str
    value: Any = None
    children: List['ASTNode'] = None
    
    def __post_init__(self):
        if self.children is None:
            self.children = []

class Parser:
    """Parses tokens into Abstract Syntax Tree"""
    
    def __init__(self, tokens: List[Token]):
        self.tokens = tokens
        self.pos = 0
    
    def current_token(self) -> Optional[Token]:
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return None
    
    def consume(self, expected_type: str) -> Token:
        token = self.current_token()
        if not token or token.type != expected_type:
            raise SyntaxError(f"Expected {expected_type}, got {token.type if token else 'EOF'}")
        self.pos += 1
        return token
    
    def parse(self) -> ASTNode:
        """Parse entire program"""
        program = ASTNode('PROGRAM')
        
        while self.current_token():
            if self.current_token().type == 'ORGANISM':
                program.children.append(self.parse_organism())
            else:
                self.pos += 1
        
        return program
    
    def parse_organism(self) -> ASTNode:
        """Parse organism definition"""
        self.consume('ORGANISM')
        name = self.consume('IDENTIFIER')
        self.consume('LBRACE')
        
        organism = ASTNode('ORGANISM', name.value)
        
        while self.current_token() and self.current_token().type != 'RBRACE':
            if self.current_token().type == 'GENOME':
                organism.children.append(self.parse_genome())
            elif self.current_token().type == 'QUANTUM_STATE':
                organism.children.append(self.parse_quantum_state())
            elif self.current_token().type == 'FITNESS':
                organism.children.append(self.parse_fitness())
            else:
                self.pos += 1
        
        self.consume('RBRACE')
        return organism
    
    def parse_genome(self) -> ASTNode:
        """Parse genome block"""
        self.consume('GENOME')
        self.consume('LBRACE')
        
        genome = ASTNode('GENOME')
        
        while self.current_token() and self.current_token().type != 'RBRACE':
            if self.current_token().type == 'GENE':
                genome.children.append(self.parse_gene())
            else:
                self.pos += 1
        
        self.consume('RBRACE')
        return genome
    
    def parse_gene(self) -> ASTNode:
        """Parse gene definition"""
        self.consume('GENE')
        name = self.consume('IDENTIFIER')
        self.consume('ASSIGN')
        self.consume('ENCODE')
        self.consume('LPAREN')
        data_ref = self.consume('IDENTIFIER')
        self.consume('RPAREN')
        self.consume('ARROW')
        self.consume('QUBITS')
        self.consume('LBRACKET')
        num_qubits = self.consume('NUMBER')
        self.consume('RBRACKET')
        self.consume('SEMICOLON')
        
        return ASTNode('GENE', {
            'name': name.value,
            'data_ref': data_ref.value,
            'num_qubits': int(num_qubits.value)
        })
    
    def parse_quantum_state(self) -> ASTNode:
        """Parse quantum_state block"""
        self.consume('QUANTUM_STATE')
        self.consume('LBRACE')
        
        quantum_state = ASTNode('QUANTUM_STATE')
        
        while self.current_token() and self.current_token().type != 'RBRACE':
            token = self.current_token()
            if token.type == 'STATE':
                quantum_state.children.append(self.parse_state())
            elif token.type == 'ENTANGLE':
                quantum_state.children.append(self.parse_entangle())
            elif token.type == 'MEASURE':
                quantum_state.children.append(self.parse_measure())
            else:
                self.pos += 1
        
        self.consume('RBRACE')
        return quantum_state
    
    def parse_state(self) -> ASTNode:
        """Parse state definition"""
        self.consume('STATE')
        name = self.consume('IDENTIFIER')
        self.consume('ASSIGN')
        self.consume('SUPERPOSE')
        self.consume('LPAREN')
        
        params = []
        while self.current_token() and self.current_token().type != 'RPAREN':
            if self.current_token().type == 'COMMA':
                self.consume('COMMA')
            else:
                params.append(self.current_token().value)
                self.pos += 1
        
        self.consume('RPAREN')
        self.consume('SEMICOLON')
        
        return ASTNode('STATE', {'name': name.value, 'params': params})
    
    def parse_entangle(self) -> ASTNode:
        """Parse entangle operation"""
        self.consume('ENTANGLE')
        self.consume('LPAREN')
        qubit1 = self.parse_qubit_ref()
        self.consume('COMMA')
        qubit2 = self.parse_qubit_ref()
        self.consume('RPAREN')
        self.consume('SEMICOLON')
        
        return ASTNode('ENTANGLE', {'qubit1': qubit1, 'qubit2': qubit2})
    
    def parse_measure(self) -> ASTNode:
        """Parse measure operation"""
        self.consume('MEASURE')
        self.consume('LPAREN')
        qubit = self.parse_qubit_ref()
        self.consume('RPAREN')
        self.consume('ARROW')
        result = self.consume('IDENTIFIER')
        self.consume('SEMICOLON')
        
        return ASTNode('MEASURE', {'qubit': qubit, 'result': result.value})
    
    def parse_qubit_ref(self) -> int:
        """Parse qubit reference like q[0]"""
        self.consume('IDENTIFIER')
        self.consume('LBRACKET')
        index = self.consume('NUMBER')
        self.consume('RBRACKET')
        return int(index.value)
    
    def parse_fitness(self) -> ASTNode:
        """Parse fitness definition"""
        self.consume('FITNESS')
        self.consume('ASSIGN')
        
        expression = []
        while self.current_token() and self.current_token().type != 'SEMICOLON':
            expression.append(self.current_token().value)
            self.pos += 1
        
        self.consume('SEMICOLON')
        
        return ASTNode('FITNESS', ' '.join(expression))

# ============================================================================
# CODE GENERATOR
# ============================================================================
class QiskitCodeGenerator:
    """Generates Qiskit circuit code from AST"""
    
    def __init__(self, ast: ASTNode):
        self.ast = ast
        self.code_lines = []
        self.num_qubits = 0
    
    def generate(self) -> str:
        """Generate complete Qiskit code"""
        self.code_lines = [
            "from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister",
            "from qiskit.quantum_info import Statevector",
            "import numpy as np",
            "",
        ]
        
        for organism in self.ast.children:
            if organism.type == 'ORGANISM':
                self.generate_organism(organism)
        
        return '\n'.join(self.code_lines)
    
    def generate_organism(self, organism: ASTNode):
        """Generate code for organism"""
        self.code_lines.append(f"# Organism: {organism.value}")
        self.code_lines.append("")
        
        for child in organism.children:
            if child.type == 'GENOME':
                for gene in child.children:
                    if gene.type == 'GENE':
                        self.num_qubits += gene.value['num_qubits']
        
        self.code_lines.append(f"qc = QuantumCircuit({self.num_qubits})")
        self.code_lines.append("")
        
        for child in organism.children:
            if child.type == 'GENOME':
                self.generate_genome(child)
            elif child.type == 'QUANTUM_STATE':
                self.generate_quantum_state(child)
            elif child.type == 'FITNESS':
                self.generate_fitness(child)
    
    def generate_genome(self, genome: ASTNode):
        """Generate code for genome block"""
        self.code_lines.append("# Genome encoding")
        for gene in genome.children:
            if gene.type == 'GENE':
                name = gene.value['name']
                data_ref = gene.value['data_ref']
                num_qubits = gene.value['num_qubits']
                self.code_lines.append(f"# Gene {name}: encode {data_ref} into {num_qubits} qubits")
        self.code_lines.append("")
    
    def generate_quantum_state(self, quantum_state: ASTNode):
        """Generate code for quantum_state block"""
        self.code_lines.append("# Quantum state preparation")
        
        for stmt in quantum_state.children:
            if stmt.type == 'STATE':
                params = stmt.value['params']
                self.code_lines.append(f"# Superposition: {params}")
                self.code_lines.append("qc.h(0)  # Hadamard for superposition")
            elif stmt.type == 'ENTANGLE':
                q1 = stmt.value['qubit1']
                q2 = stmt.value['qubit2']
                self.code_lines.append(f"qc.cx({q1}, {q2})  # Entangle qubits {q1} and {q2}")
            elif stmt.type == 'MEASURE':
                qubit = stmt.value['qubit']
                self.code_lines.append(f"qc.measure_all()")
        
        self.code_lines.append("")
    
    def generate_fitness(self, fitness: ASTNode):
        """Generate code for fitness function"""
        self.code_lines.append(f"# Fitness function: {fitness.value}")
        self.code_lines.append("")

def ast_to_dict(node: ASTNode) -> Dict:
    """Convert AST to dictionary for JSON serialization"""
    return {
        'type': node.type,
        'value': node.value,
        'children': [ast_to_dict(child) for child in node.children]
    }

# ============================================================================
# COMPILER INTERFACE
# ============================================================================
def compile_dna_lang(source_code: str) -> Dict[str, Any]:
    """Compile DNA-Lang source code to Qiskit circuit"""
    try:
        lexer = Lexer(source_code)
        tokens = lexer.tokenize()
        
        parser = Parser(tokens)
        ast = parser.parse()
        
        codegen = QiskitCodeGenerator(ast)
        qiskit_code = codegen.generate()
        
        return {
            'success': True,
            'qiskit_code': qiskit_code,
            'num_qubits': codegen.num_qubits,
            'ast': ast_to_dict(ast),
            'tokens': [{'type': t.type, 'value': t.value, 'line': t.line} for t in tokens[:50]]
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'error_type': type(e).__name__
        }

if __name__ == '__main__':
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r') as f:
            source = f.read()
        result = compile_dna_lang(source)
        print(json.dumps(result, indent=2))
    else:
        print("Usage: python dnalang-compiler.py <source_file.dna>")
