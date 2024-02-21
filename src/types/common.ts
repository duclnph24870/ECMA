import { SVGProps } from 'react'

export type ValueOf<T> = Required<T>[keyof T]

export interface IconProps extends SVGProps<SVGSVGElement> {
  active?: boolean
}
export type IconType = (props: IconProps) => JSX.Element

export type SelectOptions = {
  label: string
  value: string
}[]
