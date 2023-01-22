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
  MeshMatcapMaterial,
} from "three";
import { parsePdbFunction } from "../Utils/data";
import { useMyContext } from "./Context";
import Options from "./Options";
import OrbitControlsView from "./OrbitControlsView";
import Popup from "./Popup";

import ViewShot from "react-native-view-shot";
import Header from "./Header";

export default function RenderProtein({ route, navigation }) {
  const { ligand } = route.params;
  const [loader, setLoader] = useState(false);
  const [rerenderState, setRerenderState] = useState("false");
  const [objects, setObjects] = useState([]);
  const [visible, setVisible] = useState(false);
  const [atomData, setAtomData] = useState({});
  // atoms, serials, connectData
  const {
    data,
    activeColor,
    activeModelisation,
    orientation,
    light,
    shotRef,
    parse,
  } = useMyContext();
  const [widthHeight, setWidthHeight] = useState({});
  const scene = useRef();
  const camera = useRef();

  useEffect(() => {
    // console.log("parse:", parse);
  }, []);
  useEffect(() => {
    setRerenderState((prev) => (prev === "true" ? "false" : "true"));
  }, [activeColor, activeModelisation, orientation, light]);

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
    renderer.setClearColor(light ? "#fff" : "#171223");

    const createElement = (element) => {
      let atom = element.element;
      if (atom[1]) atom = atom[0] + atom[1].toLowerCase();

      const color = data[atom];
      let geometry;
      if (activeModelisation == "Cube")
        geometry = new BoxGeometry(0.6, 0.6, 0.6);
      else geometry = new SphereGeometry(0.5);
      const material = new MeshMatcapMaterial({
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
      const material = new MeshMatcapMaterial({
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
    // console.log("Share");
    // try {
    //   await shotRef.current.capture().then(async (uri) => {
    //     RNFS.readFile(uri, 'base64').then((res) => {
    //       let urlString = 'data:image/jpeg;base64,' + res;
    //       let options = {
    //         title: 'Share Title',
    //         message: 'Share Message',
    //         url: urlString,
    //         type: 'image/jpeg',
    //       };
    //       Share.open(options)
    //         .then((res) => {
    //           console.log(res);
    //         })
    //         .catch((err) => {
    //           err && console.log(err);
    //         });
    //     });
    //   });
    // } catch (error) {
    //   console.log("error:", error);
    // }
  };
  return (
    <RenderProteinStyle>
      {!loader && (
        <>
          <Header
            route={route.name}
            navigate={navigation.navigate}
            ligand={ligand}
          />
          <Options />
          <OrbitControlsView
            key={rerenderState}
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
                flex: 1,
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
  background-color: ${({ theme }) => theme.background};
`;

const TextStyle = styled.Text``;
