import client from '@/services/request/client'
import Model from '@/services/request/model'
import { GetOneHandleMethod } from '@/types/request'
import { User } from '@/types/user'

class UserModel extends Model<unknown> {
  protected url = '/users'

  me: GetOneHandleMethod<User> = (_id, params, configs) => {
    return client.get(`${this.url}/me`, params, configs)
  }
}

const userModel = new UserModel()
export default userModel
