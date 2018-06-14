import AutoIdleAnimation from "./AutoIdleAnimation";
import AutoWalkAnimation from "./AutoWalkAnimation";
import AutoRunAnimation from "./AutoRunAnimation";
import AutoDanceSambaAnimation from "./AutoDanceSambaAnimation";
import AutoWalkRightAnimation from "./AutoWalkRightAnimation";
import AutoWalkLeftAnimation from "./AutoWalkLeftAnimation";
import AutoWalkBackAnimation from "./AutoWalkBackAnimation";
import AutoTurnRightAnimation from "./AutoTurnRightAnimation";
import AutoTurnLeftAnimation from "./AutoTurnLeftAnimation";

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