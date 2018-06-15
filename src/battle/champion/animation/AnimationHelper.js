import AutoIdleAnimation from "./auto/AutoIdleAnimation";
import AutoWalkAnimation from "./auto/AutoWalkAnimation";
import AutoRunAnimation from "./auto/AutoRunAnimation";
import AutoDanceSambaAnimation from "./auto/AutoDanceSambaAnimation";
import AutoWalkRightAnimation from "./auto/AutoWalkRightAnimation";
import AutoWalkLeftAnimation from "./auto/AutoWalkLeftAnimation";
import AutoWalkBackAnimation from "./auto/AutoWalkBackAnimation";
import AutoTurnRightAnimation from "./auto/AutoTurnRightAnimation";
import AutoTurnLeftAnimation from "./auto/AutoTurnLeftAnimation";
import AutoJumpAnimation from "./auto/AutoJumpAnimation";
import AutoPunchAnimation from "./auto/AutoPunchAnimation";

const animationMapping = {
    idle: AutoIdleAnimation,
    walk: AutoWalkAnimation,
    run: AutoRunAnimation,
    jump: AutoJumpAnimation,
    turnLeft: AutoTurnLeftAnimation,
    turnRight: AutoTurnRightAnimation,
    walkBack: AutoWalkBackAnimation,
    walkLeft: AutoWalkLeftAnimation,
    walkRight: AutoWalkRightAnimation,
    danceSamba: AutoDanceSambaAnimation,
    punch: AutoPunchAnimation
};

export function getAnimationByKey(key) {
    const clazz = animationMapping[key];
    if (!clazz) {
        throw new Error('No class');
    }
    return clazz;
}