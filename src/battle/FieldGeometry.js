import * as THREE from 'three';


function FieldGeometry(totalRadius, partRadius, segments) {

    THREE.BufferGeometry.call(this);

    this.type = 'FieldGeometry';

    this.parameters = {
        totalRadius: totalRadius,
        partRadius: partRadius,
        segments: segments
    };

    totalRadius = totalRadius || 1;
    partRadius = partRadius || 1;
    segments = segments !== undefined ? Math.max(3, segments) : 8;

    const radius = totalRadius / partRadius;

    var thetaStart = 0;
    var thetaLength = Math.PI * 2;

    // buffers

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = [];

    // helper variables

    var i, s;
    var vertex = new THREE.Vector3();
    var uv = new THREE.Vector2();

    // center point

    vertices.push(0, 0, 0);
    normals.push(0, 0, 1);
    uvs.push(0.5, 0.5);

    for (s = 0, i = 3; s <= segments; s++, i += 3) {

        var segment = thetaStart + s / segments * thetaLength;

        // vertex

        vertex.x = radius * Math.cos(segment);
        vertex.y = radius * Math.sin(segment);

        vertices.push(vertex.x, vertex.y, vertex.z);

        // normal

        normals.push(0, 0, 1);

        // uvs

        uv.x = (vertices[i] / radius + 1) / 2;
        uv.y = (vertices[i + 1] / radius + 1) / 2;

        uvs.push(uv.x, uv.y);

    }

    // indices

    for (i = 1; i <= segments; i++) {

        indices.push(i, i + 1, 0);

    }

    // build geometry

    this.setIndex(indices);
    this.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    this.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

}

FieldGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
FieldGeometry.prototype.constructor = FieldGeometry;

export default FieldGeometry;

