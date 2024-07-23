import React from 'react'
import MenuNav from '@/components/menu/menu-nav'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/menu.module.scss'
import MudanlowLayout from '@/components/layout/mudanlow-layout'
import Cooker from '@/components/menu/cooker'
import animate from 'animate.css'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import Footer from '@/components/layout/mudanlow-layout/footer'
import Mymasonry from '@/components/menu/mymasonry'

export default function IndexTest() {
  return (
    <>
      <div className="container">
        <Mymasonry />
        <div className="container menu mt-5 mb-5">
          <MenuNav />
          <div className="row align-items-center text-center g-2">
            {/* 1 */}
            <Link
              href="/menu/one"
              className="col-lg-3 col-md-6 col-sm-12 animate__bounceIn"
              style={{ textDecorationLine: 'none' }}
            >
              <div
                className={`card  card-width ${styles.cardHover}`}
                style={{ margin: 'auto', marginBottom: '0.5rem' }}
              >
                <Image
                  src="/menuCard/menuCard-one.webp"
                  className="card-img-top"
                  width={268}
                  height={190}
                  alt="..."
                />
                <div className="card-body">
                  <div
                    className=" card  "
                    style={{
                      textDecorationLine: 'none',
                      backgroundColor: 'rgb(226, 186, 133)',
                      fontWeight: 'bolder',
                      fontSize: '16px',
                    }}
                  >
                    單&nbsp;點
                  </div>
                </div>
              </div>
            </Link>
            {/* 2 */}
            <Link
              href="/menu/combo"
              className="col-lg-3  col-md-6 col-sm-12 animate__bounceIn"
              style={{ textDecorationLine: 'none' }}
            >
              <div
                className={`card  card-width ${styles.cardHover}`}
                style={{ margin: 'auto', marginBottom: '0.5rem' }}
              >
                <Image
                  src="/menuCard/menuCard-combo.webp"
                  className="card-img-top"
                  width={268}
                  height={190}
                  alt="..."
                />
                <div className="card-body">
                  <div
                    className=" card   "
                    style={{
                      textDecorationLine: 'none',
                      backgroundColor: 'rgb(226, 186, 133)',
                      fontWeight: 'bolder',
                      fontSize: '16px',
                    }}
                  >
                    經&nbsp;典&nbsp;合&nbsp;菜
                  </div>
                </div>
              </div>
            </Link>
            {/* 3 */}
            <Link
              href="/menu/bento"
              className="col-lg-3 col-md-6 col-sm-12 animate__bounceIn"
              style={{ textDecorationLine: 'none' }}
            >
              <div
                className={`card  card-width ${styles.cardHover}`}
                style={{ margin: 'auto', marginBottom: '0.5rem' }}
              >
                <Image
                  src="/menuCard/menuCard-bento.webp"
                  className="card-img-top"
                  width={268}
                  height={190}
                  alt="..."
                />
                <div className="card-body">
                  <div
                    className=" card   "
                    style={{
                      textDecorationLine: 'none',
                      backgroundColor: 'rgb(226, 186, 133)',
                      fontWeight: 'bolder',
                      fontSize: '16px',
                    }}
                  >
                    精&nbsp;緻&nbsp;便&nbsp;當
                  </div>
                </div>
              </div>
            </Link>
            {/* 4 */}
            <Link
              href="/menu/dessert"
              className="col-lg-3 col-md-6 col-sm-12 animate__bounceIn"
              style={{ textDecorationLine: 'none' }}
            >
              <div
                className={`card  card-width ${styles.cardHover}`}
                style={{ margin: 'auto', marginBottom: '0.5rem' }}
              >
                <Image
                  src="/menuCard/menuCard-cake.webp"
                  className="card-img-top"
                  width={268}
                  height={190}
                  alt="..."
                />
                <div className="card-body">
                  <div
                    href="/menu/dessert"
                    className=" card   "
                    style={{
                      textDecorationLine: 'none',
                      backgroundColor: 'rgb(226, 186, 133)',
                      fontWeight: 'bolder',
                      fontSize: '16px',
                    }}
                  >
                    手&nbsp;工&nbsp;甜&nbsp;點
                  </div>
                </div>
              </div>
            </Link>
            {/* 5 */}
            <Link
              href="/menu/liquor"
              className="col-lg-3 col-md-6 col-sm-12 animate__bounceIn"
              style={{ textDecorationLine: 'none' }}
            >
              <div
                className={`card  card-width ${styles.cardHover}`}
                style={{ margin: 'auto', marginBottom: '0.5rem' }}
              >
                <Image
                  src="/menuCard/menuCard-drinks.webp"
                  className="card-img-top"
                  width={268}
                  height={190}
                  alt="..."
                />
                <div className="card-body">
                  <div
                    className="card   "
                    style={{
                      textDecorationLine: 'none',
                      backgroundColor: 'rgb(226, 186, 133)',
                      fontWeight: 'bolder',
                      fontSize: '16px',
                    }}
                  >
                    飲&nbsp;品
                  </div>
                </div>
              </div>
            </Link>
            {/* 6 */}
            <Link
              href="/menu/liquor"
              className="col-lg-3 col-md-6 col-sm-12 animate__bounceIn"
              style={{ textDecorationLine: 'none' }}
            >
              <div
                className={`card  card-width ${styles.cardHover}`}
                style={{ margin: 'auto', marginBottom: '0.5rem' }}
              >
                <Image
                  src="/menuCard/menuCard-18+.webp"
                  className="card-img-top"
                  width={268}
                  height={190}
                  alt="..."
                />
                <div className="card-body">
                  <div
                    className=" card "
                    style={{
                      textDecorationLine: 'none',
                      backgroundColor: 'rgb(226, 186, 133)',
                      fontWeight: 'bolder',
                      fontSize: '16px',
                    }}
                  >
                    酒&nbsp;精&nbsp;飲&nbsp;品
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Cooker />
      </div>
      {/* css-jsx */}
      <style jsx>
        {`
          .card-width {
            width: 18rem;
            @media screen and (max-width: 1280px) {
              width: 15rem;
            }
          }
          .my-element {
            --animate-duration: 2s;
          }

          .menu {
            height: 100vh;
          }
        `}
      </style>
    </>
  )
}
