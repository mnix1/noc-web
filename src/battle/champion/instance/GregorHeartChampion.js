import Champion from "../Champion";
import {HEAD_BONE} from "../ChampionHelper";

export default class GregorHeartChampion extends Champion {
    static ID = 'gregorHeart';

    constructor() {
        super(GregorHeartChampion.ID);
        // this.boneNames = {[HEAD_BONE]: 'Head'};
    }
}