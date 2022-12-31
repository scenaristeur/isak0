#!/usr/bin/env node
console.log('\n[OrbitDb]')

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
var fs = require('fs');
var debug = false


// print process.argv
const args = process.argv.slice(2).reduce((acc, arg) => {
  let [k, v = true] = arg.split('=')
  acc[k] = v
  return acc
}, {})

let reportFile = args.report
var content = fs.readFileSync(reportFile, "utf-8");
let jsonReport = JSON.parse(content)



;(async function () {
  const ipfs = await IPFS.create()
  const orbitdb = await OrbitDB.createInstance(ipfs)

  // Create / Open a database
  const db = await orbitdb.log("hello")
  await db.load()

  // Listen for updates from peers
  db.events.on("replicated", address => {
    console.log(db.iterator({ limit: -1 }).collect())
  })

  // Add an entry
  const hash = await db.add("world")
  console.log(hash)

  const hash2 = await db.add(jsonReport)
  console.log(hash2)

  // Query
  const result = db.iterator({ limit: -1 }).collect()
  console.log(JSON.stringify(result, null, 2))
})()
