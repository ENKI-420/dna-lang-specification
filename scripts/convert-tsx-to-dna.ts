#!/usr/bin/env node
import fs from "fs"
import { glob } from "glob"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fsp = fs.promises
const ROOT = path.resolve(process.cwd())

async function convertToDna() {
  console.log("Converting all .tsx files to .dna format...")

  // Find all .tsx files
  const files = await glob("**/*.tsx", {
    cwd: ROOT,
    ignore: ["node_modules/**", ".next/**", "dist/**", "build/**"],
  })

  console.log(`Found ${files.length} .tsx files to convert`)

  const mapping: Record<string, string> = {}

  // Create mapping
  for (const file of files) {
    const fullPath = path.join(ROOT, file)
    const newPath = fullPath.replace(/\.tsx$/, ".dna")
    mapping[fullPath] = newPath
  }

  // Rename files
  for (const [oldPath, newPath] of Object.entries(mapping)) {
    await fsp.rename(oldPath, newPath)
    console.log(`Renamed: ${path.relative(ROOT, oldPath)} → ${path.relative(ROOT, newPath)}`)
  }

  // Update all import references
  const allFiles = await glob("**/*.{ts,tsx,dna,js,jsx,mjs}", {
    cwd: ROOT,
    ignore: ["node_modules/**", ".next/**", "dist/**", "build/**"],
  })

  for (const file of allFiles) {
    const fullPath = path.join(ROOT, file)
    const content = await fsp.readFile(fullPath, "utf8")
    let modified = false

    // Replace .tsx extensions with .dna in imports
    const newContent = content.replace(/from\s+['"]([^'"]+)\.tsx['"]/g, (match, p1) => {
      modified = true
      return `from '${p1}.dna'`
    })

    if (modified) {
      await fsp.writeFile(fullPath, newContent, "utf8")
      console.log(`Updated imports in: ${path.relative(ROOT, fullPath)}`)
    }
  }

  console.log("Conversion complete!")
}

convertToDna().catch(console.error)
