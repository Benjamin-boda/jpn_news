import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Homepage } from "../components/Homepage";
import { News } from "../components/News";
import { Bookmarks } from "../components/Bookmarks";
import { ReviseWords } from "../components/ReviseWords";
import { Menu } from "../components/Menu";
import { NewsProvider } from "../context/context";
import { AuthProvider } from "../context/Auth";
import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();

const AppRouter = () => {
  return (
    <AuthProvider>
      <NewsProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="homepage" screenOptions={{headerShown: false}}>
            <Stack.Screen name="homepage" component={Homepage} />
            <Stack.Screen name="news" component={News} />
            <Stack.Screen name="bookmark" component={Bookmarks} />
            <Stack.Screen name="revise" component={ReviseWords} />
          </Stack.Navigator>
          <Menu/>
        </NavigationContainer>
      </NewsProvider>
    </AuthProvider>
  );
}

export default AppRouter;