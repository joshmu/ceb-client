import React from 'react'
import { FaRegCopyright } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <p>
        <span className='footer-mu'>
          <a
            href='https://hello.joshmu.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            MU
          </a>
        </span>
        {new Date().getFullYear()}
        <FaRegCopyright className='footer-icon' />
        <span className='footer-reserved'> Rights Reserved.</span>
      </p>
    </footer>
  )
}

export default Footer
