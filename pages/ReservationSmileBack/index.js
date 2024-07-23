import React, { useState } from 'react'
import { Rate, Panel, Input, IconButton } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import SendIcon from '@rsuite/icons/Send'
import axios from 'axios'

import styles from './ReservationSmileBack.module.css' // 假設這裡是你的 CSS 樣式文件

export default function ReservationSmileBack() {
  const [formData, setFormData] = useState({})

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value })
  }
  const handleTextareaChange = (value) => {
    setFormData({ ...formData, textarea: value })
  }
  const handleSubmit = async (e) => {
    // 在這裡處理送出 formData 的邏輯
    e.preventdefault
    console.log('Form Data:', formData)
    try {
      //給node.js的路由
      const response = await axios.post(
        'http://localhost:3001/reserve/ReservationSmileBack',
        formData
      )
      // 處理成功傳送後的邏輯，例如清空表單或顯示成功訊息
      console.log('回饋表單傳送成功:', response.data)
      // 清空表單狀態
      setFormData({
        rating: 0,
        textarea: '',
      })
    } catch (error) {
      console.error('提交表單時出錯!', error)
    }
  }
  return (
    <Panel bordered className="feedback-panel">
      <h3>請對您的預約進行評價</h3>
      <div>
        <div style={{ marginRight: '10px' }}>
          <Rate defaultValue={2.5} allowHalf onChange={handleRatingChange} />
          <Input
            as="textarea"
            rows={3}
            placeholder="留下您的珍貴回饋"
            style={{ marginTop: '10px' }}
            value={formData.textarea}
            onChange={handleTextareaChange}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <div className={`${styles.ratingValue}`}>
          您的評價: {formData.rating} 星
        </div>
        <div>
          <IconButton
            icon={<SendIcon />}
            style={{ marginRight: '5px' }}
            onClick={handleSubmit}
          />
          送出
        </div>
      </div>
    </Panel>
  )
}
