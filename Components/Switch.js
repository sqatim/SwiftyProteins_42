import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default function Switch({
  navigation,
  selectionMode,
  roundCorner,
  options,
  activeOption,
  onSelectSwitch,
  selectionColor,
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
    <SwitchContainerStyle>
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
  background-color: white;
  /* background-color: red; */
  width: 215px;
  height: 44px;
  align-items: center;
  justify-content: space-around;
  border-radius: 25px;
  padding: 3px;
  overflow: hidden;
`;

const ToucheButtonStyle = styled.TouchableOpacity`
  background-color: ${({ active }) => (active ? "#0fa6f2" : "white")};
  border-radius: ${({ active }) => (active ? "25px" : "0px")};
  /* background-color: blue; */
  flex: 1;
  height: 100%;
  /* border-radius: 25px; */
  justify-content: center;
  align-items: center;
`;

const ToucheButtonTextStyle = styled.Text`
  color: ${({ active }) => (active ? "white" : "#0b65c2")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;
