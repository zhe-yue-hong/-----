import { useState } from 'react'

export default function FilterBar({ onFilter }) {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [brand, setBrand] = useState('')

  const handleFilter = () => {
    onFilter({ minPrice, maxPrice, brand })
  }

  return (
    <>
      <div className="filter-bar">
        <h5>篩選條件</h5>
        <div className="filter-item">
          <label>最低價格</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>最高價格</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>種類</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <button onClick={handleFilter} className="btn btn-primary">
          篩選
        </button>
      </div>
      <style jsx>{`
        .filter-bar {
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .filter-item {
          margin-bottom: 10px;
        }

        .filter-item label {
          display: block;
          margin-bottom: 5px;
        }

        .filter-item input {
          width: 100%;
          padding: 5px;
          box-sizing: border-box;
        }

        .filter-bar button {
          width: 100%;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}
