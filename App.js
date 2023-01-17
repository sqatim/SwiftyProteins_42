// import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import Context from "./Components/Context";
import LigandsList from "./Components/LigandsList";
import Routes from "./Components/Routes";

export default function App() {
  useEffect(() => {
    console.log("StatusBar.currentHeight:", StatusBar.currentHeight);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#61dafb" hidden={false} />
      <Context>
        <ContentStyle>
          <Routes />
        </ContentStyle>
      </Context>
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
