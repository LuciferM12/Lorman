import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './app/navigation/RootNavigator';
import 'global.css'

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}