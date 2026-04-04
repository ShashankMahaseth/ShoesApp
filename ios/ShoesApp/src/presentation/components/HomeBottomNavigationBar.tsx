import { useState, type ComponentProps, type ReactNode } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../res/themes/useTheme';

const INACTIVE_ICON_COLOR = '#778493';
const CENTER_BUTTON_COLOR = '#5FAEFF';

const INNER_BUTTON_SIZE = moderateScale(56);
const BAR_BODY_HEIGHT = moderateScale(65);
const NAV_ITEM_SIZE = moderateScale(44);
const NAV_ICON_SIZE = moderateScale(24);

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type NavigationItem = {
  key: string;
  icon: IoniconName;
  label: string;
};

const LEFT_ITEMS: NavigationItem[] = [
  {
    key: 'home',
    icon: 'home-outline',
    label: 'Home',
  },
  {
    key: 'favorite',
    icon: 'heart-outline',
    label: 'Saved',
  },
];

const RIGHT_ITEMS: NavigationItem[] = [
  {
    key: 'notifications',
    icon: 'notifications-outline',
    label: 'Alerts',
  },
  {
    key: 'profile',
    icon: 'person-outline',
    label: 'Profile',
  },
];

type BottomNavItemProps = {
  active?: boolean;
  icon: IoniconName;
  label: string;
  onPress: () => void;
};

type HomeBottomNavigationBarProps = {
  children?: ReactNode;
};

const BottomNavItem = ({
  active,
  icon,
  label,
  onPress,
}: BottomNavItemProps) => {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={moderateScale(10)}
      onPress={onPress}
      style={styles.navItem}
    >
      <Ionicons
        name={icon}
        size={NAV_ICON_SIZE}
        color={active ? '#5B9EE1' : INACTIVE_ICON_COLOR}
      />
    </Pressable>
  );
};

const HomeBottomNavigationBar = ({
  children,
}: HomeBottomNavigationBarProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [activeKey, setActiveKey] = useState('home');
  const paddingBottom = Math.max(insets.bottom, moderateScale(10));

  return (
    <View
      style={[styles.wrapper, { paddingBottom, backgroundColor: theme.card }]}
    >
      <View style={styles.navRow}>
        {LEFT_ITEMS.map(item => (
          <BottomNavItem
            key={item.key}
            active={activeKey === item.key}
            icon={item.icon}
            label={item.label}
            onPress={() => setActiveKey(item.key)}
          />
        ))}

        <View style={styles.centerContainer}>
          <Pressable
            accessibilityLabel="Cart"
            accessibilityRole="button"
            style={styles.centerButton}
          >
            {children ?? (
              <Ionicons
                name="bag-handle-outline"
                size={moderateScale(25)}
                color="#FFFFFF"
              />
            )}
          </Pressable>
        </View>

        {RIGHT_ITEMS.map(item => (
          <BottomNavItem
            key={item.key}
            active={activeKey === item.key}
            icon={item.icon}
            label={item.label}
            onPress={() => setActiveKey(item.key)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  navRow: {
    height: BAR_BODY_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: moderateScale(10),
  },
  navItem: {
    width: NAV_ITEM_SIZE,
    height: NAV_ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    width: INNER_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerButton: {
    width: INNER_BUTTON_SIZE,
    height: INNER_BUTTON_SIZE,
    borderRadius: INNER_BUTTON_SIZE / 2,
    backgroundColor: CENTER_BUTTON_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    // Floating slightly above the bar
    transform: [{ translateY: -moderateScale(15) }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default HomeBottomNavigationBar;
