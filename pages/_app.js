import { useEffect } from 'react'
import 'rsuite/dist/rsuite.min.css' // 引入 React Suite 的 CSS 文件
// 樣式
import '@/styles/globals.scss'
import '@/styles/product.scss'
import '@/styles/cart.scss'
import '@/styles/loader.scss'
import '@/styles/maintain.scss'
import '@/styles/Profile.scss'
// 載入購物車context
import { CartProvider } from '@/hooks/use-cart-state'
// 載入認証用context
import { AuthProvider } from '@/hooks/use-auth'
// 載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'

import MudanlowLayout from '@/components/layout/mudanlow-layout'
// 自訂用載入動畫元件
import { CatLoader, NoLoader } from '@/hooks/use-loader/components'
import FirstPicture from '@/components/mudanlow/frontpage/first-pic'

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案，對應`components/layout/default-layout/index.js`
  // 或`components/layout/default-layout.js`
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <MudanlowLayout>
        <main>{page}</main>
      </MudanlowLayout>
    ))

  return (
    <AuthProvider>
      <LoaderProvider close={2} CustomLoader={CatLoader}>
        <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
      </LoaderProvider>
    </AuthProvider>
  )
}
