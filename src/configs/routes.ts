const routerPaths = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT: '/password/forgot',
  PROFILE: '/profile',
  NOT_FOUND: '*',
  PRODUCTS: '/products',
  PRODUCT_CREATE: '/products/create',
  PRODUCT_UPDATE: '/products/:id',
}

export const routerData = {
  [routerPaths.HOME]: {
    documenTitle: 'Quản lý - Trang chủ',
    pageTitle: 'Trang chủ',
  },
  [routerPaths.SIGN_IN]: {
    documenTitle: 'Đăng nhập',
  },
  [routerPaths.SIGN_UP]: {
    documenTitle: 'Đăng ký',
  },
  [routerPaths.PROFILE]: {
    documenTitle: 'Quản lý - Profile',
  },
  [routerPaths.PRODUCTS]: {
    documenTitle: 'Quản lý - Danh sách sản phẩm',
    pageTitle: 'Danh sách sản phẩm',
  },
  [routerPaths.PRODUCT_CREATE]: {
    documenTitle: 'Quản lý - Thêm sản phẩm',
    pageTitle: 'Thêm sản phẩm',
  },
  [routerPaths.PRODUCT_UPDATE]: {
    documenTitle: 'Quản lý - Chi tiêt sản phẩm',
    pageTitle: 'Chi tiết sản phẩm',
  },
}

export default routerPaths
