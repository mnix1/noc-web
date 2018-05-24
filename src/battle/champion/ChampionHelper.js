import _ from 'lodash';
import AlbertHoopChampion from "./instance/AlbertHoopChampion";
import TommyBrookChampion from "./instance/TommyBrookChampion";
import ArissaRodrigoChampion from "./instance/ArissaRodrigoChampion";
import EmmaWoodChampion from "./instance/EmmaWoodChampion";
import ErikaFlintChampion from "./instance/ErikaFlintChampion";
import EveRapidChampion from "./instance/EveRapidChampion";
import GregorHeartChampion from "./instance/GregorHeartChampion";

export const champions = [
    AlbertHoopChampion,
    ArissaRodrigoChampion,
    EmmaWoodChampion,
    ErikaFlintChampion,
    EveRapidChampion,
    GregorHeartChampion,
    TommyBrookChampion,
];

export function getChampionById(id) {
    return _.find(champions, e => e.ID === id);
}

export function prepareAssetUrl(id, key) {
    return `static/media/${id}/${key}.dae`;
}

export const HEAD_BONE = 'head';