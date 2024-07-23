import React, { useState } from 'react'
import ReactCreditCards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import styles from './CreditCardForm.module.css'
import { Form } from 'rsuite'

export default function CreditCardForm({ creditCardFormData, handleChange }) {
  const [focused, setFocused] = useState('')
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiry: '',
    name: '',
    cvc: '',
  })

  const handleInputFocus = (e) => {
    setFocused(e.target.name)
  }

  const handleInputBlur = (e) => {
    const name = e.target.name
    validateField(name, creditCardFormData[name])
    setFocused('')
  }

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'cardNumber':
        error =
          value.length < 16 || !/^\d{16}$/.test(value) ? '無效的信用卡號碼' : ''
        break
      case 'expiry':
        error = !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)
          ? '無效的有效期限'
          : ''
        break
      case 'name':
        error = value.trim() === '' ? '姓名不能為空' : ''
        break
      case 'cvc':
        error =
          value.length < 3 || !/^\d{3,4}$/.test(value) ? '無效的安全碼' : ''
        break
      default:
        break
    }
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }))
  }
  return (
    <div className={`${styles.CardContainer}`}>
      <div className={`${styles.CreditCardImage}`}>
        <ReactCreditCards
          cvc={creditCardFormData.cvc}
          expiry={creditCardFormData.expiry}
          focused={focused}
          name={creditCardFormData.name}
          number={creditCardFormData.cardNumber}
        />
      </div>
      <div className={`${styles.CreditCardForm}`}>
        <Form fluid>
          <div className={`${styles.FormArea1}`}>
            <Form.Group
              controlId="creditCard-1"
              className={`${styles.creditCardNumber}`}
            >
              <Form.ControlLabel>信用卡卡號</Form.ControlLabel>
              <Form.Control
                name="creditCardNumber"
                type="tel"
                size="lg"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                value={creditCardFormData.cardNumber}
                onChange={(value) => handleChange('cardNumber', value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <Form.HelpText className={` ${styles.errorText}`}>
                {errors.cardNumber ? errors.cardNumber : ''}
              </Form.HelpText>
            </Form.Group>
            <Form.Group controlId="creditCard-2">
              <Form.ControlLabel>有效期限</Form.ControlLabel>
              <Form.Control
                name="creditCardExpiry"
                type="text"
                size="lg"
                placeholder="MM/YY"
                value={creditCardFormData.expiry}
                onChange={(value) => handleChange('expiry', value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <Form.HelpText className={` ${styles.errorText}`}>
                {errors.expiry ? errors.expiry : ''}
              </Form.HelpText>
            </Form.Group>
          </div>
          <div className={`${styles.FormArea2}`}>
            <Form.Group
              controlId="creditCard-3"
              className={`${styles.creditCardName}`}
            >
              <Form.ControlLabel>姓名</Form.ControlLabel>
              <Form.Control
                name="creditCardName"
                type="text"
                size="lg"
                placeholder="姓名"
                value={creditCardFormData.name}
                onChange={(value) => handleChange('name', value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <Form.HelpText className={` ${styles.errorText}`}>
                {errors.name ? errors.name : ''}
              </Form.HelpText>
            </Form.Group>
            <Form.Group controlId="creditCard-3">
              <Form.ControlLabel>卡片安全碼</Form.ControlLabel>
              <Form.Control
                name="creditCardCvc"
                type="password"
                size="lg"
                placeholder="cvc"
                value={creditCardFormData.cvc}
                onChange={(value) => handleChange('cvc', value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <Form.HelpText className={` ${styles.errorText}`}>
                {errors.cvc ? errors.cvc : ''}
              </Form.HelpText>
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  )
}
