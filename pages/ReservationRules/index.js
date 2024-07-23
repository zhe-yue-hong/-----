import React from 'react'
import Link from 'next/link'
// import Header from '../../components/header/imdex'
import Navbar from '@/components/layout/mudanlow-layout/navbar' // 確保這個路徑是正確的
import styles from './ReservationRules.module.css' // 確保正確導入 CSS 模組
import Footer from '@/components/layout/mudanlow-layout/footer'

export default function ReservationRules() {
  return (
    <>
      <div className={styles.body}>
        {/* <Header /> */}
        <main className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.titlePage}>
              <img
                src="/images/reserve/牡丹樓封面.jpg"
                className="img-fluid"
                alt="封面圖片"
              />
            </div>
            <h2 className="mt-3 py-3">預約規定</h2>
            <p>
              【訂位須知】
              <br />
              自2023年10月14日(六)起，為維護各位貴賓之訂位權益，預約採「訂位支付訂金」之方式，逾期未付將自動取消訂位，敬請見諒。
              <br />
              【訂位方式】
              <br />
              於每月1號上午11:00開放，可預約後2個月場次。[例：3/1起可預約5月場次，依此類推。]
              <br />
              【收費標準與須知】
              <br />
              一般訂位可預約2個月場次，每位收取訂金NT$500(含0-12歲兒童)。所支付之訂金可折抵當日消費，並於消費當日開立訂金之發票。訂位日為8日後（含第8日），訂金需於7日內支付完成，如未完成付款，訂位將會自動取消。訂位日為1至7日內（含第7日），訂金需於訂位日2日內支付完成，如未完成付款，訂位將會自動取消。[例：若於10/19預訂，需在10/20結束前完成付款。]
              <br />
              【退費須知】
              <br />
              如欲取消訂位，請於於用餐日48小時前取消訂位，訂金將全數退還，退款需14個工作天，若用餐日前48小時內取消，恕訂金不予退還（以上皆不含公告店休日）
              <br />
              【線上訂位需知】
              <br />
              1.當日需至現場櫃檯辦理報到，依序排隊入場，敬請見諒。
              <br />
              2.因桌次有限，訂位後將依現場狀況排桌入席，恕無法指定座位。
              <br />
              3.本餐廳最大座位數為6人桌，若訂位人數超過5人(含)需分桌。
              <br />
              4.訂位人數為1人時將依現場狀況安排個人座位或併桌。
              <br />
              5.如遇特殊節日(農曆春節、母親節...等)，將視訂位狀況收取訂金，餐廳將有專人致電與您聯繫訂金事宜。
              <br />
              6.開車前往用餐的貴賓還請注意預留充足時間。
              <br />
              【消費方式】
              <br />
              1.本餐廳需另加收10%服務費。自備酒水需酌收酒水服務費：葡萄酒每瓶500元，烈酒每瓶1,000元。
              <br />
              2.訂位保留10分鐘，逾時座位將取消不再另行通知。
              <br />
              3.餐廳禁帶外食，敬請配合。4.請勿攜帶寵物入內(導盲犬除外，需事先告知)，不便之處敬請見諒。如有未盡事宜，牡丹樓餐廳保留、修改、終止、變更內容細節之權利，且不另行通知。
              如有疑問，請撥打服務專線06-221-7509，如遇忙線請稍後再撥。
            </p>
            <div className={styles.jumpdiv}>
              <button className={styles.jumpbutton}>
                <Link href="/ReserveCarousel">前往預約系統</Link>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
