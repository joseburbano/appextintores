import React, {useMemo, useState} from "react";
import {StatusBar} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';
import Navigation from "./app/navigation/Navigation";
import PreferencesContext from './app/context/PreferencesContext';
import { navigationRef } from "./app/navigation/RootNavigation";
import Toast from 'react-native-toast-message';
import Colores from './app/styles/Colors';

export default function App() {
  const [theme, setTheme] = useState('light');

  //modificamos colores paper
  DefaultThemePaper.colors.primary = Colores.WHITE;
  DarkThemePaper.colors.primary = Colores.BLUE2
  DarkThemePaper.colors.accent = Colores.BLUE2;

  //modificamos colores de navigation
  DarkThemeNavigation.colors.background = Colores.DARK;
  DefaultThemeNavigation.colors.card = Colores.WHITE;

  //estado global para saber cual thema tiene
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );

  return (
    <PreferencesContext.Provider value={preference}>
      <PaperProvider
        theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
         <NavigationContainer ref={navigationRef} theme={
            theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation
          }>
      <Navigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
        
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
