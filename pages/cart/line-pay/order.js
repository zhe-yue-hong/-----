import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axiosInstance from '@/services/axios-instance'
import { useAuth } from '@/hooks/use-auth'
import toast, { Toaster } from 'react-hot-toast'
import { useCart } from '@/hooks/use-cart-state'
import Swal from 'sweetalert2'
import styles from './Order.module.css'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import NavbarLogin from '@/components/layout/mudanlow-layout/navbar-login'
import Footer from '@/components/layout/mudanlow-layout/footer'

export default function Order() {
  const [currentStep, setCurrentStep] = useState(0)
  const { cart, items, clearCart } = useCart()
  const router = useRouter()
  const { auth } = useAuth()
  const [order, setOrder] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })
  const [selectedAddress, setSelectedAddress] = useState(1)
  const [address1, setAddress1] = useState({
    name: '張皓程',
    phone: '0912345678',
    zip: '100',
    county: '台北市',
    district: '中正區',
    address: '忠孝東路一段 1 號',
  })
  const [address2, setAddress2] = useState({
    name: '',
    phone: '',
    zip: '',
    county: '',
    district: '',
    address: '',
  })

  const createOrder = async () => {
    try {
      const payload = {
        amount: items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        selectedAddress: selectedAddress,
        address1: address1,
        address2: address2,
      }

      const res = await axiosInstance.post('/line-pay/create-order', payload)

      if (res.data.status === 'success') {
        setOrder(res.data.data.order)
        toast.success('已成功建立訂單')
        clearCart() // 清空購物車
        goLinePay(res.data.data.order.orderId)
      } else {
        toast.error('建立訂單失敗: ' + res.data.message)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('建立訂單失敗')
    }
  }

  const goLinePay = (orderId) => {
    if (window.confirm('確認要導向至LINE Pay進行付款?')) {
      window.location.href = `http://localhost:3005/api/line-pay/reserve?orderId=${orderId}`
    }
  }

  const handleConfirm = async (transactionId) => {
    try {
      const res = await axiosInstance.get(
        `/line-pay/confirm?transactionId=${transactionId}`
      )

      console.log(res.data)

      if (res.data.status === 'success') {
        toast.success('付款成功')
        Swal.fire({
          title: '付款成功',
          text: '3秒後將跳轉到首頁',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          didClose: () => {
            router.push('/member/new-cart')
          },
        })
      } else {
        toast.error('付款失敗')
        Swal.fire({
          title: '付款失敗',
          text: '請重試或聯繫客服',
          icon: 'error',
        })
      }

      if (res.data.data) {
        setResult(res.data.data)
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Error confirming payment:', error)
      toast.error('確認付款時發生錯誤')
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { transactionId, orderId } = router.query

      if (!transactionId || !orderId) {
        setIsLoading(false)
        return
      }

      handleConfirm(transactionId)
    }
  }, [router.isReady])

  const handleAddressChange = (e, addressSetter) => {
    const { name, value } = e.target
    addressSetter((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const orderDisplay = (
    <div className="col-lg-8">
      <div className="card shadow-sm">
        <div className={`card-body ${styles.transparentBg}`}>
          <h4 className="card-title mb-4">購物車</h4>
          <div className={styles.addressButtons}>
            <button
              onClick={() => setSelectedAddress(1)}
              className={`btn ${
                selectedAddress === 1
                  ? styles.customBtn1
                  : 'btn-outline-secondary'
              }`}
            >
              收件人1
            </button>
            <button
              onClick={() => setSelectedAddress(2)}
              className={`btn ${
                selectedAddress === 2
                  ? styles.customBtn1
                  : 'btn-outline-secondary'
              }`}
            >
              收件人2
            </button>
          </div>
          <div className={styles.addressSection}>
            {selectedAddress === 1 ? (
              <div className={styles.addressDetails}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>姓名:</label>
                  <input
                    type="text"
                    name="name"
                    value={address1.name}
                    onChange={(e) => handleAddressChange(e, setAddress1)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>電話:</label>
                  <input
                    type="text"
                    name="phone"
                    value={address1.phone}
                    onChange={(e) => handleAddressChange(e, setAddress1)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>郵遞區號:</label>
                  <input
                    type="text"
                    name="zip"
                    value={address1.zip}
                    onChange={(e) => handleAddressChange(e, setAddress1)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>縣市:</label>
                  <input
                    type="text"
                    name="county"
                    value={address1.county}
                    onChange={(e) => handleAddressChange(e, setAddress1)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>區:</label>
                  <input
                    type="text"
                    name="district"
                    value={address1.district}
                    onChange={(e) => handleAddressChange(e, setAddress1)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>地址:</label>
                  <input
                    type="text"
                    name="address"
                    value={address1.address}
                    onChange={(e) => handleAddressChange(e, setAddress1)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.addressDetails}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>姓名:</label>
                  <input
                    type="text"
                    name="name"
                    value={address2.name}
                    onChange={(e) => handleAddressChange(e, setAddress2)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>電話:</label>
                  <input
                    type="text"
                    name="phone"
                    value={address2.phone}
                    onChange={(e) => handleAddressChange(e, setAddress2)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>郵遞區號:</label>
                  <input
                    type="text"
                    name="zip"
                    value={address2.zip}
                    onChange={(e) => handleAddressChange(e, setAddress2)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>縣市:</label>
                  <input
                    type="text"
                    name="county"
                    value={address2.county}
                    onChange={(e) => handleAddressChange(e, setAddress2)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>區:</label>
                  <input
                    type="text"
                    name="district"
                    value={address2.district}
                    onChange={(e) => handleAddressChange(e, setAddress2)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>地址:</label>
                  <input
                    type="text"
                    name="address"
                    value={address2.address}
                    onChange={(e) => handleAddressChange(e, setAddress2)}
                    className={`form-control ${styles.input}`}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.summarySection}>
            <hr />
            <button
              className={`btn ${styles.customBtn} w-100 mb-3`}
              onClick={createOrder}
            >
              前往付款
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return <p>與伺服器連線同步中...</p>
  }

  return (
    <>
      <div className={styles.orderContainer}>
        {result.returnCode ? (
          <div className={styles.confirmOrderContainer}>
            <h2>最後付款確認結果(成功): </h2>
          </div>
        ) : (
          orderDisplay
        )}
        <Toaster />
      </div>
    </>
  )
}
