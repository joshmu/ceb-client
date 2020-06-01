import React from 'react'
import './App.scss'
import Header from './components/header'
import Footer from './components/footer'
import Main from './components/main'

import GlobalProvider from './context/globalContext'

function App() {
  return (
    <GlobalProvider>
      <div className='App'>
        <Header />
        <Main />
        <Footer />
      </div>
    </GlobalProvider>
  )
}

export default App
