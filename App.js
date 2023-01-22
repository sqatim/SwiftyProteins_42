// import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import Context from "./Components/Context";
import SplashScreen from "./Components/SplashScreen";
import LigandsList from "./Components/LigandsList";
import Routes from "./Components/Routes";
import * as SecureStore from "expo-secure-store";

// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [light, setLight] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        let result = await SecureStore.getItemAsync("light");
        if (result) {
          result = JSON.parse(result);
          setLight(result.light);
        } else setLight(true);
        console.log(result);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={light ? "#0b65c2" : "#171223"}
        hidden={false}
      />
      {!appIsReady ? (
        <SplashScreen
          light={light}
          setLight={setLight}
          setAppIsReady={setAppIsReady}
        />
      ) : (
        <Context light={light} setLight={setLight}>
          <ContentStyle>
            <Routes />
          </ContentStyle>
        </Context>
      )}
    </SafeAreaView>
  );
}

// const ContainerStyle = styled.View`
//   flex: 1;
// `;

const ContentStyle = styled.View`
  flex: 1;
  width: 100%;
  background-color: #fff;
`;
