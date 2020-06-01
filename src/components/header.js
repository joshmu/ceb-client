import React from 'react'

const Header = () => {
  return (
    <header>
      <div className='navbar'>
        <div className='logo'>
          <a href='/'>
            <h1>
              <span>C</span>RYSTAL <span>E</span>TH <span>B</span>OT
            </h1>
          </a>
        </div>
        <nav>
          <ul>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
