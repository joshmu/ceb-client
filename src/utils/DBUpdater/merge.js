/**
 * inspect json output from both gsheet and mongo to understand what cells to fill in
 */

// we need to fill in ethbtc

import fs from 'fs'

const gsheetData = JSON.parse(fs.readFileSync('./signals-gsheet.json', 'utf8'))
const mongoData = JSON.parse(fs.readFileSync('./signals-mongo.json', 'utf8'))

// iterate over mongo data and find missing signals
const missingSignals = mongoData.filter(log => !log?.ethbtc?.signals?.daily)
console.log('missing', missingSignals.length)

const updated = []
for (const log of missingSignals) {
  // find matching log in gsheet via timestamp
  let gsheetLog = findViaTime(log.appTimestamp)
  if (!gsheetLog) {
    // console.log('not found', log)
    // then find the closest timestamp
    const { diff, cell } = findClosest(log.appTimestamp)
    if (diff > 1000 * 60 * 60 * 24) {
      console.log('too large!')
      break
    }
    gsheetLog = cell
    // console.log(gsheetLog)
  } else {
    // add ethbtc daily signal
    log.ethbtc.signals = {
      ...log.ethbtc.signals,
      daily: gsheetLog.ethbtc,
    }
    updated.push(log)
  }
}

// find any gaps again (gsheet data had a moment where we had no ethbtc signals)
// we will use the last recorded signal from gsheet to fill in the gaps
// const gaps = updated.reduce((acc, log) => {
//   return log?.ethbtc?.signals?.daily ? acc : acc + 1
// }, 0)
// console.log('gaps', gaps)

let lastValidLog = null
for (let log of updated) {
  if (!log?.ethbtc?.signals?.daily) {
    console.log('missing', log)
    log.ethbtc.signals = {
      ...log.ethbtc.signals,
      daily: lastValidLog.ethbtc.signals.daily,
    }
  } else {
    lastValidLog = log
  }
}

const gaps = updated.reduce((acc, log) => {
  return log?.ethbtc?.signals?.daily ? acc : acc + 1
}, 0)
console.log('gaps', gaps)

console.log('updated', updated.length)

fs.writeFileSync('./signals-mongo-updated.json', JSON.stringify(updated))

function findViaTime(timestamp) {
  return gsheetData.find(cell => Number(cell.timestamp) === timestamp)
}

function findClosest(timestamp) {
  const closest = gsheetData.reduce(
    (acc, cell) => {
      const diff = Math.abs(Number(cell.timestamp) - timestamp)
      if (diff < acc.diff) {
        return { diff, cell }
      }
      return acc
    },
    { diff: Number.MAX_SAFE_INTEGER, cell: null }
  )
  return closest
}
