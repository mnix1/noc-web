import Animation from "./Animation";
import {HEAD_BONE} from "../ChampionHelper";

export default class IdleAnimation extends Animation {
    constructor(champion) {
        super(champion);
    }

    get key() {
        return 'idle';
    }

    get duration() {
        return 2;
    }

    prepareTracks() {
        return [
            this.createPositionTrack(HEAD_BONE, [0, .6, 2], [0, 6, 0, .3, 6.2, .3, 0, 6, 0]),
            this.createQuaternionTrack(HEAD_BONE, [0, .6, 2], [0, 0, 0, 1, .06, .01, .01, 1, 0, 0, 0, 1])
        ]
    }
}