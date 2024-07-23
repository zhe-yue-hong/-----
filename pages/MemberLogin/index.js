import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import Footer from '@/components/layout/mudanlow-layout/footer'
import styles from './MemberLogin.module.css'

const MemberLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        formData
      )
      console.log(response.data) // 檢查回應的內容，確認是否包含 token
      // 將 token 和 memberId 存入 localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('memberId', response.data.memberId.toString())
      alert('Login successful')
    } catch (error) {
      console.error(error)
      alert('Error logging in')
    }
  }

  return (
    <>
      <div className={`${styles.form}`}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`${styles.input}`}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${styles.input}`}
            onChange={handleChange}
          />
          <button type="submit" className={`${styles.input}`}>
            Login
          </button>
        </form>
      </div>
    </>
  )
}

export default MemberLogin
