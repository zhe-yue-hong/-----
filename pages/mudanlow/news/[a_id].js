import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Footer from '@/components/layout/mudanlow-layout/footer'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import { Image } from 'react-bootstrap'

export default function NewsContent() {
  const [article, setArticle] = useState(null)
  const [articleIds, setArticleIds] = useState([])
  const [latestArticles, setLatestArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { a_id } = router.query
  const imageBaseUrl = 'http://localhost:3005/img/'

  useEffect(() => {
    const fetchArticle = async () => {
      if (!a_id) return

      setIsLoading(true)
      try {
        const response = await fetch(
          `http://localhost:3005/api/articles/api/${a_id}`
        )
        const data = await response.json()
        if (data.success) {
          setArticle(data.article)
        } else {
          setError('文章未找到')
        }
      } catch (error) {
        setError('無法獲取文章數據')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [a_id])

  useEffect(() => {
    const fetchArticleIds = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/articles/api`)
        const data = await response.json()
        if (data.success) {
          const ids = data.rows.map((article) => article.a_id)
          setArticleIds(ids)

          const latest = data.rows
            .filter((article) => article.a_id !== parseInt(a_id))
            .slice(0, 5)
          setLatestArticles(latest)
        } else {
          setError('無法獲取文章列表')
        }
      } catch (error) {
        setError('無法獲取文章列表')
      }
    }

    fetchArticleIds()
  }, [a_id])

  const NextArticle = () => {
    if (articleIds.length > 0) {
      const currentIndex = articleIds.findIndex((id) => id === parseInt(a_id))
      const nextIndex = (currentIndex + 1) % articleIds.length
      router.push(`/mudanlow/news/${articleIds[nextIndex]}`)
    }
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container-fluid newsPage">
          <div className="error">{error}</div>
        </div>
        <Footer />
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container-fluid newsPage">
          <div className="loading">正在載入...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="container-fluid newsPage">
          <div className="loading">文章載入中...</div>
        </div>
        <Footer />
      </>
    )
  }

  let imageSrc = ''
  if (article.photos) {
    try {
      const photosArray = JSON.parse(article.photos)
      if (photosArray.length > 0) {
        imageSrc = `${imageBaseUrl}${photosArray[0]}`
      }
    } catch (error) {
      console.error('Error parsing photos:', error)
    }
  }

  return (
    <>
      <div className="container-fluid newsPage position-relative background2">
        <div className="newsNavbarPic bg-secondary position-relative">
          <div className="position-absolute newsNavbarPicText">最新消息</div>
          <div className="newsNavbarPicOverlay" />
          <div className="newsMain d-flex justify-content-evenly">
            <div className="newsContent">
              <div className="newsTitle">{article.title}</div>
              <div className="d-flex justify-content-center insideContent">
                <div className="newsContentPic">
                  {imageSrc && <img src={imageSrc} alt="Article Image" />}
                  <div className="line1" />
                  <div className="line2" />
                  <div className="date">{article.date}</div>
                </div>
                <div className="newsMainContent position-relative">
                  <div className="contentInside">{article.content}</div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center other">
                <div className="share"></div>
                <div className="nextPage">
                  <button className="nextPageBtn" onClick={NextArticle}>
                    下一頁
                  </button>
                </div>
              </div>
            </div>
            <div className="otherContent">
              <div className="newsTitle">其他消息</div>
              <div>
                <ul>
                  {latestArticles.map((latestArticle) => (
                    <li key={latestArticle.a_id}>
                      <a href={`/mudanlow/news/${latestArticle.a_id}`}>
                        {latestArticle.content}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="newsPicture">
          <Image src="/pics/background-pic1 (1).png" />
        </div>
      </div>
      <style jsx>{`
        .newsPage {
          padding: 0 200px;
          padding-bottom: 800px;
        }
        .newsNavbarPic {
          width: 100%;
          height: 380px;
          margin: 50px auto;
          background-image: url(/images/mudanlowWebp/DSC00594.webp);
          background-position: 90% 35%;
          background-repeat: no-repeat;
          z-index: 1;
        }
        .newsNavbarPicOverlay {
          width: 100%;
          height: 100%;
          background: #31313186;
          z-index: 2;
        }
        .newsNavbarPicText {
          font-size: 54px;
          font-weight: 900;
          top: 40%;
          left: 45%;
          z-index: 3;
          color: white;
        }
        .newsMain {
          width: 100%;
          margin-top: 50px;
        }
        .newsContent {
          width: 65%;
        }
        .otherContent {
          width: 30%;
        }
        .newsTitle {
          border-bottom: 2px dashed gray;
          font-size: 30px;
        }
        .newsContentPic {
          margin-top: 30px;
          width: 400px;
          height: 600px;
          position: relative;
        }
        .newsContentPic > img {
          width: 100%;
          object-fit: fill;
        }
        .line1 {
          height: 25%;
          border-left: 5px solid gray;
          position: absolute;
          top: 0;
          left: -7%;
        }
        .line2 {
          width: 50%;
          border-bottom: 5px solid gray;
          position: absolute;
          bottom: 7%;
          right: 0;
        }
        .date {
          bottom: 3%;
          left: 0px;
          position: absolute;
          color: rgb(177, 176, 176);
          font-size: 24px;
        }
        .newsMainContent {
          width: 400px;
          height: 100%;
          margin-bottom: 100px;
        }
        .other {
          width: 100%;
          margin-bottom: 50px;
          font-size: 18px;
        }
        .contentInside {
          margin-top: 70px;
          height: 500px;
          font-size: 18px;
        }

        .nextPageBtn {
          color: #fff;
          background-color: #465952;
          padding: 5px 15px;
          border-radius: 5px;
        }

        .nextPageBtn:hover {
          color: black;
          background-color: gray;
          padding: 5px 15px;
          border-radius: 5px;
        }

        .share {
          color: #000;
          font-family: 'Chocolate Classical Sans', sans-serif;
        }

        .insideContent {
          height: 75%;
        }
        .newsPicture {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </>
  )
}
