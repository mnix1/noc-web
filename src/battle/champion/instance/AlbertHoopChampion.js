import Champion from "../Champion";
import {HEAD_BONE} from "../ChampionHelper";

export default class AlbertHoopChampion extends Champion {
    static ID = 'albertHoop';

    constructor() {
        super(AlbertHoopChampion.ID);
        this.boneNames = {[HEAD_BONE]: 'boss_Head'};
    }
}