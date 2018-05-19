import * as THREE from 'three';
import FBXLoader from "../../loader/FBXLoader";
import _ from 'lodash';

export default class Champion {
    constructor(baseSource, animationSources) {
        this.baseSource = baseSource;
        this.animationSources = animationSources;
        this.boneNames = {};
        this.bones = {};
        this.animations = {};
        this.actions = {};
        this.animationsTimeScale = {turnLeft: 2, turnRight: 2, walkLeft: 1.2, walkRight: 1.2};
        this.finishedAnimationListeners = [];
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
                this.initBones();
                this.mesh.mixer = new THREE.AnimationMixer(this.mesh);
                this.mesh.mixer.addEventListener('loop', this.handleAnimationFinished);
                Promise.all(animationPromises).then(() => {
                    // this.isLoaded;
                    resolve(this);
                })
            });
        })
    }

    initBones() {
        _.forEach(this.boneNames, (v, k) => {
            this.bones[k] = this.mesh.getObjectByName(v);
        });
    }

    correctSize() {
        const scalar = 0.009;
        this.mesh.scale.set(scalar, scalar, scalar);
    }

    prepareAnimation(key, loop = THREE.LoopRepeat) {
        let action = this.actions[key];
        if (!action) {
            action = this.mesh.mixer.clipAction(this.animations[key]);
            action.setLoop(loop);
            if (this.animationsTimeScale[key]) {
                action.timeScale = this.animationsTimeScale[key];
            }
            this.actions[key] = action;
        }
        return action;
    }

    playAnimation(key, loop) {
        this.playingAnimationKey = key;
        const action = this.prepareAnimation(key, loop);
        if (action.isScheduled()) {
            action.reset();
        } else {
            action.play();
        }
        return action;
    }

    playNextAnimation(oldAnimationKey = this.playingAnimationKey, newAnimationKey, newAnimationLoop) {
        if (oldAnimationKey === newAnimationKey) {
            return this.actions[newAnimationKey];
        }
        const action = this.playAnimation(newAnimationKey, newAnimationLoop);
        return this.prepareAnimation(oldAnimationKey).crossFadeTo(action, 0.2, false);
    }

    updateMixer(delta) {
        this.mesh.mixer.update(delta);
    }

    handleAnimationFinished = (props) => {
        this.finishedAnimationListeners.forEach((e) => e(props, this));
    };

    addAnimationFinishedListener(e) {
        this.finishedAnimationListeners.push(e);
    }

    removeAnimationFinishedListener(e) {
        _.remove(this.finishedAnimationListeners, e);
    }

}