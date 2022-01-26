import mongoose from 'mongoose'
import Logs from './models/logSchema'

const log = msg => console.log(`DB: ${msg}`)

async function connect() {
  log(`attempting to connect to db...`)
  try {
    await mongoose.connect(process.env.MONGODB_URI, {})
    log(`connected!`)
  } catch (e) {
    console.error('Failed connecting to DB.', e.message)
    process.exit(1)
  }
}

async function getTrimmedLogs() {
  log('getTrimmedLogs')
  let logs = await Logs.find(
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

  return logs
}

export { connect, getTrimmedLogs }
