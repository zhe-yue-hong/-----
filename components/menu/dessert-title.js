import React from 'react'

export default function DessertTitle() {
  return (
    <>
      <div className="title">手工甜點</div>
      <div className="world">*圖片僅供參考，請以實際菜色為主。</div>
      <div className="world">
        *食材內容因應季節變化調整，實際菜色依餐廳提供為主。
      </div>
      <div className="black-line-1" />
      <style jsx>
        {`
          .title {
            font-size: 28px;
            font-weight: bolder;
            margin: 5px;
            letter-spacing: 1.5rem;
          }
          .world {
            font-size: 12px;
          }
          .black-line-1 {
            width: 100%;
            height: 3px;
            background-color: rgba(176, 143, 122, 0.748);
            margin: 10px 0;
          }
        `}
      </style>
    </>
  )
}
