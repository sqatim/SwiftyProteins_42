import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import {
  AmbientLight,
  SphereGeometry,
  PerspectiveCamera,
  Scene,
  Mesh,
  MeshStandardMaterial,
  CylinderGeometry,
  Vector3,
  BoxGeometry,
} from "three";
import { parsePdbFunction } from "../Utils/data";
import { useMyContext } from "./Context";
import Options from "./Options";
import OrbitControlsView from "./OrbitControlsView";
import Popup from "./Popup";
import ViewShot from "react-native-view-shot";
// import Share from "react-native-share";

import { TouchableOpacity, Text } from "react-native";
import Share from "react-native-share";

export default function RenderProtein({ route }) {
  const { ligand } = route.params;
  const [loader, setLoader] = useState(true);
  const [rerenderState, setRerenderState] = useState("false");
  const [objects, setObjects] = useState([]);
  const [visible, setVisible] = useState(false);
  const [atomData, setAtomData] = useState({});
  // atoms, serials, connectData
  const [parse, setParse] = useState({});
  const { data, activeColor, activeModelisation, orientation } = useMyContext();
  const [widthHeight, setWidthHeight] = useState({});
  const scene = useRef();
  const camera = useRef();
  const shotRef = useRef();

  useEffect(() => {
    parsePdbFunction(ligand).then((value) => {
      setParse(value);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    setRerenderState((prev) => (prev === "true" ? "false" : "true"));
  }, [activeColor, activeModelisation, orientation]);

  const intersect = ({ nativeEvent }) => {
    const { locationX: x, locationY: y } = nativeEvent;
    const mouse3D = new THREE.Vector3(
      (x / widthHeight.width) * 2 - 1,
      -(y / widthHeight.height) * 2 + 1,
      0.5
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, camera.current);
    const intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      setAtomData(JSON.parse(intersects[0].object.name));
      setVisible(true);
    }
  };
  const onContextCreate = (gl) => {
    scene.current = new Scene();
    console.log("rerenderd");
    camera.current = new PerspectiveCamera(
      orientation == "Portrait" ? 55 : 30,
      // 0.5,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    // console.log(gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };
    // console.log(gl);
    camera.current.position.z = orientation == "Portrait" ? 40 : 25;
    // camera.position.y = 50;
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // renderer.setClearColor("#fff");

    const createElement = (element) => {
      let atom = element.element;
      if (atom[1]) atom = atom[0] + atom[1].toLowerCase();

      const color = data[atom];
      // console.log("color:", color);
      let geometry;
      if (activeModelisation == "Cube")
        geometry = new BoxGeometry(0.6, 0.6, 0.6);
      else geometry = new SphereGeometry(0.5);
      const material = new MeshStandardMaterial({
        color: "#" + color[activeColor],
      });
      const item = new Mesh(geometry, material);
      item.position.set(element.x, element.y, element.z);
      item.name = JSON.stringify({
        name: color.name,
        element: element.element,
        discoverdBy: color.discoverd_by,
        phase: color.phase,
        color: color[activeColor],
      });
      scene.current.add(item);
      setObjects((prev) => [...prev, item]);
    };

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
      scene.current.add(cylinder);
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
    scene.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    scene.current.add(directionalLight);
    const render = () => {
      requestAnimationFrame(render);
      // camera.updateMatrixWorld();
      // console.log(scene);
      // setCameraState(camera);
      renderer.render(scene.current, camera.current);
      gl.endFrameEXP();
    };
    render();
  };
  const share = async () => {
    // console.log(shotRef);
    try {
      await shotRef.current.capture().then(async (uri) => {
        console.log(uri);
        Share.open({ message: "hi", title: "diana" }).then((res) =>
          console.log(res)
        );
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <RenderProteinStyle>
      {!loader && (
        <>
          <Options />
          <TouchableOpacity onPress={share}>
            <Text>salam</Text>
          </TouchableOpacity>
          {/* {activeColor && ( */}
          <OrbitControlsView
            // key={rerenderState}
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
              setWidthHeight({
                width: width,
                height: height,
              });
              console.log("just for test:", x, y, width, height);
            }}
            style={{ flex: 1 }}
            camera={camera.current}
            onTouchEndCapture={(event) => {
              intersect(event);
            }}
          >
            <ViewShot
              ref={shotRef}
              options={{ format: "jpg", quality: 0.9 }}
              style={{
                width: widthHeight.width,
                height: widthHeight.height,
              }}
            >
              <GLView
                key={rerenderState}
                onContextCreate={onContextCreate}
                style={{ flex: 1 }}
              />
            </ViewShot>
          </OrbitControlsView>
          <Popup
            visible={visible}
            setVisible={setVisible}
            atomData={atomData}
            setAtomData={setAtomData}
          />
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
