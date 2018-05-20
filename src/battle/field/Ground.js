import _ from 'lodash';
import * as THREE from "three";
import groundMap from '../../content/texture/ground/data/map.png';
import grassGround from '../../content/texture/ground/shit/grassTexture7.jpg';
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
        const grassTexture = new THREE.TextureLoader().load(grassGround);
        grassTexture.wrapS = THREE.RepeatWrapping;
        grassTexture.wrapT = THREE.RepeatWrapping;
        grassTexture.repeat.set( 18,20 );
        const planeMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0xdddddd),
            map: grassTexture,
            bumpMap: grassTexture,
            bumpScale: -.05,
            specular: 0x000000,
            shininess: 0,
            flatShading: THREE.FlatShading,
            side: THREE.BackSide,
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
        const boundGeometry = new THREE.TorusGeometry(this.worldRadius - 0.5, 0.5, 6, 180);
        const bound = new THREE.Mesh(boundGeometry, boundMat);
        bound.rotation.x = Math.PI / 2;
        this.scene.add(bound);
    }

    createPlants(texture) {
        texture.minFilter = texture.magFilter = THREE.LinearMipMapNearestFilter;
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

        const group = new THREE.Geometry();
        const jsonLoader = new THREE.JSONLoader();
        _.forEach(plantsMap, (value, name) => {
            const object = jsonLoader.parse(value);
            const geometry = this.createGroupGeometry(this.countOfFlower(name), object.geometry);
            if (!geometry) {
                return;
            }
            const mesh = new THREE.Mesh(geometry);
            group.mergeMesh(mesh);
        });
        const bufferGeometry = new THREE.BufferGeometry().fromGeometry(group);
        this.scene.add(new THREE.Mesh(bufferGeometry, material));
    }

    countOfFlower(name) {
        switch (name) {
            case 'grass':
                return 10;
            case 'flower_1':
            case 'flower_2':
                return 10;
            default:
                return 10;
        }
    }

    createGroupGeometry(count, geometry) {
        if (count === 0) {
            return;
        }
        const r = this.worldRadius - 1.5;
        const group = new THREE.Geometry();
        for (let g = 0; g < count; g++) {
            const p = this.calculatePointInCircle(r);
            const mesh = new THREE.Mesh(geometry);
            mesh.position.x = p[0];
            mesh.position.z = p[1];
            mesh.rotation.y = this.randNum(0, 360, true) * Math.PI / 180;
            const scalar = this.randNum(.4, .5, false);
            mesh.scale.set(scalar, scalar, scalar);
            group.mergeMesh(mesh);
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
