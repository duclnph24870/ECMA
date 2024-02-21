export interface RegisterFormParams {
  name: string
  birthday: string
  email: string
  password: string
  confirm_password: string
}

export interface UpdateProfileFormParams {
  name: string
  birthday: string
  email: string
}

export type RegisterParams = Omit<RegisterFormParams, 'confirm_password'>
