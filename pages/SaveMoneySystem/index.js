import React, { useState, useEffect } from 'react'
import {
  IconButton,
  Container,
  Header,
  Content,
  Panel,
  PanelGroup,
  SelectPicker,
  Form,
  Checkbox,
} from 'rsuite'
import SendIcon from '@rsuite/icons/Send'
// import Navbar from '@/components/layout/mudanlow-layout/navbar'
// import Footer from '@/components/layout/mudanlow-layout/footer'
import styles from './SaveMoneySystem.module.css'
import CreditCardForm from '../CreditCardForm'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function SaveMoneySystem() {
  const [balance, setBalance] = useState(0) // 新增餘額狀態
  const [creditCardFormData, setCreditCardFormData] = useState({
    StoredMemberId: '',
    name: '',
    email: '',
    PayMoney: '1000',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })

  const [emailError, setEmailError] = useState('')
  const router = useRouter()

  const saveMoneyNumber = [
    '儲值NT$1000',
    '儲值NT$2000',
    '儲值NT$3000',
    '儲值NT$4000',
    '儲值NT$5000',
    '儲值NT$6000',
    '儲值NT$7000',
    '儲值NT$8000',
    '儲值NT$9000',
    '儲值NT$10000',
  ].map((item) => ({ label: item, value: item }))

  useEffect(() => {
    // 在客戶端獲取localStorage
    const memberId = localStorage.getItem('memberId')
    if (memberId) {
      handleChange('StoredMemberId', memberId)
    }
  }, []) // 只在組件mount時執行一次

  const handleChange = (name, value) => {
    setCreditCardFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handlePayMoney = (value) => {
    const newValue = value.replace('儲值NT$', '')
    handleChange('PayMoney', newValue)
  }

  const handleEmail = (value) => {
    handleChange('email', value)
    validateEmail(value)
  }

  const handleEmailBlur = () => {
    validateEmail(creditCardFormData.email)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmailError(
      email.trim() === ''
        ? '信箱不能為空'
        : !emailRegex.test(email)
        ? '無效的信箱格式'
        : ''
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('creditCardFormData:', creditCardFormData)

    // 檢查所有字段是否有值
    const requiredFields = [
      'StoredMemberId',
      'name',
      'email',
      'PayMoney',
      'cardNumber',
      'expiry',
      'cvc',
    ]
    for (const field of requiredFields) {
      if (!creditCardFormData[field]) {
        console.error(`${field} is required but is undefined or empty.`)
        return
      }
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/reserve/SaveMoneySystem',
        creditCardFormData
      )
      console.log('儲值金表單傳送成功:', response.data)
      setCreditCardFormData({
        name: '',
        email: '',
        PayMoney: '1000',
        cardNumber: '',
        expiry: '',
        cvc: '',
      })
      //儲值後更新餘額
      fetchBalance()
      toast.success('已成功儲值')
      setTimeout(() => {
        toast.success('即將前往查詢預約')
      }, 1500)
      setTimeout(() => {
        router.push('/ReservationRules')
      }, 3000)
    } catch (error) {
      console.error('提交表單時出錯!', error)
    }
  }

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/reserve/SaveMoneySystem/balance/${creditCardFormData.StoredMemberId}`
      )
      setBalance(response.data.balance)
    } catch (error) {
      console.error('獲取餘額時出錯!', error)
    }
  }

  useEffect(() => {
    if (creditCardFormData.StoredMemberId) {
      fetchBalance()
    }
  }, [creditCardFormData.StoredMemberId])
  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Header></Header>
        <Content>
          <PanelGroup>
            <Panel header="儲值資訊" className={`${styles.panel}`} shaded>
              <h5>
                會員卡號
                <span className={`${styles.span}`}>
                  {creditCardFormData.StoredMemberId}
                </span>
              </h5>
              <h6 className={`${styles.moneyText}`}>
                目前餘額
                <span className={`${styles.span}`}>NT${balance}</span>
              </h6>
              <h6>(最高儲值金額上限為 NT$10,000)</h6>
              <h6 className={`${styles.moneyText}`}>
                儲值金額
                <span className={`${styles.span}`}>
                  NT${creditCardFormData.PayMoney}
                </span>
              </h6>
              <SelectPicker
                data={saveMoneyNumber}
                searchable={false}
                className={`${styles.SaveMoneyNumberStyles}`}
                size="lg"
                block
                value={`儲值NT$${creditCardFormData.PayMoney}`}
                onChange={handlePayMoney}
              />
            </Panel>
            <Panel header="付款人資訊" className={`${styles.panel}`} shaded>
              <Form fluid>
                <Form.Group controlId="email-1">
                  <Form.ControlLabel>會員信箱</Form.ControlLabel>
                  <Form.Control
                    name="email"
                    type="email"
                    size="lg"
                    placeholder="Email"
                    value={creditCardFormData.email}
                    onChange={(value) => handleEmail(value)}
                    onBlur={handleEmailBlur}
                  />
                  <Form.HelpText className={`${styles.highlight}`}>
                    {emailError ? emailError : ''}
                  </Form.HelpText>
                </Form.Group>
              </Form>
            </Panel>
            <Panel header="信用卡資訊" className={`${styles.panel}`} shaded>
              <CreditCardForm
                creditCardFormData={creditCardFormData}
                handleChange={handleChange}
              />
            </Panel>
            <Panel header="付款金額" className={`${styles.panel}`} shaded>
              <h6 className={`${styles.moneyText}`}>
                NT${creditCardFormData.PayMoney}
              </h6>
            </Panel>
            <Panel
              header="線上儲值-牡丹樓付款注意事項"
              className={`${styles.panel}`}
              shaded
            >
              <ul className={`${styles.ul}`}>
                <li className={`${styles.li}`}>
                  請注意此交易金額將於線上儲值步驟完成後，即刻於您的信用卡帳戶中進行線上付款。
                </li>
                <li className={`${styles.li}`}>
                  使用信用卡進行線上儲值，若欲申請儲值金退費，牡丹樓會員需持原信用卡及附有本人照片之身分證明文件(僅限：身分證、駕照、健保卡或居留證)至影城現場櫃檯填寫申請表，影城將影印相關身分證文件辦理退款。
                </li>
                <li className={`${styles.li}`}>
                  依據經濟部 2020 年 4 月 10
                  日公告「商品(服務)禮券定型化契約應記載及不得記載事項」新規定，自
                  2021 年 1 月 1
                  日起之儲值，申請儲值金退費，企業得酌收返還金額之 3%手續費。
                </li>
                <li className={`${styles.li}`}>
                  儲值金退費作業時間為60~180個工作天且需全額退費，恕無法辦理部份餘額退費；若提供之金融帳戶不符規定或提供非儲值時付費之原信用卡，儲值金退費作業時間自您將相關資料補正無誤後重新起算。在未補正完成前，牡丹樓恕無法提供退費服務，敬請您務必留意。
                </li>
                <li className={`${styles.li}`}>
                  牡丹樓會員於一年內申請儲值金退費達兩次(含)，本公司有權將此卡儲值功能鎖定一年，鎖卡期間仍可正常使用牡丹樓點數/HAPPY
                  GO點數累兌點功能，停卡一年後系統將自動開啟儲值功能，恕不另行通知。
                </li>
                <li className={`${styles.li}`}>
                  其餘未盡事項依影城現場公告為主。 系統維護公告：每週三
                  03:00-06:00將進行會員系統維護，官網及官方APP將無法進行儲值、訂票與退票，造成不便，敬請見諒。
                </li>
              </ul>
              <p className={`${styles.highlight}`}>
                **牡丹樓絕不會以任何理由要求您操作 ATM 與取消分期設定**
              </p>
              <Checkbox>我同意牡丹樓付費儲值注意事項</Checkbox>
              <IconButton
                appearance="primary"
                active
                className={`${styles.sendButton}`}
                icon={<SendIcon />}
                onClick={handleSubmit}
              >
                確認
              </IconButton>
            </Panel>
          </PanelGroup>
        </Content>
      </Container>
      <Toaster />
      {/* <Footer /> */}
    </>
  )
}
