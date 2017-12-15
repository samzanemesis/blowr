import { CPhysicsEntity, shapeType } from "./PhysicsEntity"
import { CScene } from "./Common"

import * as THREE from 'three';

function createCapsuleMesh(radius: number, height: number){
	var merged = new THREE.Geometry();
	var cyl = new THREE.CylinderGeometry(radius, radius, height - radius);
	var top = new THREE.SphereGeometry(radius);
	var bot = new THREE.SphereGeometry(radius);
	var matrix = new THREE.Matrix4();
	matrix.makeTranslation(0, (height - radius)/2, 0);
	top.applyMatrix(matrix);
	var matrix = new THREE.Matrix4();
	matrix.makeTranslation(0, -((height - radius)/2), 0);
	bot.applyMatrix(matrix);
	// merge to create a capsule
	merged.merge(top);
	merged.merge(bot);
	merged.merge(cyl);
	
	return merged;
}

export class CBaseCharacter extends CPhysicsEntity{

    constructor(scene: CScene, model?: string | THREE.Mesh){
		if(!model){
			//32x72x32
			//var geometry = createCapsuleMesh(16,72);
			
			var geometry = new THREE.CylinderGeometry(16,16,72,10,1);
			
			var material = new THREE.MeshPhysicalMaterial( {roughness: 0.5, metalness: 0} );
			model = new THREE.Mesh(geometry, material);
		}
		
		let bbox = new THREE.Vector3(32,72,32);
		super( scene, model, shapeType.CAPSULE_MESH, 70, bbox );

		//Disable rotation
		this.body.setAngularFactor( new Ammo.btVector3( 0,0,0 ) );
	}

	
}