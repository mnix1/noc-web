import AlbertHoopChampion from "./AlbertHoopChampion";
import TommyBrookChampion from "./TommyBrookChampion";

export function getChampionById(id) {
    if (id === 'albertHoop') {
        return AlbertHoopChampion;
    }
    if (id === 'tommyBrook') {
        return TommyBrookChampion;
    }
}