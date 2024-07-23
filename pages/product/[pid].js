import React, { useState, useEffect } from 'react'
import Carousel from '@/components/product/carousel'
import { useCart } from '@/hooks/use-cart-state'
import { useRouter } from 'next/router'
import { Modal, Button } from 'react-bootstrap'
import styles from './ProductDetail.module.css'
import Cart from '@/components/cart/cart'

// 產品詳情頁組件
const ProductDetail = ({ initialProduct }) => {
  const { addItem } = useCart() // 使用購物車狀態鉤子
  const router = useRouter()
  const [show, setShow] = useState(false) // 控制模態框顯示狀態
  const [productName, setProductName] = useState('') // 保存產品名稱
  const [quantity, setQuantity] = useState(1) // 購買數量，初始為1
  const [product, setProduct] = useState(initialProduct)

  useEffect(() => {
    const fetchProduct = async () => {
      if (router.query.pid) {
        const res = await fetch(
          `http://localhost:3005/api/products/${router.query.pid}`
        )
        const responseData = await res.json()
        if (responseData.data.product) {
          setProduct(responseData.data.product)
        }
      }
    }

    if (!product) {
      fetchProduct()
    }
  }, [router.query.pid])

  // 如果產品不存在，返回未找到提示
  if (!product) {
    return <div>Product not found</div>
  }

  // 獲取產品圖片
  const images = product.photos
    ? product.photos.split(',').map((img) => img.trim())
    : []

  // 控制模態框的顯示和隱藏
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // 顯示加入購物車成功的模態框
  const showModal = (name) => {
    setProductName('產品：' + name + '已成功加入購物車')
    handleShow()
  }

  // 增加商品數量
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // 減少商品數量，不能小於1
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <>
      <div className="container mb-5">
        <div className={styles.container}>
          <Cart />
          <div className="row mt-5 mx-2">
            <div className="col-sm-7">
              <div className="position-sticky" style={{ top: '2rem' }}>
                <Carousel images={images} />
              </div>
            </div>
            <div className="col-sm-5">
              <div className={styles.productInfo}>
                <h1 className={styles.productName}>{product.name}</h1>
                <h5 className={styles.productCategory}>{product.category}</h5>
                <h5 className={styles.productPrice}>${product.price}</h5>
              </div>
              <p className="product-desc">{product.description}</p>
              <ul>
                {product.details
                  ? product.details
                      .split(',')
                      .map((detail, index) => <li key={index}>{detail}</li>)
                  : null}
              </ul>
              <div className={styles.quantityControlWrapper}>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span className={styles.quantityDisplay}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                  <button
                    className={styles.addToCartButton}
                    onClick={() => {
                      const item = { ...product, quantity }
                      addItem(item)
                      showModal(product.name)
                    }}
                  >
                    加入購物車
                  </button>
                </div>
              </div>

              <div className="product-info my-5">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        成分
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body px-1">
                        <ul>{product.color}</ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        免費寄送及退貨
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body px-1">
                        <ul>{product.tag}</ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        產地
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse"
                    ></div>

                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body px-1">
                        <ul>台灣</ul>
                        {product.reviews ? (
                          product.reviews.map((review, index) => (
                            <div className="commet" key={index}>
                              <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="star">
                                    &#9733;
                                  </span>
                                ))}
                              </div>
                              <p>
                                {review.commenter} - {review.date}
                              </p>
                              <p>{review.comment}</p>
                            </div>
                          ))
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="row mt-5 mx-2">
            <div className="col-sm-12">
              {product.imagesDetail
                ? product.imagesDetail.map((image, index) => (
                    <div key={index} className="text-center my-5">
                      <img
                        className="w-100 my-5"
                        src={image.src}
                        alt={image.alt}
                      />
                      <p className="my-5 font-weight-light fs-4">
                        {image.description}
                      </p>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="row mt-5 mx-2">
            <div className="col-sm-12">
              <div className="image-container text-center my-5">
                <img
                  className="w-100"
                  src="/images/product/bg/product.jpg"
                  alt="Product Image"
                />
                <img
                  className="w-100"
                  src="/images/product/bg/product1.jpg"
                  alt="Product Image"
                />
              </div>
            </div>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton className={styles.productModal}>
              <Modal.Title>加入購物車訊息</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.productModal}>
              {productName}
            </Modal.Body>
            <Modal.Footer className={styles.productModal}>
              <Button variant="secondary" onClick={handleClose}>
                繼續購物
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  router.push('/cart')
                }}
              >
                前往購物車結帳
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default ProductDetail

// 獲取所有產品的靜態路徑
export async function getStaticPaths() {
  try {
    const res = await fetch('http://localhost:3005/api/products')
    const responseData = await res.json()

    if (!responseData.data.products) {
      console.error('API response does not contain products')
      throw new Error('API response does not contain products')
    }

    // 根據產品ID生成所有靜態路徑
    const paths = responseData.data.products.map((product) => ({
      params: { pid: product.id.toString().padStart(2, '0') },
    }))

    return { paths, fallback: false }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { paths: [], fallback: false }
  }
}

// 根據路徑參數獲取對應產品的靜態屬性
export async function getStaticProps({ params }) {
  try {
    const productId = parseInt(params.pid, 10) // 去除前導零並解析為整數
    const res = await fetch(`http://localhost:3005/api/products/${productId}`)
    const responseData = await res.json()

    if (!responseData.data.product) {
      return { notFound: true }
    }

    return {
      props: {
        initialProduct: responseData.data.product,
      },
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
    return { props: { initialProduct: null } }
  }
}
