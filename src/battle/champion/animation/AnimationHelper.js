import IdleAnimation from "./IdleAnimation";
import AutoIdleAnimation from "./AutoIdleAnimation";
import AutoWalkAnimation from "./AutoWalkAnimation";

export function getAnimationByKey(key) {
    if (key === 'idle') {
        return AutoWalkAnimation;
    }
    if (key === 'walk') {
        return AutoIdleAnimation;
    }
}