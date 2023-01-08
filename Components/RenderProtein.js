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
} from "three";
import { parsePdbFunction } from "../Utils/data";
import { useMyContext } from "./Context";
import OrbitControlsView from "./OrbitControlsView";

export default function RenderProtein({ route }) {
  const { ligand } = route.params;
  const [loader, setLoader] = useState(true);
  const [parse, setParse] = useState([]);
  const { cpkColoring, data } = useMyContext();
  const [cameraState, setCameraState] = useState(null);

  useEffect(() => {
    parsePdbFunction(ligand).then((value) => {
      // console.log(value.atoms);
      setParse(value.atoms);
      setLoader(false);
    });
  }, []);
  // const camera = new PerspectiveCamera(75, 1080 / 1984, 0.1, 1000);
  const onContextCreate = (gl) => {
    const scene = new Scene();
    // scene.fog = new Fog("#3A96C4", 1, 10000);
    // scene.add(new GridHelper(10, 10));
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    console.log(gl.drawingBufferWidth);
    console.log(gl.drawingBufferHeight);
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };

    camera.position.z = 40;
    setCameraState(camera);
    // camera.position.y = 50;
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    // pointLight.position.set(0, 200, 200);
    // scene.add(pointLight);

    // const light = new DirectionalLight(0xffffff, 0.5);
    // light.position.set(3, 3, 3);
    // scene.add(light);
    // const spotLight = new SpotLight(0xffffff, 0.5);
    // spotLight.position.set(0, 0, 0);
    // spotLight.lookAt(0, 0, 0);
    // scene.add(spotLight);

    // const geometry = new BoxGeometry(1, 1, 1);

    const createElement = (element) => {
      const color = data[element.element];
      const geometry = new SphereGeometry(0.5);
      const material = new MeshStandardMaterial({
        color: "#" + color[cpkColoring],
      });
      const sphere = new Mesh(geometry, material);
      sphere.position.set(element.x, element.y, element.z);
      scene.add(sphere);
    };
    const coordonate = [];
    parse.map((element, key) => {
      createElement(element);
    });

    const CreateChemicalBond = (startPoint, endPoint) => {
      var cylLength = new Vector3().subVectors(endPoint, startPoint).length(); // find the length of a cylinder
      console.log(cylLength);
      const geometry = new CylinderGeometry(0.2, 0.2, cylLength);
      geometry.translate(0, cylLength / 2, 0);
      geometry.rotateX(Math.PI / 2);
      const material = new MeshStandardMaterial({
        color: 0xff0000,
      });
      const cylinder = new Mesh(geometry, material);
      cylinder.position.set(startPoint.x, startPoint.y, startPoint.z);
      cylinder.lookAt(endPoint);
      scene.add(cylinder);
    };

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
        <OrbitControlsView style={{ flex: 1 }} camera={cameraState}>
          <GLView onContextCreate={onContextCreate} style={{ flex: 1 }} />
        </OrbitControlsView>
      )}
      {/* <TextStyle>{ligand}</TextStyle> */}
    </RenderProteinStyle>
  );
}

const RenderProteinStyle = styled.View`
  flex: 1;
`;

const TextStyle = styled.Text``;
