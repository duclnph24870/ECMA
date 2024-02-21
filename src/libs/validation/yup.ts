import moment from 'moment'
import * as yup from 'yup'

yup.addMethod(yup.string, 'phone', function validatePhone(message) {
  return this.test('phone', message, function test(value) {
    if (value == null || value === '') return true
    return /^0((\d{1}?\d{4}|\d{2}?\d{3}|\d{3}?\d{2}|\d{4}?\d{1})\d{4}|\d[5789]?0\d{4}\d{4})$/.test(
      value,
    )
  })
})

yup.addMethod(yup.string, 'password', function validatePassword(message) {
  return this.test('password', message, function test(value) {
    if (value == null || value === '' || typeof value !== 'string') return false

    if (value.length < 8) return false

    const arrReg = [/[a-z]/, /[A-Z]/, /[0-9]/, /\p{Z}|\p{S}|\p{P}/u]
    let count = 0
    for (let i = 0; i < arrReg.length; i += 1) {
      if (arrReg[i].test(value)) {
        count += 1
      }
      if (count >= 3) {
        return true
      }
    }

    return false
  })
})

yup.addMethod(
  yup.string,
  'strongDate',
  function validateStrongDate(message, formatDate = 'YYYY-MM-DD') {
    return this.test('strongDate', message, function test(value) {
      if (value == null) return true

      return moment(value, formatDate).isValid()
    })
  },
)

yup.addMethod(
  yup.string,
  'maxDateString',
  function validateMaxDate(max, message, formatDate = 'YYYY-MM-DD') {
    return this.test('maxDateString', message, function test(value) {
      return max.getTime() - moment(value, formatDate).toDate().getTime() > 0
    })
  },
)

declare module 'yup' {
  interface StringSchema {
    phone(message: string): StringSchema
    password(message: string): StringSchema
    strongDate(message: string, formatDate?: string): StringSchema
    maxDateString(max: Date, message: string, formatDate?: string): StringSchema
  }
}

export default yup
