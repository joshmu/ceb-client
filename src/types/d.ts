export type Ticker = 'btcusd' | 'ethbtc' | 'ethusd'

export type TickerStatType = {
  mid: string
  bid: string
  ask: string
  last_price: string
  low: string
  high: string
  volume: string
  timestamp: string
}

export type SignalsType = {
  '5min': string
  '15min': string
  hourly: string
  daily: string
  monthly: string
}

export type BalancesType = {
  btc: number
  eth: number
  usd: number
}

export type AssetType = {
  signals: SignalsType
  ticker: TickerStatType
}

export type OrderType = {
  date: Date
  side: string
  symbol: string
  amount: number
  price: number
  orderid: string
  timestamp: number
}

export type AssetsType = {
  [key in Ticker]: AssetType
}

export type LogType = {
  appTimestamp: number
  appDate: string
  balances: BalancesType
  btcusd: AssetType
  ethbtc: AssetType
  ethusd: AssetType
  order: OrderType
  ignore: boolean
  notes: string
  env: string
}
