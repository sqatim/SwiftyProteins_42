import React from "react";
import styled from "styled-components/native";
import { useMyContext } from "./Context";
import Switch from "./Switch";

export default function Options() {
  const {
    activeColor,
    setActiveColor,
    activeModelisation,
    setActiveModelisation,
  } = useMyContext();

  const switchColor = (color) => {
    setActiveColor(color);
  };

  const switchModelisation = (model) => {
    setActiveModelisation(model);
  };
  return (
    <OptionsCOntainer>
      <Switch
        options={["Jmol", "Rasmol"]}
        activeOption={activeColor}
        switchOption={switchColor}
      />
      <Switch
        options={["Sphere", "Cube"]}
        activeOption={activeModelisation}
        switchOption={switchModelisation}
      />
    </OptionsCOntainer>
  );
}

const OptionsCOntainer = styled.View``;
