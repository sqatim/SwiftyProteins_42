import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  // BoxGeometry,
  AmbientLight,
  SphereGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Mesh,
  PointLight,
  SpotLight,
  GridHelper,
  Fog,
  DirectionalLight,
  MeshStandardMaterial,
  CylinderGeometry,
  Vector3,
  BoxGeometry,
} from "three";
import { parsePdbFunction } from "../Utils/data";
import { useMyContext } from "./Context";
import Options from "./Options";
import OrbitControlsView from "./OrbitControlsView";
import Switch from "./Switch";

export default function RenderProtein({ route }) {
  const { ligand } = route.params;
  const [loader, setLoader] = useState(true);
  const [rerenderState, setRerenderState] = useState("false");
  // atoms, serials, connectData
  const [parse, setParse] = useState({});
  const {
    data,
    activeColor,
    setActiveColor,
    activeModelisation,
    setActiveModelisation,
  } = useMyContext();
  const [cameraState, setCameraState] = useState(null);

  useEffect(() => {
    parsePdbFunction(ligand).then((value) => {
      setParse(value);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    setRerenderState((prev) => (prev === "true" ? "false" : "true"));
  }, [activeColor, activeModelisation]);

  const scene = new Scene();
  const camera = new PerspectiveCamera(65);
  const onContextCreate = (gl) => {
    console.log("rerenderd");
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    console.log(gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };

    camera.position.z = 40;
    setCameraState(camera);
    // camera.position.y = 50;
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const createElement = (element) => {
      const color = data[element.element];
      let geometry;
      if (activeModelisation == "Cube")
        geometry = new BoxGeometry(0.6, 0.6, 0.6);
      else geometry = new SphereGeometry(0.5);
      const material = new MeshStandardMaterial({
        color: "#" + color[activeColor],
      });
      const item = new Mesh(geometry, material);
      item.position.set(element.x, element.y, element.z);
      scene.add(item);
    };
    const coordonate = [];
    parse.atoms.map((element, key) => {
      createElement(element);
    });

    const CreateChemicalBond = (startPoint, endPoint) => {
      var cylLength = new Vector3().subVectors(endPoint, startPoint).length(); // find the length of a cylinder
      const geometry = new CylinderGeometry(0.2, 0.2, cylLength);
      geometry.translate(0, cylLength / 2, 0);
      geometry.rotateX(Math.PI / 2);
      const material = new MeshStandardMaterial({
        color: 0xffffff,
      });
      const cylinder = new Mesh(geometry, material);
      cylinder.position.set(startPoint.x, startPoint.y, startPoint.z);
      cylinder.lookAt(endPoint);
      scene.add(cylinder);
    };

    parse.connectData.forEach((element, key) => {
      let startPoint;
      let endPoint;
      element.forEach((item, id, arr) => {
        const { x, y, z } = parse.serials[item];
        if (id == 0) startPoint = new Vector3(x, y, z);
        else {
          endPoint = new Vector3(x, y, z);
          CreateChemicalBond(startPoint, endPoint);
        }
      });
    });

    const ambientLight = new AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    scene.add(directionalLight);

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <RenderProteinStyle>
      {!loader && (
        <>
          <Options />
          {/* {activeColor && ( */}
          <OrbitControlsView style={{ flex: 1 }} camera={cameraState}>
            <GLView
              key={rerenderState}
              onContextCreate={onContextCreate}
              style={{ flex: 1 }}
            />
          </OrbitControlsView>
          {/* )} */}
        </>
      )}
      {/* <TextStyle>{ligand}</TextStyle> */}
    </RenderProteinStyle>
  );
}

const RenderProteinStyle = styled.View`
  flex: 1;
`;

const TextStyle = styled.Text``;
