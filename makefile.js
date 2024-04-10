#!/usr/bin/env node
// @ts-check

/**
 * @typedef {import("node:stream").TransformCallback} TransformCallback
 * @typedef {import("node:fs").WriteStream} WriteStream
 */

import {spawn} from "node:child_process"
import {Console as NodeConsole} from "node:console"
import {mkdir, mkdtemp, writeFile, rm, rmdir} from "node:fs/promises"
import {createReadStream, createWriteStream, existsSync} from "node:fs"
import {tmpdir} from "node:os"
import {dirname, join} from "node:path"
import {argv, env} from "node:process"
import {finished} from "node:stream/promises"
import {Readable, Transform} from "node:stream"
import {fileURLToPath} from "node:url"
import sade from "sade"
import Chain from "stream-chain"
import StreamArray from "stream-json/streamers/StreamArray.js"
import Disassembler from "stream-json/Disassembler.js"
import Stringer from "stream-json/Stringer.js"
import Parser from "stream-json/Parser.js"
import pack from "./package.json" with {type: "json"}

/**
 * @typedef {Object} Config
 * @property {ConfigMeta} meta
 * @property {ConfigSource[]} sources
 */

/**
 * @typedef {Object} ConfigMeta
 * @property {string} owner
 * @property {string} name
 * @property {string} branch
 * @property {string} file
 */

/**
 * @typedef {Object} ConfigSource
 * @property {string} owner
 * @property {string} name
 * @property {string} branch
 * @property {string[]} files
 */

/** @type {Config} */
const config = {
  meta: {
    owner: "onlyoffice",
    name: "document-builder-declarations",
    branch: "dist",
    file: "meta.json"
  },
  sources: [
    {
      owner: "onlyoffice",
      name: "sdkjs",
      branch: "master",
      files: [
        "word/apiBuilder.js",
        "cell/apiBuilder.js",
        "slide/apiBuilder.js",
        "word/api_plugins.js",
        "cell/api_plugins.js",
        "slide/api_plugins.js",
        "common/apiBase_plugins.js",
        "common/plugins/plugin_base_api.js"
      ]
    },
    {
      owner: "onlyoffice",
      name: "sdkjs-forms",
      branch: "master",
      files: [
        "apiBuilder.js",
        "apiPlugins.js"
      ]
    }
  ]
}

/**
 * @typedef {Partial<Record<string, MetaBranch>>} Meta
 */

/**
 * @typedef {Partial<Record<string, string>>} MetaBranch
 */

/**
 * @typedef {Object} BuildOptions
 * @property {string} force
 */

const console = createConsole()
main()

/**
 * @returns {void}
 */
function main() {
  sade("./makefile.js")
    .command("build")
    .option("--force", "Force build", false)
    .action(async (opt) => {
      if (isForceBuild()) {
        opt.force = true
      }
      await build(opt)
    })
    .parse(argv)
}

/**
 * @returns {boolean}
 */
function isForceBuild() {
  return env.MAKEFILE_BUILD_FORCE === "true"
}

/**
 * @param {BuildOptions} opt
 * @returns {Promise<void>}
 */
async function build(opt) {
  const latest = await fetchLatestMeta(config)

  if (!opt.force) {
    const current = await fetchCurrentMeta(config)
    if (deepEqual(current, latest)) {
      console.info("No updates")
      return
    }
  }

  const dist = distDir()
  if (!existsSync(dist)) {
    await mkdir(dist)
  }

  const temp = await createTempDir()
  await Promise.all(config.sources.map(async (source) => {
    const dir = join(temp, source.name)
    await mkdir(dir)

    let from = dir
    await Promise.all(source.files.map(async (f) => {
      const to = join(from, f)
      const d = dirname(to)
      await mkdir(d, {recursive: true})
      const u = sourceFile(latest, source, f)
      await downloadFile(u, to)
    }))

    let to = join(temp, `${source.name}.pre.json`)
    let w = createWriteStream(to)
    await jsdoc(w, from)
    w.close()
    await rm(from, {recursive: true})

    from = to
    to = join(temp, `${source.name}.post.json`)
    await new Promise((res, rej) => {
      const c = new Chain([
        createReadStream(from),
        new Parser(),
        new StreamArray(),
        new Process(latest, source, dir),
        new Disassembler(),
        new Stringer({makeArray: true}),
        createWriteStream(to)
      ])
      c.on("close", res)
      c.on("error", rej)
    })
    await rm(from)

    const d = join(dist, source.branch)
    if (!existsSync(d)) {
      await mkdir(d)
    }

    from = to
    to = join(d, `${source.name}.json`)
    w = createWriteStream(to)
    await jq(w, from)
    w.close()
    await rm(from)
  }))
  await rmdir(temp)

  await writeMeta(config, dist, latest)
}

/**
 * @param {Config} c
 * @returns {Promise<Meta>}
 */
async function fetchCurrentMeta(c) {
  const u = `https://raw.githubusercontent.com/${c.meta.owner}/${c.meta.name}/${c.meta.branch}/${c.meta.file}`
  const r = await fetch(u)
  if (r.status !== 200) {
    return {}
  }
  return r.json()
}

/**
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
function deepEqual(a, b) {
  if (typeof a !== typeof b) {
    return false
  }

  if (typeof a === "object") {
    const m = Object.keys(a)
    const n = Object.keys(b)
    if (m.length !== n.length) {
      return false
    }

    for (const k of m) {
      const x = a[k]
      const y = b[k]
      if (!deepEqual(x, y)) {
        return false
      }
    }

    return true
  }

  if (a !== b) {
    return false
  }

  return true
}

/**
 * @param {Config} c
 * @returns {Promise<Meta>}
 */
async function fetchLatestMeta(c) {
  /** @type {Meta} */
  const m = {}
  await Promise.all(c.sources.map(async (s) => {
    let b = m[s.branch]
    if (b === undefined) {
      b = {}
      m[s.branch] = b
    }
    b[s.name] = await fetchSHA(s)
  }))
  return m
}

/**
 * @param {Config} c
 * @param {string} d
 * @param {Meta} m
 * @returns {Promise<void>}
 */
async function writeMeta(c, d, m) {
  const f = join(d, c.meta.file)
  await writeFile(f, JSON.stringify(m, undefined, 2))
}

/**
 * @param {ConfigSource} s
 * @returns {Promise<string>}
 */
async function fetchSHA(s) {
  const u = `https://api.github.com/repos/${s.owner}/${s.name}/branches/${s.branch}`
  const r = await fetch(u)
  if (r.status !== 200) {
    throw new Error(`Failed to fetch commit SHA for ${s.name}`)
  }
  const j = await r.json()
  return j.commit.sha
}

/**
 * @param {Meta} m
 * @param {ConfigSource} s
 * @param {string} f
 * @returns {string}
 */
function sourceFile(m, s, f) {
  const b = m[s.branch]
  if (b === undefined) {
    throw new Error(`Branch ${s.branch} is missing`)
  }
  const c = b[s.name]
  if (c === undefined) {
    throw new Error(`Commit SHA for ${s.name} is missing`)
  }
  return `https://raw.githubusercontent.com/${s.owner}/${s.name}/${c}/${f}`
}

/**
 * @param {string} u
 * @param {string} p
 * @returns {Promise<void>}
 */
async function downloadFile(u, p) {
  const res = await fetch(u)
  if (res.body === null) {
    throw new Error("No body")
  }
  // Uses two distinct types of ReadableStream: one from the DOM API and another
  // from NodeJS API. It functions well, so no need to worry.
  // @ts-ignore
  const r = Readable.fromWeb(res.body)
  const s = createWriteStream(p)
  const w = r.pipe(s)
  await finished(w)
}

/**
 * @param {Meta} m
 * @param {ConfigSource} s
 * @param {string} f
 * @returns {string}
 */
function createFileReference(m, s, f) {
  const b = m[s.branch]
  if (b === undefined) {
    throw new Error(`Branch ${s.branch} is missing`)
  }
  const c = b[s.name]
  if (c === undefined) {
    throw new Error(`Commit SHA for ${s.name} is missing`)
  }
  return `https://api.github.com/repos/${s.owner}/${s.name}/contents/${f}?ref=${c}`
}

/**
 * @returns {Promise<string>}
 */
function createTempDir() {
  const tmp = join(tmpdir(), pack.name)
  return mkdtemp(`${tmp}-`)
}

/**
 * @returns {string}
 */
function distDir() {
  return join(rootDir(), "dist")
}

/**
 * @returns {string}
 */
function rootDir() {
  const u = new URL(".", import.meta.url)
  return fileURLToPath(u)
}

/**
 * @param {WriteStream} w
 * @param {string} from
 * @returns {Promise<void>}
 */
async function jsdoc(w, from) {
  return new Promise((res, rej) => {
    const s = spawn("./node_modules/.bin/jsdoc", [
      from, "--debug", "--explain", "--recurse"
    ])
    s.stdout.on("data", (ch) => {
      const l = ch.toString()
      if (
        l.startsWith("DEBUG:") ||
        l.startsWith(`Parsing ${from}`) ||
        l.startsWith("Finished running")
      ) {
        return
      }
      w.write(ch)
    })
    s.on("close", res)
    s.on("error", rej)
  })
}

/**
 * @param {WriteStream} w
 * @param {string} from
 * @returns {Promise<void>}
 */
async function jq(w, from) {
  return new Promise((res, rej) => {
    const s = spawn("jq", [".", from])
    s.stdout.on("data", (ch) => {
      w.write(ch)
    })
    s.on("close", res)
    s.on("error", rej)
  })
}

class Process extends Transform {
  /**
   * @param {Meta} meta
   * @param {ConfigSource} source
   * @param {string} dir
   */
  constructor(meta, source, dir) {
    super({objectMode: true})
    this.meta = meta
    this.source = source
    this.dir = dir
  }

  /**
   * @param {Object} ch
   * @param {string} _
   * @param {TransformCallback} cb
   * @returns {void}
   */
  _transform(ch, _, cb) {
    const {value: v} = ch

    if ("undocumented" in v) {
      cb(null)
      return
    }

    if ("meta" in v) {
      let path = ""
      if ("path" in v.meta) {
        path = v.meta.path
        delete v.meta.path
      }

      let filename = ""
      if ("filename" in v.meta) {
        filename = v.meta.filename
        delete v.meta.filename
      }

      const f = join(path, filename)
      v.meta.file = this._createFileReference(f)

      if ("code" in v.meta) {
        delete v.meta.code
      }
      if ("vars" in v.meta) {
        delete v.meta.vars
      }
    }

    if ("files" in v) {
      v.files = v.files.map((f) => {
        return this._createFileReference(f)
      })
    }

    if ("properties" in v && v.properties.length === 0) {
      delete v.properties
    }
    if ("params" in v && v.params.length === 0) {
      delete v.params
    }

    this.push(v)
    cb(null)
  }

  /**
   * @param {string} f
   * @returns {string}
   */
  _createFileReference(f) {
    f = f.replace(this.dir, "")
    if (f.startsWith("/")) {
      f = f.slice(1)
    }
    return createFileReference(this.meta, this.source, f)
  }
}

/**
 * @returns {Console}
 */
function createConsole() {
  // This exists only to allow the class to be placed at the end of the file.
  class Console extends NodeConsole {
    /**
     * @param  {...any} data
     * @returns {void}
     */
    info(...data) {
      super.info("info:", ...data)
    }

    /**
     * @param  {...any} data
     * @returns {void}
     */
    warn(...data) {
      super.warn("warn:", ...data)
    }
  }
  return new Console(process.stdout, process.stderr)
}
