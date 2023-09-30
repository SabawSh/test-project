import { Injectable } from '@angular/core';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';


@Injectable({
  providedIn: 'root'
})
export class ThreeConfigService {

  public svgObject!: THREE.Group<THREE.Object3DEventMap>;

  constructor() { }

  public renderSVG = (svgPath: string, defaultExtrusion: number, fillColor: string, stokeColor: string) => {
    const fillMaterial = new THREE.MeshBasicMaterial({ color: fillColor });
    const stokeMaterial = new THREE.LineBasicMaterial({
      color: stokeColor
    });
    const loader = new SVGLoader();
    const svgGroup = new THREE.Group();
    const updateMap: any[] = [];

    svgGroup.scale.y *= -1;

    loader.load(
      // resource URL
      svgPath,
      // called when the resource is loaded
      (data) => {

        const paths = data.paths;
        const group = new THREE.Group();

        for (let i = 0; i < paths.length; i++) {

          const path = paths[i];

          const material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false
          });

          paths.forEach((path) => {
            const shapes = SVGLoader.createShapes(path);

            shapes.forEach((shape) => {
              const meshGeometry = new THREE.ExtrudeGeometry(shape, {
                depth: defaultExtrusion,
                bevelEnabled: false
              });
              const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
              const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
              const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);

              updateMap.push({ shape, mesh, lines });
              svgGroup.add(mesh, lines);
            });
          });

          const box = new THREE.Box3().setFromObject(svgGroup);
          const size = box.getSize(new THREE.Vector3());
          const yOffset = size.y / -2;
          const xOffset = size.x / -2;

          // Offset all of group's elements, to center them
          svgGroup.children.forEach((item) => {
            item.position.x = xOffset;
            item.position.y = yOffset;
          });
          svgGroup.rotateX(0);
          svgGroup.rotateY(0)
          svgGroup.rotateZ(0)


        }
      })
    return {
      object: svgGroup,
      update(extrusion: any) {
        updateMap.forEach((updateDetails) => {
          const meshGeometry = new THREE.ExtrudeGeometry(
            updateDetails.shape,
            {
              depth: extrusion,
              bevelEnabled: false
            }
          );
          const linesGeometry = new THREE.EdgesGeometry(meshGeometry);

          updateDetails.mesh.geometry.dispose();
          updateDetails.lines.geometry.dispose();
          updateDetails.mesh.geometry = meshGeometry;
          updateDetails.lines.geometry = linesGeometry;
        });
      }
    };



  };

  public setupScene = (container: HTMLElement) => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(container.clientWidth, container.clientWidth);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0";

    document.body.appendChild(labelRenderer.domElement);








    const controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 100;
    scene.add(camera);
    const ambientLight = new THREE.AmbientLight("#888888");
    const pointLight = new THREE.PointLight("#ffffff", 2, 800);
    // const controls = new OrbitControls(camera, renderer.domElement);
    const animate = () => {
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      controls.update();

      requestAnimationFrame(animate);
    };

    renderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    scene.add(ambientLight, pointLight);
    camera.position.z = 100;

    controls.enablePan = true;

    container.append(renderer.domElement);
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    animate();

    return scene;
  };



}
