import React, { useState, useEffect } from 'react'
import Category from '@/components/qrcode/Category'
import styles from '@/styles/qrcode.module.scss'
import SlidingPanel from '@/components/qrcode/SlidingPanel'

export default function Qrcode() {
  const [products, setProducts] = useState({
    product: [],
    dessert: [],
    liquor: [],
    drink: [],
  })
  const [cart, setCart] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)

  // Generic function to fetch data
  const fetchData = async (url, category) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Network response was not ok for ${category}.`)
      }
      const data = await response.json()
      const items = data.data.products
      setProducts((prevProducts) => ({
        ...prevProducts,
        [category]: items,
      }))
    } catch (error) {
      console.error(`Error fetching ${category} data:`, error)
    }
  }

  // Fetch data for different categories
  useEffect(() => {
    fetchData('http://localhost:3005/api/qrcode/product', 'product')
    fetchData('http://localhost:3005/api/qrcode/dessert', 'dessert')
    fetchData('http://localhost:3005/api/qrcode/liquor', 'liquor')
    fetchData('http://localhost:3005/api/qrcode/drink', 'drink')
  }, [])

  // Function to add items to the cart
  const addToCart = (name, price) => {
    const existingItem = cart.find((item) => item.name === name)
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
      setCart(updatedCart)
    } else {
      const newItem = { name, price, quantity: 1 }
      setCart((prevCart) => [...prevCart, newItem])
    }
    setTotalItems((prevTotalItems) => prevTotalItems + 1)
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price)
  }

  // Function to remove items from the cart
  const removeFromCart = (name, price) => {
    const existingItem = cart.find((item) => item.name === name)
    if (existingItem) {
      if (existingItem.quantity > 1) {
        const updatedCart = cart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        setCart(updatedCart)
        setTotalItems((prevTotalItems) => prevTotalItems - 1)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - price)
      } else {
        const updatedCart = cart.filter((item) => item.name !== name)
        setCart(updatedCart)
        setTotalItems((prevTotalItems) => prevTotalItems - 1)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - price)
      }
    }
  }

  // Recalculate cart total price
  useEffect(() => {
    const total = cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity
    }, 0)
    setCartTotalPrice(total)
  }, [cart])

  // Function to handle the order submission
  const handleOrderSubmit = async () => {
    try {
      const orderDetail = cart
        .map((item) => `${item.name} NT$${item.price} × ${item.quantity}`)
        .join('; ')
      const response = await fetch('http://localhost:3005/api/qrcode/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // table_id: null,
          amount: cartTotalPrice,
          detail: orderDetail,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      if (data.status === 'success') {
        setCart([])
        setTotalItems(0)
        setTotalPrice(0)
        setCartTotalPrice(0)
      } else {
        alert('訂單提交失敗')
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('提交訂單時出錯，請稍後再試')
    }
  }

  return (
    <div className={styles.container}>
      <div className="">
        <div className={styles.menuPage} id="menu-page">
          <header className={styles.header}>
            <img src="/qrcode/logo-gold.png" alt="" height="100%" id="logo" />
            <p>線上點餐系統</p>
            <p>桌號 2</p>
          </header>
          <div className={`${styles.tabDevider}`}>
            <a className="btn btn-outline-secondary btn-sm" href="#product">
              餐點
            </a>
            <a className="btn btn-outline-secondary btn-sm" href="#dessert">
              甜點
            </a>
            <a className="btn btn-outline-secondary btn-sm" href="#liquor">
              酒類
            </a>
            <a className="btn btn-outline-secondary btn-sm" href="#drink">
              飲料
            </a>
          </div>
          <div className={styles.menu}>
            {/* Render categories */}
            <Category
              title="餐點"
              id="product"
              products={products.product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
            />
            <Category
              title="甜點"
              id="dessert"
              products={products.dessert}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
            />
            <Category
              title="酒類"
              id="liquor"
              products={products.liquor}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
            />
            <Category
              title="飲料"
              id="drink"
              products={products.drink}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
            />
          </div>
          <footer className={styles.footer}>
            <div>
              餐點數量：<span id="total-item">{totalItems}</span>
            </div>
            <div>
              金額 $<span id="total-price">{totalPrice}</span>
            </div>
            <SlidingPanel
              cart={cart}
              removeFromCart={removeFromCart}
              cartTotalPrice={cartTotalPrice}
              handleOrderSubmit={handleOrderSubmit} // Pass handleOrderSubmit function
            />
          </footer>
        </div>
      </div>
    </div>
  )
}

Qrcode.getLayout = (page) => page
