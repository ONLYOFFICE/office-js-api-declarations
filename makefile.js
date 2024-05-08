#!/usr/bin/env node

/**
 * @typedef {import("node:stream").TransformCallback} TransformCallback
 * @typedef {import("node:fs").WriteStream} WriteStream
 * @typedef {import("estree").Program} Program
 */

import {spawn} from "node:child_process"
import {Console as NodeConsole} from "node:console"
import {mkdir, mkdtemp, writeFile, rm, rmdir, readFile} from "node:fs/promises"
import {createWriteStream, existsSync} from "node:fs"
import {tmpdir} from "node:os"
import {dirname, join} from "node:path"
import {argv, env, stderr, stdout} from "node:process"
import {finished} from "node:stream/promises"
import {Readable, Transform, Writable} from "node:stream"
import {fileURLToPath} from "node:url"
import {Mutex} from "async-mutex"
import * as comment from "comment-parser"
import {fromJs} from "esast-util-from-js"
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
 * @property {ConfigEditor[]} editors
 * @property {ConfigDeclaration[]} declarations
 * @property {ConfigDeclaration[]} tryit
 */

/**
 * @typedef {Object} ConfigMeta
 * @property {string} owner
 * @property {string} repo
 * @property {string} branch
 * @property {string} path
 */

/**
 * @typedef {Object} ConfigEditor
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} ConfigDeclaration
 * @property {string} name
 * @property {string} variant
 * @property {DeclarationSource[]} sources
 */

/**
 * @typedef {Object} DeclarationSource
 * @property {string} owner
 * @property {string} repo
 * @property {string} branch
 * @property {SourcePath[]} paths
 */

/**
 * @typedef {Object} SourcePath
 * @property {string} path
 * @property {string} editor
 */

/** @type {Config} */
const config = {
  meta: {
    owner: "onlyoffice",
    repo: "document-builder-declarations",
    branch: "dist",
    path: "meta.json"
  },
  editors: [
    {id: "CSE", name: "spreadsheet"},
    {id: "CFE", name: "form"},
    {id: "CPE", name: "presentation"},
    {id: "CDE", name: "document"},
    {id: "_",   name: "common"},
    {id: "__",  name: "shared"}
  ],
  declarations: [
    {
      name: "document-builder",
      variant: "master",
      sources: [
        {
          owner: "onlyoffice",
          repo: "sdkjs",
          branch: "master",
          paths: [
            {path: "cell/apiBuilder.js",  editor: "CSE"},
            {path: "slide/apiBuilder.js", editor: "CPE"},
            {path: "word/apiBuilder.js",  editor: "CDE"},
          ]
        },
        {
          owner: "onlyoffice",
          repo: "sdkjs-forms",
          branch: "master",
          paths: [
            {path: "apiBuilder.js", editor: "CFE"}
          ]
        }
      ]
    },
    {
      name: "document-builder-plugin",
      variant: "master",
      sources: [
        {
          owner: "onlyoffice",
          repo: "sdkjs",
          branch: "master",
          paths: [
            {path: "cell/api_plugins.js",               editor: "CSE"},
            {path: "slide/api_plugins.js",              editor: "CPE"},
            {path: "word/api_plugins.js",               editor: "CDE"},
            {path: "common/apiBase_plugins.js",         editor: "_"},
            {path: "common/plugins/plugin_base_api.js", editor: "_"}
          ]
        },
        {
          owner: "onlyoffice",
          repo: "sdkjs-forms",
          branch: "master",
          paths: [
            {path: "apiPlugins.js", editor: "CFE"}
          ]
        }
      ]
    }
  ],
  tryit: [
    {
      name: "document-builder",
      variant: "master",
      sources: [
        {
          owner: "onlyoffice",
          repo: "api.onlyoffice.com",
          branch: "master",
          paths: [
            {path: "web/App_Data/docbuilder/examples/cell",  editor: "CSE"},
            {path: "web/App_Data/docbuilder/examples/form",  editor: "CFE"},
            {path: "web/App_Data/docbuilder/examples/slide", editor: "CPE"},
            {path: "web/App_Data/docbuilder/examples/word",  editor: "CDE"},
            {path: "web/App_Data/docbuilder/examples",       editor: "__"}
          ]
        }
      ]
    },
    {
      name: "document-builder-plugin",
      variant: "master",
      sources: [
        {
          owner: "onlyoffice",
          repo: "api.onlyoffice.com",
          branch: "master",
          paths: [
            {path: "web/App_Data/plugins/examples/cellPluginMethods",   editor: "CSE"},
            {path: "web/App_Data/plugins/examples/formPluginMethods",   editor: "CFE"},
            {path: "web/App_Data/plugins/examples/pluginBase",          editor: "_"},
            {path: "web/App_Data/plugins/examples/sharedPluginMethods", editor: "__"},
            {path: "web/App_Data/plugins/examples/slidePluginMethods",  editor: "CPE"},
            {path: "web/App_Data/plugins/examples/wordPluginMethods",   editor: "CDE"},
            {path: "web/App_Data/plugins/examples",                     editor: "__"}
          ]
        }
      ]
    }
  ]
}

for (let i = 0; i < 2; i += 1) {
  const v = "develop"

  let d = config.declarations[i]
  d = structuredClone(d)
  d.variant = v
  d.sources[0].branch = v
  d.sources[1].branch = v
  config.declarations.push(d)

  let e = config.tryit[i]
  e = structuredClone(e)
  e.variant = v
  e.sources[0].branch = v
  config.tryit.push(e)
}

const console = createConsole()
main()

/**
 * @returns {void}
 */
function main() {
  sade("./makefile.js")
    .command("build")
    .option("--force", "Force build", false)
    .action(async (opts) => {
      if (isForceBuild()) {
        opts.force = true
      }
      await build(opts)
    })
    .command("pull")
    .action(pull)
    .parse(argv)
}

/**
 * @returns {boolean}
 */
function isForceBuild() {
  return env.MAKEFILE_BUILD_FORCE === "true"
}

/**
 * @typedef {Object} BuildOptions
 * @property {string} force
 */

/**
 * @param {BuildOptions} opts
 * @returns {Promise<void>}
 */
async function build(opts) {
  const lm = await fetchLatestMeta(config)

  if (!opts.force) {
    const cm = await fetchCurrentMeta(config)
    if (isMetaEqual(cm, lm)) {
      console.info("No updates")
      return
    }
  }

  const rd = rootDir()

  const dd = distDir(rd)
  if (!existsSync(dd)) {
    await mkdir(dd)
  }

  const td = await createTempDir()

  for (const cd of config.declarations) {
    const tnd = join(td, cd.name)
    await mkdir(tnd)

    const tvd = join(tnd, cd.variant)
    await mkdir(tvd)

    const cache = new Cache()

    cache.reg("all")
    const ac = cache.get("all")
    if (!ac) {
      throw new Error("No cache")
    }

    for (const e of config.editors) {
      cache.reg(e.id)
    }

    await Promise.all(cd.sources.map(async (ds) => {
      const rd = join(tvd, ds.repo)
      await mkdir(rd)

      const bd = join(rd, ds.branch)
      await mkdir(bd)

      await Promise.all(ds.paths.map(async (sp) => {
        const f = join(bd, sp.path)
        const d = dirname(f)
        await mkdir(d, {recursive: true})
        const u = sourceDownloadURL(lm, ds, sp.path)
        const w = new StringWritable()
        await downloadFile(u, w)
        const p = fromJs(w.buf)
        omitIIFE(w, p)
        await writeFile(f, w.buf)
      }))

      const w = new StringWritable()
      await jsdoc(w, bd)
      await rm(rd, {recursive: true})

      await new Promise((res, rej) => {
        const c = new Chain([
          new StringReadable(w.buf),
          new Parser(),
          new StreamArray(),
          new Preprocess(lm, cache, ac, ds, bd)
        ])
        c.on("close", res)
        c.on("data", () => {})
        c.on("error", rej)
      })
    }))

    for (const e of config.editors) {
      const ec = cache.get(e.id)
      if (!ec) {
        throw new Error("No cache")
      }

      const s = new State(ac, ec)
      for (const d of ec.declarations) {
        s.shake(d)
      }
      for (const id of s) {
        s.collect(id)
      }
    }

    const dnd = join(dd, cd.name)
    if (!existsSync(dnd)) {
      await mkdir(dnd)
    }

    const dvd = join(dnd, cd.variant)
    if (!existsSync(dvd)) {
      await mkdir(dvd)
    }

    await Promise.all(config.editors.map(async (e) => {
      const ec = cache.get(e.id)
      if (!ec) {
        throw new Error("No cache")
      }

      if (ec.declarations.length === 0) {
        return
      }

      const td = tryitDir(rd)
      const vd = join(td, cd.name, cd.variant)

      let to = join(tvd, `${e.name}.json`)
      await new Promise((res, rej) => {
        const c = new Chain([
          Readable.from(ec.declarations),
          new Postprocess(e, vd),
          new Disassembler(),
          new Stringer({makeArray: true}),
          createWriteStream(to)
        ])
        c.on("close", res)
        c.on("error", rej)
      })

      let from = to
      to = join(dvd, `${e.name}.json`)
      const w = createWriteStream(to)
      await jq(w, from)
      w.close()
      await rm(from)
    }))

    await rmdir(tvd)
    await rmdir(tnd)
  }

  await rmdir(td)
  await writeMeta(config, dd, lm)
}

/**
 * @returns {Promise<void>}
 */
async function pull() {
  const rd = rootDir()

  const td = tryitDir(rd)
  if (existsSync(td)) {
    await rm(td, {recursive: true})
  }

  await mkdir(td)

  const mutex = new Mutex()

  /** @type {Promise<void>[]} */
  const a = []
  for (const e of config.tryit) {
    const p = fn0(e)
    a.push(p)
  }

  try {
    await Promise.all(a)
  } catch (e) {
    throw e
  } finally {
    mutex.release()
  }

  /**
   * @param {ConfigDeclaration} e
   * @returns {Promise<void>}
   */
  async function fn0(e) {
    const r = await mutex.acquire()

    const nd = join(td, e.name)
    if (!existsSync(nd)) {
      await mkdir(nd)
    }

    const vd = join(nd, e.variant)
    if (!existsSync(vd)) {
      await mkdir(vd)
    }

    r()

    /** @type {Promise<void>[]} */
    const a = []
    for (const s of e.sources) {
      for (const sp of s.paths) {
        const p = fn1(vd, s, sp)
        a.push(p)
      }
    }

    await Promise.all(a)
  }

  /**
   * @param {string} d
   * @param {DeclarationSource} s
   * @param {SourcePath} sp
   * @returns {Promise<void>}
   */
  async function fn1(d, s, sp) {
    const u = `https://api.github.com/repos/${s.owner}/${s.repo}/contents/${sp.path}?ref=${s.branch}`
    const r = await fetch(u)
    const j = await r.json()

    /** @type {Promise<void>[]} */
    const a = []
    for (const o of j) {
      const p = fn2(d, sp, o)
      a.push(p)
    }

    await Promise.all(a)
  }

  /**
   * @param {string} d
   * @param {SourcePath} sp
   * @param {any} o
   * @returns {Promise<void>}
   */
  async function fn2(d, sp, o) {
    const u = o["download_url"]
    if (!u) {
      return
    }

    let b = ""
    for (const s of config.editors) {
      if (s.id === sp.editor) {
        b = s.name
        break
      }
    }
    if (b === "") {
      return
    }

    const r = await mutex.acquire()

    let f = join(d, b)
    if (!existsSync(f)) {
      await mkdir(f)
    }

    r()

    let n = o.name.replace(/\.docbuilder/, "")
    n = n.replace(".", "#")
    n = `${n}.js`

    f = join(f, n)
    const w = createWriteStream(f)
    await downloadFile(u, w)
  }
}

/**
 * @param {StringWritable} w
 * @param {Program} p
 * @returns {void}
 */
function omitIIFE(w, p) {
  for (const v of p.body) {
    // This works, but it would be more considerate to trim gently without
    // removing the entire header of the file.
    if (
      v.type === "ExpressionStatement" &&
      v.expression.type === "CallExpression" &&
      v.expression.callee.type === "FunctionExpression"
    ) {
      // @ts-ignore
      const p = v.expression.callee.body.position
      let o = p.start.offset

      let c = " ".repeat(p.start.column)
      o -= p.start.column

      let l = ""
      for (let i = 0; i < p.start.line; i += 1) {
        l += "\n"
        o -= 1
      }
      l = l.slice(1)
      l = `${" ".repeat(o)}${l}${c}`

      w.buf = w.buf.slice(p.start.offset + 1, p.end.offset - 1)
      w.buf = `${l}${w.buf}`

      break
    }
  }
}

/**
 * @typedef {Partial<Record<string, MetaBranch>>} Meta
 */

/**
 * @typedef {Partial<Record<string, string>>} MetaBranch
 */

/**
 * @param {Config} c
 * @returns {Promise<Meta>}
 */
async function fetchCurrentMeta(c) {
  const u = `https://raw.githubusercontent.com/${c.meta.owner}/${c.meta.repo}/${c.meta.branch}/${c.meta.path}`
  const r = await fetch(u)
  if (r.status !== 200) {
    return {}
  }
  return r.json()
}

/**
 * @param {Config} c
 * @returns {Promise<Meta>}
 */
async function fetchLatestMeta(c) {
  /** @type {Meta} */
  const m = {}
  await Promise.all(c.declarations.map(async (d) => {
    await Promise.all(d.sources.map(async (s) => {
      const n = `${s.owner}/${s.repo}`
      let r = m[n]
      if (r === undefined) {
        r = {}
        m[n] = r
      }
      r[s.branch] = await fetchSourceSHA(s)
    }))
  }))
  return m
}

/**
 * @param {DeclarationSource} s
 * @returns {Promise<string>}
 */
async function fetchSourceSHA(s) {
  const u = `https://api.github.com/repos/${s.owner}/${s.repo}/branches/${s.branch}`
  const r = await fetch(u)
  if (r.status !== 200) {
    throw new Error(`Failed to fetch commit SHA for ${s.repo}`)
  }
  const j = await r.json()
  return j.commit.sha
}

/**
 * @param {Meta} a
 * @param {Meta} b
 * @returns {boolean}
 */
function isMetaEqual(a, b) {
  return inner(a, b)

  /**
   * The function below is a simple deep equal function. It performs well when
   * dealing with meta objects. However, it is good to clarify that it is not a
   * universal util.
   *
   * @param {any} a
   * @param {any} b
   * @returns {boolean}
   */
  function inner(a, b) {
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
        if (!inner(x, y)) {
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
}

/**
 * @param {Config} c
 * @param {string} d
 * @param {Meta} m
 * @returns {Promise<void>}
 */
async function writeMeta(c, d, m) {
  const f = join(d, c.meta.path)
  await writeFile(f, JSON.stringify(m, undefined, 2))
}

/**
 * @param {Meta} m
 * @param {DeclarationSource} s
 * @param {string} f
 * @returns {string}
 */
function sourceDownloadURL(m, s, f) {
  const n = `${s.owner}/${s.repo}`
  const r = m[n]
  if (r === undefined) {
    throw new Error(`Branches for ${n} are missing`)
  }
  const c = r[s.branch]
  if (c === undefined) {
    throw new Error(`Commit SHA for ${s.repo} is missing`)
  }
  return `https://raw.githubusercontent.com/${s.owner}/${s.repo}/${c}/${f}`
}

/**
 * @param {string} u
 * @param {Writable} w
 * @returns {Promise<void>}
 */
async function downloadFile(u, w) {
  const res = await fetch(u)
  if (res.body === null) {
    throw new Error("No body")
  }
  if (res.status !== 200) {
    throw new Error(`Failed to fetch ${u} (${res.status} ${res.statusText})`)
  }
  // Uses two distinct types of ReadableStream: one from the DOM API and another
  // from NodeJS API. It functions well, so no need to worry.
  // @ts-ignore
  const r = Readable.fromWeb(res.body)
  w = r.pipe(w)
  await finished(w)
}

/**
 * @param {Meta} m
 * @param {DeclarationSource} s
 * @param {string} f
 * @returns {string}
 */
function sourceURL(m, s, f) {
  const n = `${s.owner}/${s.repo}`
  const r = m[n]
  if (r === undefined) {
    throw new Error(`Branches for ${n} are missing`)
  }
  const c = r[s.branch]
  if (c === undefined) {
    throw new Error(`Commit SHA for ${s.repo} is missing`)
  }
  return `https://api.github.com/repos/${s.owner}/${s.repo}/contents/${f}?ref=${c}`
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
function rootDir() {
  const u = new URL(".", import.meta.url)
  return fileURLToPath(u)
}

/**
 * @param {string} d
 * @returns {string}
 */
function distDir(d) {
  return join(d, "dist")
}

/**
 * @param {string} d
 * @returns {string}
 */
function tryitDir(d) {
  return join(d, "tryit")
}

/**
 * @param {string} d
 * @returns {string}
 */
function sharedDir(d) {
  return join(d, "shared")
}

/**
 * {@link https://github.com/jsdoc/jsdoc/blob/4.0.2/lib/jsdoc/schema.js/#L186 JSDoc Reference}
 *
 * @typedef {Object} Doclet
 * @property {string[]} [augments]
 * @property {string} [comment]
 * @property {string} [description]
 * @property {string[]} [fires]
 * @property {string} [inherits]
 * @property {DocletKind} [kind]
 * @property {string} [longname]
 * @property {string} [memberof]
 * @property {DocletMeta} [meta]
 * @property {DocletParam[]} [params]
 * @property {DocletParam[]} [properties]
 * @property {DocletParam[]} [returns]
 * @property {DocletTag[]} [tags]
 * @property {boolean} [undocumented]
 */

/**
 * {@link https://github.com/jsdoc/jsdoc/blob/4.0.2/lib/jsdoc/schema.js/#L328 JSDoc Reference}
 *
 * @typedef {
     "class" |
     "constant" |
     "event" |
     "external" |
     "file" |
     "function" |
     "interface" |
     "member" |
     "mixin" |
     "module" |
     "namespace" |
     "package" |
     "param" |
     "typedef"
 * } DocletKind
 */

/**
 * {@link https://github.com/jsdoc/jsdoc/blob/4.0.2/lib/jsdoc/schema.js/#L25 JSDoc Reference}
 *
 * @typedef {Object} DocletMeta
 * @property {any} [code]
 * @property {string} [filename]
 * @property {string} [path]
 * @property {any} [vars]
 *
 * @property {string} [file] // custom
 */

/**
 * {@link https://github.com/jsdoc/jsdoc/blob/4.0.2/lib/jsdoc/schema.js/#L155 JSDoc Reference}
 *
 * @typedef {Object} DocletParam
 * @property {DocletType} [type]
 */

/**
 * {@link https://github.com/jsdoc/jsdoc/blob/4.0.2/lib/jsdoc/schema.js/#L89 JSDoc Reference}
 *
 * @typedef {Object} DocletType
 * @property {Catharsis} [parsedType]
 */

/**
 * {@link https://github.com/jsdoc/jsdoc/blob/4.0.2/lib/jsdoc/schema.js/#L462 JSDoc Reference}
 *
 * @typedef {Object} DocletTag
 * @property {string} [text]
 * @property {string} [title]
 */

/**
 * {@link https://github.com/hegemonic/catharsis/blob/0.9.0/lib/schema.js/ Catharsis Reference}
 *
 * @typedef {Object} Catharsis
 * @property {CatharsisType} [type]
 * @property {string} [name]
 * @property {Catharsis} [expression]
 * @property {Catharsis[]} [applications]
 * @property {Catharsis[]} [elements]
 */

/**
 * {@link https://github.com/hegemonic/catharsis/blob/0.9.0/lib/types.js/ Catharsis Reference}
 *
 * @typedef {
     "AllLiteral" |
     "FieldType" |
     "FunctionType" |
     "NameExpression" |
     "NullLiteral" |
     "RecordType" |
     "TypeApplication" |
     "TypeUnion" |
     "UndefinedLiteral" |
     "UnknownLiteral"
 * } CatharsisType
 */

/**
 * @param {Writable} w
 * @param {string} from
 * @returns {Promise<void>}
 */
function jsdoc(w, from) {
  return new Promise((res, rej) => {
    const s = spawn("./node_modules/.bin/jsdoc", [
      from, "--debug", "--explain", "--recurse"
    ])
    s.stdout.on("data", (ch) => {
      /** @type {string} */
      const l = ch.toString()
      const a = l.split("\n")
      for (const [i, s] of a.entries()) {
        if (
          !s.startsWith("DEBUG") &&
          !s.startsWith("Parsing") &&
          !s.startsWith("Finished running")
        ) {
          w.write(s)
          if (i < a.length - 1) {
            w.write("\n")
          }
        }
      }
    })
    s.on("close", res)
    s.on("error", rej)
  })
}

class Preprocess extends Transform {
  /**
   * @param {Meta} m
   * @param {Cache} c
   * @param {CacheRecord} ac
   * @param {DeclarationSource} ds
   * @param {string} d
   */
  constructor(m, c, ac, ds, d) {
    super({objectMode: true})
    this.m = m
    this.c = c
    this.ac = ac
    this.ds = ds
    this.d = d
  }

  /**
   * @param {Object} ch
   * @param {string} ch.key
   * @param {Doclet} ch.value
   * @param {BufferEncoding} _
   * @param {TransformCallback} cb
   * @returns {void}
   */
  _transform({value: dc}, _, cb) {
    if (dc.kind === "package" || dc.undocumented) {
      cb()
      return
    }

    if (!dc.meta) {
      cb(new Error("No meta"))
      return
    }

    if (!dc.longname) {
      cb(new Error("No longname"))
      return
    }

    if (dc.meta.code) {
      delete dc.meta.code
    }

    if (dc.meta.vars) {
      delete dc.meta.vars
    }

    let p = ""
    if (dc.meta.path) {
      p = dc.meta.path
      delete dc.meta.path
    }

    let n = ""
    if (dc.meta.filename) {
      n = dc.meta.filename
      delete dc.meta.filename
    }

    let f = join(p, n)
    f = f.replace(this.d, "")
    if (f.startsWith("/")) {
      f = f.slice(1)
    }

    dc.meta.file = sourceURL(this.m, this.ds, f)

    this.ac.set(dc.longname, dc)

    /** @type {SourcePath | undefined} */
    let sp
    for (const p of this.ds.paths) {
      if (p.path === f) {
        sp = p
        break
      }
    }

    if (sp) {
      const ec = this.c.get(sp.editor)
      if (ec) {
        ec.set(dc.longname, dc)
      }
    }

    if (dc.tags && sp) {
      for (const t of dc.tags) {
        if (!t.text || t.title !== "typeofeditors") {
          continue
        }

        const v = JSON.parse(t.text)
        if (!Array.isArray(v)) {
          continue
        }

        for (const r of v) {
          const n = String(r)

          /** @type {ConfigEditor | undefined} */
          let ce
          for (const e of config.editors) {
            if (e.id === n) {
              ce = e
              break
            }
          }

          if (!ce || ce.id === sp.editor) {
            continue
          }

          const ec = this.c.get(ce.id)
          if (ec) {
            ec.set(dc.longname, dc)
          }
        }
      }
    }

    this.push(dc)
    cb(null)
  }
}

class AsyncTransform extends Transform {
  /**
   * @param {any} ch
   * @param {BufferEncoding} en
   * @param {TransformCallback} cb
   * @returns {void}
   */
  _transform(ch, en, cb) {
    this._atransform(ch, en).then(cb.bind(this, null)).catch(cb)
  }

  /**
   * @param {any} ch
   * @param {BufferEncoding} en
   * @returns {Promise<void>}
   */
  async _atransform(ch, en) {
    throw new Error("Not implemented")
  }
}

class Postprocess extends AsyncTransform {
  /**
   * @param {ConfigEditor} ce
   * @param {string} vd
   */
  constructor(ce, vd) {
    super({objectMode: true})
    this.ce = ce
    this.vd = vd
  }

  /**
   * @param {Doclet} dc
   * @returns {Promise<void>}
   */
  async _atransform(dc) {
    if (dc.params && dc.params.length === 0) {
      delete dc.params
    }

    if (dc.tags) {
      for (const [i, t] of dc.tags.entries()) {
        if (t.title !== "typeofeditors") {
          continue
        }

        if (!dc.comment) {
          break
        }

        const a = comment.parse(dc.comment)
        if (a.length !== 1) {
          break
        }

        const [b] = a
        for (const [i, s] of b.source.entries()) {
          if (s.tokens.tag === "@typeofeditors") {
            b.source.splice(i, 1)
            break
          }
        }

        dc.comment = comment.stringify(b)
        dc.tags.splice(i, 1)

        break
      }

      if (dc.tags.length === 0) {
        delete dc.tags
      }
    }

    if (dc.longname && dc.comment) {
      let n = dc.longname
      if (dc.kind === "event") {
        n = n.replace("event:", "")
      }

      let f = join(this.vd, this.ce.name, `${n}.js`)
      if (!existsSync(f)) {
        const d = sharedDir(this.vd)
        f = join(d, `${n}.js`)
      }

      if (existsSync(f)) {
        const a = comment.parse(dc.comment)
        if (a.length === 1) {
          let t = ""

          const [b] = a
          for (const s of b.source) {
            if (s.tokens.description !== b.description) {
              continue
            }

            const c = await readFile(f, "utf8")
            t += tryitHeading()
            t += "\n\n"
            t += codeBlock("js", c, ["use-document-builder"])

            const p = `\n${s.tokens.start}${s.tokens.delimiter}`

            let d = s.tokens.description
            d += p
            for (const l of t.split("\n")) {
              d += `${p} ${l}`
            }
            d += p

            s.tokens.description = d
            break
          }

          if (t !== "") {
            dc.comment = comment.stringify(b)
            dc.description = `${dc.description}\n\n${t}`
          }
        }
      }
    }

    this.push(dc)
  }
}

/**
 * @returns {string}
 */
function tryitHeading() {
  return "## Try it"
}

/**
 * @param {string} s
 * @param {string} c
 * @param {string[]} p
 */
function codeBlock(s, c, p = []) {
  if (p.length !== 0) {
    s += " "
    s += p.join(" ")
  }
  return `${"```"}${s}\n${c}\n${"```"}`
}

class State extends Set {
  /**
   * @param {CacheRecord} ac
   * @param {CacheRecord} ec
   */
  constructor(ac, ec) {
    super()
    this.ac = ac
    this.ec = ec
  }

  /**
   * @param {Doclet} dc
   * @returns {void}
   */
  shake(dc) {
    if (dc.inherits && dc.longname) {
      this.pick(dc, dc.longname)
    }

    if (dc.memberof) {
      this.pick(dc, dc.memberof)
    }

    if (dc.augments) {
      for (const n of dc.augments) {
        this.pick(dc, n)
      }
    }

    if (dc.fires) {
      for (const n of dc.fires) {
        this.pick(dc, n)
      }
    }

    if (dc.params) {
      for (const p of dc.params) {
        if (p.type && p.type.parsedType) {
          this.hit(dc, p.type.parsedType)
        }
      }
    }

    if (dc.properties) {
      for (const p of dc.properties) {
        if (p.type && p.type.parsedType) {
          this.hit(dc, p.type.parsedType)
        }
      }
    }

    if (dc.returns) {
      for (const p of dc.returns) {
        if (p.type && p.type.parsedType) {
          this.hit(dc, p.type.parsedType)
        }
      }
    }
  }

  /**
   * @param {Doclet} dc
   * @param {string} n
   * @returns {void}
   */
  pick(dc, n) {
    if (!dc.meta) {
      throw new Error("No meta")
    }
    if (!dc.meta.file) {
      throw new Error("No file")
    }

    const id = `${dc.meta.file};${n}`
    if (this.has(id)) {
      return
    }

    const a = this.ec.indexes[n]
    if (!a) {
      this.add(id)
      this.loupe(id)
      return
    }

    for (const i of a) {
      const d = this.ec.declarations[i]
      if (!d.meta) {
        throw new Error("No meta")
      }
      if (!d.meta.file) {
        throw new Error("No file")
      }
      if (d.meta.file === dc.meta.file) {
        continue
      }
      this.add(id)
      this.loupe(id)
    }
  }

  /**
   * @param {Doclet} dc
   * @param {Catharsis} ca
   * @returns {void}
   */
  hit(dc, ca) {
    switch (ca.type) {
    // case "AllLiteral":
    //   break

    // case "FieldType":
    //   break

    // case "FunctionType":
    //   break

    case "NameExpression":
      switch (ca.name) {
      case "array":
      case "Array":
      case "boolean":
      case "Boolean":
      case "number":
      case "Number":
      case "object":
      case "Object":
      case "string":
      case "String":
        break
      default:
        if (
          ca.name &&
          !isNumberLiteral(ca.name) &&
          !isStringLiteral(ca.name)
        ) {
          this.pick(dc, ca.name)
        }
        break
      }
      break

    // case "NullLiteral":
    //   break

    // case "RecordType":
    //   break

    case "TypeApplication":
      if (ca.expression) {
        this.hit(dc, ca.expression)
      }
      if (ca.applications) {
        for (const a of ca.applications) {
          this.hit(dc, a)
        }
      }
      break

    case "TypeUnion":
      if (ca.elements) {
        for (const e of ca.elements) {
          this.hit(dc, e)
        }
      }
      break

    // case "UndefinedLiteral":
    //   break

    // case "UnknownLiteral":
    //   break

    default:
      // continue
    }
  }

  /**
   * @param {string} id
   * @returns {void}
   */
  loupe(id) {
    const [f, n] = id.split(";")

    const a = this.ac.indexes[n]
    if (!a) {
      return
    }

    for (const i of a) {
      const d = this.ac.declarations[i]
      if (!d) {
        throw new Error("No doclet")
      }
      if (!d.meta) {
        throw new Error("No meta")
      }
      if (!d.meta.file) {
        throw new Error("No file")
      }
      if (d.meta.file !== f) {
        continue
      }
      this.shake(d)
    }
  }

  /**
   * @param {string} id
   * @returns {void}
   */
  collect(id) {
    const [f, n] = id.split(";")

    const a = this.ac.indexes[n]
    if (!a) {
      return
    }

    for (const i of a) {
      const dc = this.ac.declarations[i]
      if (!dc) {
        throw new Error("No doclet")
      }
      if (!dc.meta) {
        throw new Error("No meta")
      }
      if (!dc.meta.file) {
        throw new Error("No file")
      }
      if (dc.meta.file !== f) {
        continue
      }
      this.ec.set(n, dc)
    }
  }
}

class Cache {
  /** @type {Partial<Record<string, CacheRecord>>} */
  internal = {}

  /**
   * @param {string} k
   * @returns {void}
   */
  reg(k) {
    this.internal[k] = new CacheRecord()
  }

  /**
   * @param {string} k
   * @returns {CacheRecord | undefined}
   */
  get(k) {
    return this.internal[k]
  }
}

class CacheRecord {
  /** @type {Partial<Record<string, number[]>>} */
  indexes = {}

  /** @type {Doclet[]} */
  declarations = []

  /**
   * @param {string} id
   * @param {Doclet} d
   * @returns {void}
   */
  set(id, d) {
    let a = this.indexes[id]
    if (!a) {
      a = []
      this.indexes[id] = a
    }

    a.push(this.declarations.length)
    this.declarations.push(d)
  }
}

/**
 * @param {Writable} w
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


class StringWritable extends Writable {
  constructor() {
    super()
    this.buf = ""
  }

  /**
   * @param {any} ch
   * @param {BufferEncoding} _
   * @param {TransformCallback} cb
   */
  _write(ch, _, cb) {
    this.buf += String(ch)
    if (cb) {
      cb()
    }
  }
}

class StringReadable extends Readable {
  /**
   * @param {string} buf
   */
  constructor(buf) {
    super()
    this.buf = buf
  }

  _read() {
    this.push(this.buf)
    this.push(null)
  }
}

/**
 * @param {string} s
 * @returns {boolean}
 */
function isNumberLiteral(s) {
  return !isNaN(parseFloat(s))
}

/**
 * @param {string} s
 * @returns {boolean}
 */
function isStringLiteral(s) {
  return s.startsWith('"') && s.endsWith('"') ||
    s.startsWith("'") && s.endsWith("'")
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

  return new Console(stdout, stderr)
}
