import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import * as LocalAuthentication from "expo-local-authentication";
import AuthenticatePopup from "./AuthenticatePopup";
import { stateType } from "../Utils/data";
import Header from "./Header";

export default function Home({ navigation, route }) {
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
      <Header route={route.name} navigate={navigation.navigate} />
      <ContentStyle>
        <ButtonViewStyle>
          <AuthenticateButtonStyle onPress={authenticateFunction}>
            <AuthenticateButtonTextStyle>
              Authenticate
            </AuthenticateButtonTextStyle>
          </AuthenticateButtonStyle>
        </ButtonViewStyle>
      </ContentStyle>
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
  background-color: ${({ theme }) => theme.background};
  /* justify-content: center; */
  align-items: center;
`;

const ButtonViewStyle = styled.View`
  background-color: #fff;
  width: 150px;
  height: 50px;
  elevation: 20;
  border-radius: 15px;
  shadow-color: #000;
  border: 1px;
  border-color: ${({ theme }) => theme.borderColorItems};
  background-color: ${({ theme }) => theme.background};
`;
const AuthenticateButtonStyle = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const AuthenticateButtonTextStyle = styled.Text`
  color: ${({ theme }) => theme.color};
`;

const ContentStyle = styled.View`
  flex: 1;
  background-color: inherit;
  justify-content: center;
`;
