import _ from 'lodash';
import * as THREE from "three";
import groundMap from '../../content/texture/ground/data/map.png';
import plant_1 from '../../content/texture/ground/data/plant_1';
import plant_2 from '../../content/texture/ground/data/plant_2';
import plant_3 from '../../content/texture/ground/data/plant_3';
import plant_4 from '../../content/texture/ground/data/plant_4';
import plant_5 from '../../content/texture/ground/data/plant_5';
import plant_6 from '../../content/texture/ground/data/plant_6';
import plant_7 from '../../content/texture/ground/data/plant_7';
import plant_8 from '../../content/texture/ground/data/plant_8';
import grass from '../../content/texture/ground/data/grass';
import dandelion from '../../content/texture/ground/data/dandelion';
import flower_1 from '../../content/texture/ground/data/flower_1';
import flower_2 from '../../content/texture/ground/data/flower_2';

const plantsMap = {
    plant_1,
    plant_2,
    plant_3,
    plant_4,
    plant_5,
    plant_6,
    plant_7,
    plant_8,
    grass,
    dandelion,
    flower_1,
    flower_2
};


export default class Ground {
    constructor(scene, worldRadius) {
        this.scene = scene;
        this.worldRadius = worldRadius;
        this.createGround();
        this.models = {};
        const groundSource = new THREE.TextureLoader().load(groundMap, () => {
            this.createPlants(groundSource);
        });
    }

    createGround() {
        const planeMat = new THREE.MeshPhongMaterial({
            color: 0x849f4d,
            specular: 0x000000,
            shininess: 0,
            side: THREE.DoubleSide,
        });
        const segments = 32;
        const circleGeometry = new THREE.CircleGeometry(this.worldRadius, segments);
        const ground = new THREE.Mesh(circleGeometry, planeMat);
        ground.rotation.x = Math.PI / 2;
        this.scene.add(ground);
        const boundMat = new THREE.MeshPhongMaterial({
            color: 0x111111,
            specular: 0x000000,
            shininess: 0,
            flatShading: THREE.FlatShading
        });
        const boundGeometry = new THREE.TorusGeometry(this.worldRadius - 0.5, 1, 6, 180);
        const bound = new THREE.Mesh(boundGeometry, boundMat);
        bound.rotation.x = Math.PI / 2;
        this.scene.add(bound);
    }

    createPlants(texture) {
        texture.minFilter = texture.magFilter = THREE.LinearMipMapNearestFilter;
        texture.needsUpdate = true;
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0xffffff),
            shininess: 0,
            map: texture,
            bumpMap: texture,
            bumpScale: -.05,
            transparent: true,
            depthTest: true,
            depthWrite: true,
            alphaTest: .25,
            side: THREE.DoubleSide
        });
        const jsonLoader = new THREE.JSONLoader();
        _.forEach(plantsMap, (value, key) => {
            const object = jsonLoader.parse(value);
            this.models[key] = new THREE.Mesh(object.geometry, material);
            this.scene.add(this.creator(key));
        });
    }

    creator(name) {
        switch (name) {
            case 'grass':
                return this.createRandomObject(1000, name, this.worldRadius - 2);
            case 'flower_1':
            case 'flower_2':
                return this.createRandomObject(400, name, this.worldRadius - 2);
            default:
                return this.createRandomObject(10, name, this.worldRadius - 2);
        }
    }

    createRandomObject(count, name, r) {
        const group = new THREE.Object3D();
        for (let g = 0; g < count; g++) {
            const p = this.calculatePointInCircle(r);
            group.children[g] = this.models[name].clone();
            group.children[g].position.x = p[0];
            group.children[g].position.z = p[1];
            group.children[g].rotation.y = this.randNum(0, 360, true) * Math.PI / 180;
            const scalar = this.randNum(.92, 1, false);
            group.children[g].scale.set(scalar, scalar, scalar);
        }
        return group;
    }

    randNum(min, max, bool) {
        let num = Math.floor(Math.random() * max) + min;
        if (bool || typeof bool === "undefined") {
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
        }
        return num;
    }

    calculatePointInCircle(r) {
        const x = Math.random() * 2 * r - r;
        const zlim = Math.sqrt(r * r - x * x);
        const z = Math.random() * 2 * zlim - zlim;
        return [x, z];
    }
}
