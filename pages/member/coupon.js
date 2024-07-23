import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getUserById } from '@/services/user'
import MemberNavbar from '@/components/layout/default-layout/my-navbar/member-navbar'
import Container from 'react-bootstrap/Container'
import { FaExclamationTriangle } from 'react-icons/fa'
import { IoTicketOutline } from 'react-icons/io5'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import NavbarLogin from '@/components/layout/mudanlow-layout/navbar-login'
import Footer from '@/components/layout/mudanlow-layout/footer'

const initUserProfile = {
  name: '',
  sex: '',
  phone: '',
  birth_date: '',
  avatar: '',
  username: '',
  name1: '',
  phone1: '',
  zip1: '',
  county1: '',
  district1: '',
  address1: '',
  name2: '',
  phone2: '',
  zip2: '',
  county2: '',
  district2: '',
  address2: '',
  order_address1: '',
}

export default function Coupon() {
  const { auth } = useAuth()
  const [userProfile, setUserProfile] = useState(initUserProfile)
  const [purchaseOrders, setPurchaseOrders] = useState([])
  //要來接之後後端來的折價卷資料的
  const [coupons, setCoupons] = useState({
    m_id: 0,
    member_name: '',
    coupons_sentDate: '',
    coupons_maxAge: '',
    coupons_sample_price: 0,
    coupons_explain: '',
    car_id: '',
  })
  const [message, setMessage] = useState('') //有折價卷就是空，沒折價卷後端會丟訊息過來
  const [error, setError] = useState('')

  // 讀取user資料
  const getUserData = async (id) => {
    const res = await getUserById(id)

    if (res.data.status === 'success') {
      const dbUser = res.data.data.user
      const dbPurchaseOrders = res.data.data.purchaseOrders.filter(
        (order) => order.status === '已付款' || order.status === '店家以確認'
      )

      setUserProfile({
        ...initUserProfile,
        ...dbUser,
      })

      setPurchaseOrders(dbPurchaseOrders)
    } else {
      // 加載失敗
    }
  }

  useEffect(() => {
    if (auth.isAuth) {
      getUserData(auth.userData.id) //取得會員id
    }
  }, [auth])

  useEffect(() => {
    if (userProfile.name) {
      // 以載入會員資料
    }
  }, [userProfile])

  useEffect(() => {
    if (auth.userData.id) {
      fetch(`http://localhost:3005/api/coupons/history/${auth.userData.id}`)
        .then((r) => r.json())
        .then((data) => {
          // 假設後端返回的 data.result 是一個陣列
          if (Array.isArray(data.result)) {
            setCoupons(data.result)
            console.log(data.result)
          } else {
            // 如果 data.result 不是陣列，包裝成陣列
            setCoupons([data.result])
          }
          setMessage(data.message || '')
          setError('')
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch session')
          setCoupons({
            m_id: 0,
            member_name: '',
            coupons_sentDate: '',
            coupons_maxAge: '',
            coupons_sample_price: 0,
            coupons_explain: '',
            car_id: '',
          })
          setMessage('')
        })
    }
  }, [auth.userData.id])

  return (
    <>
      <div className="container cPage my-5">
        <MemberNavbar />
        <Container fluid className="couponProfileContainer">
          <h2 className="text-center mb-4 ">折價卷查詢</h2>
          <div className="row ">
            {coupons.length > 0 ? (
              coupons.map((v, i) => {
                return (
                  <div
                    key={i}
                    className="col-12 d-flex justify-content-center align-items-center mb-3 "
                  >
                    <div className="couponsBg">
                      <div className="coupons">
                        <img
                          alt=""
                          className="logo"
                          src="/pics/logo-gold.png"
                        />
                        <div className="couponsCard">
                          <div>電子折價卷</div>
                          <div>
                            折價
                            <span className="money">
                              {v.coupons_sample_price}元
                            </span>
                          </div>
                          {new Date(v.coupons_maxAge) < new Date() ? (
                            <div className="coupon_world">
                              <FaExclamationTriangle />
                              折價卷已過期，無法使用
                            </div>
                          ) : (
                            ''
                          )}
                          {v.used == 1 ? (
                            <div className="coupon_world">
                              {' '}
                              <IoTicketOutline />
                              折價卷已使用
                            </div>
                          ) : (
                            ''
                          )}
                          {/* <div className="coupon_world">折價卷已使用</div> */}
                        </div>
                        <div className="limit">
                          使用期限: {v.coupons_sentDate} ~ {v.coupons_maxAge} 止
                        </div>
                        <div className="limit">
                          使用限制:
                          消費金額需滿額1000元以上即可使用，限線上購物使用。
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div>{message}</div>
            )}
          </div>
        </Container>
      </div>
      <style>{`
      {/*  動畫  */}
      .member-profile-container {
  max-width: 31rem;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
}

.order-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out; /* 過渡效果 */
  color: #333;
}

.order-card:hover {
  transform: scale(1.02); /* 滑鼠璇停放大 */
  background-color: #f0f0f0; 
  color: #666;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-buttons button {
  margin: 0 10px;
}
{/* 樣式 */}
 
          .profile-card {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }

          .profile-item {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
          }

          .order-card {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 20px;
          }

          .order-title {
            font-size: 20px;
            font-weight: bold;
            color: #555;
          }

          .order-text {
            font-size: 16px;
            color: #666;
          }

          .order-info-title {
            font-size: 18px;
            color: #333;
          }

          .order-info-list {
            list-style-type: none;
            padding: 0;
          }

          .package-info-item {
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #eee;
            border-radius: 4px;
            margin-top: 10px;
          }

          .product-list {
            list-style-type: none;
            padding: 0;
          }

          .product-item {
            padding: 5px;
            border-bottom: 1px solid #ddd;
            margin-top: 8px;
          }

          
        }
`}</style>
      <style jsx>
        {`
          .couponProfileContainer {
            max-width: 33.9rem;
            margin: 0 auto;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            padding: 15px;
            background-color: #fff;
            overflow: hidden;
          }
          .cPage {
            height: 100vh;
          }
          .couponsBg {
            width: 300px;
            background: #4a9c7a56;
            border-radius: 5px;
          }
          .coupons {
            text-align: center;
          }
          .couponsBg:hover {
            width: 320px;
            transition: 0.5s;
          }
          .logo {
            margin-bottom: 0.5rem;
            height: 3rem;
          }
          .couponsCard {
            margin-right: 20px;
            margin-left: 20px;
            background: #ffffff;
            font-size: 24px;
            font-weight: bolder;
          }

          .money {
            color: red;
          }
          .coupon_world {
            font-size: 12px;
            color: red;
          }
          .limit {
            text-align: left;
            margin-top: 5px;
            font-size: 12px;
            font-weight: 900;
          }
          .hidden {
            display: none;
          }
          .open {
            display: block;
          }

          @media screen and (max-width: 768px) {
            .couponsBg {
              width: 200px;
              background: #4a9c7a56;
              border-radius: 5px;
            }
            .coupons {
              text-align: center;
            }
            .iconBg {
              cursor: pointer;
              display: flex;
              justify-content: right;
            }
            .logo {
              margin-bottom: 20px;
              height: 2rem;
            }
            .couponsCard {
              margin-right: 20px;
              margin-left: 20px;
              background: #ffffff;
              font-size: 16px;
              font-weight: bolder;
            }

            .money {
              color: red;
            }
            .limit {
              text-align: left;
              margin-top: 5px;
              font-size: 10px;
            }
          }
        `}
      </style>
    </>
  )
}
