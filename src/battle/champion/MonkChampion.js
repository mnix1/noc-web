import * as THREE from 'three';
import FBXLoader from "../../loader/FBXLoader";
import monkWalking from '../../content/fbx/monk/monkWalking.fbx';
import monkIdle from '../../content/fbx/monk/monkIdle.fbx';
import monk from '../../content/fbx/monk/monkT.fbx';

export default class MonkChampion {
    constructor(onLoad) {
        this.onLoad = onLoad;
        this.load(monk, [monkIdle, monkWalking]);
    }

    place() {
        this.mesh.rotation.x = Math.PI / 2;
        this.mesh.scale.set(0.01, 0.01, 0.01);
    }

    load(baseSource, animationSources) {
        const animations = [];
        new FBXLoader().load(baseSource, (baseObject) => {
            console.log('baseObject', baseObject);
            this.mesh = baseObject;
            baseObject.mixer = new THREE.AnimationMixer(baseObject);
            this.mixer = baseObject.mixer;
            animationSources.forEach(animationSource => {
                new FBXLoader().load(animationSource, (animationObject) => {
                    console.log('animationObject', animationObject);
                    animations.push(animationObject.animations[0]);
                    const action = baseObject.mixer.clipAction(animations[0]);
                    action.play();
                });
            });
            this.onLoad(this);
            // this.scene.add(baseObject);
        });
    }

}