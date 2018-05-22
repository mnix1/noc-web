import * as THREE from 'three';

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

    prepareTracks() {
    }

    createPositionTrack(boneName, times, values) {
        console.log('sada', boneName, this.champion.boneNames[boneName]);
        return this.createTrack(THREE.VectorKeyframeTrack, 'position', boneName, times, values);
    }

    createTrack(clazz, property, boneName, times, values) {
        console.log('sada', boneName, this.champion.boneNames[boneName]);
        return new clazz(`${this.champion.boneNames[boneName]}.${property}`, times, values);
    }

    create = () => {
        return new THREE.AnimationClip(this.key, this.duration, this.prepareTracks());
    }
}