import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

import { Gallery } from './src/screens/main/Gallery';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', contentStyle: {
          borderTopColor: "white",
          borderTopWidth: 3,
        }}} >
          <Stack.Screen name='КотоГалерея' component={Gallery} options={{
            headerStyle: {
              backgroundColor: 'black'
            },
            headerTintColor: '#fff',
            headerTitle: (props) => (<View style={styles.header}>
              <Image
                style={styles.headerImg}
                source={require('./src/resources/logo.webp')}
              />
              <Image
                style={styles.headerText}
                source={require('./src/resources/logoText.png')}
              />
            </View>
            )
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    
  },
  header: {
    //backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    
  },
  headerText: {
    width: 200, 
    height: 50,
  },
  headerImg: {
    width: 50, 
    height: 50,
    borderRadius: 10
  }
})

export default App;