import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LigandsList from "./LigandsList";
import React from "react";
import RenderProtein from "./RenderProtein";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Ligands" component={LigandsList} />
        <Stack.Screen name="RenderProtein" component={RenderProtein} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
