import * as THREE from 'three';
import _ from 'lodash';
import ColladaLoader from '../../loader/ColladaLoader';
import ChampionAnimationManager from "./animation/ChampionAnimationManager";
import {prepareAssetUrl} from "./ChampionHelper";

export default class Champion {
    constructor(id) {
        this.id = id;
        this.baseUrl = prepareAssetUrl(this.id, 'base');
        this.boneNames = {};
        this.bones = {};
        this.animationManager = new ChampionAnimationManager(this);
    }

    init() {
        return this.loadBase(this.animationManager.createAnimations);
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

    correctSize() {
        // const scalar = 0.009;
        // this.mesh.scale.set(scalar, scalar, scalar);
    }

}