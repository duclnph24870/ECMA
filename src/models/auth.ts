import client from '@/services/request/client'
import Model from '@/services/request/model'
import { LoginParams } from '@/types/login'
import { RegisterParams } from '@/types/register'
import { CreateHandleMethod, GetOneHandleMethod } from '@/types/request'
import { User } from '@/types/user'

class AuthModel extends Model<unknown> {
  protected url = '/users'

  login: CreateHandleMethod<User[], LoginParams> = (params) => {
    return client.get(
      `${this.url}?email=${params.email}&password=${params.password}`,
    )
  }

  register: CreateHandleMethod<User, RegisterParams> = (params) => {
    return client.post(this.url, params)
  }

  checkEmailExist: GetOneHandleMethod<User[]> = (email) => {
    return client.get(`${this.url}?email=${email}`)
  }
}

const authModel = new AuthModel()
export default authModel
