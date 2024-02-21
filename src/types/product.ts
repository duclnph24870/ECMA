import { Category } from './category'

export interface ProductCreateFormParam {
  title: string
  price: string
  avatar_url: string
  category_id: string
}

export interface ProductUpdateFormParam {
  title: string
  price: string
  avatar_url: string
  category_id: string
}

export interface Product {
  id: string
  title: string
  price: string
  avatar_url: string
  category_id: string
  category: Category
}
