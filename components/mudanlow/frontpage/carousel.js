import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

export default function FrontPageCarousel() {
  const cardsContainerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalCards = 5
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const deltaX = e.clientX - startX
    setCurrentTranslate(deltaX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    if (currentTranslate > 50) {
      handlePrev()
    } else if (currentTranslate < -50) {
      handleNext()
    }
    setIsDragging(false)
    setCurrentTranslate(0)
  }

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current

    if (!cardsContainer) return

    const radius = 200 // 圓柱體的半徑
    const angle = (2 * Math.PI) / totalCards

    const cards = cardsContainer.querySelectorAll('.ImgCard')

    cards.forEach((card, index) => {
      const theta =
        (index - currentIndex) * angle +
        (currentTranslate / window.innerWidth) * angle
      const x = radius * Math.sin(theta)
      const z = radius * (Math.cos(theta) - 1) // 調整z軸位移，減少前後落差
      const scale = 0.8 + 0.2 * Math.cos(theta) // 使縮放比例更平滑

      card.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`
      card.style.zIndex = Math.round(scale * 10)
      card.style.opacity = scale
      card.style.transition = isDragging ? 'none' : 'transform 0.5s ease-in-out'
    })

    const handleMouseUpWindow = () => {
      if (isDragging) {
        handleMouseUp()
      }
    }

    window.addEventListener('mouseup', handleMouseUpWindow)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mouseup', handleMouseUpWindow)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [currentIndex, currentTranslate, isDragging])

  return (
    <section
      id="trending-products"
      className="section-secondary-color carouselSection background1"
    >
      <div className="row d-flex justify-content-center flex-column-reverse flex-lg-row">
        <div className="col-lg-5 text-center">
          <h2 className="display-4 lxgw-wenkai-mono-tc-bold frontTitle">
            餐點介紹
          </h2>
          <div className="text-center frontTitle text-dark py-5 lxgw-wenkai-mono-tc-regular fs-5">
            我們餐廳提供豐富多樣的美食選擇，從精緻的開胃小菜到美味的主菜和甜品，每道菜品均選用新鮮食材，精心烹製。無論是傳統風味還是創新料理，都能滿足您的味蕾。邀請您來享受一場美食盛宴。
          </div>
        </div>
        <div className="col-lg-7">
          <div className="container-fluid d-flex justify-content-center position-relative">
            <div
              ref={cardsContainerRef}
              className="cardCarousel d-flex justify-content-center position-relative"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                width={70}
                className="preBtn"
                onClick={handlePrev}
              />
              {[...Array(totalCards)].map((_, index) => (
                <div
                  key={index}
                  className={`ImgCard ${
                    index === currentIndex ? 'highlight' : ''
                  }`}
                >
                  <div className="imageContainer">
                    <img
                      src={`/images/carousel/${index + 1}.jpg`}
                      alt={`Slide ${index + 1}`}
                      className="carouselImage"
                    />
                  </div>
                  <button className="carouselBtn">查看菜單</button>
                </div>
              ))}
              <FontAwesomeIcon
                icon={faChevronRight}
                width={70}
                className="nextBtn"
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
