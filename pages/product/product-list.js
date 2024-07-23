import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart-state'
import Image from 'next/image'
import Cart from '@/components/cart/cart'

export default function ProductList() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [productName, setProductName] = useState('')
  const [products, setProducts] = useState([])

  const { addItem } = useCart()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const showModal = (name) => {
    setProductName('產品：' + name + '已成功加入購物車')
    handleShow()
  }

  useEffect(() => {
    fetch('http://localhost:3005/api/products')
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          data.status === 'success' &&
          Array.isArray(data.data.products)
        ) {
          setProducts(data.data.products)
        } else {
          console.error('API response is not an array:', data)
        }
      })
      .catch((error) => console.error('Error fetching products:', error))
  }, [])

  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>加入購物車訊息</Modal.Title>
      </Modal.Header>
      <Modal.Body>{productName}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          繼續購物
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            router.push('/test/cart')
          }}
        >
          前往購物車結帳
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const display = (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {products.slice(0, 20).map((v, i) => (
          <div className="col" key={v.id}>
            <div className="card">
              <Image
                className="card-img-top"
                src={`/images/product/thumb/${v.photos.split(',')[0]}`}
                alt="..."
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL={`/images/product/thumb/${v.photos.split(',')[0]}`}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="card-body">
                <h5 className="card-title">{v.name}</h5>
                <p className="card-text">{v.info}</p>
                <p className="card-text text-danger">NTD {v.price}元</p>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    const item = {
                      ...v,
                      quantity: 1,
                      photo: `/images/product/thumb/${v.photos.split(',')[0]}`,
                    }
                    addItem(item)
                    showModal(v.name)
                  }}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <Cart />
      <h1>商品列表頁範例</h1>
      <p>
        <Link href="/test/cart">購物車範例</Link>
      </p>
      {messageModal}
      {display}
      <style global jsx>{`

        }
      `}</style>
    </>
  )
}
