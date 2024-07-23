import React from 'react'
import { GiSpoon } from 'react-icons/gi'
import { BiDrink } from 'react-icons/bi'
import { RiDrinks2Line } from 'react-icons/ri'
import Link from 'next/link'
import styles from '@/styles/menu-nav.module.scss'

export default function MenuNav() {
  return (
    <>
      {/* menu-本身的導覽列 */}
      <>
        <nav className={`${styles.nav}`}>
          <ol className=" d-flex justify-content-center  px-4 py-1">
            <li className="">
              <Link
                href="/menu"
                className={`${styles.link} text-decoration-none`}
              >
                回到菜單列表
              </Link>
            </li>
            <li className="">
              <Link
                href="/menu/one"
                className={`${styles.link} text-decoration-none`}
              >
                <GiSpoon />
                單點
              </Link>
            </li>
            <li className=" active" aria-current="page">
              <Link
                href="/menu/combo"
                className={`${styles.link} text-decoration-none`}
              >
                <GiSpoon />
                經典合菜
              </Link>
            </li>
            <li className="">
              <Link
                href="/menu/bento"
                className={`${styles.link} text-decoration-none`}
              >
                <GiSpoon />
                精緻便當
              </Link>
            </li>
          </ol>
          <ol className=" d-flex justify-content-center  px-4 py-1">
            {' '}
            <li className="">
              <Link
                href="/menu/dessert"
                className={`${styles.link} text-decoration-none`}
              >
                <GiSpoon />
                手工甜點
              </Link>
            </li>
            <li className="">
              <Link
                href="/menu/drink"
                className={`${styles.link} text-decoration-none`}
              >
                <RiDrinks2Line />
                飲品
              </Link>
            </li>
            <li className="">
              <Link
                href="/menu/liquor"
                className={`${styles.link} text-decoration-none`}
              >
                <BiDrink />
                酒精飲品
              </Link>
            </li>
            <li className="">
              <Link
                href="/menu/kcal"
                className={`${styles.link} text-decoration-none`}
              >
                
                卡路里計算
              </Link>
            </li>
          </ol>
        </nav>
        <ul className="dropDownMenu position ">
          <li>
            <Link href="/menu" legacyBehavior>
              <a>回到菜單列表</a>
            </Link>
            <ul>
              <li>
                <Link href="/menu/one" legacyBehavior>
                  <a>
                    {' '}
                    <GiSpoon />
                    單點
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/menu/combo" legacyBehavior>
                  <a>
                    <GiSpoon />
                    經典合菜
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/menu/bento" legacyBehavior>
                  <a>
                    <GiSpoon />
                    精緻便當
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/menu/dessert" legacyBehavior>
                  <a>
                    <GiSpoon />
                    手工甜點
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/menu/drink" legacyBehavior>
                  <a>
                    <RiDrinks2Line />
                    飲品
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/menu/liquor" legacyBehavior>
                  <a>
                    <BiDrink />
                    酒精飲品
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </>
      <style jsx>{`
        li {
          list-style: none;
          margin: 0 1rem;
        }
        .dropDownMenu {
          display: none;
        }
        @media (max-width: 768px) {
          .dropDownMenu {
            display: block;
          }
          li {
            list-style: none;
            margin: 0 0;
            font-weight: bold;
          }
          ul {
            margin: 0;
            padding: 0;
            list-style: none;
            font-weight: bold;
          }
          ul.dropDownMenu {
            border: #ccc 1px solid;
            display: inline-block;
            font-size: 13px;
            margin: 0.5rem 0;
          }
          ul.dropDownMenu > li {
            position: relative;
            white-space: nowrap;
          }
          ul.dropDownMenu a {
            background-color: #fff;
            color: rgba(184, 143, 89, 1);
            display: block;
            padding: 0 20px;
            text-decoration: none;
            line-height: 40px;
            width: 100%;
            box-sizing: border-box;
          }
          ul.dropDownMenu a:hover {
            background-color: #bebdbd;
            color: #fff;
            font-size: 15px;
            font-weight: bolder;
          }
          ul.dropDownMenu li:hover > a {
            background-color: #bebdbd;
            color: #fff;
          }
          ul.dropDownMenu ul {
            border: #ccc 1px solid;
            position: absolute;
            z-index: 99;
            left: -1px;
            top: 100%;
            min-width: 160px;
            opacity: 0;
            transition: opacity 0.3s;
            width: 100%;
          }
          ul.dropDownMenu li:hover > ul {
            opacity: 1;
            left: -1px;
          }
        }
      `}</style>
    </>
  )
}
