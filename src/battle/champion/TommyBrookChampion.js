import walk from '../../content/fbx/tommyBrook/walk.fbx';
import walkBack from '../../content/fbx/tommyBrook/walkBack.fbx';
import walkRight from '../../content/fbx/tommyBrook/walkRight.fbx';
import walkLeft from '../../content/fbx/tommyBrook/walkLeft.fbx';
import idle from '../../content/fbx/tommyBrook/idle.fbx';
import run from '../../content/fbx/tommyBrook/run.fbx';
import base from '../../content/fbx/tommyBrook/base.fbx';
import dance from '../../content/fbx/tommyBrook/dance.fbx';
import turnRight from '../../content/fbx/tommyBrook/turnRight.fbx';
import turnLeft from '../../content/fbx/tommyBrook/turnLeft.fbx';
import attack from '../../content/fbx/tommyBrook/attack.fbx';
import Champion from "./Champion";

export default class TommyBrookChampion extends Champion {
    constructor() {
        super(base, {
            idle,
            walk,
            walkBack,
            walkRight,
            walkLeft,
            run,
            dance,
            turnRight,
            turnLeft,
            attack,
        });
        this.boneNames = {head: 'Head'};
    }
}