import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const images = [
  '/images/mudanlowWebp/DSC00574.webp',
  '/images/mudanlowWebp/DSC00576.webp',
  '/images/mudanlowWebp/DSC00596.webp',
  '/images/mudanlowWebp/DSC00644.webp',
  '/images/mudanlowWebp/DSC00593.webp',
  '/images/mudanlowWebp/DSC00691.webp',
  '/images/mudanlowWebp/DSC00610.webp',
  '/images/mudanlowWebp/DSC00701.webp',
  '/images/mudanlowWebp/DSC00567.webp',
  '/images/mudanlowWebp/DSC00585.webp',

  // 更多圖片路徑
]

export default function Mymasonry() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // 只在客戶端渲染時顯示
  }

  return (
    <div style={{ padding: '20px' }}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 5, 750: 5, 900: 5 }}>
        <Masonry gutter="10px">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              style={{
                width: '100%',
                height: 'auto',
              }}
              alt={`Gallery Image ${index + 1}`}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}
