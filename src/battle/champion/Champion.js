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
    }

    correctSize() {
        // this.mesh.rotation.y = Math.PI / 2;
        // this.mesh.scale.set(0.009, 0.009, 0.009);
        // const scalar = 0.02;
        const scalar = 0.009;
        this.mesh.scale.set(scalar, scalar, scalar);
        // this.box = new THREE.Box3().setFromObject( this.mesh );
    }

    // get height(){
    //     return this.box.max.y;
    // }

    playAnimation(key) {
        if (!this.actions[key]) {
            // const action = this.mesh.mixer.clipAction(this.animations[key]);
            // action.play();
            // this.actions[key] = action;
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

    // invokeForAllBones(nameCheckFunction, functionToInvoke) {
    //     this.getAllBones(nameCheckFunction).forEach(e => functionToInvoke(e));
    // }
    //
    // getAllBones(nameCheckFunction) {
    //     const bones = [];
    //     this.mesh.children.forEach(e => {
    //         bones.push(this.recursiveCheckObject(e, nameCheckFunction));
    //     });
    //     return _.flatten(bones);
    // }
    //
    // recursiveCheckObject(object, nameCheckFunction) {
    //     const o = [];
    //     if (object.isBone && nameCheckFunction(object.name)) {
    //         o.push(object);
    //     }
    //     if (object.isSkinnedMesh) {
    //         object.skeleton.bones.forEach(e => {
    //             const result = this.recursiveCheckObject(e, nameCheckFunction);
    //             if (!_.isEmpty(result)) {
    //                 result.forEach(e => o.push(e));
    //             }
    //         });
    //     }
    //     object.children.forEach(e => {
    //         const result = this.recursiveCheckObject(e, nameCheckFunction);
    //         if (!_.isEmpty(result)) {
    //             result.forEach(e => o.push(e));
    //         }
    //     });
    //     return o;
    // }

    createRunAnimation(name) {
        const duration = 1;
        const step = 1;
        const times = new Float32Array(_.range(0, duration + step, step));
        const values = new Float32Array([0, 0, 0, .99, -.3, 0, 0, .99]);
        const tracks = [new THREE.QuaternionKeyframeTrack(name, times, values)];
        return new THREE.AnimationClip('run2', duration, tracks);
    }

    load() {
        const animationPromises = _.map(this.animationSources, (value, key) => {
            return new Promise((resolve, reject) => {
                new FBXLoader().load(value, (animationObject) => {
                    if (key === 'idle') {
                        const anim = animationObject.animations[0];
                        // const tracks = new THREE.QuaternionKeyframeTrack('head', [0.03, 0.06,0])
                        // const animClip = new THREE.AnimationClip('run', anim.duration, anim.tracks.filter(e=>e.name==='bossHead.quaternion'));
                        // this.animations[key] = animClip;
                        // console.log(animClip);
                        // const name = anim.tracks.map(e => e.name).filter(e => _.includes(e, 'Head'))[0];
                        // console.log(anim, name);
                        // this.animations[key] = this.createRunAnimation(name);
                        // console.log(THREE.AnimationClip.toJSON(this.animations[key]));
                    } else {
                        this.animations[key] = animationObject.animations[0];
                    }
                    resolve();
                });
            });
        });
        return new Promise((resolve, reject) => {
            new FBXLoader().load(this.baseSource, (baseObject) => {
                this.mesh = baseObject;
                this.initBones();
                this.mesh.mixer = new THREE.AnimationMixer(this.mesh);
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

}