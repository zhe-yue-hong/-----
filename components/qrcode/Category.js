import React from 'react'
import MenuItem from './MenuItem'
import styles from '@/styles/qrcode.module.scss'

function Category({ title, products, addToCart, removeFromCart, cart, id }) {
  return (
    <div className={styles.categories} id={id}>
      <h3>{title}</h3>
      {/* Render products */}
      {products.map((p) => (
        <MenuItem
          key={p.id}
          name={p.name}
          price={p.price}
          image={p.image ? `/qrcode/${p.image.replace(/"/g, '')}` : ''}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartItem={cart.find((item) => item.name === p.name)}
        />
      ))}
    </div>
  )
}

export default Category
