/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { useTheme } from './ios/ShoesApp/src/res/themes/useTheme';
import NavigationApp from './ios/ShoesApp/src/presentation/navigation/Navigation';

const App = () => {

  const color = useTheme()
  return (
    <SafeAreaProvider style={{ backgroundColor: color.background }}>
      <NavigationApp />
    </SafeAreaProvider>
  );
}


export default App;
