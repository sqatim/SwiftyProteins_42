import React, { useEffect, useRef, useState } from "react";
import { Image, Modal } from "react-native";
import styled from "styled-components/native";
import { stateType } from "../Utils/data";

export default function AuthenticatePopup({
  visible,
  setVisible,
  data,
  setData,
  navigate,
}) {
  const icons = {
    true: require("../assets/success.png"),
    false: require("../assets/failed.png"),
  };
  const timeOutRef = useRef();
  const closePopup = () => {
    clearTimeout(timeOutRef.current);
    if (data.state == stateType.TRUE) {
      navigate("Ligands");
    }
    setData({ error: stateType.INITIAL, message: "" });
    setVisible(false);
  };

  useEffect(() => {
    if (data.state == stateType.TRUE) {
      timeOutRef.current = setTimeout(() => {
        navigate("Ligands");
        setData({ state: stateType.INITIAL, message: "" });
        setVisible(false);
      }, 5000);
    }
  }, [data]);
  if (data.state == stateType.INITIAL) return null;
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <ModalStyle>
        <ModalContentStyle>
          <CloseButtonStyle onPress={closePopup}>
            <Image
              source={require("../assets/close.png")}
              style={{ height: 15, width: 15 }}
            />
          </CloseButtonStyle>
          <IconStyle source={icons[data.state]} />
          <MessageStyle>{data.message}</MessageStyle>
        </ModalContentStyle>
      </ModalStyle>
    </Modal>
  );
}

const ModalStyle = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContentStyle = styled.View`
  width: 80%;
  background-color: white;
  /* height: 50px; */
  padding: 20px 20px 0;
  border-radius: 20px;
  elevation: 20;
`;

const CloseButtonStyle = styled.TouchableOpacity`
  align-self: flex-end;
`;

const IconStyle = styled.Image`
  width: 70px;
  height: 70px;
  align-self: center;
  margin-bottom: 20px;
`;

const MessageStyle = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
  font-size: 20px;
`;
