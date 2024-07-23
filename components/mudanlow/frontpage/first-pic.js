import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import animate from 'animate.css'

export default function FirstPicture() {
  const aboutUsRef = useRef(null)
  const scrollDownRef = useRef(null)
  const frontpageLogoRef = useRef(null)

  const scrollToSection = (e) => {
    e.preventDefault()
    aboutUsRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      scrollToSection(e)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const frontpageLogo = frontpageLogoRef.current
      const scrollDown = scrollDownRef.current

      if (frontpageLogo) {
        frontpageLogo.style.opacity = 1 - scrollPos / 300
        frontpageLogo.style.transform = `translateY(${scrollPos}px)`
        frontpageLogo.style.visibility = scrollPos > 300 ? 'hidden' : 'visible'
      }

      if (scrollDown) {
        scrollDown.style.opacity = 1 - scrollPos / 300
        scrollDown.style.visibility = scrollPos > 300 ? 'hidden' : 'visible'
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="frontpage">
        <div className="frontpage-logo" ref={frontpageLogoRef}>
          <img src="/pics/logo-gold.png" alt="Logo" />
        </div>
        <div id="scroll-down" ref={scrollDownRef}>
          <FontAwesomeIcon
            icon={faAnglesDown}
            onClick={scrollToSection}
            className="arrow animate__animated animate__pulse animate__slow animate__infinite"
            role="button"
            onKeyDown={handleKeyDown}
            tabIndex="0"
            height={70}
          />
        </div>
        <div className="overlay"></div>
        <img
          className="frontpage-img"
          src="/images/mudanlowWebp/DSC00618.webp"
          alt="Frontpage"
        />
      </div>
      <div ref={aboutUsRef}>{/* 您的關於我們內容 */}</div>
      <style jsx>{`
        .frontpage-logo img,
        #scroll-down {
          transition: transform 0.3s ease, opacity 0.3s ease,
            visibility 0.3s ease;
        }
        #scroll-down {
          cursor: pointer;
        }
        .frontpage {
          height: 100vh;
          position: relative;
        }

        .arrow {
          z-index: 8;
          position: absolute;
          color: #fff;
          font-size: 70px;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .frontpage-logo {
          position: fixed;
          z-index: 8;
          top: 30%;
          left: 30%;
        }
        .frontpage-logo > img {
          height: 200px;
        }

        .frontpage-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 0.5;
          position: absolute;
        }

        @media (min-width: 1660px) {
          .frontpage-logo > img {
            height: 200px;
          }
          .frontpage-logo {
            position: fixed;
            z-index: 8;
            top: 30%;
            left: 30%;
          }
        }
        @media (max-width: 1100px) {
          .frontpage-logo > img {
            height: 80%;
          }
          .frontpage-logo {
            position: fixed;
            z-index: 8;
            top: 30%;
            left: 30%;
          }
        }

        @media (max-width: 1024px) {
          .frontpage-logo > img {
            height: 60%;
          }
          .frontpage-logo {
            position: fixed;
            z-index: 8;
            top: 30%;
            left: 30%;
          }
        }

        /* desktops */
        @media (max-width: 992px) {
          .frontpage-logo > img {
            height: 100px;
          }
          .frontpage-logo {
            position: fixed;
            z-index: 8;
            top: 30%;
            left: 30%;
          }
        }

        /* tablets */
        @media (max-width: 768px) {
          .frontpage-logo > img {
            height: 100px;
          }
          .frontpage-logo {
            position: fixed;
            z-index: 8;
            top: 30%;
            left: 30%;
          }
        }

        /* phones */
        @media (max-width: 576px) {
          .frontpage-logo > img {
            height: 50px;
          }
          .frontpage-logo {
            position: fixed;
            z-index: 8;
            top: 30%;
            left: 30%;
          }
        }
      `}</style>
    </>
  )
}
