import Model from '@/services/request/model'
import { Product } from '@/types/product'

class ProductModel extends Model<Product> {
  protected url = '/products'
}

const productModel = new ProductModel()
export default productModel
