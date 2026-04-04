import { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '../../res/themes/useTheme';
import HomeTopAppBar from '../components/HomeTopAppBar';
import { Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Categories, { HomeCategory } from '../components/Categories';
import ProductCard from '../components/ProductCard';
import NewArrivalCard from '../components/NewArrivalCard';
import HomeBottomNavigationBar from '../components/HomeBottomNavigationBar';
import { usePopularProductsByCategory } from '../hooks/usePopularProductsByCategory';
import { ScrollView } from 'react-native';

const HomeScreen = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] =
    useState<HomeCategory>('Nike');
  const popularProducts = usePopularProductsByCategory(selectedCategory);

  return (

    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <HomeTopAppBar />

      <View style={{ paddingHorizontal: moderateScale(12) }}>
        <Pressable style={[styles.search, { backgroundColor: theme.icon }]}>
          <Ionicons
            name="search-sharp"
            size={20}
            color={theme.borderColor}
            style={{
              marginRight: moderateScale(6),
              marginLeft: moderateScale(32),
            }}
          />
          <Text style={[styles.searchText, { color: theme.borderColor }]}>
            Looking for shoes
          </Text>
        </Pressable>
      </View>

      <Categories
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <ScrollView>
        <View style={styles.Popular}>
          <Text style={[styles.popularText, { color: theme.text }]}>
            Popular Shoes
          </Text>

          <Pressable>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <ProductCard
          products={popularProducts}
          selectedCategory={selectedCategory}
        />

        <View style={[styles.Popular, { marginTop: moderateScale(12) }]}>
          <Text style={[styles.popularText, { color: theme.text }]}>
            New Arrivals
          </Text>

          <Pressable>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <NewArrivalCard />
      </ScrollView>
      <HomeBottomNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    width: '100%',
    height: moderateScale(48),
    flexDirection: 'row',
    borderRadius: moderateScale(50),
    alignItems: 'center',
    shadowColor: '#534f4f',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  searchText: {
    fontSize: moderateScale(14),
  },
  Popular: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(16),
    paddingHorizontal: moderateScale(12),
  },
  popularText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    lineHeight: moderateScale(24),
  },
  seeAll: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#5B9EE1',
  },
});

export default HomeScreen;
