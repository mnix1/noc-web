import * as THREE from 'three';
import _ from 'lodash';
import ColladaLoader from '../../loader/ColladaLoader';

export default class Champion {
    constructor(id) {
        this.id = id;
        this.baseSource = this.createUrl('base');
        this.animations = ['idle'];
        this.boneNames = {};
        this.bones = {};
        this.actions = {};
        this.actionsOptions = {
            turnLeft: {timeScale: 2},
            turnRight: {timeScale: 2},
            walkLeft: {timeScale: 1.2},
            walkRight: {timeScale: 1.2}
        };
        this.finishedAnimationListeners = [];
    }

    createUrl(key){
        return `static/media/${this.id}/${key}.dae`;
    }

    load() {
        const animationPromises = _.map(this.animations, (key) => {
            return new Promise((resolve, reject) => {
                new ColladaLoader().load(this.createUrl(key), (animationObject) => {
                    console.log('animationObject', animationObject);
                    resolve({key, animation: animationObject.animations[0]});
                });
            });
        });
        return new Promise((resolve, reject) => {
            new ColladaLoader().load(this.baseSource, (baseObject) => {
                console.log('baseObject', baseObject);
                this.mesh = baseObject.scene;
                this.initBones();
                this.mesh.mixer = new THREE.AnimationMixer(this.mesh);
                // this.mesh.mixer.addEventListener('loop', this.handleAnimationFinished);
                // this.mesh.mixer.addEventListener('finished', this.handleAnimationFinished);
                Promise.all(animationPromises).then((animationObjects) => {
                    animationObjects.forEach(animationObject => {
                        const action = this.mesh.mixer.clipAction(animationObject.animation);
                        const options = _.defaultTo(this.actionsOptions[animationObject.key], {});
                        if (options.loop) {
                            action.setLoop(options.loop);
                        }
                        if (options.timeScale) {
                            action.timeScale = options.timeScale;
                        }
                        this.actions[animationObject.key] = action;
                    });
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
        // const scalar = 0.009;
        // this.mesh.scale.set(scalar, scalar, scalar);
    }

    playAnimation(key) {
        this.playingAnimationKey = key;
        const action = this.actions[key];
        if (action.isScheduled()) {
            action.reset();
        } else {
            action.play();
        }
        return action;
    }

    playNextAnimation(oldAnimationKey = this.playingAnimationKey, newAnimationKey) {
        if (oldAnimationKey === newAnimationKey) {
            return this.actions[newAnimationKey];
        }
        const action = this.playAnimation(newAnimationKey);
        return this.actions[oldAnimationKey].crossFadeTo(action, 0.2, false);
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