import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default function Switch({
  selectionMode,
  roundCorner,
  options,
  activeOption,
  marginBottom,
  switchOption,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (val) => {
    setSelectionMode(val);
    // onSelectSwitch(val);
  };

  useEffect(() => {
    // console.log("active Option:", activeOption);
  }, [activeOption]);
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
  /* background-color: red; */
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
