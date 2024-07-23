import React from 'react'
import styles from './footer.module.scss'
import ChatbotButton from '../../../pages/chatbotButton/index'

export default function Footer() {
  return (
    <>
      <footer className={`py-4 ${styles.footer}`}>
        <div className="container">
          <ul>
            <li>店家電話:06-221-7509</li>
            <li>
              營業時間:週二~週日上午11:30 - 下午2:00 、下午5:30 - 下午9:00
            </li>
            <li>公休日:每週一</li>
            <li>地址:臺南市中西區永福路二段160號</li>
          </ul>
          <div className="icon d-flex flex-row-reverse text-dark ">
            <a href="https://www.facebook.com/peonygardenchinesecuisine/photos_by">
              <i className="bi bi-facebook primary m-1 text-light"></i>
            </a>
            <a href="https://www.instagram.com/p/CzEAO5XRq-P/?img_index=1">
              <i className="bi bi-instagram m-1 text-light"></i>
            </a>
            <a href="https://boylondon.tw/2016-10-10-19/">
              <i className="bi bi-share m-1 text-light"></i>
            </a>
          </div>
          <div className="small text-center text-muted">
            Copyright &copy; 2024/4 - 你說俊杰G排怎麼了...?
          </div>
        </div>
      </footer>
    </>
  )
}
