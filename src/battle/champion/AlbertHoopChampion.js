import walk from '../../content/fbx/albertHoop/walk.fbx';
import walkBack from '../../content/fbx/albertHoop/walkBack.fbx';
import walkRight from '../../content/fbx/albertHoop/walkRight.fbx';
import walkLeft from '../../content/fbx/albertHoop/walkLeft.fbx';
import idle from '../../content/fbx/albertHoop/idle.fbx';
import run from '../../content/fbx/albertHoop/run.fbx';
import base from '../../content/fbx/albertHoop/base.fbx';
import dance from '../../content/fbx/albertHoop/dance.fbx';
import turnLeft from '../../content/fbx/albertHoop/turnLeft.fbx';
import turnRight from '../../content/fbx/albertHoop/turnRight.fbx';
import Champion from "./Champion";

export default class AlbertHoopChampion extends Champion {
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
        });
        this.boneNames = {head: 'bossHead'};
    }
}