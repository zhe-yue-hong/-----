import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import Footer from '@/components/layout/mudanlow-layout/footer'
import styles from './MemberRegister.module.css'

const MemberRegister = () => {
  const [formData, setFormData] = useState({
    member_name: '',
    gender: '',
    email: '',
    mobile: '',
    birthday: '',
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
        'http://localhost:3001/auth/register',
        formData
      )
      console.log(response.data) // 調試輸出響應內容
      alert(response.data.message)
    } catch (error) {
      console.error(error)
      if (error.response) {
        // 在這裡處理後端返回的錯誤
        alert(`Error registering user: ${error.response.data.error}`)
      } else {
        alert('Error registering user')
      }
    }
  }

  return (
    <>
      <div className={`${styles.form}`}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="member_name"
            placeholder="Name"
            className={`${styles.input}`}
            onChange={handleChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            className={`${styles.input}`}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`${styles.input}`}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            className={`${styles.input}`}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthday"
            placeholder="Birthday"
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
            Register
          </button>
        </form>
      </div>
    </>
  )
}

export default MemberRegister
