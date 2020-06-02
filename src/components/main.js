import React, { useContext } from 'react'
import Details from './details'

import { globalContext } from '../context/globalContext'

const Main = () => {
  const { logs, loading } = useContext(globalContext)

  return (
    <main>
      <div className='content'>
        {logs && (
          <>
            <Details />
            {/* <pre>{JSON.stringify(logs.slice(-10), null, 4)}</pre> */}
          </>
        )}
        {loading && <p className='loading'>Fetching data...</p>}
      </div>
    </main>
  )
}

export default Main
