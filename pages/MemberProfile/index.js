import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MemberProfile = () => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }
        const response = await axios.get('http://localhost:3001/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // 確保這裡的 Authorization 正確設置
          },
        })
        setProfile(response.data)
      } catch (error) {
        console.error(error)
        alert('Error fetching profile')
      }
    }

    fetchProfile()
  }, [])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.member_name}</p>
      <p>Email: {profile.email}</p>
      <p>Gender: {profile.gender}</p>
      <p>Mobile: {profile.mobile}</p>
      <p>Birthday: {profile.birthday}</p>
    </div>
  )
}

export default MemberProfile
