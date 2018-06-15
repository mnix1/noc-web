import _ from 'lodash';
import ColladaLoader from '../../../loader/ColladaLoader';
import {getAnimationByKey} from "./AnimationHelper";
import {prepareAssetUrl} from "../ChampionHelper";
import CreateAutoAnimation from "./auto/CreateAutoAnimation";

export default class ChampionAnimationManager {
    constructor(champion) {
        this.champion = champion;
        this.animations = [
            'idle',
            'walk',
            'walkBack',
            'walkLeft',
            'walkRight',
            'run',
            'turnLeft',
            'turnRight',
            'danceSamba',
            'jump',
            'punch',
        ];
        this.actions = {};
        this.actionsOptions = {
            // turnLeft: {timeScale: 2},
            // turnRight: {timeScale: 2},
            // walkLeft: {timeScale: 1.2},
            // walkRight: {timeScale: 1.2}
        };
        this.finishedAnimationListeners = [];
    }

    loadOrCreateAnimations = (resolve) => {
        const animationPromises = _.map(this.animations, (key) => {
            return new Promise((resolve, reject) => {
                new ColladaLoader().load(prepareAssetUrl(this.champion.id, key), (animationObject) => {
                    resolve({key, animation: animationObject.animations[0]});
                }, _.noop, () => {
                    resolve(this.createAnimation(key));
                });
            });
        });
        Promise.all(animationPromises).then((animationObjects) => {
            animationObjects.forEach(animationObject => {
                this.initAction(animationObject);
            });
            resolve(this.champion);
        })
    };

    loadAnimations = (resolve) => {
        const animationPromises = _.map(this.animations, (key) => {
            return new Promise((resolve, reject) => {
                new ColladaLoader().load(prepareAssetUrl(this.champion.id, key), (animationObject) => {
                    resolve({key, animation: animationObject.animations[0]});
                });
            });
        });
        Promise.all(animationPromises).then((animationObjects) => {
            animationObjects.forEach(animationObject => {
                new CreateAutoAnimation(animationObject).log();
                this.initAction(animationObject);
            });
            resolve(this.champion);
        })
    };

    createAnimations = (resolve) => {
        this.animations.forEach(key => {
            this.initAction(this.createAnimation(key));
        });
        resolve(this.champion);
    };

    createAnimation(key) {
        const animationClass = getAnimationByKey(key);
        const animation = new animationClass(this.champion).create();
        return {key, animation};
    }

    initAction(animationObject) {
        const action = this.champion.mesh.mixer.clipAction(animationObject.animation);
        const options = _.defaultTo(this.actionsOptions[animationObject.key], {});
        if (options.loop) {
            action.setLoop(options.loop);
        }
        if (options.timeScale) {
            action.timeScale = options.timeScale;
        }
        this.actions[animationObject.key] = action;
    }

    playAnimation(key) {
        if (!_.includes(this.animations, key)) {
            return;
        }
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
        if (!_.includes(this.animations, newAnimationKey)) {
            return;
        }
        if (oldAnimationKey === newAnimationKey) {
            return this.actions[newAnimationKey];
        }
        const action = this.playAnimation(newAnimationKey);
        return this.actions[oldAnimationKey].crossFadeTo(action, 0.2, false);
    }

    updateMixer(delta) {
        this.champion.mesh.mixer.update(delta);
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