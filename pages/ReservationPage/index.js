//表單判斷
import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import { Loader, Steps } from 'rsuite'
import 'rsuite/dist/rsuite.min.css' // 引入 React Suite 的 CSS 文件
//時間相關套件
import moment from 'moment'
//實現自動展開日歷且介面直觀
import DatePicker from 'react-datepicker'
//引入DatePicker的css
import 'react-datepicker/dist/react-datepicker.css'
import styles from './ReservationPage.module.css' // 引入 CSS 模組
//使用axios提交預約資訊到資料庫
import axios from 'axios'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import Footer from '@/components/layout/mudanlow-layout/footer'

export default function ReservationPage() {
  //動態定義memberId
  const [storedMemberId, setStoredMemberId] = useState('')
  //定義被選中的桌號
  const [numberOfPeopleId, setNumberOfPeopleId] = useState(null)
  //定義用餐人數
  const [numberOfPeople, setNumberOfPeople] = useState('0人')
  //定義用餐日期
  const [selectedDate, setSelectedDate] = useState(null)
  // 定義用餐方式
  const [menuSelect, setMenuSelect] = useState('請選擇用餐方式(必選)')
  // 追蹤當前選擇的桌子id
  const [tableSelect, setTableSelect] = useState(0)
  // 定義選擇桌型
  const [selectedTableType, setSelectedTableType] = useState('0 人桌')
  // 定義用餐時間
  const [selectedTime, setSelectedTime] = useState('請選擇時間(必選)')
  // 定義備註欄位輸入資訊
  const [textAreaInput, setTextAreaInput] = useState('')
  //控制日歷顯示隱藏
  const [isOpen, setIsOpen] = useState(false)
  // 控制按鈕是否禁用
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  //控制確認區域1顯示與否狀態
  const [whiteSquareVisible, setWhiteSquareVisible] = useState(false)
  //控制確認區域2顯示與否狀態
  const [whiteSquareVisible2, setWhiteSquareVisible2] = useState(false)
  //控制毛玻璃顯示與否狀態
  const [overLayVisible, setOverLayVisible] = useState(false)
  //loading動畫是否顯示
  const [loading, setLoading] = useState(true) // 添加 loading 狀態
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // 在客戶端獲取localStorage
    const memberId = localStorage.getItem('memberId')
    if (memberId) {
      setStoredMemberId(memberId)
    }
  }, []) // 只在組件mount時執行一次

  // const handleLogout = () => {
  //   // 清除localStorage並重新載入頁面
  //   localStorage.removeItem('memberId')
  //   window.location.reload() // 或者導航到登出頁面
  // }

  //currentStep的計算方式
  const calculateCurrentStep = (
    numberOfPeopleId,
    selectedDate,
    menuSelect,
    selectedTime,
    tableSelect
  ) => {
    let stepCount = 0
    if (numberOfPeopleId > 0) stepCount++
    if (selectedDate) stepCount++
    if (menuSelect !== '請選擇用餐方式(必選)') stepCount++
    if (selectedTime !== '請選擇時間(必選)') stepCount++
    if (tableSelect > 0) stepCount++
    return stepCount
  }
  // 生成 1 到 12 的數字陣列
  // const numbers = Array.from({ length: 12 }, (_, index) => index + 1)
  const numbers = [
    { id: 1, type: '1人' },
    { id: 2, type: '2人' },
    { id: 3, type: '3人' },
    { id: 4, type: '4人' },
    { id: 5, type: '5人' },
    { id: 6, type: '6人' },
    { id: 7, type: '7人' },
    { id: 8, type: '8人' },
    { id: 9, type: '9人' },
    { id: 10, type: '10人' },
    { id: 11, type: '11人' },
    { id: 12, type: '12人' },
  ]
  //透過點擊事件更新numberOfPeople
  const handleNumberClick = (number) => {
    setNumberOfPeopleId(number.id)
    console.log(`選擇的桌號: ${number.id}`)
    setNumberOfPeople(number.type)
    console.log(`預約人數: ${number.type}`)
    setCurrentStep(
      calculateCurrentStep(
        number.id,
        selectedDate,
        menuSelect,
        selectedTime,
        tableSelect
      )
    )
  }

  //建立一個陣列裡面包含1個12人桌6個4人桌2個2人桌
  const tables = [
    { id: 1, type: '12人桌' },
    { id: 2, type: '4人桌' },
    { id: 3, type: '4人桌' },
    { id: 4, type: '4人桌' },
    { id: 5, type: '4人桌' },
    { id: 6, type: '4人桌' },
    { id: 7, type: '4人桌' },
    { id: 8, type: '2人桌' },
    { id: 9, type: '2人桌' },
  ]
  // 點擊桌子時的處理函式
  // 用來更新table.id的active
  //一開始我使用table.type作為參數 這是違反規定的
  const handleTableClick = (tableid, tableType) => {
    // 更新選中桌子的id
    setTableSelect(tableid)
    // 更新選中桌子的桌型
    setSelectedTableType(tableType)
    setCurrentStep(
      calculateCurrentStep(
        numberOfPeopleId,
        selectedDate,
        menuSelect,
        selectedTime,
        tableid
      )
    )
  }
  // 創建時間資訊的陣列
  const times = [
    { value: '11:30', label: '11:30' },
    { value: '12:00', label: '12:00' },
    { value: '12:30', label: '12:30' },
    { value: '13:00', label: '13:00' },
    { value: '17:30', label: '17:30' },
    { value: '18:00', label: '18:00' },
    { value: '18:30', label: '18:30' },
    { value: '19:00', label: '19:00' },
    { value: '19:30', label: '19:30' },
    { value: '20:00', label: '20:00' },
  ]
  // 假設 selectedTime 是從使用者選擇的時間（例如 '12:00'）
  const formattedTime = moment(selectedTime, 'HH:mm').format('HH:mm')
  // 處理選擇時間變更的函式
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value) // 更新選擇的時間值
    setCurrentStep(
      calculateCurrentStep(
        numberOfPeopleId,
        selectedDate,
        menuSelect,
        formattedTime,
        tableSelect
      )
    )
  }
  //若是"今天"被點擊
  const handleTodayClick = () => {
    //轉換格式
    setSelectedDate(moment().format('YYYY-MM-DD'))
    console.log(typeof selectedDate)
    //紀錄被點擊的是today
    console.log('被點擊的是:今天')
    setIsOpen(false)
    setCurrentStep(
      calculateCurrentStep(
        numberOfPeopleId,
        moment().format('YYYY-MM-DD'),
        menuSelect,
        formattedTime,
        tableSelect
      )
    )
  }
  //若是"明天"被點擊
  const handleTomorrowClick = () => {
    //日期+1，轉換格式
    setSelectedDate(moment().add(1, 'days').format('YYYY-MM-DD'))
    console.log(typeof selectedDate)
    //紀錄被點擊的是tomorrow
    console.log('被點擊的是:明天')
    setIsOpen(false)
    setCurrentStep(
      calculateCurrentStep(
        numberOfPeopleId,
        moment().add(1, 'days').format('YYYY-MM-DD'),
        menuSelect,
        formattedTime,
        tableSelect
      )
    )
  }
  //星期一為公休，並清除selectedDate值
  const handleDateChange = (date) => {
    if (moment(date).day() === 1) {
      alert('很抱歉,星期一為公休日，都不對外開放預約。請選擇其他日期。')
      setSelectedDate(null)
      setCurrentStep(
        calculateCurrentStep(
          numberOfPeopleId,
          null,
          menuSelect,
          formattedTime,
          tableSelect
        )
      )
    } else {
      setSelectedDate(moment(date).format('YYYY-MM-DD'))
      setIsOpen(false) // 選擇日期後關閉日曆
      setCurrentStep(
        calculateCurrentStep(
          numberOfPeopleId,
          moment(date).format('YYYY-MM-DD'),
          menuSelect,
          formattedTime,
          tableSelect
        )
      )
    }
    console.log(selectedDate)
    console.log(typeof selectedDate)
  }
  // 點擊按鈕展開日曆
  const handleButtonClick = () => {
    setSelectedDate(null)
    setIsOpen(true)
    console.log(isOpen)
  }
  //更新選擇的用餐方式
  const handleMenuChange = (event) => {
    setMenuSelect(event.target.value)
    setCurrentStep(
      calculateCurrentStep(
        numberOfPeopleId,
        selectedDate,
        event.target.value,
        formattedTime,
        tableSelect
      )
    )
  }
  //更新輸入的備註
  const handleTextAreaInput = (event) => {
    setTextAreaInput(event.target.value)
    console.log(textAreaInput)
  }
  const onSubmit = (data) => {
    // 在這裡處理表單提交後的邏輯，例如提交到後端或者其他操作
    console.log(data)
  }
  //初始化表單
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    // 模擬數據加載時間
    const loadData = async () => {
      try {
        // 這裡可以加載需要的數據
        // 假設加載時間為2秒
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setLoading(false) // 加載完成，關閉loading動畫
      } catch (error) {
        console.error('加載數據時出錯', error)
        setLoading(false) // 加載出錯也關閉loading動畫
      }
    }

    loadData()
  }, [])
  useEffect(() => {
    setCurrentStep(
      calculateCurrentStep(
        numberOfPeopleId,
        selectedDate,
        menuSelect,
        selectedTime,
        tableSelect
      )
    )
  }, [numberOfPeopleId, selectedDate, menuSelect, selectedTime, tableSelect])
  //透過useEffect是否完成
  //透過useState更新輸入值
  useEffect(() => {
    // 檢查是否所有必填項目都已填寫
    if (
      numberOfPeopleId > 0 &&
      selectedDate &&
      menuSelect !== '請選擇用餐方式(必選)' &&
      selectedTime !== '請選擇時間(必選)' &&
      tableSelect > 0
    ) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [numberOfPeopleId, selectedDate, menuSelect, selectedTime, tableSelect])
  //送出按鈕被點擊時顯示毛玻璃與確認方塊
  const handleConfirmButtonClick = () => {
    setWhiteSquareVisible(true)
    setOverLayVisible(true)
    console.log(overLayVisible)
  }
  //上一頁按鈕被點擊時隱藏毛玻璃與確認方塊
  const handleReturnButtonClick = () => {
    setWhiteSquareVisible(false)
    setOverLayVisible(false)
    console.log(overLayVisible)
  }
  // //抓取memberId
  // const storedMemberId = localStorage.getItem('memberId')
  // // 如果需要，可以轉換成數字型態
  // const memberId = storedMemberId ? parseInt(storedMemberId, 10) : null

  const handleSubmitButtonClick = async () => {
    try {
      //給node.js的路由
      const response = await axios.post(
        'http://localhost:3001/reserve/reserveAdd',
        {
          storedMemberId,
          numberOfPeopleId,
          numberOfPeople,
          selectedDate,
          menuSelect,
          formattedTime,
          selectedTableType,
          textAreaInput,
        }
      )

      console.log(response.data)
      // 提交成功後的操作
      // 先隱藏白色正方形區塊1
      setWhiteSquareVisible(false)
      //顯示毛玻璃
      setOverLayVisible(true)
      //顯示白色正方形區塊2
      setWhiteSquareVisible2(true)
    } catch (error) {
      // console.log(typeof numberOfPeople)
      // console.log(typeof selectedDate)
      // console.log(typeof menuSelect)
      // console.log(typeof selectedTime)
      // console.log(typeof tableSelect)
      // console.log(typeof textAreaInput)
      console.error('提交表單時出錯!', error)
    }
  }

  return (
    <>
      <div className="container">
        {loading && (
          <Loader center content="我在努力中 > <" size="lg" backdrop />
        )}
        {!loading && (
          <>
            <div style={{ display: 'flex', marginBlock: '10px' }}>
              <div
                style={{
                  position: 'sticky',
                  top: '50%',
                  transform: 'translateY(35%)',
                }}
              >
                <Steps current={currentStep} vertical size="large">
                  <Steps.Item title="0%" description="五項未填寫" />
                  <Steps.Item title="20%" description="四項未填寫" />
                  <Steps.Item title="40%" description="三項未填寫" />
                  <Steps.Item title="60%" description="二項未填寫" />
                  <Steps.Item title="80%" description="一項未填寫" />
                  <Steps.Item title="100%" description="可以送出囉" />
                </Steps>
              </div>
              <main style={{ marginLeft: '5%' }}>
                <section className="">
                  <div className={`${styles.reservationPhoto}`}>
                    <img
                      src="/images/reserve/2.png"
                      className="img-fluid"
                      alt="..."
                    />
                  </div>
                </section>
                <div className={`${styles.numberouter}`}>
                  <div>
                    <i className="bi bi-person-fill">預約人數: </i>
                    <span id="peoplecount">{numberOfPeople}</span>
                  </div>
                </div>
                <div className={`${styles.numberdiv}`}>
                  {/* 更改為圓形 取消預設樣式 flex */}
                  {/* 透過map更新1~12的圈圈，點擊事件後更改狀態為avtive，再將number更新狀態後一併顯示在peoplecount欄位 */}
                  <ul className={`${styles.number}`}>
                    {numbers.map((number) => (
                      <li
                        key={number.id}
                        className={
                          numberOfPeopleId === number.id ? styles.active : ''
                        }
                        onClick={() => handleNumberClick(number)}
                        numberid={number.id}
                      >
                        {number.type}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* 加入上下border flex between */}
                <div className="d-flex justify-content-around border-bottom border-top mb-3">
                  <div className="p-2" id="selectedDate">
                    選擇的日期:{selectedDate}
                  </div>
                  <div className="p-2" id="selectedMethod">
                    選擇的用餐方式:{menuSelect}
                  </div>
                  <div className="p-2" id="selectedDate">
                    選擇的時間: {selectedTime}
                  </div>
                </div>
                <div className={`${styles.central}`}>
                  <div
                    className={`d-flex flex-column mb-3 ${styles.leftButton}`}
                  >
                    <button
                      type="button"
                      className={`btn btn-light p-3 mb-3 ${
                        selectedDate &&
                        moment(selectedDate).isSame(moment(), 'day')
                          ? styles.active
                          : ''
                      }`}
                      onClick={handleTodayClick}
                    >
                      今天
                    </button>
                    <button
                      type="button"
                      className={`btn btn-light p-3 mb-3 ${
                        selectedDate &&
                        moment(selectedDate).isSame(
                          moment().add(1, 'days'),
                          'day'
                        )
                          ? styles.active
                          : ''
                      }`}
                      onClick={handleTomorrowClick}
                    >
                      明天
                    </button>
                    <label htmlFor="reservationDateTime">選擇預約日期:</label>
                    <button
                      type="button"
                      className={`btn btn-light p-3 mb-3 DateTimebutton ${
                        isOpen ? styles.active : ''
                      }`}
                      onClick={handleButtonClick}
                    >
                      選擇預約日期：<i className="bi bi-calendar-date-fill"></i>
                    </button>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                      <label htmlFor="reservationDateTime" />
                      {isOpen && (
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="yyyy-MM-dd"
                          inline
                        />
                      )}
                    </form>
                  </div>
                  <div
                    className={`d-flex flex-column mb-3 mt-3 ${styles.rightSelect}`}
                  >
                    <div>
                      <form
                        method="post"
                        action=""
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <select
                          id="menuSelect"
                          name="menuSelect"
                          className={`form-select mt-4 mb-3 `}
                          aria-label="Default select example"
                          value={menuSelect}
                          onChange={handleMenuChange}
                          required
                        >
                          <option selected disabled>
                            請選擇用餐方式(必選)
                          </option>
                          <option value="現場單點">現場單點</option>
                          <option value="合菜料理">合菜料理</option>
                          <option value="無菜單料理">無菜單料理</option>
                        </select>
                        {errors.menuSelect && (
                          <p className="text-danger">請選擇用餐方式(必選)</p>
                        )}
                      </form>
                    </div>
                    {/* 上下箭頭排列為上跟下 */}
                    {/* <i className="bi bi-chevron-up"></i>
              <i className="bi bi-chevron-down"></i> */}
                    <div>
                      <form
                        method="post"
                        action="連線傳送資料.php"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <select
                          id="timeSelect"
                          name="timeSelect"
                          className={`form-select mb-3 mt-3`}
                          aria-label="Large select example"
                          //這裡偷偷使用可控表單 value綁定狀態+onChange事件
                          value={selectedTime}
                          onChange={handleTimeChange}
                          required
                        >
                          <option selected disabled>
                            請選擇時間(必選)
                          </option>
                          {/* 使用 .map() 方法生成選項 */}
                          {times.map((time, index) => (
                            <option key={index} value={time.value}>
                              {time.label}
                            </option>
                          ))}
                        </select>
                        {errors.menuSelect && (
                          <p className="text-danger">請選擇時間(必選)</p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
                <div className={`${styles.tablesouter}`}>
                  <div>
                    <i className="bi bi-house-door">桌型: </i>
                    <span id="numbercount">{selectedTableType}</span>
                  </div>
                </div>
                <div className={`${styles.tablesdiv}`}>
                  {/* 更改為圓形 取消預設樣式 flex */}
                  <ul className={styles.tablesChairs}>
                    {tables.map((table) => (
                      <li
                        key={table.id}
                        className={
                          tableSelect === table.id ? styles.active : ''
                        }
                        onClick={() => handleTableClick(table.id, table.type)}
                        tableid={table.id}
                      >
                        {table.type}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${styles.reservetextarea}`}>
                  <span>
                    <i className="bi bi-pencil-square">備註:</i>
                  </span>
                  <div className="form-floating py-2 ">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: '100px' }}
                      onChange={handleTextAreaInput}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">留下任何你想說的~</label>
                  </div>
                  {/* 加入按鈕外框線 */}
                  <div className={`${styles.confirmButtondiv}`}>
                    <button
                      type="submit"
                      id="confirmButton"
                      className="btn btn-warning shadow mb-3 mt-3 px-5"
                      onClick={handleConfirmButtonClick}
                      disabled={isButtonDisabled} // 根據狀態控制按鈕禁用
                      //以isButtonDisabled為基礎使用三元判斷式自動切換顏色
                      style={{
                        background: isButtonDisabled
                          ? 'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(231, 175, 47, 1))'
                          : 'yellow',
                        color: 'black',
                      }}
                    >
                      {/* 以isButtonDisabled為基礎使用三元判斷式自動切換文字內容 */}
                      {isButtonDisabled ? '尚未填寫完成' : '送出'}
                    </button>
                  </div>
                </div>
              </main>
              {/* 毛玻璃背景 */}
              {overLayVisible && (
                <div id="overlay" className={`${styles.overlay}`}></div>
              )}
              {/* 使用邏輯運算符號與whiteSquareVisible狀態來決定是否開啟確認方塊 */}
              {whiteSquareVisible && (
                <div id="whiteSquare" className={`${styles.square3}`}>
                  <h4 className="text-center mt-3">確認您的預約資訊</h4>
                  <div className="d-flex justify-content-between">
                    <div className="lh-lg mx-3">
                      桌型:
                      <br />
                      人數:
                      <br />
                      日期:
                      <br />
                      時間:
                      <br />
                      用餐方式:
                      <br />
                      備註:
                    </div>
                    <div className="lh-lg mx-3">
                      <span id="text1">{selectedTableType}</span>
                      <br />
                      <span id="text2">{numberOfPeople}</span>
                      <br />
                      <span id="text3">{selectedDate}</span>
                      <br />
                      <span id="text4">{selectedTime}</span>
                      <br />
                      <span id="text5">{menuSelect}</span>
                      <br />
                      <span id="text6">{textAreaInput}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column mb-3">
                    <button
                      type="submit"
                      id="submitButton"
                      className="btn btn-warning w-50 mx-auto my-2"
                      onClick={handleSubmitButtonClick}
                    >
                      確認送出
                    </button>
                    <button
                      type="button"
                      id="returnButton"
                      className="btn btn-light w-50 mx-auto  returnButton"
                      onClick={handleReturnButtonClick}
                    >
                      上一頁
                    </button>
                  </div>
                </div>
              )}
              {/* 白色正方形區塊2 */}
              {whiteSquareVisible2 && (
                <div id="whiteSquare2" className={`${styles.square3}`}>
                  <h4 className="text-center mt-3">預約成功</h4>
                  <div className="d-flex justify-content-between">
                    <div className="lh-lg mx-3">
                      桌型:
                      <br />
                      人數:
                      <br />
                      日期:
                      <br />
                      時間:
                      <br />
                      用餐方式:
                      <br />
                      備註:
                    </div>
                    <div className="lh-lg mx-3">
                      <span id="text7">{selectedTableType}</span>
                      <br />
                      <span id="text8">{numberOfPeople}</span>
                      <br />
                      <span id="text9">{selectedDate}</span>
                      <br />
                      <span id="text10">{selectedTime}</span>
                      <br />
                      <span id="text11">{menuSelect}</span>
                      <br />
                      <span id="text12">{textAreaInput}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column mb-3">
                    <button
                      type="button"
                      id="returnHomeButton"
                      className={`btn btn-warning w-50 mx-auto mt-3 ${styles.returnHomeButton}`}
                    >
                      <Link href="/ReservationGet">前往查詢預約</Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
