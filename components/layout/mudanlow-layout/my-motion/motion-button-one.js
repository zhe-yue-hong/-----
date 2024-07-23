import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Swiper, SwiperSlide } from 'swiper/react'
// import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
import SwiperCore, { Pagination, Navigation } from 'swiper'
// memberData modal 第一頁
import MotionProfile from '@/pages/member/motion-profile'
// new cart   modal 第二頁
import MotionNewCart from '@/pages/member/motion-new-cart'
// log cart   modal 第三頁
import MotionLogCart from '@/pages/member/motion-log-cart'

// swiper 模塊
SwiperCore.use([Pagination, Navigation])

function MyVerticallyCenteredModal(props) {
  const [modalShow, setModalShow] = useState(false)

  const handleClose = () => {
    setModalShow(false)
    props.onHide() // 關閉模塊
  }

  return (
    <Modal {...props} centered show={props.show} onHide={handleClose}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="swiper-slide">
            <MotionProfile />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide">
            <MotionNewCart />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide">
            <MotionLogCart />
          </div>
        </SwiperSlide>
      </Swiper>

      <Button variant="secondary" onClick={handleClose}>
        返回
      </Button>
    </Modal>
  )
}

function MotionButtonOne() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <div
        style={{
          border: '0px solid black',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          width: '50px',
          wordBreak: 'break-all',
        }}
        className="px-1"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        會員
        <br />
        資料
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <style>
        {`
        .swiper-slide{
        }
        .swiper {
          width: 100%;
          height: 100%;
          
                }
        .label-img{
          width: 150px;
          height: 150px;

          }
        `}
      </style>
    </>
  )
}

export default MotionButtonOne
