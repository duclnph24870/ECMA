import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import routerPaths from '@/configs/routes'

const ProductList = lazy(() => import('@/pages/ProductList'))
const ProductCreate = lazy(() => import('@/pages/ProductCreate'))
const ProductUpdate = lazy(() => import('@/pages/ProductUpdate'))

const productRouter: RouteObject[] = [
  {
    path: routerPaths.PRODUCTS,
    element: <ProductList />,
  },
  {
    path: routerPaths.PRODUCT_CREATE,
    element: <ProductCreate />,
  },
  {
    path: routerPaths.PRODUCT_UPDATE,
    element: <ProductUpdate />,
  },
]

export default productRouter
