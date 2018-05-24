import Champion from "../Champion";
import {HEAD_BONE} from "../ChampionHelper";
import TommyBrookChampion from "./TommyBrookChampion";

export default class ArissaRodrigoChampion extends Champion {
    static ID = 'arissaRodrigo';

    constructor() {
        super(ArissaRodrigoChampion.ID);
        this.boneNames = {[HEAD_BONE]: 'arissa_Head'};
    }
}