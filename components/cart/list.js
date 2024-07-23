import { useCart } from '@/hooks/use-cart-state'
import { useEffect, useState } from 'react'

export default function CartList() {
  const { cart, items, decrement, increment, removeItem, clearCart } = useCart()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return null
  }

  return (
    <div className="container lxgw-wenkai-mono-tc-regular">
      <div className="cart-list">
        <table className="table">
          <thead>
            <tr>
              <th>名稱</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
              <th>移除</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v, i) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>NTD {v.price}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => decrement(v.id)}
                    >
                      -
                    </button>
                    <span className="quantity">{v.quantity}</span>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => increment(v.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>TWD {v.subtotal}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeItem(v.id)}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
          <p></p>
          {cart.isEmpty && <p>購物車為空</p>}
          <button className="btn btn-warning" onClick={clearCart}>
            清空購物車
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
        }
        .cart-list {
          width: 100%;
          max-height: 500px; /* 設定最大高度 */
          overflow-y: auto; /* 開啟垂直滾動 */
          margin-bottom: 20px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table th,
        .table td {
          padding: 10px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }
        .table th {
          background-color: #f8f8f8;
        }
        .btn-group {
          display: flex;
          align-items: center;
        }
        .btn-group .btn {
          padding: 5px 10px;
        }
        .quantity {
          display: inline-block;
          width: 30px;
          text-align: center;
        }
        .btn-danger {
          background-color: #ff6f61;
          border: none;
          color: white;
        }
        .btn-danger:hover {
          background-color: #ff8b73;
        }
        .cart-summary {
          margin-top: 20px;
          text-align: right;
        }
        .cart-summary p {
          font-size: 18px;
          margin: 0;
        }
        .btn-warning {
          background-color: #ff6f61;
          border: none;
          color: white;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .btn-warning:hover {
          background-color: #ff8b73;
        }
      `}</style>
    </div>
  )
}
