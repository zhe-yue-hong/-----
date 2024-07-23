import React from 'react'

export default function Cooker() {
  return (
    <>
      <img
        src="/img/cooker.svg"
        alt="咖啡色小廚師"
        className="tilt-image"
      ></img>
      <style jsx>
        {`
          @keyframes tilt {
            0% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-30deg);
            }
            50% {
              transform: rotate(0deg);
            }
            75% {
              transform: rotate(30deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          .tilt-image {
            position: fixed;
            right: 5rem;
            bottom: 20px;
            display: block;
            margin: 0 auto;
            animation: tilt 2.5s infinite ease-in-out;
            height: 7.5rem;
          }
          @media screen and (max-width: 768px) {
            .tilt-image {
              height: 5.5rem;
              left: 0.5rem;
              margin: 0;
            }
          }
        `}
      </style>
    </>
  )
}
