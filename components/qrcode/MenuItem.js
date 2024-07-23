import React from 'react'
import 'react-photo-view/dist/react-photo-view.css'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import styles from '@/styles/qrcode.module.scss'

function MenuItem({ name, price, image, addToCart, removeFromCart, cartItem }) {
  const handleAddToCart = () => {
    addToCart(name, price)
  }

  const handleRemoveFromCart = () => {
    removeFromCart(name, price)
  }

  return (
    <div className={`${styles.item}`} data-name={name} data-price={price}>
      <div className="col-4">
        <div>{name}</div>
        <div>NT$ {price}</div>
      </div>
      <div className="col-4">
        <button className={styles.calculator} onClick={handleRemoveFromCart}>
          -
        </button>
        <span className="">{cartItem ? cartItem.quantity : 0}</span>
        <button className={styles.calculator} onClick={handleAddToCart}>
          +
        </button>
      </div>
      <div className="col-4">
        <PhotoProvider>
          <PhotoView src={image}>
            <img src={image} alt={name} className={styles.image} />
          </PhotoView>
        </PhotoProvider>
      </div>
    </div>
  )
}

export default MenuItem
