import { FirebaseError } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth'

import { ACCESS_TOKEN } from '@/constants'
import firebaseApp from '@/services/firebase'
import { RequestError } from '@/types/request'

const provider = new GoogleAuthProvider()
const auth = getAuth(firebaseApp)

export const signInGoogle = async (): Promise<
  [User | undefined, RequestError | undefined]
> => {
  try {
    const result = await signInWithPopup(auth, provider)

    const user = result.user
    localStorage.setItem(ACCESS_TOKEN, user.refreshToken)
    return [user, undefined]
  } catch (error) {
    const err = error as FirebaseError
    return [
      undefined,
      {
        message: err.message,
        code: err.code,
        errors: err.customData,
      } as RequestError,
    ]
  }
}

export const signOutGoogle = async () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN)
    await signOut(auth)
    return [
      {
        message: 'SignOut success',
      },
      undefined,
    ]
  } catch (error) {
    return [
      undefined,
      {
        message: 'SignOut failed',
      } as RequestError,
    ]
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Người dùng đang đăng nhập')
  } else {
    console.log('Người dùng đã đăng xuất')
  }
})
