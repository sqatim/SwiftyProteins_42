import React, { useEffect } from "react";
import styled from "styled-components/native";

export default function SplashScreen({ light, setLight, setAppIsReady }) {
  useEffect(() => {
    setTimeout(() => {
      setAppIsReady(true);
    }, 5000);
  }, []);
  return (
    <SplashScreenStyle>
      <ImageBackgroundStyle
        light={light}
        source={
          light
            ? require("../assets/splashLightMode.png")
            : require("../assets/splashDarkMode.png")
        }
        resizeMode="contain"
      ></ImageBackgroundStyle>
    </SplashScreenStyle>
  );
}

const SplashScreenStyle = styled.View`
  flex: 1;
`;

const ImageBackgroundStyle = styled.ImageBackground`
  flex: 1;
  background-color: ${({ light }) => (light ? "#FFFFFF" : "#171223")};
`;
