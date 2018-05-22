import IdleAnimation from "./IdleAnimation";

export function getAnimationByKey(key) {
    if (key === 'idle') {
        return IdleAnimation;
    }
}