import { signInGoogle, signOutGoogle } from '@/services/google'

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

export function signInGoogleButton(element: HTMLButtonElement) {
  element.addEventListener('click', () => signInGoogle())
}

export function signOutGoogleButton(element: HTMLButtonElement) {
  element.addEventListener('click', () => signOutGoogle())
}
