import React from 'react'
import './App.css'
import useCebData from './hooks/useCebData'
import Details from './components/details'

function App() {
  const logs = useCebData()

  return (
    <div className='App'>
      <div>
        <h1>CEB</h1>
        {logs ? (
          <div>
            <Details logs={logs} />
            <h2>Data</h2>
            <pre>{JSON.stringify(logs.slice(-10), null, 4)}</pre>
          </div>
        ) : (
          <p>Fetching data...</p>
        )}
      </div>
    </div>
  )
}

export default App
