import firestore from '@react-native-firebase/firestore';

export interface FirestoreProductDocument {
  id: string;
  brand: unknown;
  title: unknown;
  price: unknown;
  thumbnail1: unknown;
}

export const firebaseProductDataSource = {
  async getProductsByBrand(
    brand: string,
    limit: number,
  ): Promise<FirestoreProductDocument[]> {
    const normalizedBrand = brand.trim().toLowerCase();
    const exactMatchSnapshot = await firestore()
      .collection('products')
      .where('brand', '==', brand)
      .limit(limit)
      .get();

    if (!exactMatchSnapshot.empty) {
      return exactMatchSnapshot.docs.map(document => {
        const data = document.data();

        return {
          id: document.id,
          brand: data.brand,
          title: data.title,
          price: data.price,
          thumbnail1: data.thumbnail1,
        };
      });
    }

    const fallbackSnapshot = await firestore()
      .collection('products')
      .limit(40)
      .get();

    return fallbackSnapshot.docs
      .map(document => {
        const data = document.data();

        return {
          id: document.id,
          brand: data.brand,
          title: data.title,
          price: data.price,
          thumbnail1: data.thumbnail1,
        };
      })
      .filter(product => {
        const remoteBrand =
          typeof product.brand === 'string'
            ? product.brand.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            : '';

        return remoteBrand === normalizedBrand.replace(/[^a-zA-Z0-9]/g, '');
      })
      .slice(0, limit);
  },
};
