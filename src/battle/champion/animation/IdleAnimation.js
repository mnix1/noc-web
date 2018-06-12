import Animation from "./Animation";
import * as bones from "../ChampionHelper";
import {ARM_SPACING_BODY_PARAM} from "../ChampionHelper";

export default class IdleAnimation extends Animation {
    constructor(champion) {
        super(champion);
    }

    get key() {
        return 'idle';
    }

    get duration() {
        return 4;
    }

    prepareTracks() {
        return [
            this.createQuaternionTrack(bones.HEAD_BONE, [0, 1, 3], [0, 0, 0, 1, .03, .005, .005, 1, 0, 0, 0, 1]),

            this.createQuaternionTrack(bones.SPINE_BONE, [0, 1.3, 4], [.09, .01, .01, 1, .1, .01, .01, 1, .09, .01, .01, 1]),

            this.createQuaternionTrack(bones.LEFT_ARM_BONE, [0], [0, -.1, -.5 / this.bodyParam(ARM_SPACING_BODY_PARAM), 1]),
            this.createQuaternionTrack(bones.RIGHT_ARM_BONE, [0], [0, .1, .5 / this.bodyParam(ARM_SPACING_BODY_PARAM), 1]),

            this.createQuaternionTrack(bones.LEFT_FORE_ARM_BONE, [0], [.1, -.2, -.2, 1]),
            this.createQuaternionTrack(bones.RIGHT_FORE_ARM_BONE, [0], [-.1, .2, .2, 1]),
            // this.createQuaternionTrack(bones.LEFT_HAND_BONE, [0, 1, 2], [0, 0, 0, 1, -.1, -.1, -.1, 1, 0, 0, 0, 1]),

        ]
    }
}