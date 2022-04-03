import { FC, useMemo } from 'react'
import { useAppContext } from '../context/globalContext'

function getTotalUSDValue({
  wallet,
  prices,
}: {
  wallet: [string, number][]
  prices: [string, string][]
}): number {
  const btcPrice = Number(prices[0][1])
  const ethPrice = Number(prices[2][1])

  const btcAmount = wallet[0][1]
  const ethAmount = wallet[1][1]
  const usdAmount = wallet[2][1]

  return btcPrice * btcAmount + ethPrice * ethAmount + usdAmount
}

// Create our number formatter.
const priceUSDFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

export const TotalUSD: FC = () => {
  const { wallet, prices } = useAppContext()

  /**
    prices: Array(3)
      0: (2) ['btcusd', '45849.5']
      1: (2) ['ethbtc', '0.0749995']
      2: (2) ['ethusd', '3440.95']
    wallet: Array(3)
      0: (2) ['btc', 9.5e-7]
      1: (2) ['eth', 33.08525273]
      2: (2) ['usd', 0]
   */

  const totalUSDValue = useMemo(
    () => getTotalUSDValue({ wallet, prices }),
    [wallet, prices]
  )

  if (!totalUSDValue) return null

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {priceUSDFormatter.format(totalUSDValue)}
    </span>
  )
}
