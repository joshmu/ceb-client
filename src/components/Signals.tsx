import { FC } from 'react'
import { useAppContext } from '../context/globalContext'
import { AssetType, LogType, SignalsType, Ticker } from '../types/d'

const TICKER_SYMBOLS: Ticker[] = ['btcusd', 'ethbtc', 'ethusd']

const Cell: FC<{ symbol: Ticker; signal: SignalsType }> = ({
  symbol,
  signal,
}) => <div className='cell' style={cellStyle(symbol, signal)}></div>

const SignalsRow: FC<{ log: LogType }> = ({ log }) => {
  return (
    <div className='row' style={{ display: 'flex', width: '100%' }}>
      {TICKER_SYMBOLS.map((symbol, idx) => (
        <Cell key={idx} symbol={symbol} signal={getSignal(symbol, log)} />
      ))}
    </div>
  )
}

const SignalsHeader: FC = () => {
  return (
    <div className='row' style={{ display: 'flex', width: '100%' }}>
      {TICKER_SYMBOLS.map((symbol, idx) => (
        <p
          key={idx}
          style={{
            fontWeight: 'bold',
            position: 'relative',
            transform: 'rotate(-45deg)',
            width: '30px',
          }}
        >
          {symbol}
        </p>
      ))}
    </div>
  )
}

type SignalsPropType = {
  signalsLimit: number
}

export const Signals: FC<SignalsPropType> = ({ signalsLimit = 500 }) => {
  const { logs } = useAppContext()

  if (!logs?.length) return null

  // get the last signalsLimit of the logs
  const signals = logs.slice(logs.length - signalsLimit)
  // sort from most recent to oldest
  const reversedSignals = [...signals].reverse()

  return (
    <div
      className='container'
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SignalsHeader />
      {reversedSignals.map((log, idx) => (
        <SignalsRow key={idx} log={log} />
      ))}
    </div>
  )
}

function getSignal(symbol: Ticker, log: LogType): SignalsType {
  return ((log as any)[symbol] as AssetType).signals
}

function cellStyle(symbol: Ticker, signal: SignalsType): React.CSSProperties {
  return {
    backgroundColor: calcSignalColor(signal),
    height: '10px',
    width: '30px',
    border: '1px solid white',
  }
}

function calcSignalColor(signal: SignalsType): string {
  switch (signal?.daily) {
    case 'strong buy':
      return 'darkgreen'
    case 'buy':
      return 'green'
    case 'sell':
      return 'red'
    case 'strong sell':
      return 'darkred'
    case 'neutral':
      return 'lightgrey'
    default:
      return 'transparent'
  }
}
