import * as yup from 'yup'

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
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required()
})


export const checkIfSignUpTryIsValid = data => {
  return signUpSchema.isValid(data).then(valid => {
    return valid
  })
}
