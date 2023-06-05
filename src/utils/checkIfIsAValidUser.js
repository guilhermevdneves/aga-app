import * as yup from 'yup'
const regex = /^^([1-9]{2})[0-9]{8,9}$/

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

export const checkIfLoginTryIsValid = data => {
  return loginSchema.isValid(data).then(valid => {
    return valid
  })
}

const signUpSchema = yup.object().shape({
  username: yup.string().required(),
  number: yup.string().required().matches(regex),
  name: yup.string().required(),
  password: yup.string().required()
})


export const checkIfSignUpTryIsValid = data => {
  return signUpSchema.isValid(data).then(valid => {
    return valid
  })
}
