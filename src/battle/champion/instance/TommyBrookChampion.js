import Champion from "../Champion";
import {HEAD_BONE} from "../ChampionHelper";
import AlbertHoopChampion from "./AlbertHoopChampion";

export default class TommyBrookChampion extends Champion {
    static ID = 'tommyBrook';

    constructor() {
        super(TommyBrookChampion.ID);
        // this.boneNames = {[HEAD_BONE]: 'Head'};
    }
}