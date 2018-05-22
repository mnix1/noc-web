import Champion from "./Champion";
import {HEAD_BONE} from "./ChampionHelper";

export default class AlbertHoopChampion extends Champion {
    constructor() {
        super('albertHoop');
        this.boneNames = {[HEAD_BONE]: 'bossHead'};
    }
}