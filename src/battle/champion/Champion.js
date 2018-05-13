import * as THREE from 'three';
import FBXLoader from "../../loader/FBXLoader";
import _ from 'lodash';

export default class Champion {
    constructor(baseSource, animationSources) {
        this.baseSource = baseSource;
        this.animationSources = animationSources;
        this.animations = {};
        this.actions = {};
    }

    correctSize() {
        // this.mesh.rotation.y = Math.PI / 2;
        this.mesh.scale.set(0.02, 0.02, 0.02);
    }

    playAnimation(key) {
        if (!this.actions[key]) {
            const action = this.mesh.mixer.clipAction(this.animations[key]);
            action.play();
            this.actions[key] = action;
        }
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
            if (playKey !== key) {
                value.stop();
                delete this.actions[key];
            }
        });
    }

    updateMixer(delta) {
        this.mesh.mixer.update(delta);
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
        return new Promise((resolve, reject) => {
            new FBXLoader().load(this.baseSource, (baseObject) => {
                this.mesh = baseObject;
                this.mesh.mixer = new THREE.AnimationMixer(this.mesh);
                Promise.all(animationPromises).then(() => {
                    // this.isLoaded;
                    resolve(this);
                })
            });
        })
    }

}