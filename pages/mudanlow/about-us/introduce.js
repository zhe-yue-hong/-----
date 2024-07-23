import Footer from '@/components/layout/mudanlow-layout/footer'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import React, { useEffect, useRef } from 'react'

export default function Introduce() {
  const imgRef1 = useRef(null)
  const imgRef2 = useRef(null)
  const imgRef3 = useRef(null)
  const imgRef4 = useRef(null)
  const textRef1 = useRef(null)
  const textRef2 = useRef(null)
  const textRef3 = useRef(null)
  const textRef4 = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    })

    const imgElement1 = imgRef1.current
    const imgElement2 = imgRef2.current
    const imgElement3 = imgRef3.current
    const imgElement4 = imgRef4.current
    const textElement1 = textRef1.current
    const textElement2 = textRef2.current
    const textElement3 = textRef3.current
    const textElement4 = textRef4.current

    if (imgElement1) observer.observe(imgElement1)
    if (imgElement2) observer.observe(imgElement2)
    if (imgElement3) observer.observe(imgElement3)
    if (imgElement4) observer.observe(imgElement4)
    if (textElement1) observer.observe(textElement1)
    if (textElement2) observer.observe(textElement2)
    if (textElement3) observer.observe(textElement3)
    if (textElement4) observer.observe(textElement4)

    return () => {
      if (imgElement1) observer.unobserve(imgElement1)
      if (imgElement2) observer.unobserve(imgElement2)
      if (imgElement3) observer.unobserve(imgElement3)
      if (imgElement4) observer.unobserve(imgElement4)
      if (textElement1) observer.unobserve(textElement1)
      if (textElement2) observer.unobserve(textElement2)
      if (textElement3) observer.unobserve(textElement3)
      if (textElement4) observer.unobserve(textElement4)
    }
  }, [])

  return (
    <>
      <div className="container mt-5 pt-4">
        <div className="row align-items-center text-center g-2 mt-5">
          <div className="col-6 col-sm-12 col-lg-6 fade-in-image" ref={imgRef1}>
            <img
              className="content-img"
              src="/images/mudanlowWebp/DSC00567.webp"
            />
          </div>
          <div
            className="col-6 col-sm-12 col-lg-6 content fade-in-section"
            ref={textRef1}
          >
            <p className="display-6 mt-4">
              適合家庭、公司、親友聚餐。
              <br />
              盡情享受相聚歡樂的用餐時光。
            </p>
            <p className="fs-5">
              提供半開放式包廂、12人圓桌。不管您是小家庭、
              <br />
              大家庭或者多人聚餐，我們都會提供最適合的用餐環境。
            </p>
          </div>
        </div>
        <h3 className="text-center my-4 border title">空間區域</h3>
        <div className="row align-items-center text-center g-2 mt-5">
          <div
            className="col-6 col-sm-12 col-lg-6 content fade-in-section"
            ref={textRef2}
          >
            <p className="text-center display-6 mt-4">半開放式包廂</p>
            <p className="text-center fs-5">可容納人數：12人</p>
            <p className="text-center fs-5">
              適合小型文定、親友小聚、家庭聚會等，多功能聚餐使用。
            </p>
          </div>
          <div
            className="col-6 col-sm-12 col-lg-6 fade-in-image-left"
            ref={imgRef2}
          >
            <img className="content-img" src="/images/mudanlowWebp/room.jpg" />
          </div>
        </div>
        <div className="row align-items-center text-center g-2 mt-5">
          <div className="col-6 col-sm-12 col-lg-6 fade-in-image" ref={imgRef3}>
            <img className="content-img" src="/images/mudanlowWebp/front.jpg" />
          </div>
          <div
            className="col-6 col-sm-12 col-lg-6 content fade-in-section"
            ref={textRef3}
          >
            <p className="text-center display-6 mt-4">前場</p>
            <p className="text-center fs-5">數量：2桌</p>
            <p className="text-center fs-5">可容納人數：8-12人</p>
            <p className="text-center fs-5">
              適合親友小聚、家庭聚會等，多功能聚餐使用。
            </p>
          </div>
        </div>
        <div className="row align-items-center text-center g-2 mt-5">
          <div
            className="col-6 col-sm-12 col-lg-6 content fade-in-section"
            ref={textRef4}
          >
            <p className="text-center display-6 mt-4">後場</p>
            <p className="text-center fs-5">數量：1-6桌</p>
            <p className="text-center fs-5">可容納人數：至多24人</p>
            <p className="text-center fs-5">
              適合多人公司聚餐、三五好友小聚，多功能聚餐使用。
            </p>
          </div>
          <div
            className="col-6 col-sm-12 col-lg-6 fade-in-image-left"
            ref={imgRef4}
          >
            <img
              className="content-img"
              src="/images/mudanlowWebp/backside.jpg"
            />
          </div>
        </div>
        <h3 className="text-center my-4 border title">室內全景</h3>
        <div className="text-center">
          <iframe
            src="https://www.koala360.com/tour?id=7833"
            width={1200}
            height={500}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <h3 className="text-center my-4 border title">地圖</h3>
        <div className="text-center ">
          <img src="/pics/map.png" className="map" />
        </div>
        <h3 className="text-center my-4 border title">鄰近景點介紹</h3>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="row mb-5r">
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="card" style={{ width: '18rem' }}>
                <img
                  src="/pics/introducepic1.webp"
                  className="card-img-top tourist-spots"
                  alt="赤崁樓"
                />
                <div className="card-body">
                  <h5 className="card-title">赤崁樓</h5>
                  <p className="card-text">
                    前身為荷治時期的「普羅民遮城」，在地人稱為「番仔樓」，曾為全台灣島的商業中心，至清代已傾圮，今列為國定古蹟。
                  </p>
                  <a
                    href="https://maps.app.goo.gl/oX6eyMMP4kTJagG36"
                    className="btn btn-success card-btn"
                    target="_blank"
                  >
                    步行五分鐘
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="card" style={{ width: '18rem' }}>
                <img
                  src="/pics/introducepic2.webp"
                  className="card-img-top tourist-spots"
                  alt="祀典武廟"
                />
                <div className="card-body">
                  <h5 className="card-title">祀典武廟</h5>
                  <p className="card-text">
                    祀典武廟，又稱臺南大關帝廟，主要奉祀關聖帝君。為臺灣早期建造的關帝廟。今日之祀典武廟，在赤崁樓之南，由關帝廳擴建而成。
                  </p>
                  <a
                    href="https://maps.app.goo.gl/kkbTEi8AazKRkzHu8"
                    className="btn btn-success card-btn"
                    target="_blank"
                  >
                    步行三分鐘
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="card" style={{ width: '18rem' }}>
                <img
                  src="/pics/introducepic3.webp"
                  className="card-img-top tourist-spots"
                  alt="全美戲院"
                />
                <div className="card-body">
                  <h5 className="card-title">全美戲院</h5>
                  <p className="card-text">
                    二輪戲院，前身是第一全成戲院。臺灣知名電影導演李安高中時，最常到此觀賞電影。戲院至今仍然使用手繪電影看板，為其特色之一。
                  </p>
                  <a
                    href="https://maps.app.goo.gl/G6cacTAuzBtgsJxM8"
                    className="btn btn-success card-btn"
                    target="_blank"
                  >
                    步行一分鐘
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="card" style={{ width: '18rem' }}>
                <img
                  src="/pics/introducepic4.webp"
                  className="card-img-top tourist-spots"
                  alt="吳園"
                />
                <div className="card-body">
                  <h5 className="card-title">吳園</h5>
                  <p className="card-text">
                    原臺南公會堂，日治時期臺南第一座具公共集會功能的現代建築物，現為臺南市市定古蹟，所在地原是清朝道光年間士紳吳尚新的吳園。
                  </p>
                  <a
                    href="https://maps.app.goo.gl/HAHzWBj6i6DJorD68"
                    className="btn btn-success card-btn"
                    target="_blank"
                  >
                    步行七分鐘
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tourist-spots {
          max-height: 190px;
        }
        .title {
          background-color: #366e53;
          color: white;
        }
        .content {
          color: black;
          border-radius: 10px;
        }
        .content:hover {
          color: black;
          border-radius: 10px;
          backdrop-filter: blur(50px);
          box-shadow: 0 0 10px black;
          transition: 0.5s;
        }
        .content-img {
          width: 480px;
          height: 360px;
          border-radius: 10px;
          object-fit: cover;
        }
        .card-btn {
          background-color: #465952;
          color: #fff;
          position: absolute;
          bottom: 10px;
        }
        .card {
          position: relative;
          height: 480px;
        }
        .fade-in-section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-section.visible {
          opacity: 1;
          transform: none;
        }
        .fade-in-image {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-image.visible {
          opacity: 1;
          transform: none;
        }
        .fade-in-image-left {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-image-left.visible {
          opacity: 1;
          transform: none;
        }
        .map {
          height: 600px;
        }
      `}</style>
    </>
  )
}
