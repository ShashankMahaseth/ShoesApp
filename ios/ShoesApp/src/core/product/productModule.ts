import { ProductRepositoryImplementation } from '../../data/repositories/ProductRepositoryImplementation';
import { GetProductsByBrandUseCase } from '../../domain/usecase/GetProductsByBrandUseCase';

const productRepository = new ProductRepositoryImplementation();

export const productUseCases = {
  getByBrand: new GetProductsByBrandUseCase(productRepository),
};
