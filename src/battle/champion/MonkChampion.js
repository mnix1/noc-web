import * as THREE from 'three';
import FBXLoader from "../../loader/FBXLoader";
import monkWalk from '../../content/fbx/monk/monkWalk.fbx';
import monkIdle from '../../content/fbx/monk/monkIdle.fbx';
import monk from '../../content/fbx/monk/monkT.fbx';
import _ from 'lodash';

export default class MonkChampion {
    constructor(onLoad) {
        this.onLoad = onLoad;
        this.baseSource = monk;
        this.animationSources = {idle: monkIdle, walk: monkWalk};
        this.animations = {};
        this.load();
    }

    place() {
        this.mesh.rotation.x = Math.PI / 2;
        this.mesh.scale.set(0.01, 0.01, 0.01);
    }

    playAnimation(key) {
        const action = this.mesh.mixer.clipAction(this.animations[key]);
        action.play();
    }

    updateMixer(delta) {
        if (this.mesh && this.mesh.mixer) {
            this.mesh.mixer.update(delta);
        }
    }

    load() {
        const animationPromises = _.map(this.animationSources, (value, key) => {
            return new Promise((resolve, reject) => {
                new FBXLoader().load(value, (animationObject) => {
                    this.animations[key] = animationObject.animations[0];
                    resolve();
                });
            });
        });
        new Promise((resolve, reject) => {
            new FBXLoader().load(this.baseSource, (baseObject) => {
                this.mesh = baseObject;
                this.mesh.mixer = new THREE.AnimationMixer(this.mesh);
                resolve(baseObject);
            });
        }).then(() => {
            Promise.all(animationPromises).then(() => {
                this.onLoad(this);
            })
        });

        // const animations = [];
        // new FBXLoader().load(baseSource, (baseObject) => {
        //     console.log('baseObject', baseObject);
        //     this.mesh = baseObject;
        //     baseObject.mixer = new THREE.AnimationMixer(baseObject);
        //     this.mixer = baseObject.mixer;
        //     animationSources.forEach(animationSource => {
        //         new FBXLoader().load(animationSource, (animationObject) => {
        //             console.log('animationObject', animationObject);
        //             animations.push(animationObject.animations[0]);
        //             const action = baseObject.mixer.clipAction(animations[0]);
        //             action.play();
        //         });
        //     });
        //     this.onLoad(this);
        //     // this.scene.add(baseObject);
        // });
    }

}