import { Product } from '../model/Product';

export interface ProductRepository {
  getProductsByBrand(brand: string, limit: number): Promise<Product[]>;
}
