import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function News() {
  const [articles, setArticles] = useState([])

  const getArticles = () => {
    fetch('http://localhost:3005/api/articles/api')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data)
        if (data.success) {
          console.log('Fetched articles:', data.rows)
          setArticles(data.rows || [])
        } else {
          console.log('獲取評論失敗')
        }
      })
      .catch((error) => {
        console.log('fetch() 發生錯誤, 回傳的 JSON 格式是錯的')
        console.log(error)
        setArticles([]) // 確保在發生錯誤時也設置 articles 為空陣列
      })
  }

  useEffect(() => {
    getArticles()
  }, [])

  useEffect(() => {
    console.log('Articles state:', articles)
    const contents = document.querySelectorAll('.content')

    contents.forEach(() => {}, [articles])
  })

  const truncateContent = (content, maxLength = 30) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...'
    }
    return content
  }
  return (
    <>
      <div className="container-fluid ">
        <div className="row overflow-hidden">
          <div className="display-header pb-3 col-md-12">
            <h2 className="display-4 lxgw-wenkai-mono-tc-bold frontTitle">
              最新消息
            </h2>
            {/* <!--put your content inside--> */}
          </div>
          <div className="container-fluid d-flex justify-content-center my-3 newsSection">
            <div className="news p-4 bg-light ">
              <div className="border-bottom border-dark mt-3"></div>
              <div className="bg-light">
                <ul className="list-unstyled">
                  {articles.length > 0 ? (
                    articles.slice(0, 5).map((article) => (
                      <Link
                        href={`/mudanlow/news/${article.a_id}`}
                        title="查看文章"
                      >
                        <li className="newsList" key={article.a_id}>
                          <div className="border-bottom border-dark row align-items-center py-3 list">
                            <div className="col-4 ">
                              <div className="text-secondary ">
                                {article.date}
                              </div>
                              <div className="fw-bolder ">{article.title}</div>
                            </div>
                            <div className="col-7 ">
                              {truncateContent(article.content)}
                            </div>
                            <div className="col-1 ">
                              <div className="news-arrow">
                                <FontAwesomeIcon
                                  icon={faChevronRight}
                                  className="news-arrow"
                                  height={30}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))
                  ) : (
                    <li>無文章可顯示</li>
                  )}
                </ul>
              </div>
              <div className="position-relative mt-4">
                <nav className="buttons position-absolute bottom-0 end-0">
                  <Link
                    className="more-btn"
                    href="/mudanlow/news/news-list"
                    data-button="more"
                  >
                    MORE...
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
