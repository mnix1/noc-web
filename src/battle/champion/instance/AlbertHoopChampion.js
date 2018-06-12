import Champion from "../Champion";
import {ARM_SPACING_BODY_PARAM} from "../ChampionHelper";

export default class AlbertHoopChampion extends Champion {
    static ID = 'albertHoop';

    constructor() {
        super(AlbertHoopChampion.ID, 'boss_');
        this.bodyParam[ARM_SPACING_BODY_PARAM] = 1.1;
    }
}