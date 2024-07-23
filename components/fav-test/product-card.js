import React, { useEffect, useState } from 'react'
import { useCart } from '@/hooks/use-cart-state'
import Image from 'next/image'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const ProductCard = ({ id, name, price, photos, info }) => {
  const { addItem } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || []
    setIsFavorite(favoriteList.includes(id))
  }, [id])

  const handleAddToCart = () => {
    const item = { id, name, price, quantity: 1 }
    addItem(item)
  }

  const handleToggleFavorite = () => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || []
    if (favoriteList.includes(id)) {
      const updatedList = favoriteList.filter((favId) => favId !== id)
      localStorage.setItem('favoriteList', JSON.stringify(updatedList))
      setIsFavorite(false)
    } else {
      favoriteList.push(id)
      localStorage.setItem('favoriteList', JSON.stringify(favoriteList))
      setIsFavorite(true)
    }
  }

  return (
    <div className="card product-card">
      <a href={`/product/${id.toString().padStart(2, '0')}`}>
        <Image
          className="card-img-top"
          src={`/images/product/thumb/${photos.split(',')[0]}`}
          alt={name}
          width={300}
          height={200}
          placeholder="blur"
          blurDataURL={`/images/product/thumb/${photos.split(',')[0]}`}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      </a>
      <div className="card-body">
        <h5 className="card-title">
          <a href={`/product/${id.toString().padStart(2, '0')}`}>{name}</a>
        </h5>
        <p className="card-text">{info}</p>
        <div className="price-favorite">
          <p className="card-text text-danger">NTD {price}元</p>
          <button
            type="button"
            className={`btn btn-favorite ${isFavorite ? 'favorited' : ''}`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? (
              <FaHeart size={24} color="red" />
            ) : (
              <FaRegHeart size={24} />
            )}
          </button>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleAddToCart}
      >
        加入購物車
      </button>
      <style jsx>{`
        .btn-favorite {
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 10px;
        }

        .price-favorite {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .card-text.text-danger {
          margin-bottom: 0;
        }

        .card-img-top {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}

export default ProductCard
