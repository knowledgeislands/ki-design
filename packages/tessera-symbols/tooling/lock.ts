// The vendoring lock. A consuming repository copies a Tessera package whole
// into `packages/<package>/` and records, in `<package>-lock.json` at its root,
// which release that copy is and a SHA-256 digest of every file in it, so any
// local edit shows. Each package is copied and locked on its own. The shape
// follows `skills-lock.json`: a format `version`, then the source.
//
// This folder is identical in every Tessera package; a repository check in
// packages-tessera holds the copies together.

import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

/** The Tessera checkout, relative to a consuming repository's root. */
export const SOURCE = '../packages-tessera'

/** Where a package sits, in packages-tessera and in every consumer alike. */
export const packageDir = (name: string): string => `packages/${name}`

/** The lock at a consumer's root that pins one package. */
export const lockFile = (name: string): string => `${name}-lock.json`

/** Files a checkout may hold that are never part of the vendored tree. */
const IGNORED = new Set(['node_modules', '.DS_Store', 'dist', '.cache', '.turbo'])

export interface Deferral {
  /** The release kept out. */
  version: string
  /** The Tessera commit kept out. Without it the deferral covers every snapshot labelled with the release. */
  revision?: string
  reason: string
  decidedBy: string
  /** `YYYY-MM-DD`. */
  date: string
}

export interface TesseraLock {
  /** The lock format. */
  version: 1
  /** The Tessera repository. */
  source: string
  /** The package locked, such as `tessera-tokens`. */
  package: string
  /** The release vendored, such as `0.3.0`. */
  release: string
  /** The Tessera commit it was copied from. */
  revision: string
  /** The date it was copied, `YYYY-MM-DD`. */
  vendored: string
  /** SHA-256 by path inside the package. */
  files: Record<string, string>
  deferred: Deferral[]
}

export interface Comparison {
  modified: string[]
  missing: string[]
  extra: string[]
}

/** Every file under `dir`, as sorted `/`-separated paths relative to it. */
export function listFiles(dir: string): string[] {
  const out: string[] = []
  const walk = (at: string): void => {
    for (const entry of readdirSync(at, { withFileTypes: true })) {
      if (IGNORED.has(entry.name)) continue
      const path = join(at, entry.name)
      if (entry.isDirectory()) walk(path)
      else if (entry.isFile()) out.push(relative(dir, path).split(sep).join('/'))
    }
  }
  walk(dir)
  return out.sort()
}

export const digest = (content: string | Buffer): string => createHash('sha256').update(content).digest('hex')

/** The digest of every file in a package tree. */
export function digestTree(dir: string): Record<string, string> {
  return Object.fromEntries(listFiles(dir).map((f) => [f, digest(readFileSync(join(dir, f)))]))
}

/** How a tree differs from the digests a lock recorded. */
export function compare(locked: Record<string, string>, actual: Record<string, string>): Comparison {
  return {
    modified: Object.keys(locked).filter((f) => f in actual && actual[f] !== locked[f]),
    missing: Object.keys(locked).filter((f) => !(f in actual)),
    extra: Object.keys(actual).filter((f) => !(f in locked))
  }
}

export const isClean = (c: Comparison): boolean => !c.modified.length && !c.missing.length && !c.extra.length

/** Reads the lock of one package at a consumer's root. */
export function readLock(root: string, name: string): TesseraLock {
  const path = join(root, lockFile(name))
  if (!existsSync(path)) throw new Error(`${lockFile(name)} not found in ${root}`)
  return JSON.parse(readFileSync(path, 'utf8')) as TesseraLock
}

export function writeLock(root: string, lock: TesseraLock): void {
  writeFileSync(join(root, lockFile(lock.package)), `${JSON.stringify(lock, null, 2)}\n`)
}

/** Compares two releases, `0.10.0` above `0.9.1`. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (d) return d
  }
  return 0
}

/** The changelog sections after `since` up to and including `upTo`, newest first. */
export function changelogSince(changelog: string, since: string, upTo: string): string[] {
  return changelog
    .split(/^(?=## )/m)
    .filter((s) => {
      const v = /^## \[?(\d+(?:\.\d+)*)/.exec(s)?.[1]
      return v !== undefined && compareVersions(v, since) > 0 && compareVersions(v, upTo) <= 0
    })
    .map((s) => s.trim())
}

/** The changelog's `## Unreleased` section: changes on `main` after its release. */
export function changelogUnreleased(changelog: string): string[] {
  return changelog
    .split(/^(?=## )/m)
    .filter((s) => /^## Unreleased\b/.test(s))
    .map((s) => s.trim())
}
