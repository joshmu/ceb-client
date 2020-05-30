import React from 'react'

const Details = ({ logs }) => {
  const latest = logs[logs.length - 1]
  const durationDays = +(
    (latest.appTimestamp - logs[0].appTimestamp) /
    1000 /
    60 /
    60 /
    24
  ).toFixed(1)
  const orders = logs.filter((l) => l.order)

  return (
    <div>
      <h2>Details</h2>
      <p>{latest.balances.btc} BTC</p>
      <p>{latest.balances.eth} ETH</p>
      <p>${latest.balances.usd > 1 ? latest.balances.usd : '0.00'} USD</p>
      <p>{orders.length} orders</p>
      <p>{logs.length} logs</p>
      <p>{durationDays} days</p>
    </div>
  )
}

export default Details
