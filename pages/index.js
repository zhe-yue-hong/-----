import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import FirstPicture from '@/components/mudanlow/frontpage/first-pic'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import NavbarLogin from '@/components/layout/mudanlow-layout/navbar-login'
import Footer from '@/components/layout/mudanlow-layout/footer'
import FrontPageCarousel from '@/components/mudanlow/frontpage/carousel'
import MessageBoard from '@/components/mudanlow/frontpage/messageboard'
import Link from 'next/link'
import News from '@/components/mudanlow/frontpage/news'
import NavbarMotion from '@/components/layout/mudanlow-layout/navbar-motion'
import { useAuth } from '@/hooks/use-auth'
import Marquee from 'react-fast-marquee'

export default function MudanlowIndex() {
  const { auth } = useAuth()

  const textRef = useRef(null)
  const imageRef = useRef(null)
  const aboutText1Ref = useRef(null)
  const aboutImage1Ref = useRef(null)
  const aboutText2Ref = useRef(null)
  const aboutImage2Ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    })

    const textElement = textRef.current
    const imageElement = imageRef.current
    const aboutTextElement1 = aboutText1Ref.current
    const aboutImageElement1 = aboutImage1Ref.current
    const aboutTextElement2 = aboutText2Ref.current
    const aboutImageElement2 = aboutImage2Ref.current

    if (textElement) {
      observer.observe(textElement)
    }

    if (imageElement) {
      observer.observe(imageElement)
    }

    if (aboutTextElement1) {
      observer.observe(aboutTextElement1)
    }

    if (aboutImageElement1) {
      observer.observe(aboutImageElement1)
    }
    if (aboutTextElement2) {
      observer.observe(aboutTextElement2)
    }

    if (aboutImageElement2) {
      observer.observe(aboutImageElement2)
    }

    return () => {
      if (textElement) {
        observer.unobserve(textElement)
      }
      if (imageElement) {
        observer.unobserve(imageElement)
      }
      if (aboutTextElement1) {
        observer.unobserve(aboutTextElement1)
      }
      if (aboutImageElement1) {
        observer.unobserve(aboutImageElement1)
      }
      if (aboutTextElement2) {
        observer.unobserve(aboutTextElement2)
      }
      if (aboutImageElement2) {
        observer.unobserve(aboutImageElement2)
      }
    }
  }, [])
  return (
    <>
      <FirstPicture />
      {auth.isAuth ? <NavbarLogin /> : <Navbar />}
      <section
        id="about-us"
        className="background2 aboutUsSection position-relative"
      >
        <div className="container-fluid p-5">
          <div className="row align-items-center justify-content-center g-5">
            <div className="col-lg-5 fade-in-image" ref={imageRef}>
              <div className="image-holder mb-4 firstPic">
                <Image
                  src="images/mudanlowWebp/DSC00576.webp"
                  alt="single"
                  className="Image-fluid "
                  width={720}
                  height={540}
                  layout="responsive"
                  priority
                />
              </div>
            </div>
            <div className="col-lg-5 fade-in-section" ref={textRef}>
              <div className="detail p-5">
                <div className="display-header">
                  <h2 className="display-4 text-dark pb-2 lxgw-wenkai-mono-tc-bold">
                    起源/宗旨
                  </h2>
                  <p className="pb-3 lxgw-wenkai-mono-tc-regular fs-5">
                    2016年春天，一家名為「牡丹樓中式料理」的小店開始了它的故事。
                    在店主邱小姐心中，家始終是最溫暖的地方，而食物是家的象徵。於是，他決定開設一家以家為靈感的中國傳統料理餐廳，希望能將家的溫馨帶給每一位客人。
                    <br />
                    從開店至今，我們相信，每一位客人都是家人，應該被以真誠和溫暖來對待。無論是簡單的問候還是精心的服務，他都希望能讓顧客在牡丹樓感受到家的溫馨，便將「顧客至上」作為店家的宗旨。
                    <br />
                    每一道餐點都蘊含著我們對家的深情，每一位客人都被真誠和溫暖所包圍。
                    牡丹樓的故事將繼續延續下去，帶給更多人家的溫馨與美味。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="backgroundItem">
          <Image
            src="/pics/frontItem.png"
            width={600}
            height={600}
            layout="responsive"
          />
        </div>
        <div className="backgroundItem2">
          <Image
            src="/pics/frontItem.png"
            width={300}
            height={300}
            layout="responsive"
          />
        </div>
      </section>
      <FrontPageCarousel />
      {/* 最新消息 */}
      <section
        id="trending-products"
        className="news-section background2 position-relative"
      >
        <News />
        <Image
          src="pics/background-pic1 (1).png"
          className="pic1 position-absolute"
          width={500}
          height={500}
          layout="responsive"
          alt=""
        />
      </section>
      {/* <!-- 照片分割 --> */}
      <div className="container-fluid d-flex justify-content-center align-items-center position-relative">
        <div className="row">
          <div className="col-lg-3 col-md-6 p-0">
            <Image
              className="frontpageImage"
              src="images/mudanlowWebp/DSC00587.webp"
              alt=""
              width={478}
              height={310}
              layout="responsive"
            />
          </div>
          <div className="col-lg-3 col-md-6 p-0">
            <Image
              className="frontpageImage"
              src="images/mudanlowWebp/DSC00694.webp"
              alt=""
              width={478}
              height={310}
              layout="responsive"
            />
          </div>
          <div className="col-lg-3 col-md-6 p-0">
            <Image
              className="frontpageImage"
              src="images/mudanlowWebp/DSC00583.webp"
              alt=""
              width={478}
              height={310}
              layout="responsive"
            />
          </div>
          <div className="col-lg-3 col-md-6 p-0">
            <Image
              className="frontpageImage"
              src="images/mudanlowWebp/DSC00699.webp"
              alt=""
              width={478}
              height={310}
              layout="responsive"
            />
          </div>
        </div>
        <div className="picOverlay">
          <Marquee
            className="runHorseLight"
            direction="left"
            pauseOnHover="true"
            speed={130}
          >
            ✨ 現在優惠！✨ 累積消費滿5000元，即贈500元折價券！快來參加吧！
            更多活動詳情，請至活動頁面詳閱！
          </Marquee>
        </div>
      </div>
      {/* <!-- 關於我們&徵才資訊 --> */}
      <section className="section-secondary-color background2 position-relative">
        <h2 className="display-4 lxgw-wenkai-mono-tc-bold frontTitle">
          關於我們
        </h2>
        <div className="container mt-5">
          <div className="row d-flex justify-content-evenly align-items-center flex-column flex-lg-row">
            <div className="col-lg-4 fade-in-image" ref={aboutImage1Ref}>
              <div className="aboutHire">
                <div className="hoverContainer">
                  <div className="hireOverlay"></div>
                  <Image
                    className="aboutHireImage"
                    src="images/mudanlowWebp/DSC00567.webp"
                    alt=""
                    width={480}
                    height={360}
                    layout="responsive"
                  />
                  <Link href="/mudanlow/about-us/introduce" passHref>
                    <button className="hireBtn mt-5 lxgw-wenkai-mono-tc-light">
                      場地介紹
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 fade-in-section" ref={aboutText1Ref}>
              <h2>場地介紹</h2>
              <p className="text-center lxgw-wenkai-mono-tc-regular fs-5">
                我們的餐廳環境溫馨雅緻，裝潢別緻，擁有舒適的座椅和柔和的燈光。寬敞的用餐區和私密的包廂滿足不同需求，適合家庭聚餐、商務宴請和浪漫約會。
              </p>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row d-flex justify-content-evenly align-items-center flex-column-reverse flex-lg-row">
            <div
              className="col-lg-4 text-end fade-in-section"
              ref={aboutText2Ref}
            >
              <h2>人才招募</h2>
              <p className="text-center lxgw-wenkai-mono-tc-regular fs-5">
                我們的餐廳正在招募熱情、有責任心的員工。無論您是廚師、服務員還是管理人員，我們都歡迎您的加入。提供良好的工作環境和培訓機會，讓您在這裡成長和發展。
              </p>
            </div>
            <div className="col-lg-4 fade-in-image-right" ref={aboutImage2Ref}>
              <div className="aboutHire">
                <div className="hoverContainer">
                  <div className="hireOverlay"></div>
                  <Image
                    className="aboutHireImage"
                    src="images/mudanlowWebp/DSC00691.webp"
                    alt=""
                    width={480}
                    height={360}
                    layout="responsive"
                  />
                  <Link href="/mudanlow/about-us/hire" passHref>
                    <button className="mt-5 lxgw-wenkai-mono-tc-light hireBtn">
                      人才招募
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="pics/frontItem2.png"
          className="pic2 position-absolute"
          width={500}
          height={500}
          layout="responsive"
          alt=""
        />
      </section>

      {/* <!-- 地圖 --> */}
      <section id="collections" className="position-relative background1">
        <h2 className="display-4 lxgw-wenkai-mono-tc-bold frontTitle2">地圖</h2>
        <div className="container-fluid d-flex justify-content-center">
          <div
            className="flip-card"
            style={{ width: '1000px', height: '600px' }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Image
                  src="/pics/map.png"
                  alt="Front Image"
                  width={800}
                  height={480}
                  layout="responsive"
                />
              </div>
              <div className="flip-card-back">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.7811009728844!2d120.19917717591147!3d22.995075617352622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e7663c9ef20d3%3A0x1436d2c1ab729309!2z54mh5Li55qiTIOS4reiPnA!5e0!3m2!1szh-TW!2stw!4v1721407306080!5m2!1szh-TW!2stw"
                  width="800"
                  height="480"
                  style={{ border: '0' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="mudanlow-map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-pagination position-absolute text-center"></div>
      </section>

      {/* 留言板 */}
      <MessageBoard />
    </>
  )
}
