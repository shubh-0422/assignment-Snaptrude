import React from "react";
import {
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector4,
} from "@babylonjs/core";
import SceneComponent from "babylonjs-hook"; 
let box;

const onSceneReady = (scene, texturePath) => {
  var camera = new ArcRotateCamera(
    "camera1",
    0,
    0,
    0,
    new Vector3(0, 0, -10),
    scene
  )
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  let faceUV = new Array(6);
  faceUV.fill(new Vector4(0, 0, 1, 1));
  faceUV[0] = new Vector4(0, 0, -1, -1);

  box = MeshBuilder.CreateBox(
    "box",
    { width: 5, height: 5, faceUV: faceUV },
    scene
  );
  var mapMaterial = new StandardMaterial("mapMaterial", scene);
  mapMaterial.diffuseTexture = new Texture(`${texturePath}`, scene);
  box.material = mapMaterial;

  box.position.y = 0;

  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

const RenderScene = ({ texturePath }) => (
  <div>
    <SceneComponent
      antialias
      onSceneReady={(scene) => {
        onSceneReady(scene, texturePath);
      }}
      onRender={onRender}
      id="my-canvas"
      style={{  height: '800px',width:' 100%', }}
    />
  </div>
);

export default RenderScene;
