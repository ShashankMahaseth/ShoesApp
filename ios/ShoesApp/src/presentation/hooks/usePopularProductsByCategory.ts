import { useEffect, useState } from 'react';
import { productUseCases } from '../../core/product/productModule';
import { Failure, Loading, Resource, Success } from '../../core/util/Resource';
import { Product } from '../../domain/model/Product';

const POPULAR_PRODUCTS_LIMIT = 4;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Unable to load products.';
};

export const usePopularProductsByCategory = (categoryBrand: string) => {
  const [products, setProducts] = useState<Resource<Product[]>>(
    Loading<Product[]>(),
  );

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      setProducts(Loading<Product[]>());

      try {
        const popularProducts = await productUseCases.getByBrand.execute(
          categoryBrand,
          POPULAR_PRODUCTS_LIMIT,
        );

        if (isActive) {
          setProducts(Success(popularProducts));
        }
      } catch (error) {
        if (isActive) {
          setProducts(Failure<Product[]>(getErrorMessage(error)));
        }
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [categoryBrand]);

  return products;
};
