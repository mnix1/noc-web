import * as THREE from 'three';
import FirstPersonControls from "first-person-controls";
import Field from "./Field";

export default class Battle {

    constructor(container, worldWidth, worldHeight, scale) {
        console.log(this);
        this.width = worldHeight * scale;
        this.height = worldWidth * scale;
        this.scene = new THREE.Scene();

        const axes = new THREE.AxesHelper(20);
        this.scene.add(axes);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        // this.camera.position.set(0, -20, 1);
        // this.camera.lookAt(new THREE.Vector3(0,0,1));
        //
        // this.camera = new THREE.OrthographicCamera(-40, 40, 40, -40, 1, 1000);
        this.camera.position.set(0, -40, 10);
        this.camera.lookAt(new THREE.Vector3(0, -30, 0));

        this.createField();
        this.createChampion();
        // this.initControls();
        // this.camera.position.set()

        const ambientLight = new THREE.AmbientLight(0xaaaaaa); // soft white light
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 0, 100);
        this.scene.add(directionalLight);

        // this.spotLight = new THREE.SpotLight(0xffffff);
        // this.spotLight.position.set(0, 0, 20);
        // this.spotLight.lookAt(this.scene.position);
        // this.scene.add(this.spotLight);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById(container).appendChild(this.renderer.domElement);
    }

    initControls() {
        this.clock = new THREE.Clock();
        this.controls = new FirstPersonControls(this.camera);
        this.controls.movementSpeed = 10;
        this.controls.lookSpeed = 0.125;
        // this.controls.lookVertical = true;
        // this.controls.constrainVertical = true;
        // this.controls.verticalMin = 1.1;
        // this.controls.verticalMax = 2.2;
    }

    createField() {
        new Field(this.scene);
    }

    createChampion() {
        const geometry = new THREE.SphereGeometry(2, 20, 20);
        const material = new THREE.MeshPhongMaterial({color: 0xff0f00});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -36, 2);
        this.champion = mesh;
        this.scene.add(mesh);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    };

    render() {
        if (this.controls) {
            this.controls.update(this.clock.getDelta());
        }
        this.renderer.render(this.scene, this.camera);
    }
}