import Champion from "./Champion";
import {HEAD_BONE} from "./ChampionHelper";

export default class TommyBrookChampion extends Champion {
    constructor() {
        super('tommyBrook');
        this.boneNames = {[HEAD_BONE]: 'Head'};
    }
}