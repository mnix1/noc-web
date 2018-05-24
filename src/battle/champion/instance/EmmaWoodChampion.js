import Champion from "../Champion";
import {HEAD_BONE} from "../ChampionHelper";
import TommyBrookChampion from "./TommyBrookChampion";

export default class EmmaWoodChampion extends Champion {
    static ID = 'emmaWood';

    constructor() {
        super(EmmaWoodChampion.ID);
        // this.boneNames = {[HEAD_BONE]: 'Head'};
    }
}