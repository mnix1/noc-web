import * as THREE from 'three';
import BattleCommunication from "./BattleCommunication";
import BattleWorld from "./BattleWorld";
import _ from 'lodash';
import {Stats} from "three-stats";

window.THREE = THREE;

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

export default class Battle {

    constructor(container, worldRadius, socket) {
        window.battle = this;
        this.clock = new THREE.Clock();
        this.communication = new BattleCommunication(socket, this);
        this.world = new BattleWorld(container, worldRadius);
    }

    init(battleState) {
        const myChampionsProps = battleState.my.filter(e => e.t === 'CHAMPION');
        const controlChampionProps = myChampionsProps[0];
        const otherChampionsProps = _.flatten([battleState.other.filter(e => e.t === 'CHAMPION'), _.tail(myChampionsProps)]);
        this.world.initOtherChampions(otherChampionsProps).then(() => {
            return this.world.initControlChampion(controlChampionProps);
        }).then(() => {
            this.communication.ready();
        });
        this.world.onControlChanged = (control) => {
            this.communication.send(control.serialize());
        }
    }

    update(battleState) {
        // const myChampionProps = battleState.my.find(e => e.t === 'CHAMPION');
        const otherChampionsProps = battleState.other.filter(e => e.t === 'CHAMPION');
        // this.world.placeChampion(this.world.myChampion, myChampionProps);
        otherChampionsProps.forEach(otherChampionProps => {
            const champion = this.world.findObject(otherChampionProps.uuid);
            this.world.placeChampion(champion, otherChampionProps);
            champion.animationManager.playNextAnimation(undefined, otherChampionProps.a);
        });
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();
        this.world.render(delta);
        stats.update();
    };
}