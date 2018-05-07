import FirstPersonControls from "first-person-controls";
import Field from "./Field";
import Champion from "./Character1";
import Character2 from "./Character2";
import hhb from '../10.fbx';

export default class Battle {

    constructor(container, worldWidth, worldHeight, scale) {
        console.log(this);
        this.clock = new window.THREE.Clock();
        this.width = worldHeight * scale;
        this.height = worldWidth * scale;
        this.scene = new window.THREE.Scene();

        const axes = new window.THREE.AxesHelper(20);
        this.scene.add(axes);

        this.initLight();
        this.initCamera();
        // this.createField();
        this.createChampion2();

        // this.initControls();
        // this.camera.position.set()

        this.renderer = new window.THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById(container).appendChild(this.renderer.domElement);
    }

    initControls() {

        this.controls = new FirstPersonControls(this.camera);
        this.controls.movementSpeed = 10;
        this.controls.lookSpeed = 0.125;
        // this.controls.lookVertical = true;
        // this.controls.constrainVertical = true;
        // this.controls.verticalMin = 1.1;
        // this.controls.verticalMax = 2.2;
    }

    initLight() {
        const ambientLight = new window.THREE.AmbientLight(0xffffff); // soft white light
        this.scene.add(ambientLight);
        const directionalLight = new window.THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, -10, 10);
        this.scene.add(directionalLight);

        // this.spotLight = new THREE.SpotLight(0xffffff);
        // this.spotLight.position.set(0, 0, 20);
        // this.spotLight.lookAt(this.scene.position);
        // this.scene.add(this.spotLight);
    }

    initCamera() {
        this.camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, -6, 0);
        this.camera.lookAt(new window.THREE.Vector3(0, 0, 0));
    }

    createField() {
        new Field(this.scene);
    }

    // createChampion() {
    //     var onProgress = function (xhr) {
    //         if (xhr.lengthComputable) {
    //             var percentComplete = xhr.loaded / xhr.total * 100;
    //             console.log(Math.round(percentComplete, 2) + '% downloaded');
    //         }
    //     };
    //     THREE.Loader.Handlers.add(/\.dds$/i, new DDSLoader());
    //
    //     var onError = function (xhr) {
    //     };
    //     new MTLLoader()
    //         .load(vincentmtl, (materials) => {
    //             materials.preload();
    //             new OBJLoader()
    //                 .setMaterials(materials)
    //                 .load(vincentobj, (object) => {
    //
    //                     object.position.y = -1;
    //                     object.rotation.x = Math.PI / 2;
    //                     object.scale.set(0.01, 0.01, 0.01);
    //                     this.scene.add(object);
    //
    //                 }, onProgress, onError);
    //
    //         });
    //     // this.champion = new Character2(this.scene);
    // }

    createChampion2() {
        this.mixers = [];
        var loader = new window.THREE.FBXLoader();
        console.log('siema');
        loader.load(hhb, (object) => {
            console.log('witam');

            object.mixer = new window.THREE.AnimationMixer(object);
            this.mixers.push(object.mixer);

            var action = object.mixer.clipAction(object.animations[0]);
            action.play();

            object.traverse(function (child) {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }

            });
            object.rotation.x = Math.PI / 2;
            object.scale.set(0.01, 0.01, 0.01);
            console.log(object);
            this.scene.add(object);

        });
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.delta = this.clock.getDelta();
        if (this.mixers.length > 0) {
            // console.log('elo')

            for (var i = 0; i < this.mixers.length; i++) {

                this.mixers[i].update(this.delta);

            }

        }
        this.render();
        // this.champion.mesh.rotation.x = (this.champion.mesh.rotation.x + 0.02 );
        // this.champion.mesh.rotation.y -= 0.05;
    };

    render() {
        if (this.controls) {
            this.controls.update(this.delta);
        }
        this.renderer.render(this.scene, this.camera);
    }
}