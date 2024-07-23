import React from 'react'
import Lottie from 'lottie-react'
import animationData from '@/assets/loader-top.json'

export default function TopButton() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      <div
        className="draggable-button"
        style={{
          position: 'fixed',
          zIndex: 9997,
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          cursor: 'grab',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={scrollToTop} // 點擊按鈕滾動到頂部
      >
        <p className="">TOP</p>
        <Lottie
          variant="primary"
          animationData={animationData}
          className="mt-4"
          style={{
            width: '80px',
            height: 'auto',
            position: 'fixed',
          }}
        />
      </div>
    </>
  )
}
