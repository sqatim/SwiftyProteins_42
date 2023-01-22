import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import * as LocalAuthentication from "expo-local-authentication";
import AuthenticatePopup from "./AuthenticatePopup";

export const stateType = {
  INITIAL: "initial",
  FALSE: "false",
  TRUE: "true",
};

export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ state: stateType.INITIAL, message: "" });
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const checkSensor = async () => {
      const result = await LocalAuthentication.isEnrolledAsync();
      if (!result) navigation.navigate("Ligands");
      setLoader(false);
    };
    checkSensor();
  }, []);

  const authenticateFunction = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    console.log(result);
    if (result.success) {
      setData({
        state: stateType.TRUE,
        message: "Authentication successful. Welcome!",
      });
    } else {
      setData({
        state: stateType.FALSE,
        message: "Authentication failed. Please try again.",
      });
    }
    setVisible(true);
  };
  if (loader) return null;
  return (
    <HomeStyle>
      <ButtonViewStyle>
        <AuthenticateButtonStyle onPress={authenticateFunction}>
          <AuthenticateButtonTextStyle>
            Authenticate
          </AuthenticateButtonTextStyle>
        </AuthenticateButtonStyle>
      </ButtonViewStyle>
      <AuthenticatePopup
        visible={visible}
        setVisible={setVisible}
        data={data}
        setData={setData}
        navigate={navigation.navigate}
      />
    </HomeStyle>
  );
}

const HomeStyle = styled.View`
  flex: 1;
  justify-content: center;
  /* background-color: red; */
  align-items: center;
`;

const ButtonViewStyle = styled.View`
  background-color: #fff;
  width: 150px;
  height: 50px;
  elevation: 20;
  border-radius: 15px;
  shadow-color: #000;
`;
const AuthenticateButtonStyle = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const AuthenticateButtonTextStyle = styled.Text``;
