import React, { useState, useEffect } from 'react'
import { Drawer, Button, List, FlexboxGrid } from 'rsuite'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function ReservationPay({
  open,
  setOpen,
  reservation,
  step,
  onStepChange,
  memberId,
}) {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  if (!reservation) return null

  useEffect(() => {
    fetchBalance()
  }, [])

  const { numberOfPeople, menuSelect, selectedTableType } = reservation

  const numPeople = numberOfPeople
    ? parseInt(numberOfPeople.replace(/\D/g, ''), 10)
    : 0

  const calculateTotal = () => {
    let total = 0

    switch (menuSelect) {
      case '現場單點':
        total = 250 * numPeople
        break
      case '合菜料理':
        if (selectedTableType.includes('12人桌')) {
          total = 3000
        } else if (selectedTableType.includes('4人桌')) {
          total = 2000
        } else if (selectedTableType.includes('2人桌')) {
          total = 1000
        }
        break
      case '無菜單料理':
        total = 500 * numPeople
        break
      default:
        total = 0
    }
    return total
  }
  const fetchBalance = async () => {
    try {
      if (!memberId) return // 如果 memberId 不存在,直接返回
      const response = await axios.get(
        `http://localhost:3001/reserve/SaveMoneySystem/balance/${memberId}`
      )
      setBalance(response.data.balance)
      // toast.success('餘額已更新')
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  //亭安
  // 生成唯一訂單編號
  // 處理第三方支付的函數
  const handleThirdPartyPayment = async () => {
    onStepChange(reservation.id, 3)
    try {
      const totalAmount = calculateTotal()
      const response = await axios.get(
        `http://localhost:3001/payment?totalAmount=${totalAmount}`
      )
      document.open()
      document.write(response.data.html)
      console.log(response.data)
      document.close()
      onStepChange(reservation.id, 3) // 更新步驟狀態
    } catch (error) {
      console.error('Error initiating third-party payment:', error)
      toast.error('發起第三方支付時發生錯誤，請重試!!')
    }
  }

  const handleConfirm = async () => {
    const total = calculateTotal()
    console.log(memberId)
    console.log(total)
    if (balance < total) {
      toast.error('餘額不足，請儲值後再嘗試')
      return
    }

    try {
      // 扣除餘額
      const response = await axios.post(`http://localhost:3001/reserve/pay`, {
        memberId: memberId,
        amount: total,
      })
      //一開始這裡用比較字串的方式對應前後端 後來發現用response.data.success狀態值會比較妥當
      if (response.data.success) {
        // 更新步驟狀態
        onStepChange(reservation.id, 3)

        // 更新餘額
        fetchBalance()
        toast.success('支付成功')
      } else {
        console.error('Error in response:', response.data.error)
        toast.error('支付過程中發生錯誤，請重試。')
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
    }
  }

  return (
    <Drawer open={open} onClose={() => setOpen(false)} size="sm">
      <Drawer.Header>
        <Drawer.Title>結帳資訊</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={24}>
            <List bordered>
              <List.Item>用餐方式: {menuSelect}</List.Item>
              <List.Item>用餐人數: {numberOfPeople}</List.Item>
              <List.Item>桌型: {selectedTableType}</List.Item>
              <List.Item>總計: {calculateTotal()} 元</List.Item>
              <List.Item>目前餘額: {balance} 元</List.Item>
            </List>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <Button onClick={() => setOpen(false)} style={buttonStyle}>
                取消
              </Button>
              <Button
                onClick={handleConfirm} // 更新父元件的 currentStep 狀態
                appearance="primary"
                style={{ ...buttonStyle, marginLeft: 10 }}
              >
                使用餘額支付
              </Button>
              <Button
                onClick={handleThirdPartyPayment} // 更新父元件的 currentStep 狀態
                appearance="primary"
                style={{ ...buttonStyle, marginLeft: 10 }}
              >
                第三方支付
              </Button>
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Drawer.Body>
      <Toaster />
    </Drawer>
  )
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  transition: 'background-color 0.3s',
  cursor: 'pointer',
}
