import React from 'react'
import Link from 'next/link'

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <div id="step1" className="step active">
          １．購物車
        </div>
        <div className="arrow active">{'>'}</div>
        <div id="step2" className="step">
          ２．填選購買資訊
        </div>
        <div className="arrow">{'>'}</div>
        <div id="step3" className="step">
          ３．訂單成立
        </div>
      </div>
      <style global jsx>{`
        .navigation {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .navigation a {
          text-decoration: none;
          color: #333;
          display: flex;
          align-items: center;
          transition: color 0.3s ease;
        }

        .navigation a.active {
          color: blue; /* 根據需要調整活動連結的顏色 */
        }

        .navigation a span {
          margin-right: 5px;
        }

        .navigation a i {
          margin-left: 5px;
          transition: transform 0.3s ease;
        }

        .navigation a:hover i {
          transform: translateX(5px);
        }
      `}</style>
    </>
  )
}

export default Navigation
