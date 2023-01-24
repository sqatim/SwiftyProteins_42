import React, { useEffect } from "react";
import styled from "styled-components/native";

export default function Switch({
  options,
  activeOption,
  marginBottom,
  switchOption,
}) {
  useEffect(() => {}, [activeOption]);
  return (
    <SwitchContainerStyle marginBottom={marginBottom}>
      {activeOption &&
        options.map((element, key) => (
          <ToucheButtonStyle
            key={key}
            active={element == activeOption}
            onPress={() => switchOption(element)}
          >
            <ToucheButtonTextStyle active={element == activeOption}>
              {element}
            </ToucheButtonTextStyle>
          </ToucheButtonStyle>
        ))}
    </SwitchContainerStyle>
  );
}

const SwitchContainerStyle = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.background};
  width: 215px;
  height: 44px;
  align-items: center;
  justify-content: space-around;
  border-radius: 25px;
  padding: 3px;
  overflow: hidden;
  border: 1px;
  border-color: ${({ theme }) => theme.borderColorItems};
  margin-bottom: ${({ marginBottom }) => marginBottom || "0px"};
  margin-top: ${({ marginBottom }) => marginBottom || "0px"};
`;

const ToucheButtonStyle = styled.TouchableOpacity`
  background-color: ${({ active, theme }) =>
    active ? "#0fa6f2" : theme.background};
  border-radius: ${({ active }) => (active ? "25px" : "0px")};
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ToucheButtonTextStyle = styled.Text`
  color: ${({ active, theme }) => (active ? "white" : theme.color)};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;
