import React from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'

export default function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <button
        onClick={scrollToTop}
        style={styles.scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowAltCircleUp />
      </button>
    </div>
  )
}

const styles = {
  scrollToTop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2rem',
    height: '2rem',
    backgroundColor: 'black',
    borderRadius: '50%',
    textAlign: 'center',
    position: 'fixed',
    right: '30px',
    bottom: '30px',
    color: 'white',
    cursor: 'pointer',
    zIndex: 5,
  },
}
