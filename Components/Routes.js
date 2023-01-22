import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LigandsList from "./LigandsList";
import Home from "./Home";
import React from "react";
import RenderProtein from "./RenderProtein";
import { ThemeProvider } from "styled-components/native";
import { useMyContext } from "./Context";
import { theme } from "../Utils/theme";

const Stack = createNativeStackNavigator();

export default function Routes() {
  let { light } = useMyContext();

  return (
    <ThemeProvider theme={light ? theme.lightTheme : theme.darkTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Ligands" component={LigandsList} />
          <Stack.Screen name="RenderProtein" component={RenderProtein} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
