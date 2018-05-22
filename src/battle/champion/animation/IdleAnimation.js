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
        return 1;
    }

    prepareTracks() {
        return [
            this.createPositionTrack(HEAD_BONE, [0, 0.5, 1.0], [0.1, 0.2, 0.5, 0.1, 0.3, 0.6, 0.3, 0.0, 0.8])
        ]
    }
}