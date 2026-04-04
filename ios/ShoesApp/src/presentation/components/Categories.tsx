import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '../../res/themes/useTheme';

export const HOME_CATEGORIES = [
  {
    label: 'Nike',
    image: require('../../assets/nike.png'),
  },
  {
    label: 'Puma',
    image: require('../../assets/puma.png'),
  },
  {
    label: 'Under Armour',
    image: require('../../assets/under.png'),
  },
  {
    label: 'Adidas',
    image: require('../../assets/adidas.png'),
  },
  {
    label: 'Converse',
    image: require('../../assets/converse.png'),
  },
] as const;

export type HomeCategory = (typeof HOME_CATEGORIES)[number]['label'];

type CategoriesProps = {
  selectedCategory: HomeCategory;
  onSelectCategory: (category: HomeCategory) => void;
};

const Categories = ({
  selectedCategory,
  onSelectCategory,
}: CategoriesProps) => {
  const theme = useTheme();
  const selectedCategoryStyle = {
    backgroundColor: '#5B9EE1',
    minWidth: moderateScale(96),
  };
  const defaultCategoryStyle = {
    backgroundColor: theme.icon,
    minWidth: moderateScale(44),
  };
  const selectedImageStyle = {
    tintColor: '#FFFFFF' as const,
  };
  const defaultImageStyle = {
    tintColor: theme.text,
  };

  return (
    <View style={styles.container}>
      {HOME_CATEGORIES.map(category => {
        const isSelected = category.label === selectedCategory;
        const displayLabel =
          category.label.length > 6
            ? `${category.label.slice(0, 6)}...`
            : category.label;

        return (
          <Pressable
            key={category.label}
            onPress={() => onSelectCategory(category.label)}
            style={[
              styles.circle,
              isSelected ? selectedCategoryStyle : defaultCategoryStyle,
            ]}
          >
            <Image
              source={category.image}
              style={[
                styles.img,
                isSelected ? selectedImageStyle : defaultImageStyle,
              ]}
            />
            {isSelected ? (
              <Text numberOfLines={1} style={styles.label}>
                {displayLabel}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(32),
    marginBottom: moderateScale(24),
    paddingHorizontal: moderateScale(12),
  },
  circle: {
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: moderateScale(3),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
    gap: moderateScale(6),
  },
  img: {
    width: moderateScale(26),
    height: moderateScale(18),
    resizeMode: 'contain',
  },
  label: {
    fontSize: moderateScale(14),
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default Categories;
