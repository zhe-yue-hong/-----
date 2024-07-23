import React, { useState, useEffect } from 'react'
import {
  Table,
  Loader,
  Button,
  Steps,
  Heading,
  IconButton,
  Panel,
} from 'rsuite'
import 'rsuite/dist/rsuite.min.css'

import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine'
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './ReservationGet.module.css'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import Footer from '@/components/layout/mudanlow-layout/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import ReservationEdit from '../ReservationEdit'
import ReservationPay from '../ReservationPay'
import toast, { Toaster } from 'react-hot-toast'

const { Column, HeaderCell, Cell } = Table

export default function ReserveGet() {
  const [reservations, setReservations] = useState([])
  const [selectedReservationId, setSelectedReservationId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [expandedRowKeys, setExpandedRowKeys] = useState([])
  const [memberId, setMemberId] = useState('')
  // const [balance, setBalance] = useState(0)

  useEffect(() => {
    // 在客戶端獲取localStorage
    const memberId = localStorage.getItem('memberId')
    if (memberId) {
      setMemberId(memberId)
    }
  }, []) // 只在組件mount時執行一次
  useEffect(() => {
    fetchReservations()
  }, [memberId])

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/reserve/reservations/${memberId}`
      )
      const reservationsWithSteps = response.data.map((reservation) => ({
        ...reservation,
        currentStep: reservation.status, // 使用從後端獲取的status來設定currentStep
      }))
      setReservations(reservationsWithSteps)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching reservations:', error)
      setLoading(false)
    }
  }

  // const fetchBalance = async () => {
  //   try {
  //     if (!memberId) return // Exit early if memberId is not available
  //     const response = await axios.get(
  //       `http://localhost:3001/reserve/SaveMoneySystem/balance/${memberId}`
  //     )
  //     setBalance(response.data.balance)
  //   } catch (error) {
  //     console.error('Error fetching balance:', error)
  //   }
  // }

  const deleteReservation = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/reserve/reservationDelete/${id}`
      )
      if (response.data) {
        // console.log(123)
        // setReservations(response.data)
        //測試過程中發現刪除主要有2問題
        //1.刪除後畫面沒反應 重整後才會更新 最後使用setReservations(response.data)解決這樣她會帶入新的資料來渲染
        //2.刪除後step全部回歸1 但我已經將step變成資料表儲存不該有這樣狀況 檢查後發現重整一樣會恢復 最後使用fetchReservations()達成刪除後重新搜尋
        //3.最後我發現setReservations(response.data)可以扔掉了 因為他跟fetchReservations()同概念 但是fetchReservations()會將最新狀態帶回來 而不是針對資料filter而已
        fetchReservations()
        toast.success('刪除成功')
      } else {
        console.error('Error: Did not receive expected response data.')
        toast.error('刪除失敗!!')
      }
    } catch (error) {
      console.error('Error deleting reservation:', error)
    }
  }

  const handleEditClick = (id) => {
    setSelectedReservationId(id)
  }

  const handlePayClick = (reservation) => {
    setSelectedReservation(reservation)
    setDrawerOpen(true)
    console.log(reservation.id)
  }

  const handleStepChange = (id, newStep) => {
    updateReservationStep(id, newStep)
    setExpandedRowKeys((prevExpandedRowKeys) =>
      prevExpandedRowKeys.includes(id)
        ? prevExpandedRowKeys
        : [...prevExpandedRowKeys, id]
    )
  }

  const updateReservationStep = async (id, step) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === id
        ? { ...reservation, currentStep: step }
        : reservation
    )
    setReservations(updatedReservations)
    try {
      await axios.put(`http://localhost:3001/reserve/updateStatus/${id}`, {
        status: step,
      })
    } catch (error) {
      console.error('Error updating reservation status:', error)
    }
  }

  const ExpandCell = ({ rowData, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props} style={{ padding: 5 }}>
      <IconButton
        appearance="subtle"
        onClick={() => {
          onChange(rowData)
        }}
        icon={
          expandedRowKeys.includes(rowData.id) ? (
            <ArrowUpLineIcon />
          ) : (
            <ArrowDownLineIcon />
          )
        }
      />
    </Cell>
  )

  const renderRowExpanded = (rowData) => {
    return (
      <Panel className={`${styles.renderRowPanel}`}>
        <Steps
          current={rowData.currentStep}
          style={{
            marginBottom: '20px',
            maxWidth: '1024px',
            minWidth: '1024px',
          }}
        >
          <Steps.Item title="已完成預約" />
          <Steps.Item title="尚未支付訂金" />
          <Steps.Item title="已完成結帳" />
        </Steps>
      </Panel>
    )
  }

  const handleExpand = (rowData) => {
    const nextExpandedRowKeys = expandedRowKeys.includes(rowData.id)
      ? expandedRowKeys.filter((key) => key !== rowData.id)
      : [...expandedRowKeys, rowData.id]
    setExpandedRowKeys(nextExpandedRowKeys)
  }

  return (
    <div>
      {loading && <Loader center content="我在努力中 > <" size="lg" backdrop />}
      {!loading && selectedReservationId === null && (
        <>
          <div className={`${styles.getTableList}`}>
            <Heading level={3} style={{ marginBlock: '15px' }}>
              尚未完成的預約
            </Heading>
            <Table
              height={550}
              width={1280}
              data={reservations}
              rowKey="id"
              expandedRowKeys={expandedRowKeys}
              onRowClick={(rowData) => handleExpand(rowData)}
              renderRowExpanded={renderRowExpanded}
            >
              <Column width={60} align="center" fixed>
                <HeaderCell>
                  <ArrowDownLineIcon />
                </HeaderCell>
                <ExpandCell
                  dataKey="id"
                  expandedRowKeys={expandedRowKeys}
                  onChange={handleExpand}
                />
              </Column>
              <Column width={80}>
                <HeaderCell>會員ID</HeaderCell>
                <Cell dataKey="member_id" />
              </Column>
              <Column width={80}>
                <HeaderCell>姓名</HeaderCell>
                <Cell dataKey="member_name" />
              </Column>
              <Column width={120}>
                <HeaderCell>手機</HeaderCell>
                <Cell dataKey="mobile" />
              </Column>
              <Column width={80}>
                <HeaderCell>人數</HeaderCell>
                <Cell dataKey="numberOfPeople" />
              </Column>
              <Column width={150}>
                <HeaderCell>用餐方式</HeaderCell>
                <Cell dataKey="menuSelect" />
              </Column>
              <Column width={150}>
                <HeaderCell>日期</HeaderCell>
                <Cell dataKey="selectedDate" />
              </Column>
              <Column width={100}>
                <HeaderCell>時間</HeaderCell>
                <Cell dataKey="selectedTime" />
              </Column>
              <Column width={150}>
                <HeaderCell>桌型</HeaderCell>
                <Cell dataKey="selectedTableType" />
              </Column>
              <Column width={150}>
                <HeaderCell>您的備註</HeaderCell>
                <Cell dataKey="textAreaInput" />
              </Column>
              <Column width={120} fixed="right">
                <HeaderCell>修改</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      height={20}
                      className={styles.faPenToSquare}
                      onClick={() => handleEditClick(rowData.id)}
                    />
                  )}
                </Cell>
              </Column>
              <Column width={120} fixed="right">
                <HeaderCell>刪除</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <FontAwesomeIcon
                      icon={faTrash}
                      height={20}
                      className={styles.faTrash}
                      onClick={() => deleteReservation(rowData.id)}
                    />
                  )}
                </Cell>
              </Column>
              <Column width={120} fixed="right">
                <HeaderCell>目前狀態</HeaderCell>
                <Cell style={{ padding: '0px' }}>
                  {(rowData) => (
                    <Button
                      className={`${styles.PayButton}`}
                      color={rowData.currentStep === 3 ? 'red' : 'green'}
                      appearance="primary"
                      size="sm"
                      onClick={() =>
                        rowData.currentStep !== 3 && handlePayClick(rowData)
                      }
                      disabled={rowData.currentStep === 2}
                    >
                      {rowData.currentStep === 3 ? '已結帳' : '前往結帳'}
                    </Button>
                  )}
                </Cell>
              </Column>
            </Table>
            <Toaster />
          </div>
        </>
      )}
      {selectedReservationId !== null && (
        <ReservationEdit
          id={selectedReservationId}
          setSelectedReservationId={setSelectedReservationId}
          //傳遞函式給ReservationEdit元件
          fetchReservations={fetchReservations}
        />
      )}
      {drawerOpen && (
        <ReservationPay
          open={drawerOpen}
          setOpen={setDrawerOpen}
          reservation={selectedReservation}
          memberId={memberId}
          // balance={balance}
          onStepChange={handleStepChange}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  )
}
