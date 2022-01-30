import { useEffect, useState } from 'react'
import { LogType, Ticker } from '../types/d'

const TICKERS: Ticker[] = ['btcusd', 'ethbtc', 'ethusd']

type StatsType = {
  latest: LogType
  wallet: [string, number][]
  prices: [string, string][]
  facts: [string, number][]
  orders: LogType[]
}

export const useCryptoStats = ({ logs }: { logs: LogType[] }): StatsType => {
  const [stats, setStats] = useState<StatsType>({} as StatsType)

  useEffect(() => {
    if (!logs?.length) return

    // most recent record
    const latest = logs[logs.length - 1]

    const wallet = calcWallet(latest)
    const prices = getPrices(latest)
    const duration = calcDuration({ first: latest, last: logs[0] })
    const orders = logs.filter(l => l.order)

    const facts: [string, number][] = [
      ['days', duration],
      ['trades', orders.length],
      ['entries', logs.length],
    ]

    setStats({ latest, wallet, prices, facts, orders })
  }, [logs])

  return stats
}

// HELPERS
function calcWallet(latest: LogType) {
  latest.balances.usd = latest.balances.usd < 1 ? 0 : latest.balances.usd
  const wallet = Object.entries(latest.balances)
  return wallet
}

function getPrices(latest: LogType) {
  const prices: [string, string][] = TICKERS.map(tn => [
    tn,
    (latest as any)[tn].ticker.mid,
  ])
  return prices
}

function calcDuration({ first, last }: { first: LogType; last: LogType }) {
  const timeDiff = first.appTimestamp - last.appTimestamp
  const days = +(timeDiff / 1000 / 60 / 60 / 24).toFixed(1)
  return days
}
