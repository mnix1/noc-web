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

export const HIPS_BONE = 'Hips';
export const SPINE_BONE = 'Spine';
export const SPINE_1_BONE = 'Spine1';
export const SPINE_2_BONE = 'Spine2';
export const NECK_BONE = 'Neck';
export const NECK_1_BONE = 'Neck1';
export const HEAD_BONE = 'Head';

export const LEFT_SHOULDER_BONE = 'LeftShoulder';
export const LEFT_ARM_BONE = 'LeftArm';
export const LEFT_FORE_ARM_BONE = 'LeftForeArm';
export const LEFT_HAND_BONE = 'LeftHand';

export const LEFT_HAND_THUMB_1_BONE = 'LeftHandThumb1';
export const LEFT_HAND_THUMB_2_BONE = 'LeftHandThumb2';
export const LEFT_HAND_THUMB_3_BONE = 'LeftHandThumb3';
export const LEFT_HAND_INDEX_1_BONE = 'LeftHandIndex1';
export const LEFT_HAND_INDEX_2_BONE = 'LeftHandIndex2';
export const LEFT_HAND_INDEX_3_BONE = 'LeftHandIndex3';
export const LEFT_HAND_MIDDLE_1_BONE = 'LeftHandMiddle1';
export const LEFT_HAND_MIDDLE_2_BONE = 'LeftHandMiddle2';
export const LEFT_HAND_MIDDLE_3_BONE = 'LeftHandMiddle3';
export const LEFT_HAND_RING_1_BONE = 'LeftHandRing3';
export const LEFT_HAND_RING_2_BONE = 'LeftHandRing2';
export const LEFT_HAND_RING_3_BONE = 'LeftHandRing3';
export const LEFT_HAND_PINKY_1_BONE = 'LeftHandPinky1';
export const LEFT_HAND_PINKY_2_BONE = 'LeftHandPinky2';
export const LEFT_HAND_PINKY_3_BONE = 'LeftHandPinky3';

export const RIGHT_SHOULDER_BONE = 'RightShoulder';
export const RIGHT_ARM_BONE = 'RightArm';
export const RIGHT_FORE_ARM_BONE = 'RightForeArm';
export const RIGHT_HAND_BONE = 'RightHand';

export const RIGHT_HAND_THUMB_1_BONE = 'RightHandThumb1';
export const RIGHT_HAND_THUMB_2_BONE = 'RightHandThumb2';
export const RIGHT_HAND_THUMB_3_BONE = 'RightHandThumb3';
export const RIGHT_HAND_INDEX_1_BONE = 'RightHandIndex1';
export const RIGHT_HAND_INDEX_2_BONE = 'RightHandIndex2';
export const RIGHT_HAND_INDEX_3_BONE = 'RightHandIndex3';
export const RIGHT_HAND_MIDDLE_1_BONE = 'RightHandMiddle1';
export const RIGHT_HAND_MIDDLE_2_BONE = 'RightHandMiddle2';
export const RIGHT_HAND_MIDDLE_3_BONE = 'RightHandMiddle3';
export const RIGHT_HAND_RING_1_BONE = 'RightHandRing3';
export const RIGHT_HAND_RING_2_BONE = 'RightHandRing2';
export const RIGHT_HAND_RING_3_BONE = 'RightHandRing3';
export const RIGHT_HAND_PINKY_1_BONE = 'RightHandPinky1';
export const RIGHT_HAND_PINKY_2_BONE = 'RightHandPinky2';
export const RIGHT_HAND_PINKY_3_BONE = 'RightHandPinky3';

export const LEFT_UP_LEG_BONE = 'LeftUpLeg';
export const LEFT_LEG_BONE = 'LeftLeg';
export const LEFT_FOOT_BONE = 'LeftFoot';
export const LEFT_TOE_BASE_BONE = 'LeftToeBase';

export const RIGHT_UP_LEG_BONE = 'RightUpLeg';
export const RIGHT_LEG_BONE = 'RightLeg';
export const RIGHT_FOOT_BONE = 'RightFoot';
export const RIGHT_TOE_BASE_BONE = 'RightToeBase';

export const BONES = [HIPS_BONE,
    SPINE_BONE, SPINE_1_BONE, SPINE_2_BONE,
    NECK_BONE, NECK_1_BONE, HEAD_BONE,

    LEFT_SHOULDER_BONE, LEFT_ARM_BONE, LEFT_FORE_ARM_BONE, LEFT_HAND_BONE,
    LEFT_HAND_THUMB_1_BONE, LEFT_HAND_THUMB_2_BONE, LEFT_HAND_THUMB_3_BONE,
    LEFT_HAND_INDEX_1_BONE, LEFT_HAND_INDEX_2_BONE, LEFT_HAND_INDEX_3_BONE,
    LEFT_HAND_MIDDLE_1_BONE, LEFT_HAND_MIDDLE_2_BONE, LEFT_HAND_MIDDLE_3_BONE,
    LEFT_HAND_RING_1_BONE, LEFT_HAND_RING_2_BONE, LEFT_HAND_RING_3_BONE,
    LEFT_HAND_PINKY_1_BONE, LEFT_HAND_PINKY_2_BONE, LEFT_HAND_PINKY_3_BONE,

    RIGHT_SHOULDER_BONE, RIGHT_ARM_BONE, RIGHT_FORE_ARM_BONE, RIGHT_HAND_BONE,
    RIGHT_HAND_THUMB_1_BONE, RIGHT_HAND_THUMB_2_BONE, RIGHT_HAND_THUMB_3_BONE,
    RIGHT_HAND_INDEX_1_BONE, RIGHT_HAND_INDEX_2_BONE, RIGHT_HAND_INDEX_3_BONE,
    RIGHT_HAND_MIDDLE_1_BONE, RIGHT_HAND_MIDDLE_2_BONE, RIGHT_HAND_MIDDLE_3_BONE,
    RIGHT_HAND_RING_1_BONE, RIGHT_HAND_RING_2_BONE, RIGHT_HAND_RING_3_BONE,
    RIGHT_HAND_PINKY_1_BONE, RIGHT_HAND_PINKY_2_BONE, RIGHT_HAND_PINKY_3_BONE,

    LEFT_UP_LEG_BONE, LEFT_LEG_BONE, LEFT_FOOT_BONE,
    LEFT_TOE_BASE_BONE,

    RIGHT_UP_LEG_BONE, RIGHT_LEG_BONE, RIGHT_FOOT_BONE,
    RIGHT_TOE_BASE_BONE
];

export const ARM_SPACING_BODY_PARAM = 'ArmSpacing';

export const BODY_PARAMS = [ARM_SPACING_BODY_PARAM];

