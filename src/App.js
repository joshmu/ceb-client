import React from 'react'
import './App.scss'
import useCebData from './hooks/useCebData'
import Header from './components/header'
import Footer from './components/footer'
import Main from './components/main'

function App() {
  const logs = useCebData()

  return (
    <div className='App'>
      <Header />
      {logs ? <Main logs={logs} /> : <p>Fetching data...</p>}
      <Footer />
    </div>
  )
}

export default App
