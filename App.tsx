import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';

import { Gallery } from './src/screens/main/Gallery';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { MenuHead } from './src/components/Menu';
import { MenuProvider } from 'react-native-popup-menu';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
       <MenuProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{
          headerTitleAlign: 'center', contentStyle: {
            borderTopColor: "white",
            borderTopWidth: 3,
          }
        }} >
          <Stack.Screen name='КотоГалерея' component={Gallery} options={{
            headerStyle: {
              backgroundColor: 'black'
            },
            headerTintColor: '#fff',
            headerTitle: (props) => (<View style={styles.headerPanel}>
              <MenuHead />
              <View style={styles.header}>

                <Image
                  style={styles.headerImg}
                  source={require('./src/resources/logo.webp')}
                />
                <Image
                  style={styles.headerText}
                  source={require('./src/resources/logoText.png')}
                />
              </View>
            </View>
            )
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      </MenuProvider>
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
  headerPanel: {
    flex: 1,
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    width: 200,
    height: 50,
  },
  headerImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
  }
})

export default App;