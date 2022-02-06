import mongoose from 'mongoose'
const Schema = mongoose.Schema

// todo: need to create a user/client schema
// deposits/ withdrawals
// timestamps
// amounts
// percentage of portfolio
// initial value
// current value
// use to compare against bot status logs
// equity?

// ? should we have a global transactions list so we have chronological order or inputs/outputs to calc performance on?
// although could just collect user data and construct this on the fly
const CLIENTS = [
  {
    alias: 'squid',
    transactions: [
      {
        type: 'deposit',
        asset: 'btc',
        amount: 0.7641634,
        date: '07/22/18',
        timestamp: 1532181600000,
      },
    ],
  },
  {
    alias: 'paper',
    transactions: [
      {
        type: 'deposit',
        asset: 'btc',
        amount: 1.00217386,
        date: '09/05/19 06:32:17',
        timestamp: 1567629137000,
      },
    ],
  },
  {
    alias: 'carpet',
    transactions: [
      {
        type: 'deposit',
        asset: 'btc',
        amount: 0.09313359,
        date: '08/12/19 02:53:17',
        timestamp: 1565542397000,
      },
    ],
  },
]

const logSchema = new Schema(
  {
    appTimestamp: { type: Number, required: true, unique: true },
    appDate: String,
    balances: {
      btc: Number,
      eth: Number,
      usd: Number,
    },
    btcusd: {
      signals: {
        '5min': String,
        '15min': String,
        hourly: String,
        daily: String,
        monthly: String,
      },
      ticker: {
        mid: String,
        bid: String,
        ask: String,
        last_price: String,
        low: String,
        high: String,
        volume: String,
        timestamp: String,
      },
    },
    ethbtc: {
      signals: {
        '5min': String,
        '15min': String,
        hourly: String,
        daily: String,
        monthly: String,
      },
      ticker: {
        mid: String,
        bid: String,
        ask: String,
        last_price: String,
        low: String,
        high: String,
        volume: String,
        timestamp: String,
      },
    },
    ethusd: {
      signals: {
        '5min': String,
        '15min': String,
        hourly: String,
        daily: String,
        monthly: String,
      },
      ticker: {
        mid: String,
        bid: String,
        ask: String,
        last_price: String,
        low: String,
        high: String,
        volume: String,
        timestamp: String,
      },
    },
    order: {
      date: Date,
      side: String,
      symbol: String,
      amount: Number,
      price: Number,
      orderid: String,
      timestamp: Number,
    },
    ignore: { type: Boolean, default: false },
    notes: String,
    env: String,
  },
  { timestamps: true }
)

export const Logs = mongoose.models.Logs || mongoose.model('Logs', logSchema)
export default Logs
