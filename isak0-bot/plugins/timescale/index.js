#!/usr/bin/env node

console.log('\n[TimescaleDb]')
let seuils = {basic: 6.65, yout_visite: 20, basic_hs: 6}

const { /*Pool,*/ Client } = require('pg')
var fs = require('fs');
var debug = false
var timescaledb_host = "172.17.0.8"
var connectionString ="postgres://postgres:password@"+timescaledb_host+":5432/example";

// print process.argv
const args = process.argv.slice(2).reduce((acc, arg) => {
  let [k, v = true] = arg.split('=')
  acc[k] = v
  return acc
}, {})

let reportFile = args.report
var content = fs.readFileSync(reportFile, "utf-8");
let jsonReport = JSON.parse(content)

let time = jsonReport.stats.start
let jobName = process.env.SCENARIO
let status = jsonReport.stats.failures == 0 ? 0 : 2



// console.log("status",status)
//
//
let injecteur = process.env.NODE_NAME || process.env.HOSTNAME
let duree = (jsonReport.stats.duration/1000).toFixed(1)


console.log(duree , ' et ', seuils[jobName])
// test warning

if(status == 0 ){
  if (duree > seuils[jobName]){
    status = 1
    console.log('warning : seuil, duree',  seuils[jobName], duree)
  }
}




let query="INSERT INTO executions VALUES ('"+time+"', '"+jobName+"','"+duree+"', '"+injecteur+"', "+status+");"
console.log(query)

const client = new Client({
  connectionString: connectionString
});


client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  }
  // else {
  //   console.log('connected')
  // }
})

client.query(query, function (err, result) {
  if (err) {
    console.log(err);
  }
  // console.log(result)
  // console.log("inserted", query)
  // console.log("done")
  closeClient()
  //  res.status(200).send(result.rows);
});



function closeClient(){
  client.end(err => {
    // console.log('client has disconnected')
    if (err) {
      console.log('error during disconnection', err.stack)
    }
  })
}
