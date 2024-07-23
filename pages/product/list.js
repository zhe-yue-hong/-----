import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Modal, Button } from 'react-bootstrap'
import { useCart } from '@/hooks/use-cart-state'
import axios from 'axios'
import Cart from '@/components/cart/cart'
import ProductCard from '@/components/fav-test/product-card'
import { Toaster } from 'react-hot-toast'

export default function List() {
  const brandNames = {
    1: '肉類',
    2: '青菜',
    3: '甜品',
    4: '海鮮',
  }
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [productName, setProductName] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortedProducts, setSortedProducts] = useState([])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observer = useRef()
  const lastProductElementRef = useRef()

  const { addItem } = useCart()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sidebarToggle = document.body.querySelector('#sidebarToggle')
      if (sidebarToggle) {
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
          document.body.classList.toggle('sb-sidenav-toggled')
        }
        sidebarToggle.addEventListener('click', (event) => {
          event.preventDefault()
          document.body.classList.toggle('sb-sidenav-toggled')
          localStorage.setItem(
            'sb|sidebar-toggle',
            document.body.classList.contains('sb-sidenav-toggled')
          )
        })
      }
    }
  }, [])

  const fetchProducts = async () => {
    if (!hasMore) return
    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:3005/api/products?page=${page}`
      )
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.data.products,
      ])
      setFilteredProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.data.products,
      ])
      setSortedProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.data.products,
      ])
      setHasMore(response.data.data.products.length > 0)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1)
      }
    })

    if (lastProductElementRef.current) {
      observer.current.observe(lastProductElementRef.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [loading, hasMore])

  const handleFilter = (
    updatedBrand = selectedBrand,
    updatedPriceRanges = selectedPriceRanges,
    showFavoritesOnly = showFavorites
  ) => {
    let filtered = products.filter((product) => {
      const isFavorite = showFavoritesOnly
        ? JSON.parse(localStorage.getItem('favoriteList') || '[]').includes(
            product.id
          )
        : true
      const inPriceRange =
        updatedPriceRanges.length === 0 ||
        updatedPriceRanges.some((range) => {
          switch (range) {
            case 'range1':
              return product.price <= 150
            case 'range2':
              return product.price >= 151 && product.price <= 300
            case 'range3':
              return product.price >= 301 && product.price <= 599
            case 'range4':
              return product.price >= 600
            default:
              return true
          }
        })
      const inBrand =
        updatedBrand.length === 0 ||
        updatedBrand.includes(product.brand_id.toString())
      return isFavorite && inPriceRange && inBrand
    })
    setFilteredProducts(filtered)
    setSortedProducts(filtered)
  }

  const handlePriceFilter = (range) => {
    const updatedPriceRanges = selectedPriceRanges.includes(range)
      ? selectedPriceRanges.filter((r) => r !== range)
      : [...selectedPriceRanges, range]
    setSelectedPriceRanges(updatedPriceRanges)
    handleFilter(selectedBrand, updatedPriceRanges)
  }

  const handleBrandToggle = (brandId) => {
    const brandIdStr = brandId.toString()
    const updatedBrand = selectedBrand.includes(brandIdStr)
      ? selectedBrand.filter((id) => id !== brandIdStr)
      : [...selectedBrand, brandIdStr]
    setSelectedBrand(updatedBrand)
    handleFilter(updatedBrand, selectedPriceRanges)
  }

  const handleSort = (order) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
    setSortedProducts(sorted)
  }

  const showModal = (name) => {
    setProductName(`產品：${name}已成功加入購物車`)
    setShow(true)
  }

  const uniqueBrands = [...new Set(products.map((product) => product.brand_id))]

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleFavoritesToggle = () => {
    setShowFavorites(!showFavorites)
    handleFilter(selectedBrand, selectedPriceRanges, !showFavorites)
  }

  const filterBar = (
    <>
      <div className="accordion accordion-flush" id="accordionFlushExample">
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
              價格範圍
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body px-1">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="priceRange"
                  value="range1"
                  id="flexCheckDefault"
                  onChange={() => handlePriceFilter('range1')}
                  checked={selectedPriceRanges.includes('range1')}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  $150以下
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="priceRange"
                  value="range2"
                  id="flexCheckChecked"
                  onChange={() => handlePriceFilter('range2')}
                  checked={selectedPriceRanges.includes('range2')}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  $150 - $300
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="priceRange"
                  value="range3"
                  id="flexCheckChecked"
                  onChange={() => handlePriceFilter('range3')}
                  checked={selectedPriceRanges.includes('range3')}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  $301 - $599
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="priceRange"
                  value="range4"
                  id="flexCheckChecked"
                  onChange={() => handlePriceFilter('range4')}
                  checked={selectedPriceRanges.includes('range4')}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  $600以上
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseFour"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseFour"
            >
              菜色
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseFour"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body px-1">
              <div className="filter-item">
                {uniqueBrands.map((brandId) => (
                  <div key={brandId} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="brand"
                      value={brandId}
                      id={`brand${brandId}`}
                      onChange={() => handleBrandToggle(brandId)}
                      checked={selectedBrand.includes(brandId.toString())}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`brand${brandId}`}
                    >
                      {brandNames[brandId] || `品牌 ${brandId}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseFive"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseFive"
            >
              我的最愛
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseFive"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body px-1">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="favoriteCheck"
                  checked={showFavorites}
                  onChange={handleFavoritesToggle}
                />
                <label className="form-check-label" htmlFor="favoriteCheck">
                  僅顯示我的最愛
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const messageModal = (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>加入購物車訊息</Modal.Title>
      </Modal.Header>
      <Modal.Body>{productName}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
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
  )

  const display = (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {sortedProducts.map((v, index) => {
        const isLastElement = index === sortedProducts.length - 1
        const ref = isLastElement ? lastProductElementRef : null
        return (
          <div className="col btn btn btn-light" key={v.id} ref={ref}>
            <ProductCard
              id={v.id}
              name={v.name}
              price={v.price}
              photos={v.photos}
              info={v.info}
            />
          </div>
        )
      })}
      {loading && <p>Loading more products...</p>}
    </div>
  )

  return (
    <>
      <Cart />
      <div className="row mt-3 mb-3">
        <h5 className="card-text d-flex justify-content-between align-items-center">
          <span className="custom-title">真空包產品</span>
          <div className="d-flex p-2 justify-content-end align-items-center">
            <div className="toolbar">
              <button
                className="btn"
                id="sidebarToggle"
                onClick={toggleSidebar}
              >
                隱藏篩選條件{' '}
                <i
                  className={`bi ${
                    sidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'
                  }`}
                ></i>
              </button>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                排序依據
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSort('desc')}
                  >
                    價格：由高至低
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSort('asc')}
                  >
                    價格：由低至高
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </h5>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-sm-12">
          <div className="d-flex" id="wrapper">
            <div
              className={`me-3 sidebar-wrapper ${
                sidebarCollapsed ? 'collapsed' : ''
              }`}
              id="sidebar-wrapper"
            >
              <div className="scroll">{filterBar}</div>
            </div>
            <div id="page-content-wrapper">
              <div className="container-fluid">{display}</div>
            </div>
          </div>
        </div>
      </div>
      {messageModal}
      <Toaster />
      <style jsx>{`
        .row {
          width: 80%;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 15px;
          box-shadow: a0 0 15px rgba(0, 0, 0, 0.1);
          background: url('/images/product/bg/花2.webp') no-repeat center center
            fixed;
          background-size: cover;
        }

        .custom-title {
          display: inline-block;
          font-size: 5rem;
          font-weight: bold;
          color: #8b4513;
          text-align: center;
          padding-bottom: 5px;
          margin-bottom: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .sidebar-wrapper.collapsed {
          display: none;
        }

        @media (max-width: 768px) {
          .sidebar-wrapper.collapsed {
            display: none;
          }
        }

        @media (min-width: 769px) {
          .sidebar-wrapper {
            display: block;
            transition: all 0.3s ease;
          }

          .sidebar-wrapper.collapsed {
            display: none;
            transition: all 0.3s ease;
          }
        }

        .scroll {
          position: sticky;
          top: 20px;
        }

        .product-card {
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.2s ease-in-out;
          background-color: rgba(255, 255, 255, 0.9);
          background: url('/images/product/bg/mudan.webp') no-repeat center
            center;
          background-size: cover;
        }

        .product-card:hover {
          transform: scale(1.05);
        }

        .product-card .card-title a:hover {
          text-decoration: underline;
        }

        .product-card .card-text {
          color: #7f8c8d;
        }

        .product-card .btn-success {
          background-color: #ff7f50;
          border: none;
          transition: background-color 0.3s ease;
        }

        .product-card .btn-success:hover {
          background-color: #ff6347;
        }

        .product-card .card-img-top {
          border: 2px solid #d1b7a1;
          border-radius: 10px;
        }

        .btn-favorite {
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 10px;
        }

        .price-favorite {
          display: flex;
          align-items: center;
        }

        .accordion-header .accordion-button {
          background-color: rgba(248, 248, 248, 0.8);
          color: #333;
          border: none;
        }

        .accordion-header .accordion-button.collapsed {
          background-color: rgba(255, 255, 255, 0.8);
          color: #333;
        }

        .accordion-body .form-check-label {
          color: #555;
        }

        .dropdown-menu .dropdown-item {
          color: #333;
        }

        .dropdown-menu .dropdown-item:hover {
          background-color: rgba(248, 248, 248, 0.8);
        }

        .toolbar .btn {
          color: #333;
        }

        .toolbar .btn:hover {
          color: #e74c3c;
        }

        .btn {
          display: inline-block;
          font-weight: 600;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          background-color: #d2691e;
          border: 1px solid #d2691e;
          padding: 0.75rem 1.25rem;
          font-size: 1.25rem;
          line-height: 1.5;
          border-radius: 0.25rem;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
          cursor: pointer;
        }

        .btn:hover {
          background-color: #a64b00;
          border-color: #a64b00;
        }

        .toolbar .btn,
        .dropdown .btn {
          background-color: #8b4513;
          border-color: #8b4513;
          color: #fff;
        }

        .toolbar .btn:hover,
        .dropdown .btn:hover {
          background-color: #a0522d;
          border-color: #a0522d;
        }

        .toolbar .dropdown-menu .dropdown-item {
          background-color: #f5deb3;
          color: #8b4513;
        }

        .toolbar .dropdown-menu .dropdown-item:hover {
          background-color: #deb887;
          color: #fff;
        }

        .accordion-button {
          font-weight: 600;
          background-color: #8b4513;
          color: #fff;
        }

        .accordion-button:not(.collapsed) {
          background-color: #a0522d;
        }

        .accordion-button:focus {
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .custom-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  )
}
