/**
 * update the mongo db with the signals from gsheet
 */

import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import mongoose from 'mongoose'
import Logs from './db/models/logSchema.js'
;(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  const gsheetData = JSON.parse(
    fs.readFileSync('./signals-gsheet.json', 'utf8')
  )

  const logs = await Logs.find(
    { balances: { $exists: true } },
    {
      'btcusd.signals.daily': 1,
      'ethbtc.signals.daily': 1,
      'ethusd.signals.daily': 1,
      'btcusd.ticker.mid': 1,
      'ethbtc.ticker.mid': 1,
      'ethusd.ticker.mid': 1,
      appTimestamp: 1,
      balances: 1,
      order: 1,
    }
  )
    .sort({ appTimestamp: 'asc' })
    .lean()

  const gaps = logs.filter(log => !log.ethbtc?.signals?.daily)
  for (const gap of gaps) {
    // get previous log
    console.log(gap)
    const { cell, diff } = findClosest(gap.appTimestamp, gsheetData)
    console.log(`diff: ${diff}, ethbtc: ${cell.ethbtc}, btcusd: ${cell.btcusd}`)

    const timestamp = gap.appTimestamp
    const signal = cell.ethbtc
    await Logs.findOneAndUpdate(
      { appTimestamp: timestamp },
      { $set: { 'ethbtc.signals.daily': signal } }
    )
    console.log(`updated ::: ${signal}`)
  }
  mongoose.disconnect()
})()

// ;(async () => {
//   const updatedLogs = JSON.parse(
//     fs.readFileSync('./signals-mongo-updated.json', 'utf8')
//   )
//   await mongoose.connect(process.env.MONGODB_URI)

//   const total = updatedLogs.length

//   // grab specific mongo log
//   for (let i = 0; i < total; i++) {
//     const updatedLog = updatedLogs[i]
//     const timestamp = updatedLog.appTimestamp
//     const signal = updatedLog.ethbtc.signals.daily

//     // get the log based on timestamp from mongoose Log model
//     // const log = await Logs.findOne({ appTimestamp: timestamp })

//     // update the log with new signal
//     await Logs.findOneAndUpdate(
//       { appTimestamp: timestamp },
//       { $set: { 'ethbtc.signals.daily': signal } }
//     )
//     console.log(`updated ${i} of ${total} ::: ${signal}`)
//   }

//   // test single update on mongo
//   // look in to bulk partial update of mongo db

//   // validate by pulling down mongo again and checking for gaps in the ethbtc daily signal

//   // disconnect the mongoose connection
//   mongoose.disconnect()
// })()

async function getLogs() {
  const logs = await Logs.find(
    { balances: { $exists: true } },
    {
      'btcusd.signals.daily': 1,
      'ethbtc.signals.daily': 1,
      'ethusd.signals.daily': 1,
      'btcusd.ticker.mid': 1,
      'ethbtc.ticker.mid': 1,
      'ethusd.ticker.mid': 1,
      appTimestamp: 1,
      balances: 1,
      order: 1,
    }
  )
    .sort({ appTimestamp: 'asc' })
    .lean()
}

function findClosest(timestamp, data) {
  const closest = data.reduce(
    (acc, cell) => {
      const diff = Math.abs(Number(cell.timestamp) - timestamp)
      if (diff < acc.diff && cell?.ethbtc) {
        return { diff, cell }
      }
      return acc
    },
    { diff: Number.MAX_SAFE_INTEGER, cell: null }
  )
  return closest
}
