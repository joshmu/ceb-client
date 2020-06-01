import React from 'react'
import { FaBtc, FaEthereum, FaDollarSign } from 'react-icons/fa'

const CryptoIcon = ({ assetName, ...props }) => {
  switch (assetName) {
    case 'btc':
      return <FaBtc {...props} />
    case 'eth':
      return <FaEthereum {...props} />
    case 'usd':
      return <FaDollarSign {...props} />
    default:
      return <div {...props}></div>
  }
}

export default CryptoIcon
