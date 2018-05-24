import Champion from "../Champion";
import {HEAD_BONE} from "../ChampionHelper";
import TommyBrookChampion from "./TommyBrookChampion";

export default class EveRapidChampion extends Champion {
    static ID = 'eveRapid';

    constructor() {
        super(EveRapidChampion.ID);
        // this.boneNames = {[HEAD_BONE]: 'Head'};
    }
}