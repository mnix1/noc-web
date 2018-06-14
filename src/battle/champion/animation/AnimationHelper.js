import AutoIdleAnimation from "./auto/AutoIdleAnimation";
import AutoWalkAnimation from "./auto/AutoWalkAnimation";
import AutoRunAnimation from "./auto/AutoRunAnimation";
import AutoDanceSambaAnimation from "./auto/AutoDanceSambaAnimation";
import AutoWalkRightAnimation from "./auto/AutoWalkRightAnimation";
import AutoWalkLeftAnimation from "./auto/AutoWalkLeftAnimation";
import AutoWalkBackAnimation from "./auto/AutoWalkBackAnimation";
import AutoTurnRightAnimation from "./auto/AutoTurnRightAnimation";
import AutoTurnLeftAnimation from "./auto/AutoTurnLeftAnimation";

const animationMapping = {
    idle: AutoIdleAnimation,
    walk: AutoWalkAnimation,
    run: AutoRunAnimation,
    turnLeft: AutoTurnLeftAnimation,
    turnRight: AutoTurnRightAnimation,
    walkBack: AutoWalkBackAnimation,
    walkLeft: AutoWalkLeftAnimation,
    walkRight: AutoWalkRightAnimation,
    danceSamba: AutoDanceSambaAnimation
};

export function getAnimationByKey(key) {
    return animationMapping[key];
}