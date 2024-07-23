import React, { useState, useEffect } from 'react'
import styles from './messageboard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function MessageBoard() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({ value: '', content: '' })
  const [comments, setComments] = useState([])
  const [expandedComment, setExpandedComment] = useState(null)
  const maxZIndex = 1
  const maxHeight = 400
  const minHeight = 100

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const sendData = (e) => {
    e.preventDefault()

    const fd = new FormData()
    fd.append('value', rating)
    fd.append('content', formData.content)

    fetch('http://localhost:3005/api/message-board/add', {
      method: 'POST',
      body: fd,
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          alert('成功送出！')
          const newComment = {
            ...data.comment,
            position: generateRandomPosition(),
            zIndex: comments.length + 1,
            highlight: true,
          }
          setComments([newComment, ...comments])
          setFormData({ value: '', content: '' })
          setRating(0)
          getComments()
          // Remove highlight after animation
          setTimeout(() => {
            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment.c_id === newComment.c_id
                  ? { ...comment, highlight: false }
                  : comment
              )
            )
          }, 1000) // 動畫時間設為1秒
        } else {
          console.log('資料新增失敗')
        }
      })
      .catch((ex) => {
        console.log('fetch() 發生錯誤, 回傳的 JSON 格式是錯的')
        console.log(ex)
      })
  }

  const getComments = () => {
    fetch('http://localhost:3005/api/message-board/api')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const commentsWithPosition = data.comments.map((comment, index) => ({
            ...comment,
            position: generateRandomPosition(),
            zIndex: Math.min(maxZIndex, data.comments.length - index),
          }))
          setComments(commentsWithPosition)
        } else {
          console.log('獲取評論失敗')
        }
      })
      .catch((ex) => {
        console.log('fetch() 發生錯誤, 回傳的 JSON 格式是錯的')
        console.log(ex)
      })
  }

  const generateRandomPosition = () => {
    const top = Math.random() * (maxHeight - minHeight) + minHeight
    const left = Math.random() * (window.innerWidth - 50)
    return { top, left }
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index)
  }

  const handleDrop = (e) => {
    const index = e.dataTransfer.getData('text/plain')
    const newComments = [...comments]
    const top = e.clientY - 50
    const left = e.clientX - 100
    newComments[index].position = { top, left }
    setComments(newComments)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleExpandComment = (comment) => {
    setExpandedComment(comment)
  }

  const handleCloseComment = () => {
    setExpandedComment(null)
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <>
      <section
        className={`container-fluid py-5 ${styles.commentSection}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2 className="display-4 frontTitle2 mt-5">留言板</h2>
        <div
          className={`row gx-4 gx-lg-5 m-3 justify-content-center ${styles.messageBoard} flex-column align-items-center`}
        >
          <div className="col-lg-8 col-xl-7 text-center mb-3">
            <h2>寫下你想說的話吧~</h2>
          </div>
          <div className="col-lg-8 col-xl-7 text-center mb-3">
            <form id="message" onSubmit={sendData}>
              <h4>評分:</h4>
              <div className={styles.score}>
                {[1, 2, 3, 4, 5].map((score) => (
                  <React.Fragment key={score}>
                    <input
                      type="radio"
                      name="value"
                      id={`score${score}`}
                      value={score}
                      onChange={handleRatingChange}
                      className={styles.radioInput}
                    />
                    <label
                      className={styles.star}
                      htmlFor={`score${score}`}
                      onMouseEnter={() => setHoverRating(score)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{
                          color:
                            hoverRating >= score || rating >= score
                              ? '#FFD43B'
                              : '#dcdcdc',
                        }}
                        height={30}
                      />
                    </label>
                  </React.Fragment>
                ))}
              </div>
              <div className="mb-3">
                <h4 className="form-label" htmlFor="textContent">
                  輸入內容:
                </h4>
                <textarea
                  className="form-control"
                  id="textContent"
                  name="content"
                  rows="5"
                  value={formData.content}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button className="btn btn-light" type="submit">
                送出
              </button>
            </form>
          </div>
        </div>
        {comments.map((comment, index) => (
          <div
            className={`${styles.comments} ${
              comment.highlight ? styles.highlight : ''
            }`}
            key={comment.c_id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            style={{
              top: comment.position.top,
              left: comment.position.left,
              zIndex: comment.zIndex,
            }}
            onClick={() => handleExpandComment(comment)}
          >
            <div className="text-light text-center fs-5">
              很棒!您是第{comment.c_id}個留言的人!
            </div>
            <label className="text-light">評分:</label>
            <div className={`${styles.commentStar} text-center`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={i}
                  style={{ color: i <= comment.value ? '#FFD43B' : '#dcdcdc' }}
                  height={30}
                />
              ))}
            </div>
            <label className="text-light">內容:</label>
            <div className={styles.commentContent}>{comment.content}</div>
            <div className="text-light">留言時間: {comment.created_at}</div>
          </div>
        ))}

        {expandedComment && (
          <div className={styles.expandedComment}>
            <button className={styles.closeButton} onClick={handleCloseComment}>
              <FontAwesomeIcon icon={faCircleXmark} height={30} />
            </button>
            <div className="text-light text-center fs-5 mt-2">
              很棒!您是第{expandedComment.c_id}個留言的人!
            </div>
            <label className="text-light">評分:</label>
            <div className={`${styles.commentStar} text-center`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={i}
                  style={{
                    color: i <= expandedComment.value ? '#FFD43B' : '#dcdcdc',
                  }}
                  height={30}
                />
              ))}
            </div>
            <label className="text-light">內容:</label>
            <div className={styles.commentContent}>
              {expandedComment.content}
            </div>
            <div className="text-light">
              留言時間: {expandedComment.created_at}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
