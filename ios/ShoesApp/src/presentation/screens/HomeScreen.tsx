import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../res/themes/useTheme";
import { RootParamList } from "../navigation/types/RootStackParamList";
import { useAppDispatch } from "../../redux/hooks/hooks";
import HomeTopAppBar from "../components/HomeTopAppBar";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import TextField from "../common/textfield";
import Ionicons from "@react-native-vector-icons/ionicons";

type HomeNavigation = NativeStackNavigationProp<RootParamList, "HomeScreen">;

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeNavigation>();
  const dispatch = useAppDispatch();



  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <HomeTopAppBar />

      <TouchableOpacity style={[styles.search, { backgroundColor: theme.icon }]}>
        <Ionicons name="search-sharp" size={20} color={theme.borderColor}
          style={{ marginRight: moderateScale(6), marginLeft: moderateScale(32) }} />
        <Text style={[styles.searchText, { color: theme.borderColor }]}>
          Looking for shoes
        </Text>

      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,

    padding: moderateScale(24),
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
    elevation: 5
  },
  searchText: {
    fontSize: moderateScale(14)
  }


});

export default HomeScreen;
