import * as THREE from 'three';
import FBXLoader from "../../loader/FBXLoader";
import _ from 'lodash';

export default class Champion {
    constructor(onLoad, baseSource, animationSources) {
        this.onLoad = onLoad;
        this.baseSource = baseSource;
        this.animationSources = animationSources;
        this.animations = {};
        this.actions = {};
        this.load();
    }

    correctSize() {
        // this.mesh.rotation.y = Math.PI / 2;
        this.mesh.scale.set(0.02, 0.02, 0.02);
    }

    playAnimation(key) {
        const action = this.mesh.mixer.clipAction(this.animations[key]);
        action.play();
        this.actions[key] = action;
    }

    stopAnimation(key) {
        const action = this.actions[key];
        if (action) {
            action.stop();
            delete this.actions[key];
        }
    }

    stopAllAndPlayAnimation(playKey) {
        this.playAnimation(playKey);
        _.forEach(this.actions, (value, key) => {
            if(playKey !== key){
                value.stop();
                delete this.actions[key];
            }
        });
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