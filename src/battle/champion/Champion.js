import * as THREE from 'three';
import _ from 'lodash';
import ColladaLoader from '../../loader/ColladaLoader';
import ChampionAnimationManager from "./animation/ChampionAnimationManager";
import {BONES, BODY_PARAMS, prepareAssetUrl} from "./ChampionHelper";

export default class Champion {
    constructor(id, boneNamePrefix = "") {
        this.id = id;
        this.baseUrl = prepareAssetUrl(this.id, 'base');
        this.boneNames = BONES.reduce((pV, cV) => {
            const boneName = boneNamePrefix + cV;
            pV[cV] = boneName;
            pV[boneName] = boneNamePrefix + cV;
            return pV;
        }, {});
        this.bodyParam = BODY_PARAMS.reduce((pV, cV) => {
            pV[cV] = 1;
            return pV;
        }, {});
        this.bones = {};
        this.animationManager = new ChampionAnimationManager(this);
    }

    init() {
        // return this.loadBase(this.animationManager.loadOrCreateAnimations);
        return this.loadBase(this.animationManager.createAnimations);
        // return this.loadBase(this.animationManager.loadAnimations);
    }

    loadBase(animationInitializer) {
        return new Promise((resolve, reject) => {
            new ColladaLoader().load(this.baseUrl, (baseObject) => {
                console.log('baseObject', baseObject);
                this.mesh = baseObject.scene;
                this.initBones();
                this.mesh.mixer = new THREE.AnimationMixer(this.mesh);
                // this.mesh.mixer.addEventListener('loop', this.handleAnimationFinished);
                // this.mesh.mixer.addEventListener('finished', this.handleAnimationFinished);
                animationInitializer(resolve);
            });
        })
    }

    initBones() {
        _.forEach(this.boneNames, (v, k) => {
            this.bones[k] = this.mesh.getObjectByName(v);
        });
    }

    hasBone(name) {
        return !_.isNil(this.bones[name]);
    }

    correctSize() {
        // const scalar = 0.009;
        // this.mesh.scale.set(scalar, scalar, scalar);
    }

}