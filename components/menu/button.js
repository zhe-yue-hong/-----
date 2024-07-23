import React from 'react'

export default function Button() {
  const Button = ({ text, hoverText }) => {
    return (
      <div
        className="button"
        data-text={text}
        data-hover-text={hoverText}
      ></div>
    )
  }
  return (
    <>
      <div className="outside">
        <Button text="更多" hoverText="單點" />
        <Button text="更多" hoverText="單點" />
        <Button text="更多" hoverText="甜點 飲品" />
      </div>
      <style jsx>
        {`
          .outside {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .button {
            border: 2px solid #4ba56a;
            height: 40px;
            width: 150px;
            border-radius: 4px;
            position: relative;
            cursor: pointer;
            font-family: 'Roboto', sans-serif;
            margin: 10px;
          }

          .button::after {
            content: attr(data-text);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #d2bdff;
            transition: all 0.5s ease-in-out;
          }

          .button::before {
            content: '';
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

          .button[data-hover-text]:hover::after {
            content: attr(data-hover-text);
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #82bedc,
              0 0 15px #82bedc, 0 0 20px #82bedc, 0 0 25px #82bedc,
              0 0 30px #82bedc;
          }
          

        `}
      </style>
    </>
  )
}
