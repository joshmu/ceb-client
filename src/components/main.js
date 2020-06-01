import React from 'react'
import Details from './details'

const Main = ({ logs }) => {
  return (
    <main>
      <div className='content'>
        <Details logs={logs} />
        <pre>{JSON.stringify(logs.slice(-10), null, 4)}</pre>
      </div>
    </main>
  )
}

export default Main
