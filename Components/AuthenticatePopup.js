import React, { useEffect } from "react";
import { Image, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { stateType } from "./Home";

export default function AuthenticatePopup({
  visible,
  setVisible,
  data,
  setData,
  navigate,
}) {
  const closePopup = () => {
    if (data.state == stateType.TRUE) {
      navigate("Ligands");
    }
    setData({ error: stateType.INITIAL, message: "" });
    setVisible(false);
  };

  useEffect(() => {
    if (data.state == stateType.TRUE) {
      setTimeout(() => {
        console.log("diana");
        if (data.state == false) navigate("Ligands");
        setData({ error: false, message: "" });
        setVisible(false);
      }, 5000);
    }
  }, [data]);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        // console.log("toto");
      }}
    >
      <ModalStyle>
        <ModalContentStyle>
          <CloseButtonStyle onPress={closePopup}>
            <Image
              source={require("../assets/close.png")}
              style={{ height: 15, width: 15 }}
            />
          </CloseButtonStyle>
          {/* <IconStyle/> */}
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

const IconStyle = styled.Image``;

const MessageStyle = styled.Text`
  font-weight: bold;
  text-align: center;
`;

const ContentItemStyle = styled.View`
  width: 100%;
  flex-direction: row;
  margin: 20px 0;
  justify-content: space-between;
`;

const KeyTextStyle = styled.Text``;
const ValueTextStyle = styled.Text`
  font-weight: bold;
`;
