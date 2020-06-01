import React, { useContext } from 'react'
import CryptoIcon from './cryptoIcon'
import { globalContext } from '../context/globalContext'

const Details = () => {
  const { logs } = useContext(globalContext)

  const latest = logs[logs.length - 1]
  latest.balances.usd = latest.balances.usd < 1 ? '0.00' : latest.balances.usd
  const durationDays = +(
    (latest.appTimestamp - logs[0].appTimestamp) /
    1000 /
    60 /
    60 /
    24
  ).toFixed(1)
  const orders = logs.filter((l) => l.order)

  return (
    <div className='info'>
      {Object.entries(latest.balances).map(([key, val]) => (
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
      <div className='card'>
        <p>{orders.length} orders</p>
      </div>
      <div className='card'>
        <p>{logs.length} logs</p>
      </div>
      <div className='card'>
        <p>{durationDays} days</p>
      </div>
    </div>
  )
}

export default Details
