import { useAppContext } from '../context/globalContext'
import CryptoIcon from './cryptoIcon'

export const Details = () => {
  const { logs, wallet, prices, facts } = useAppContext()

  if (!logs) return null

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
