import { FirebaseError } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localStorage.setItem(ACCESS_TOKEN, (user as any).accessToken)
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
