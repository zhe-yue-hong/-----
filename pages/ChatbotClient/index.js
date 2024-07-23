import React, { useEffect, useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import io from 'socket.io-client'
import styles from './ChatbotClient.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const socket = io.connect('http://localhost:3002')

function ChatbotClient() {
  const [room] = useState('room2') // 固定進入room2
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [memberId, setMemberId] = useState(0)
  const [isMerchant, setIsMerchant] = useState(false)
  const [typing, setTyping] = useState(false)
  // const [isOnline, setIsOnline] = useState(false);

  //設定對方輸入中的動畫持續時間
  const typingAnimation = useSpring({
    opacity: typing ? 1 : 0,
    config: { duration: 2000 },
    reset: true,
  })

  // 每次 messages 更新後，滾動到底部
  //這是錯了n次才想到的好方法 即使我在每次事件中都添加scrollToBottom() 他也不一樣會置底 這很惱人
  //通過messages每次更新都置底才是最保險的
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 創建一個 ref 來引用底部空的 div 元素
  const messagesEndRef = useRef(null)

  // 每次 messages 更新後，滾動到底部
  //我有在最下方預留空白div這樣就不會讓訊息貼著聊天是有夠難看
  //為了不讓她瞬間移動還特地查了behavior: 'smooth'的這個方法 他會滑滑的
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  //幸好預約功能做得很完善 這個一鍵查詢有夠懶
  //找時間來做email通知 或官網內部的訊息通知
  const fetchRecentReservation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/reserve/reservationsOrder/${memberId}`
      )
      if (!response.ok) {
        throw new Error('查詢預約資訊失敗')
      }
      const data = await response.json()

      // 格式化預約資訊為條列式
      const reservationMessage = `
        <ul>
          <li>預約日期：${data.selectedDate}</li>
          <li>預約時間：${data.selectedTime}</li>
          <li>預約人數：${data.numberOfPeople}</li>
          <li>選擇菜單：${data.menuSelect}</li>
          <li>桌型選擇：${data.selectedTableType}</li>
        </ul>
      `

      // 根據 memberId 設定 sender
      const sender = memberId === 1 ? 1 : 2

      // 更新聊天室訊息的顯示區域，設定 sender 為 memberId
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: reservationMessage, sender: sender, type: 'system' },
      ])

      // 每次 messages 更新後，滾動到底部
      scrollToBottom()
    } catch (error) {
      console.error('錯誤查詢最近預約的原因:', error)
      // 處理錯誤，例如顯示錯誤訊息給使用者
    }
  }

  useEffect(() => {
    const loadHistoryMessages = async () => {
      try {
        const response = await fetch('http://localhost:3001/history')
        if (response.ok) {
          const history = await response.json()
          setMessages(history)
          // 每次 messages 更新後，滾動到底部
          // scrollToBottom()
        } else {
          throw new Error('Failed to load message history')
        }
      } catch (error) {
        console.error('Failed to load message history:', error)
      }
    }

    loadHistoryMessages()

    const storedMemberId = localStorage.getItem('memberId')
    if (storedMemberId) {
      setMemberId(parseInt(storedMemberId))
      setIsMerchant(parseInt(storedMemberId) === 1)
    }

    socket.on('newMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data])
      setTyping(false) // 收到新訊息時關閉動畫
      // 每次 messages 更新後，滾動到底部
      // scrollToBottom()
    })

    socket.on('typing', (data) => {
      if (data.sender !== memberId) {
        setTyping(true)
        setTimeout(() => setTyping(false), 4000)
        // 每次 messages 更新後，滾動到底部
        // scrollToBottom()
      }
    })

    return () => {
      socket.off('newMessage')
      socket.off('typing')
    }
  }, [memberId])

  // 儲存訊息到localStorage
  //訊息會在對方離線後先保存 在他上線時發送 就不怕她收不到貨是發我洗澡卡

  // const saveMessageLocally = (messageData) => {
  //   const offlineMessages =
  //     JSON.parse(localStorage.getItem('offlineMessages')) || []
  //   offlineMessages.push(messageData)
  //   localStorage.setItem('offlineMessages', JSON.stringify(offlineMessages))
  // }

  const sendMessage = () => {
    if (message.trim() !== '') {
      const messageData = {
        message,
        room,
        sender: memberId,
        isMerchant,
      }
      // // 如果對方離線，儲存訊息到本地
      // if (!isOnline) {
      //   saveMessageLocally(messageData)
      //   // 可以顯示提示訊息，告知用戶訊息將在對方上線後發送
      //   // 例如：showOfflineMessageNotification();
      // } else {
      //   // 否則，直接發送到 socket
      //   socket.emit('sendMessage', messageData)
      // }
      socket.emit('sendMessage', messageData)
      setMessage('')
      // 滾動到底部等操作...
    }
  }
  // 監聽查看對方是不是在線上，並更新 isOnline 狀態
  // socket.on('onlineStatus', (status) => {
  //   setIsOnline(status)
  //   if (status && localStorage.getItem('offlineMessages')) {
  //     const offlineMessages = JSON.parse(
  //       localStorage.getItem('offlineMessages')
  //     )
  //     offlineMessages.forEach((msg) => {
  //       socket.emit('sendMessage', msg)
  //     })
  //     localStorage.removeItem('offlineMessages')
  //   }
  // })

  const handleTyping = () => {
    socket.emit('typing', { room, sender: memberId })
    scrollToBottom()
  }

  return (
    <div className={styles.outerLayer}>
      <div className={styles.onlineContainer}>
        <div className={styles.userName}>
          <img
            src="/images/chatbot/avatar-a.jpg"
            alt="Avatar"
            className={styles.avatar}
          />
          <h5 className={styles.headerAvatar}>牡丹樓客服中心</h5>
        </div>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.chatUserName}>
          <div className={styles.chatUserName1}>
            <FontAwesomeIcon
              icon={faAngleRight}
              height={30}
              className={`${styles.faAngleRight}`}
            />
            <img
              src={
                memberId !== 1
                  ? '/images/chatbot/avatar-a.jpg'
                  : '/images/chatbot/avatar-b.jpg'
              }
              alt="Avatar"
              className={styles.avatar2}
            />
            <h6>{`${memberId !== 1 ? '牡丹樓客服中心' : '岳泓'}`}</h6>
          </div>
          <div>
            <button
              onClick={() => fetchRecentReservation()}
              className={`${styles.reservationsOrder}`}
            >
              查詢最近預約
            </button>
          </div>
        </div>
        <div className={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageRow} ${
                msg.sender === memberId
                  ? styles.messageRight
                  : styles.messageLeft
              }`}
            >
              <img
                src={
                  msg.sender === 1
                    ? '/images/chatbot/avatar-a.jpg'
                    : '/images/chatbot/avatar-b.jpg'
                }
                alt="Avatar"
                className={styles.avatar}
              />
              <div
                className={`${styles.message} ${
                  msg.sender === 1 ? styles.messageUser : styles.messageMerchant
                } ${msg.type === 'system' ? styles.system : ''}`}
                //單純使用${msg.type === 'system' ? styles.system : ''}`}無法套用系統訊息樣式所以使用style內聯樣式覆蓋
                style={
                  msg.type === 'system'
                    ? {
                        backgroundColor: '#f9f9f9',
                        color: 'black',
                        border: '3px rgba(176, 198, 233, 1) solid',
                      }
                    : {}
                }
                dangerouslySetInnerHTML={{ __html: msg.message }}
              ></div>
            </div>
          ))}
          {typing && (
            <animated.div style={typingAnimation}>
              對方正在輸入中...
            </animated.div>
          )}
          {/* 底部空 div，用來滾動到最下方 */}
          <div ref={messagesEndRef} className={`${styles.messagesEndRef}`} />
        </div>
        <div className={styles.messageInputContainer}>
          <input
            type="text"
            placeholder="輸入訊息..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value)
              handleTyping()
            }}
            //按下enter鍵就傳送
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                sendMessage()
              }
            }}
            className={styles.messageInput}
          />
          <button onClick={sendMessage} className={styles.sendMessageButton}>
            傳送
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatbotClient
