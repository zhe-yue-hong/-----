import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'

export default function NewsList() {
  const [articles, setArticles] = useState([]) // 存儲所有文章數據的狀態
  const [currentPage, setCurrentPage] = useState(1) // 當前頁面的狀態
  const [selectedKeywords, setSelectedKeywords] = useState([]) // 選中的關鍵字的狀態
  const [sortOrder, setSortOrder] = useState('desc') // 排序順序的狀態
  const [filteredArticles, setFilteredArticles] = useState([]) // 過濾後文章數據的狀態
  const articlesPerPage = 5 // 每頁顯示的文章數量

  // 關鍵字數據
  const keywords = [
    { id: 2, name: '新菜消息' },
    { id: 3, name: '節慶活動' },
    { id: 4, name: '公休時間' },
    { id: 5, name: '貓咪認養' },
  ]

  // 從API獲取文章數據
  const getArticles = (order) => {
    // 根據排序順序選擇API端點
    const apiEndpoint = order === 'desc' ? 'api' : 'api/sortedAsc'
    fetch(`http://localhost:3005/api/articles/${apiEndpoint}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('獲取的文章：', data.rows) // 調試信息
          setArticles(data.rows || []) // 更新文章數據狀態
          setFilteredArticles(data.rows || []) // 初始化過濾後的文章數據
        } else {
          console.log('獲取文章失敗')
        }
      })
      .catch((error) => {
        console.log('fetch() 發生錯誤，返回的 JSON 格式錯誤')
        console.log(error)
        setArticles([]) // 確保在發生錯誤時也設置 articles 為空數組
      })
  }

  // 初次加載和排序順序改變時重新獲取文章數據
  useEffect(() => {
    getArticles(sortOrder)
  }, [sortOrder])

  // 處理關鍵字選擇變化
  const handleKeywordChange = (event) => {
    const { value, checked } = event.target
    const updatedKeywords = checked
      ? [...selectedKeywords, value]
      : selectedKeywords.filter((keyword) => keyword !== value)
    setSelectedKeywords(updatedKeywords)
  }

  const checkKeyword = (e, id) => {
    e.stopPropagation()
    const isSelected = selectedKeywords.includes(id.toString())
    if (isSelected) {
      setSelectedKeywords(
        selectedKeywords.filter((keywordId) => keywordId !== id.toString())
      )
    } else {
      setSelectedKeywords([...selectedKeywords, id.toString()])
    }
  }

  // 處理排序順序選擇變化
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value)
  }

  // 過濾並排序文章數據
  const getFilteredAndSortedArticles = useCallback(
    (order, keywords) => {
      let filteredArticles = articles

      // 根據選中的關鍵字過濾文章
      if (keywords.length > 0) {
        filteredArticles = articles.filter((article) =>
          keywords.includes(article.key_word_id.toString())
        )
      }

      // 根據日期排序文章
      return filteredArticles.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        if (order === 'asc') {
          return dateA - dateB
        } else {
          return dateB - dateA
        }
      })
    },
    [articles]
  )

  // 更新過濾後的文章數據
  useEffect(() => {
    const filtered = getFilteredAndSortedArticles(sortOrder, selectedKeywords)
    setFilteredArticles(filtered)
  }, [articles, selectedKeywords, sortOrder, getFilteredAndSortedArticles])

  // 文章內容動畫效果
  useEffect(() => {
    const contents = document.querySelectorAll('.content')
    contents.forEach((content, index) => {
      setTimeout(() => {
        content.classList.add('show')
      }, index * 300) // 每個元素延遲 300ms
    })
  }, [filteredArticles, currentPage])

  // 截斷文章內容
  const truncateContent = (content, maxLength = 30) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...'
    }
    return content
  }

  // 滾動到頁面頂部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 處理頁面點擊
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
    scrollToTop() // 切換頁面時回到頂部
  }

  // 重置選項
  const handleReset = () => {
    setSelectedKeywords([])
    setSortOrder('desc')
    getArticles('desc')
  }

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const displayedCurrentPageArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  const goBack = () => {
    window.history.back()
  }

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      checkKeyword(e, id)
    }
  }

  return (
    <>
      <div className="newsListPage position-relative">
        <div className="container-fluid d-flex justify-content-center">
          <button className="btn back-btn" onClick={goBack}>
            回上頁
          </button>
          <div className="text-center keyword-title">
            <div className="col-4 newsTitlePic d-flex justify-content-center align-items-center">
              <div className="newsNavbarPicOverlay d-flex justify-content-center align-items-center">
                <h1 className="text-light display-4">所有文章</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-center align-items-center ">
          <div className="d-flex justify-content-between align-items-center text-center hashtag text-nowrap mb-3">
            <button
              className="btn btn-secondary resetBtn "
              onClick={handleReset}
            >
              重置
            </button>
            {keywords.map((keyword) => (
              <div
                key={keyword.id}
                className=" fs-4 keyword d-flex justify-content-center align-items-center "
                onClick={(e) => checkKeyword(e, keyword.id)}
                onKeyPress={(e) => handleKeyPress(e, keyword.id)}
              >
                <input
                  type="checkbox"
                  value={keyword.id}
                  onChange={handleKeywordChange}
                  checked={selectedKeywords.includes(keyword.id.toString())}
                  className="custom-checkbox"
                />
                <label
                  htmlFor={`checkbox-${keyword.id}`}
                  className="custom-label"
                >
                  {keyword.name}
                </label>
              </div>
            ))}
            <div className="d-flex justify-content-center align-items-center lxgw-wenkai-mono-tc-regular">
              <div className="fs-5">日期:</div>
              <div>
                <select
                  onChange={handleSortOrderChange}
                  value={sortOrder}
                  className="form-select fs-5"
                >
                  <option value="asc">從舊到新</option>
                  <option value="desc">從新到舊</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <ul className="list-unstyled newsMaintain" id="news-list">
            {displayedCurrentPageArticles.length > 0 ? (
              displayedCurrentPageArticles.map((article) => (
                <li key={article.a_id}>
                  <div className="content fade-in">
                    <div className="w-25 my-2 text-secondary">
                      {article.date}
                    </div>
                    <div className="w-50 fw-bolder my-2">{article.title}</div>
                    <div className="d-flex justify-content-between position-relative">
                      <div className="inside-content w-75 py-4">
                        {truncateContent(article.content)}
                      </div>
                      <div className="position-absolute end-0">
                        <Link href={`/mudanlow/news/${article.a_id}`}>
                          <FontAwesomeIcon icon={faChevronRight} height={30} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>無文章可顯示</li>
            )}
          </ul>
        </div>
        <div>
          <ul className="pagination" id="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="../../pics/background-pic1 (1).png"
          className="pic1 position-absolute"
          width={500}
          height={500}
          alt=""
        />
        <div>
          <button id="scrollToTopBtn" onClick={scrollToTop}>
            回到頂部
          </button>
        </div>
      </div>
      <style jsx>{`
        .resetBtn {
          background-color: #465952;
          font-family: 'LXGW WenKai Mono TC', monospace;
          font-size: 20px;
        }
        .resetBtn:hover {
          background-color: gray;
        }
        .newsListPage {
          background-image: url('/pics/background2.png');
          background-repeat: no-repeat;
          background-size: cover;
          height: 100%;
        }

        .SlideMediaBox {
          background-color: cornflowerblue;
          text-align: center;
        }

        .back-btn {
          background-color: #465952;
          color: white;
          top: 80px;
          left: 80px;
          position: absolute;
        }

        .hashtag {
          width: 1000px;
          background-color: #fff;
          padding: 5px 20px;
          border-radius: 10px;
          box-shadow: 3px 3px 7px gray;
        }

        .content {
          width: 100%;
          height: 150px;
          border-bottom: 2px solid black;
          margin-bottom: 20px;
          margin-top: 20px;
          padding-left: 5px;
          border-radius: 10px 10px 0 0;
          transition: transform 0.3s ease;
        }

        .content:hover {
          box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
          transform: scale(1.05);
        }

        @media (max-width: 800px) {
          .content {
            width: 450px;
          }

          .back-btn {
            top: 100px;
            left: 20px;
          }
        }

        a {
          color: inherit;
          text-decoration: inherit;
          cursor: inherit;
          cursor: pointer;
        }

        .pagination {
          display: flex;
          justify-content: center;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .pagination li {
          margin: 0 5px;
        }

        .pagination li a {
          display: block;
          padding: 5px 10px;
          text-decoration: none;
          border: 1px solid #ccc;
          border-radius: 3px;
          color: black;
          background-color: #fff;
        }

        .page-link:hover {
          background-color: #465952;
          color: #fff;
        }

        .page-item.active .page-link {
          background-color: #465952;
          border-color: #458068;
          color: #fff;
        }

        .page-link {
          color: #458068;
        }

        #scrollToTopBtn {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #fefef6;
          color: #366e53;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          opacity: 0.5;
        }

        .keyword {
          cursor: pointer;
          text-shadow: 1px 1px gray;
          font-weight: 900;
          font-family: 'LXGW WenKai Mono TC', monospace;
        }

        .keyword-title {
          margin-top: 80px;
        }

        .fade-in {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in.show {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 540px) {
          .content {
            width: 100%;
            font-size: 16px;
            text-wrap: nowrap;
          }

          .hashtag {
            flex-direction: column;
            margin: 0;
          }

          .hashtag .keyword {
            width: auto;
            flex: 1;
          }
        }

        @media (min-width: 541px) and (max-width: 720px) {
          .content {
            width: 500px;
            font-size: 18px;
          }
        }

        @media (min-width: 721px) and (max-width: 960px) {
          .content {
            width: 700px;
            font-size: 18px;
          }
        }

        @media (min-width: 961px) and (max-width: 1140px) {
          .content {
            width: 100%;
            font-size: 18px;
          }
        }

        /*最新消息new-list(非首頁)列表顏色設置*/
        .newsMaintain {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 3px 3px 7px gray;
          padding-left: 15px;
          padding-right: 15px;
          width: 1000px;
          z-index: 2;
        }
        .custom-checkbox {
          display: none;
        }

        .custom-checkbox + label {
          position: relative;
          padding-left: 25px;
          cursor: pointer;
          font-size: 1.25em;
        }

        .custom-checkbox + label:before {
          content: '';
          position: absolute;
          left: 0;
          top: 18px;
          width: 25px;
          height: 25px;
          border: 2px solid #ccc;
          border-radius: 3px;
          background: white;
        }

        .custom-checkbox:checked + label:before {
          background: #465952;
          border-color: #007bff;
        }

        .newsTitlePic {
          width: 1000px;
          height: 200px;
          background-image: url(/images/mudanlowWebp/DSC00594.webp);
          background-position: 90% 35%;
          background-repeat: no-repeat;
          margin-bottom: 20px;
        }
        .newsNavbarPicOverlay {
          width: 100%;
          height: 100%;
          background: #31313186;
          z-index: 2;
        }
      `}</style>
    </>
  )
}
