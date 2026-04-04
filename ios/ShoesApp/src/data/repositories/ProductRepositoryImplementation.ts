import { Product } from '../../domain/model/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { firebaseProductDataSource } from '../datasource/firebaseProductDataSource';

const toText = (value: unknown): string =>
  typeof value === 'string' ? value : '';

const toNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

export class ProductRepositoryImplementation implements ProductRepository {
  async getProductsByBrand(brand: string, limit: number): Promise<Product[]> {
    const products = await firebaseProductDataSource.getProductsByBrand(
      brand,
      limit,
    );

    return products.map(product => ({
      id: product.id,
      brand: toText(product.brand),
      title: toText(product.title),
      price: toNumber(product.price),
      productImage: toText(product.thumbnail1),
    }));
  }
}
