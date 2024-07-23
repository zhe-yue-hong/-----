import React, { useState, useEffect } from 'react'
import KcalTitle from '@/components/menu/kcal-title'
import MenuNav from '@/components/menu/menu-nav'
import TopButton from '@/components/menu/top-button'
import DefaultLayout from '@/components/layout/default-layout'
import Cooker from '@/components/menu/cooker'
import MudanlowLayout from '@/components/layout/mudanlow-layout'

export default function Kcal() {
  const [totalCalories, setTotalCalories] = useState(0)
  const [selectedMenu, setSelectedMenu] = useState('one')
  const [menuData, setMenuData] = useState([])

  const menus = {
    one: [
      { img: '/menu-d/one/1.webp', calories: 791, pname: '經典三杯雞' },
      { img: '/menu-d/one/2.webp', calories: 620, pname: '本幫紅燒肉' },
      { img: '/menu-d/one/4.webp', calories: 884, pname: '宮保雞丁' },
      { img: '/menu-d/one/5.webp', calories: 200, pname: '麻辣擔擔醬熱豆花' },
      { img: '/menu-d/one/6.webp', calories: 260, pname: '草蝦匯時蔬' },
      { img: '/menu-d/one/7.webp', calories: 452, pname: '避風塘炒大蝦' },
      { img: '/menu-d/one/8.webp', calories: 760, pname: '臘味雙寶炒飯' },
      { img: '/menu-d/one/11.webp', calories: 312, pname: '家常炒肉絲' },
    ],
    one2: [
      { img: '/menu-d/one/12.webp', calories: 412, pname: '爐烤叉燒牛肋條' },
      { img: '/menu-d/one/14.webp', calories: 310, pname: '招牌功夫雞' },
      { img: '/menu-d/one/15.webp', calories: 659, pname: '乾鍋川味辣炒羊肉' },
      { img: '/menu-d/one/16.webp', calories: 218, pname: '當日季節時蔬' },
      { img: '/menu-d/one/17.webp', calories: 240, pname: '菌菇檸檬蝦' },
      { img: '/menu-d/one/18.webp', calories: 280, pname: '川味剁椒草蝦' },
      { img: '/menu-d/one/19.webp', calories: 784, pname: '招牌糖醋魚' },
      { img: '/menu-d/one/20.webp', calories: 880, pname: '招牌脆皮豬五花' },
    ],
    one3: [
      { img: '/menu-d/dessert/1.webp', calories: 308, pname: '經典提拉米蘇' },
      { img: '/menu-d/dessert/3.webp', calories: 267, pname: '焦糖伯爵蛋糕' },
      { img: '/menu-d/dessert/4.webp', calories: 192, pname: '一口泡芙' },
      { img: '/menu-d/dessert/5.webp', calories: 228, pname: '生巧克力蛋糕' },
      { img: '/menu-d/dessert/6.webp', calories: 0, pname: '熱伯爵茶' },
      { img: '/menu-d/dessert/7.webp', calories: 292, pname: '拿鐵咖啡' },
      { img: '/menu-d/dessert/8.webp', calories: 292, pname: '美式咖啡' },
      { img: '/menu-d/dessert/9.webp', calories: 260, pname: '特調奶茶' },
    ],
  }

  useEffect(() => {
    const storedMenuData = JSON.parse(localStorage.getItem(selectedMenu))
    if (storedMenuData) {
      setMenuData(storedMenuData)
    } else {
      localStorage.setItem(selectedMenu, JSON.stringify(menus[selectedMenu]))
      setMenuData(menus[selectedMenu])
    }
  }, [selectedMenu])

  const handleDragStart = (e, data) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(data))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const data = JSON.parse(e.dataTransfer.getData('text/plain'))
    const box = document.querySelector('.box')
    const newImg = document.createElement('img')
    newImg.src = data.img
    const rect = box.getBoundingClientRect()
    newImg.style.left = `${e.clientX - rect.left}px`
    newImg.style.top = `${e.clientY - rect.top}px`
    box.appendChild(newImg)

    const newLi = document.createElement('li')
    newLi.innerText = `品項:${data.pname} 卡路里:${data.calories}kcal`
    newLi.classList.add('list-group-flush')
    document.querySelector('#putcal').appendChild(newLi)

    setTotalCalories((prev) => prev + data.calories)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleClean = () => {
    document.querySelector('.box').innerHTML = ''
    document.querySelector('#putcal').innerHTML = '卡路里計算'
    setTotalCalories(0)
  }

  useEffect(() => {
    const styles = `
      .button {
        border: 2px solid #4ba56a;
        height: 40px;
        width: 150px;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
        font-family: "Roboto", sans-serif;
        margin: 10px;
      }

      .button::after {
        content: attr(data-text);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #1e793d;
        transition: all 0.5s ease-in-out;
      }

      .button::before {
        content: "";
        position: absolute;
        display: block;
        height: 15px;
        width: 15px;
        background: #4ba56a;
        box-shadow: 0px 0px 10px 1.5px #4ba56a;
        top: -7.5px;
        left: -7.5px;
        opacity: 0;
        transition: all 0.1s linear;
        border-radius: 100%;
        animation: star 2.5s linear infinite;
      }

      @keyframes star {
        0% {
          top: -7.5px;
          left: -7.5px;
        }
        25% {
          top: -7.5px;
          left: calc(100% - 7.5px);
        }
        50% {
          top: calc(100% - 7.5px);
          left: calc(100% - 7.5px);
        }
        75% {
          top: calc(100% - 7.5px);
          left: -7.5px;
        }
        100% {
          top: -7.5px;
          left: -7.5px;
        }
      }

      .button:hover::before {
        opacity: 1;
        animation: star 2.5s linear infinite;
      }

      .button:hover::after {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #82bedc, 0 0 15px #82bedc, 0 0 20px #82bedc, 0 0 25px #82bedc, 0 0 30px #82bedc;
      }
    `

    const styleSheet = document.createElement('style')
    styleSheet.type = 'text/css'
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }, [])

  return (
    <>
      <div className="container">
        <MenuNav />
        <KcalTitle />
        <h3 className="world">請將想計算卡路里的品項拖拉至中心桌面!</h3>
        <div className="position height">
          <div
            className="center-menu-circle box"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          ></div>
          <div className="rotation-container">
            {menuData.map((item, index) => (
              <div
                key={index}
                className={`pic img${index + 1} cursor circle circle${
                  index + 1
                }`}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, item)}
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="mt-2 position">
          <button
            className="button"
            data-text="一鍵清桌"
            onClick={handleClean}
          ></button>
          <button
            className="button"
            data-text="人氣商品"
            onClick={() => setSelectedMenu('one')}
          ></button>
          <button
            className="button"
            data-text="招牌菜"
            onClick={() => setSelectedMenu('one2')}
          ></button>
          <button
            className="button"
            data-text="甜點飲品"
            onClick={() => setSelectedMenu('one3')}
          ></button>
        </div>

        <div className="calorie-info position">
          <ul
            className="list-group list-group-flush text-center"
            id="calorieDisplay"
          >
            <li className="list-group-item" id="putcal">
              卡路里計算
            </li>
            <li className="list-group-item" id="totalCalories">
              總卡路里: {totalCalories}kcal
            </li>
          </ul>
        </div>
        <Cooker />
        <style>{`
      .world {
        font: bold 150% Consolas, Monaco, monospace;
        color: gray;
        white-space: nowrap;
        display: inline-block;
        overflow: hidden;
        animation: typing 4s steps(40, end) 5,
          blink-caret 0.75s step-end infinite;
      }
      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 60%;
        }
      }

      @keyframes blink-caret {
        from,
        to {
          border-color: transparent;
        }
        50% {
          border-color: white;
        }
      }
      .position {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .height {
        height: 100vh; /* 使整個區域垂直居中 */
      }
      {/* 中心大圓-網頁長度有改變要自己來手動調整top!! */} 
      .center-menu-circle {
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background-image: url(/menu-d/fabric.webp);
        top: 790px;
        left: 50%;
        transform: translate(-50%, -46%);
        z-index: 1; /* 確保在最上層 */
        overflow: hidden;
      }
      .rotation-container {
        position: relative;
        width: 600px;
        height: 600px;
        animation: rotation 20s infinite linear;
        z-index: 0; /* 確保在中心圖片下方 */
      }
      .rotation-container:hover {
        animation-play-state: paused;
      }
      .circle {
        position: absolute;
        width: 145px;
        height: 145px;
        border-radius: 50%;
        background-size: cover;
      }
      .circle1 {
        top: 50%;
        left: 100%;
        transform: translate(-50%, -50%);
      }
      .circle2 {
        top: 85.36%;
        left: 85.36%;
        transform: translate(-50%, -50%);
      }
      .circle3 {
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .circle4 {
        top: 85.36%;
        left: 14.64%;
        transform: translate(-50%, -50%);
      }
      .circle5 {
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
      }
      .circle6 {
        top: 14.64%;
        left: 14.64%;
        transform: translate(-50%, -50%);
      }
      .circle7 {
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .circle8 {
        top: 14.64%;
        left: 85.36%;
        transform: translate(-50%, -50%);
      }
      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .box img {
        position: absolute;
        max-width: 100px; /* 限制圖片最大寬度 */
        max-height: 100px;
        border-radius: 50%; /* 限制圖片最大高度 */
        transform: translate(-50%, -50%);
      }
       .img1 {
        background-image: url(/menu-d/one/1.webp);
        background-position: center;
        background-repeat: no-repeat;
      }
      .img2 {
        background-image: url(/menu-d/one/2.webp);
        background-position: center;
        background-repeat: no-repeat;
      }
      .img3 {
        background-image: url(/menu-d/one/4.webp);
        background-position: center;
        background-repeat: no-repeat;
      }
      .img4 {
        background-image: url(/menu-d/one/5.webp);
        background-position: center;
        background-repeat: no-repeat;
      }
      .img5 {
        background-image: url(/menu-d/one/6.webp);
        background-position: center;
        background-repeat: no-repeat;
      }
      .img6 {
        background-image: url(/menu-d/one/7.webp);
        background-position: center;
        background-repeat: no-repeat;
      }
      .img7 {
        background-image: url(/menu-d/one/8.webp);
        background-position: center;
        background-repeat: no-repeat;
      }
      .img8 {
        background-image: url(/menu-d/one/11.webp);
        background-position: center;
        background-repeat: no-repeat;
      }
     .list-group{
        width:660px;
     }
    `}</style>
      </div>
    </>
  )
}
