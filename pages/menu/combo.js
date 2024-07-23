import { useState, useEffect, useRef } from 'react'
import { ImSpoonKnife } from 'react-icons/im'
import Image from 'next/image'
import MenuNav from '@/components/menu/menu-nav'
import ComboTitle from '@/components/menu/combo-title'
import MudanlowLayout from '@/components/layout/mudanlow-layout'
import TopButton from '@/components/menu/top-button'
import Cooker from '@/components/menu/cooker'
import lightGallery from 'lightgallery'
import lgZoom from 'lightgallery/plugins/zoom'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import {
  ScrollMotionContainer,
  ScrollMotionItem,
} from '@/components/ScrollMotion'

export default function Combo() {
  const [one, setOne] = useState({ rows: [] })
  const galleryRef = useRef(null)

  useEffect(() => {
    fetch('http://localhost:3005/api/menu/combo_meal')
      .then((r) => r.json())
      .then((data) => {
        setOne(data)
      })
      .catch((ex) => console.log(ex))
  }, [])

  useEffect(() => {
    if (galleryRef.current && one.rows.length > 0) {
      lightGallery(galleryRef.current, {
        plugins: [lgZoom],
        licenseKey: 'YOUR_LICENSE_KEY', // 如果有license key的話，這裡需要填入
        speed: 300,
        zoom: true, // 確保啟用了縮放功能
        selector: 'a', // 確保選中所有圖片鏈接
        mode: 'lg-fade', // 使用更簡單的動畫模式
        download: true, // 禁用下載按鈕（如果不需要）
        thumbnail: true, // 啟用縮略圖
        autoplay: false, // 禁用自動播放
        thumbWidth: 100, // 縮略圖寬度
        thumbContHeight: 100, // 縮略圖容器高度
      })
    }
  }, [one])

  return (
    <>
      <div className="container">
        <div className="topPhoto"></div>
        <MenuNav />
        <ComboTitle />
        <div className="container">
          <div className="row d-flex justify-content-center" ref={galleryRef}>
            <ScrollMotionContainer
              element="div"
              className="row"
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.5, // 每個子元素動畫之間的間隔時間
                  },
                },
                hide: {},
              }}
              initial="hide"
              animate="show"
            >
              {one.rows.map((v) => {
                const imageName = v.image.replace(/^"(.*)"$/, '$1')
                return (
                  <ScrollMotionItem
                    element="div"
                    key={v.id}
                    className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
                    type="right"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={{
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 1.5, ease: 'easeOut' },
                      },
                    }}
                  >
                    <div className="card-size">
                      <div className="card-img">
                        <a
                          href={`/menu/combo/${imageName}`}
                          data-lg-size="270-360"
                        >
                          <Image
                            src={`/menu/combo/${imageName}`}
                            alt="合菜菜單"
                            width="270"
                            height="360"
                            className="card-top"
                          />
                        </a>
                      </div>
                      <div className="layout">
                        <div className="black-line-2" />
                        <div className="icon">
                          <ImSpoonKnife />
                        </div>
                        <div className="black-line-2" />
                      </div>
                      <div className="pname">{v.name}</div>
                      <div className="black-line-2" />
                      <div className="position">
                        <div className="price">NT-{v.price}</div>
                        {v.popularity ? (
                          <span className="butter price">{v.popularity}</span>
                        ) : null}
                      </div>
                    </div>
                  </ScrollMotionItem>
                )
              })}
            </ScrollMotionContainer>
          </div>
        </div>

        <Cooker />
      </div>
      <style jsx>
        {`
          .topPhoto {
            width: 100%;
            height: 20rem;
            margin: 1.25rem 0;
            display: flex;
            justify-content: center;
            background-image: url(/menuCard/DSC00636.webp);
            background-repeat: no-repeat;
            background-size: cover;
          }
          @media (max-width: 1100px) {
            .topPhoto {
              width: 100%;
              height: 18rem;
              display: flex;
              justify-content: center;
              background-image: url(/menuCard/DSC00636.webp);
              background-repeat: no-repeat;
              background-size: cover;
            }
          }
          @media (max-width: 500px) {
            .topPhoto {
              width: 100%;
              height: 9.5rem;
              margin: 1.25rem 0;
              display: flex;
              justify-content: center;
              background-image: url(/menuCard/DSC00636.webp);
              background-repeat: no-repeat;
              background-size: contain;
            }
          }
           {
            .card-size {
              width: 20rem;
              margin: 1.5rem;
            }
          }
          .icon {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            color: rgba(176, 143, 122, 0.748);
          }
          .card-img {
            display: flex;
            justify-content: center;
          }
          .card-top {
            width: 100%;
            height: 25rem;
            background-color: bisque;
          }

          .layout {
            display: flex;
          }
          .black-line-2 {
            width: 100%;
            height: 2px;
            background-color: rgba(176, 143, 122, 0.748);
            margin: 10px 0 3px 0;
          }
          .pname {
            text-align: center;
            font-size: 16px;
            font-weight: bolder;
          }
          .price {
            font-size: 12px;
            font-weight: bolder;
          }
          .butter {
            display: block;
            width: 4rem;
            height: 1.25rem;
            background-color: #f1f15eed;
            text-align: center;
            border-radius: 4px;
          }
          .position {
            padding: 0 4px 0 4px;
            display: flex;
            justify-content: space-between;
          }
          @media screen and (max-width: 1200px) {
             {
              .card-size {
                width: 20rem;
                margin: 1.5rem;
              }
            }
            .card-top {
              width: 100%;
              height: 20.5rem;
              background-color: bisque;
            }
          }
          @media screen and (max-width: 768px) {
             {
              .card-size {
                width: 18.5rem;
                margin: 1.5rem;
              }
            }
            .card-top {
              width: 100%;
              height: 25rem;
              background-color: bisque;
            }
          }
        `}
      </style>
    </>
  )
}
