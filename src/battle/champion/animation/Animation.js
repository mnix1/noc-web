import * as THREE from 'three';
import _ from 'lodash';

export default class Animation {
    constructor(champion) {
        console.log('champion', champion);
        this.champion = champion;
    }

    get key() {
        return undefined;
    }

    get duration() {
        return undefined;
    }

    bodyParam(name) {
        return this.champion.bodyParam[name];
    }

    prepareTracks() {
        return this.prepareRawTracks().filter(e => !_.isNil(e));
    }

    prepareRawTracks() {
        return [];
    }

    createPositionTrack(boneName, times, values) {
        return this.createTrack(THREE.VectorKeyframeTrack, 'position', boneName, times, values);
    }

    createQuaternionTrack(boneName, times, values) {
        return this.createTrack(THREE.QuaternionKeyframeTrack, 'quaternion', boneName, times, values);
    }

    createScaleTrack(boneName, times, values) {
        return this.createTrack(THREE.VectorKeyframeTrack, 'scale', boneName, times, values);
    }

    createTrack(clazz, property, boneName, times, values) {
        if (!this.champion.hasBone(boneName)) {
            return null;
        }
        return new clazz(`${this.champion.boneNames[boneName]}.${property}`, times, values);
    }

    create = () => {
        return new THREE.AnimationClip(this.key, this.duration, this.prepareTracks());
    }
}