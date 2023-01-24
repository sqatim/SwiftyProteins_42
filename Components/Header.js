import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useMyContext } from "./Context";
// import Share from "react-native-share";
// import RNFS from "react-native-fs";
import * as SecureStore from "expo-secure-store";

export default function Header({ route, navigate, ligand }) {
  const { light, setLight, shotRef, shareRef } = useMyContext();
  const changeMode = async () => {
    const newMode = JSON.stringify({ light: !light });
    console.log(newMode);
    await SecureStore.setItemAsync("light", newMode);
    setLight((prev) => !prev);
  };
  const navigateToHome = (route) => {
    if (route != "Ligands" && route != "Home") navigate("Ligands");
  };

  const share = async () => {
    // shareRef.current = true;
    // console.log("share function");
    // try {
    //   await shotRef.current.capture().then(async (uri) => {
    //     RNFS.readFile(uri, "base64").then((res) => {
    //       let urlString = "data:image/jpeg;base64," + res;
    //       let options = {
    //         title: "Share Title",
    //         message: "this is a 3d visualization of the " + ligand + " protein",
    //         url: urlString,
    //         type: "image/jpeg",
    //       };
    //       Share.open(options)
    //         .then((res) => {
    //           //   console.log("result:", res);
    //           //   setShare(false);
    //         })
    //         .catch((err) => {
    //           shareRef.current = false;
    //           err && console.log(err);
    //         });
    //     });
    //   });
    // } catch (error) {
    //   console.log("error:", error);
    // }
  };

  return (
    <HeaderStyle>
      <LeftSideHeaderStyle>
        <TouchableOpacity onPress={() => navigateToHome(route)}>
          {light ? (
            <IconStyle source={require("../assets/blue.png")}></IconStyle>
          ) : (
            <IconStyle source={require("../assets/white.png")}></IconStyle>
          )}
        </TouchableOpacity>
        <HeaderTextStyle>{ligand ? ligand : "Swifty Proteins"}</HeaderTextStyle>
      </LeftSideHeaderStyle>
      <RightSideHeaderStyle>
        {route == "RenderProtein" && (
          <TouchableOpacity onPress={share}>
            {light ? (
              <ShareIconStyle
                source={require("../assets/sharingBlack.png")}
              ></ShareIconStyle>
            ) : (
              <ShareIconStyle
                source={require("../assets/sharingWhite.png")}
              ></ShareIconStyle>
            )}
          </TouchableOpacity>
        )}
        <ModeButtonStyle share={route == "RenderProtein"} onPress={changeMode}>
          {light ? (
            <ModeIconStyle
              source={require("../assets/lightMode.png")}
            ></ModeIconStyle>
          ) : (
            <ModeIconStyle
              source={require("../assets/darkMode.png")}
            ></ModeIconStyle>
          )}
        </ModeButtonStyle>
      </RightSideHeaderStyle>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.View`
  height: 60px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
  background-color: ${({ theme }) => theme.headerBackground};
  width: 100%;
`;

const LeftSideHeaderStyle = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconStyle = styled.Image`
  width: 29.8px;
  height: 35px;
  margin-right: 10px;
`;

const HeaderTextStyle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${({ theme }) => theme.color};
`;

const RightSideHeaderStyle = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ModeIconStyle = styled.Image`
  width: 30px;
  height: 30px;
  /* margin-right: 10px; */
`;
const ShareIconStyle = styled.Image`
  width: 28px;
  height: 28px;
  /* margin-right: 10px; */
`;

const ModeButtonStyle = styled.TouchableOpacity`
  margin-left: ${({ share }) => (share ? "40px" : "0px")};
`;
