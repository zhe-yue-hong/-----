import React from 'react'

export default function KcalTitle() {
  return (
    <>
      <div className="title">卡路里計算</div>
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
