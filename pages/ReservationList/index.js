import React, { useState, useEffect } from 'react'
import styles from './ReservationList.module.css'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import Footer from '@/components/layout/mudanlow-layout/footer'
import axios from 'axios'

export default function ReservationList() {
  const [reservationList, setReservationList] = useState([])
  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/reservations')
        setReservationList(response.data)
        console.log(reservationList)
        console.log(typeof reservationList)
      } catch (error) {
        console.error('Error fetching reservation data:', error)
      }
    }
    fetchReservationData()
  }, [])
  return (
    <>
      <div className="container">
        <h2>預約列表</h2>
        {reservationList && reservationList.length === 0 ? (
          <p>沒有預約資料</p>
        ) : (
          reservationList.map((reservation) => (
            <div
              key={reservation.id}
              className={`${styles.square3} mx-2 mt-5 col-4`}
            >
              <h4 className="text-center mt-3">
                確認您的預約資訊 {reservation.id}
              </h4>
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
                  <span>{reservation.selectedTableType}</span>
                  <br />
                  <span>{reservation.numberOfPeople}</span>
                  <br />
                  <span>{reservation.selectedDate}</span>
                  <br />
                  <span>{reservation.selectedTime}</span>
                  <br />
                  <span>{reservation.menuSelect}</span>
                  <br />
                  <span>{reservation.textAreaInput}</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div id="overlay" className={`${styles.overlay}`}></div>
                <div
                  id={`whiteSquare${reservation.id}_confirm`}
                  className={`${styles.whiteSquare}`}
                  style={{ display: 'none' }}
                >
                  <h4 className="text-center mt-3">確認您要取消的預約資訊</h4>
                  <div className="d-flex justify-content-between">
                    <div className="lh-lg mx-3">
                      會員姓名:
                      <br />
                      電話:
                      <br />
                      桌型:
                      <br />
                      人數:
                      <br />
                      日期:
                      <br />
                      時間:
                      <br />
                      用餐方式:
                    </div>
                    <div className="lh-lg mx-3">
                      <span>{reservation.selectedTableType}</span>
                      <br />
                      <span>{reservation.numberOfPeople}</span>
                      <br />
                      <span>{reservation.selectedDate}</span>
                      <br />
                      <span>{reservation.selectedTime}</span>
                      <br />
                      <span>{reservation.menuSelect}</span>
                      <br />
                      <span>{reservation.textAreaInput}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <button
                      type="button"
                      id={`confirmCancel${reservation.id}`}
                      className="btn btn-secondary w-50 mx-2"
                    >
                      確認取消
                    </button>
                    <button
                      type="button"
                      id={`cancelCancel${reservation.id}`}
                      className="btn btn-danger w-50 mx-2"
                    >
                      取消
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  id={`hideButton${reservation.id}`}
                  className="btn btn-primary hideButton w-75 mx-auto mx-2"
                  // onClick={() => showConfirmCancel(reservation.id)}
                >
                  取消預約
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
