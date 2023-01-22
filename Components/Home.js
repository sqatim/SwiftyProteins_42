import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

export default function Home() {
  return (
    <HomeStyle>
      <ButtonViewStyle>
        <AuthenticateButtonStyle>
          <AuthenticateButtonTextStyle>
            Authenticate
          </AuthenticateButtonTextStyle>
        </AuthenticateButtonStyle>
      </ButtonViewStyle>
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
