import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../../res/themes/useTheme';
import { Resource } from '../../core/util/Resource';
import { Product } from '../../domain/model/Product';

type ProductCardProps = {
  selectedCategory: string;
  products: Resource<Product[]>;
};

const formatPrice = (price: number) => `$${price.toFixed(2)}`;
const Separator = () => <View style={styles.separator} />;

const ProductCard = ({ selectedCategory, products }: ProductCardProps) => {
  const theme = useTheme();

  if (products.status === 'loading') {
    return (
      <View style={styles.feedbackContainer}>
        <ActivityIndicator color="#5B9EE1" size="small" />
      </View>
    );
  }

  if (products.status === 'failure') {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={[styles.feedbackText, { color: theme.borderColor }]}>
          {products.error}
        </Text>
      </View>
    );
  }

  if (products.data.length === 0) {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={[styles.feedbackText, { color: theme.borderColor }]}>
          No {selectedCategory} products are available right now.
        </Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.container, { backgroundColor: theme.card }]}
    >
      <View style={styles.cardContent}>
        {item.productImage ? (
          <Image source={{ uri: item.productImage }} style={styles.thumbnail} />
        ) : (
          <View
            style={[
              styles.thumbnail,
              styles.thumbnailPlaceholder,
              { backgroundColor: theme.background },
            ]}
          />
        )}
        <Text style={styles.bestSeller}>BEST SELLER</Text>
        <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.price, { color: theme.text }]}>
          {formatPrice(item.price)}
        </Text>
      </View>

      <View style={styles.miniCardPosition}>
        <Pressable style={styles.miniCard}>
          <Ionicons name="add" size={24} style={styles.icons} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.listContent}
      data={products.data}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: moderateScale(12),
  },
  separator: {
    width: moderateScale(12),
  },
  container: {
    width: moderateScale(157),
    height: moderateScale(201),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
  },
  cardContent: {
    padding: moderateScale(16),
  },
  miniCard: {
    width: moderateScale(34),
    height: moderateScale(35.5),
    borderTopLeftRadius: moderateScale(16),
    borderBottomEndRadius: moderateScale(16),
    justifyContent: 'center',
    backgroundColor: '#5B9EE1',
  },
  miniCardPosition: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  icons: {
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  thumbnail: {
    width: '100%',
    height: moderateScale(97),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  thumbnailPlaceholder: {
    borderRadius: moderateScale(12),
  },
  bestSeller: {
    fontSize: moderateScale(12),
    color: '#5B9EE1',
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginTop: moderateScale(6),
  },
  price: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(12),
  },
  feedbackContainer: {
    minHeight: moderateScale(110),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
  },
  feedbackText: {
    fontSize: moderateScale(13),
    textAlign: 'center',
  },
});

export default ProductCard;
