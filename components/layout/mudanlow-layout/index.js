// components/layout/MudanlowLayout.js

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from './navbar'
import NavbarLogin from './navbar-login'
import Footer from './footer'
import { useAuth } from '@/hooks/use-auth'
import { useLoader } from '@/hooks/use-loader'
import NavbarMotion from './navbar-motion'
import NextBreadCrumb from '@/components/common/next-breadcrumb'

export default function MudanlowLayout({ title = 'Mudanlow', children }) {
  const { auth } = useAuth()
  const { loader } = useLoader()
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      {isHomePage ? null : auth.isAuth ? <NavbarLogin /> : <Navbar />}
      <div className="flex-shrink-0 background2">
        <div
          className=""
          style={{
            position: 'relative',
            margin: '0px',
            border: '0px',
            width: '100%',
            height: '100%',
          }}
        >
          <NavbarMotion />
          <div className="">{children}</div>
        </div>
        {loader()}
      </div>
      <Footer />
    </>
  )
}
