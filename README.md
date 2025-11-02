# DNA Language Specification

Status: Draft — Advanced specification for the DNA domain language.

This repository contains a complete, advanced specification for the "DNA" language — a concise, expressive domain-specific language designed for describing sequences, modular transformations, and composable pipelines. This README is an enhanced, developer-focused reference intended for implementers, language designers, tool builders, and advanced users. It omits any third-party branding references.

Table of contents
- Project overview
- Design goals & guiding principles
- Language concepts at a glance
- Syntax and formal grammar
- Data types & values
- Operators and expressions
- Modules, namespaces, and imports
- Macros & metaprogramming
- Error model and diagnostics
- Examples and idioms
- Tooling & integration points
- Testing & conformance
- Roadmap
- Contributing
- License

Project overview
DNA is a small, composable domain language focused on describing sequences of operations and transformations in a concise, readable way. The specification is intentionally precise so that multiple independent implementations (interpreters, compilers, analyzers) can be produced and interoperate.

Key uses
- Describing transformation pipelines
- Specifying sequence-oriented data & operations
- Configuration of modular systems
- Teaching concepts of composition & transformation in compact DSL form

Design goals & guiding principles
- Concision: Keep syntax compact for human readability.
- Orthogonality: Composable, predictable language primitives.
- Determinism: Execution semantics defined precisely.
- Extensibility: Allow modules, macros, and safe metaprogramming.
- Implementation-friendly: Unambiguous grammar and evaluation rules to enable multiple implementations.

Language concepts at a glance
- Values: primitive, composite (records/tuples), sequences.
- Functions: first-class, closures, pure-by-default with explicit side-effect markers.
- Pipelines: lightweight composition operators for building data flows.
- Modules: named containers and import system.
- Macros: hygienic, explicitly scoped compile-time expansions.
- Types: optional static annotations; semantics defined so both typed and untyped implementations can coexist.

Quick example
This small snippet demonstrates defining a transformation and applying it to a sequence:

let inc = fn(x) -> x + 1
let evens = [1,2,3,4,5] |> map(inc) |> filter(fn(x) -> x % 2 == 0)
print(evens)  # -> [2,4]

Syntax and formal grammar
This section summarizes lexical rules and a near-EBNF grammar sketch. Implementers should treat this as authoritative for parsing.

Lexical grammar (high-level)
- Whitespace: spaces, tabs, newlines separate tokens.
- Comments:
  - Line comments start with // and run to the end of line.
  - Block comments start with /* and end with */; block comments may nest.
- Identifiers: [A-Za-z_][A-Za-z0-9_-]*
- Keywords: let, fn, if, else, match, import, module, return, pub, const, macro, type, as
- Literals:
  - Numbers: integer (0, 1, -5), decimal floats (1.0, -3.14), scientific notation allowed
  - Strings: "double-quoted" with escapes (\n, \t, \", \\). Raw strings using r"..." allowed.
  - Booleans: true, false
  - Null/nil: nil
  - Sequences: [a, b, c] (arrays); (a, b) (tuples)
  - Records: { key: value, ... }

High-level grammar (illustrative, not exhaustive)
PROGRAM       := (TOP_DECL | STMT)*
TOP_DECL      := MODULE_DECL | IMPORT_DECL | FUNCTION_DECL | MACRO_DECL | CONST_DECL
STMT          := LET_STMT | EXPR_STMT | RETURN_STMT | IF_STMT | FOR_STMT
LET_STMT      := 'let' PATTERN ('=' EXPR)? ';'
FUNCTION_DECL := 'fn' IDENTIFIER? PARAMS ARROW_BODY
PARAMS        := '(' [PARAM (',' PARAM)*] ')'
PARAM         := IDENTIFIER [':' TYPE]
EXPR          := LAMBDA | BINARY_OP | PRIMARY | CALL | PIPE_EXPR
PIPE_EXPR     := EXPR ('|>' EXPR)*
PRIMARY       := LITERAL | IDENTIFIER | '(' EXPR ')' | SEQUENCE | RECORD

Operator precedence (high-level)
(high to low)
1. Function calls, indexing, field access
2. Unary (+, -, !)
3. Multiplicative (*, /, %)
4. Additive (+, -)
5. Comparison (==, !=, <, <=, >, >=)
6. Logical (&&, ||)
7. Pipe and composition (|>, <|, >>)
Implementations must define associativity per operator; by default, arithmetic is left-associative.

Data types & values
- Primitive: Int, Float, Bool, String, Nil
- Composite: List[T], Tuple(T1,...,Tn), Record{...}
- Function types: (T1, T2) -> TRet
- Optional static typing: type annotations (type X = ...) are syntactic sugar for typed implementations; interpreter may ignore them but they appear in the spec.

Type annotation syntax
let x: Int = 5
fn add(a: Int, b: Int) -> Int { a + b }

Operators and expressions
- Arithmetic: + - * / %
- Comparison: == != < <= > >=
- Logical: && || !
- Pipe operator: |> passes the LHS result as the first argument to RHS expression or function. Example: data |> transform |> finalize
- Composition operators:
  - compose (∘) or >> for function composition: f >> g means g(f(...))
  - reverse compose: <<

Evaluation rules
- Eager evaluation by default.
- Short-circuiting for logical operators (&&, ||).
- Function application evaluates arguments left-to-right.
- Pure functions have no side-effects; side-effects are explicit (see effect markers).

Modules, namespaces, and imports
- module NAME { ... } declares a module scope.
- import "path" as alias or import moduleName.{a, b, c}
- Public visibility: declaration prefixed with pub is exported.

Example:
module math {
  pub fn add(a, b) -> a + b
  fn secret() -> 42
}
import "math" as m
let s = m.add(1,2)

Macros & metaprogramming
- Macros run at compile-time / expansion-time.
- Syntax: macro name(params) { ... } or macro_rules! style if implementing pattern-based macros.
- Hygiene: macros must avoid accidental capture unless explicitly using an un-hygienic form.
- Use-cases: generate boilerplate, small DSL extensions, or conditional compilation.

Explicit example:
macro repeat(n, expr) {
  if n <= 0 {
    []
  } else {
    [expr] + repeat(n-1, expr)
  }
}

Error model and diagnostics
- Two main error categories:
  - Compile-time errors: syntax, type errors (if typing enforced), macro expansion failures.
  - Runtime errors: divide-by-zero, pattern-match-failure, nil-deref, unhandled exception.
- Error reporting should include:
  - Error kind (syntax/type/runtime)
  - File, line, column
  - Code snippet with caret/underline showing span
  - Clear short message and optional detailed hint
- Recoverable errors: parser may recover to produce multiple diagnostics in a single run; evaluator should provide backtrace when exceptions occur.

Examples and idioms
1) Mapping + filtering pipeline
let inc = fn(x) -> x + 1
let data = [0,1,2,3,4]
let result = data |> map(inc) |> filter(fn(x) -> x % 2 == 0)
print(result)  # [2,4]

2) Pattern matching
let describe = fn(x) -> match x {
  0 -> "zero"
  1 -> "one"
  n if n < 0 -> "negative"
  _ -> "other"
}
print(describe(-3))  # "negative"

3) Module + public API
module strings {
  pub fn join(a: [String], sep: String) -> String {
    // naive join
    let out = ""
    for s in a {
      if out == "" { out = s } else { out = out + sep + s }
    }
    out
  }
}
import "strings" as s
print(s.join(["a","b"], ","))

Tooling & integration points
The language specification aims to support multiple tooling layers:
- Parser & lexer (reference implementation)
- Interpreter / REPL
- Compiler (IR -> native code or bytecode)
- Linter & formatter (canonical formatting rules)
- Language Server Protocol (LSP) for IDE features (hover, go-to-definition, diagnostics)
- Fuzzing & property-based tests for interpreter conformance

Suggested implementer components
- Tokenizer (with support for nested block comments)
- Parser (preferably producing an AST with spans)
- Macro expansion phase (separate AST -> expanded AST)
- Type checker (optional)
- Lowering to IR and evaluator
- Standard library (collection helpers, I/O, time, math) in the language itself where possible

Testing & conformance
- Canonical test suite should include:
  - Syntax tests (valid/invalid)
  - Semantic tests (scoping, closures)
  - Standard library tests (behavior)
  - Macro expansion tests and hygiene edge-cases
  - Interop tests for modules & imports
- Conformance levels:
  - Level 0 — parses & runs examples
  - Level 1 — supports macros & modules
  - Level 2 — optional static typing & LSP support

Roadmap
Short-term
- Finalize EBNF grammar and publish reference parser
- Implement canonical standard library in language source files
- Provide reference interpreter and REPL

Mid-term
- Type system specification & optional type-checker
- LSP server & language integration (formatting, autocomplete)
- Test corpus & fuzz targets

Long-term
- Optimizing compiler to IR and bytecode/native backends
- Packaging for embedding in host apps
- Inter-language interoperability (FFI)

Contributing
We welcome contributors. Suggested workflow:
1. Open an issue describing your proposal or bug.
2. Fork the repository and create a branch for your work.
3. Submit a pull request with clear description, tests, and documentation.
4. Keep PRs focused and small where possible; larger design changes should start as an issue for discussion.

Coding standards
- Use clear, consistent formatting for AST nodes and grammar rules.
- Include unit tests and examples with any change that affects semantics.
- Document new features in the spec and add examples.

Licensing
Include your chosen license (e.g., MIT, Apache-2.0) at the repository root in a LICENSE file. The specification and examples in this repository should clearly state their license to guide implementations.

Contact & maintainers
- Maintainer: ENKI-420
- For design discussions, open issues in the repository and label them with design/proposal tags.

Appendix A — Minimal reference grammar (compact)
PROGRAM       := STATEMENT*
STATEMENT     := TOP_DECL | EXPR ';'
TOP_DECL      := 'let' IDENT [':' TYPE] '=' EXPR ';' | 'fn' IDENT PARAMS ( '->' TYPE )? BLOCK | 'module' IDENT BLOCK
EXPR          := PIPE_EXPR
PIPE_EXPR     := COMP_EXPR ( '|>' COMP_EXPR )*
COMP_EXPR     := LOGICAL_EXPR ( ('==' | '!=') LOGICAL_EXPR )*
LOGICAL_EXPR  := ADD_EXPR (('&&'|'||') ADD_EXPR)*
ADD_EXPR      := MUL_EXPR (('+'|'-') MUL_EXPR)*
MUL_EXPR      := UNARY_EXPR (('*'|'/'|'%') UNARY_EXPR)*
UNARY_EXPR    := ('+'|'-'|'!') UNARY_EXPR | PRIMARY
PRIMARY       := LITERAL | IDENT | '(' EXPR ')' | '[' (EXPR (',' EXPR)*)? ']' | '{' (PAIR (',' PAIR)*)? '}'
PAIR          := IDENT ':' EXPR

Appendix B — Formatting rules (high-level)
- Indent 2 or 4 spaces consistently.
- Prefer trailing commas in multiline sequences/records.
- Use space around binary operators: a + b

Acknowledgements
Thanks to contributors and early adopters who help shape the language through feedback, implementations, and test cases.

If you want this README adjusted (shorter, more tutorial-style, or split into multiple docs such as SPEC.md, TUTORIAL.md, IMPLEMENTATION.md), tell me which format you prefer and I will produce it.
