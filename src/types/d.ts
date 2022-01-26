export type LogType = {
  appTimestamp: Number
  appDate: String
  balances: {
    btc: Number
    eth: Number
    usd: Number
  }
  btcusd: {
    signals: {
      '5min': String
      '15min': String
      hourly: String
      daily: String
      monthly: String
    }
    ticker: {
      mid: String
      bid: String
      ask: String
      last_price: String
      low: String
      high: String
      volume: String
      timestamp: String
    }
  }
  ethbtc: {
    signals: {
      '5min': String
      '15min': String
      hourly: String
      daily: String
      monthly: String
    }
    ticker: {
      mid: String
      bid: String
      ask: String
      last_price: String
      low: String
      high: String
      volume: String
      timestamp: String
    }
  }
  ethusd: {
    signals: {
      '5min': String
      '15min': String
      hourly: String
      daily: String
      monthly: String
    }
    ticker: {
      mid: String
      bid: String
      ask: String
      last_price: String
      low: String
      high: String
      volume: String
      timestamp: String
    }
  }
  order: {
    date: Date
    side: String
    symbol: String
    amount: Number
    price: Number
    orderid: String
    timestamp: Number
  }
  ignore: Boolean
  notes: String
  env: String
}
