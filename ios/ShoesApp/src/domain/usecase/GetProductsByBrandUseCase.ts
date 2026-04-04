import { ProductRepository } from '../repositories/ProductRepository';

export class GetProductsByBrandUseCase {
  constructor(private repository: ProductRepository) {}

  execute(brand: string, limit: number) {
    return this.repository.getProductsByBrand(brand, limit);
  }
}
