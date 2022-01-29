import CryptoIcon from './cryptoIcon'

export const Details = ({ logs }) => {
  // parse the data
  const tickerNames = ['btcusd', 'ethbtc', 'ethusd']

  const latest = logs[logs.length - 1]

  // wallet
  latest.balances.usd = latest.balances.usd < 1 ? '0.00' : latest.balances.usd
  const wallet = Object.entries(latest.balances)

  // prices
  const prices = tickerNames.map(tn => [tn, latest[tn].ticker.mid])

  // facts
  const durationDays = +(
    (latest.appTimestamp - logs[0].appTimestamp) /
    1000 /
    60 /
    60 /
    24
  ).toFixed(1)
  const orders = logs.filter(l => l.order)
  const facts = [
    ['days', durationDays],
    ['trades', orders.length],
    ['entries', logs.length],
  ]

  return (
    <div className='info'>
      <h2 style={{ minWidth: '100%', textAlign: 'center' }}>Wallet</h2>
      {wallet.map(([key, val]) => (
        <div className='card' key={key} style={{ fontSize: '2rem' }}>
          <div className='balance'>
            <CryptoIcon className='symbol' assetName={key} />
            <span className='amount-wrapper'>
              <span className='amount'>{val}</span>
              <span className='asset'>{key}</span>
            </span>
          </div>
        </div>
      ))}
      <h2 style={{ minWidth: '100%', textAlign: 'center' }}>Prices</h2>
      {prices.map(([key, val]) => (
        <div className='card' key={key}>
          <div className='balance'>
            <CryptoIcon className='symbol' assetName={key} />
            <span className='amount-wrapper'>
              <span className='amount'>{val}</span>
              <span className='asset'>{key}</span>
            </span>
          </div>
        </div>
      ))}
      <h2 style={{ minWidth: '100%', textAlign: 'center' }}>Facts</h2>
      {facts.map(([key, val]) => (
        <div className='card' key={key}>
          <div className='balance'>
            <CryptoIcon className='symbol' assetName={key} />
            <span className='amount-wrapper'>
              <span className='amount'>{val}</span>
              <span className='asset'>{key}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
