/**
 * db updater to update missing signals
 */

/**
- [x] get json file of entire google sheet output for signals
- [ ] get json file of entire mongo output for ceb
- [ ] comparison and populate with manual check
- [ ] mongo update call for updated logs
 */
// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()
// const { GoogleSpreadsheet } = require('google-spreadsheet')
import { GoogleSpreadsheet } from 'google-spreadsheet'
import fs from 'fs'
import mongoose from 'mongoose'
import Logs from './db/models/logSchema.js'
// const Mongoose = require('mongoose')
// const { Logs } = require('../../../db/models/logSchema')

const creds = {
  client_email: process.env.GSHEET_CLIENT_EMAIL,
  private_key: process.env.GSHEET_PRIVATE_KEY,
}

// spreadsheet shared with full privilege to:
// joshmu@gsheet-db.iam.gserviceaccount.com
const gsheetInfo = {
  spreadsheet_id: '1GO8Qi5GrIih0GmFOLXRDF2d1Z5ZEbRf6tJdOb3hmaJo',
  walletSheetIndex: 0,
  historySheetIndex: 1,
  signalsSheetIndex: 2,
  performanceSheetIndex: 3,
  orderHistorySheetIndex: 4,
}

// * get json file of entire google sheet output for signals
// connect to gsheet
async function loadDoc() {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  let doc = new GoogleSpreadsheet(gsheetInfo.spreadsheet_id)
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  // console.log(doc.title)
  return doc
}

// GO
;(async () => {
  console.log('starting db updater')

  const getGsheet = false
  if (getGsheet) {
    const doc = await loadDoc()
    console.log('getting signals worksheet')
    const signalsWorksheet = await doc.sheetsByIndex[
      gsheetInfo.signalsSheetIndex
    ]
    // await signalsWorksheet.loadCells()
    const rows = await signalsWorksheet.getRows()
    const data = rows.map(normalizeGsheet)

    console.log(data)
    fs.writeFileSync('./signals-gsheet.json', JSON.stringify(data))
  }

  // get mongo data for signals
  const getMongo = true
  if (getMongo) {
    await mongoose.connect(process.env.MONGODB_URI)
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

    console.log({ logs })
    fs.writeFileSync('./signals-mongo.json', JSON.stringify(logs))
  }
})()

function normalizeGsheet(row) {
  const [date, btcusd, ethbtc, ethusd, timestamp] = row._rawData
  return {
    date,
    btcusd,
    ethbtc,
    ethusd,
    timestamp,
  }
}
