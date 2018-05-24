import Champion from "../Champion";
import {HEAD_BONE} from "../ChampionHelper";
import TommyBrookChampion from "./TommyBrookChampion";

export default class ErikaFlintChampion extends Champion {
    static ID = 'erikaFlint';

    constructor() {
        super(ErikaFlintChampion.ID);
        // this.boneNames = {[HEAD_BONE]: 'Head'};
    }
}