/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useTheme } from './ios/ShoesApp/src/res/themes/useTheme';
import NavigationApp from './ios/ShoesApp/src/presentation/navigation/Navigation';
import { store } from './ios/ShoesApp/src/redux/store/store';

const App = () => {

  const color = useTheme()
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ backgroundColor: color.background }}>
        <NavigationApp />
      </SafeAreaProvider>
    </Provider>
  );
}


export default App;
