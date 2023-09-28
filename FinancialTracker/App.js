import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Reminders from './components/Reminders';
import Financials from './components/Financials';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <>
    <ExpoStatusBar style='auto'/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Reminders' component={Reminders} options={({navigation}) => ({
            headerRight: () => <Ionicons name="calculator" size={30} onPress={() => navigation.navigate(Financials)}/>
          })}/>
          <Stack.Screen name='Financials' component={Financials} options={{
            headerBackTitle: 'Back',
            headerRight: ({color, size}) => <Ionicons name="add-circle" color={color} size={25} onPress={() => Alert.alert('Add')}/>
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
