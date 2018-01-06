import { CPhysicsEntity, shapeType } from "./PhysicsEntity"
import { CScene } from "./Common"

import * as THREE from 'three';

function createCapsuleMesh(radius: number, height: number){
	var merged = new THREE.Geometry();
	var cyl = new THREE.CylinderGeometry(radius, radius, height - (radius*2) );
	var top = new THREE.SphereGeometry(radius);
	var bot = new THREE.SphereGeometry(radius);
	var matrix = new THREE.Matrix4();
	matrix.makeTranslation(0, (height*0.5) - radius, 0);
	top.applyMatrix(matrix);
	var matrix = new THREE.Matrix4();
	matrix.makeTranslation(0, - ((height*0.5) - radius), 0);
	bot.applyMatrix(matrix);
	// merge to create a capsule
	merged.merge(top);
	merged.merge(bot);
	merged.merge(cyl);
	
	return merged;
}

export class CBaseCharacter extends CPhysicsEntity{

	protected armor: number;
	
	protected maxSpeed ;

	public rotation: THREE.Euler;

    constructor(scene: CScene, model?: string | THREE.Mesh){
		if(!model){
			//32x72x32
			var geometry = createCapsuleMesh(16,72);
			
			//var geometry = new THREE.CylinderGeometry(16,16,72,10,1);
			
			var material = new THREE.MeshPhysicalMaterial( {roughness: 0.5, metalness: 0} );
			model = new THREE.Mesh(geometry, material);
		}
		
		let bbox = new THREE.Vector3(32,72,32);
		super( scene, model, shapeType.CAPSULE_MESH, 70, bbox );

		this.rotation = new THREE.Euler(0,0,0);

		//Disable rotation
		this.body.setAngularFactor( new Ammo.btVector3( 0,0,0 ) );
		
		this.setupCharacter()
	}

	simulate(){
		super.simulate();

		var dispatcher = this.scene.getPhysicsWorld().getDispatcher();
		//Number of objects being collided
		var numManifolds = dispatcher.getNumManifolds();

		for (let i = 0; i < numManifolds; i++)
		{
			let contactManifold = dispatcher.getManifoldByIndexInternal(i);
			let body0 = contactManifold.getBody0();
			let body1 = contactManifold.getBody1();

			let numContacts = contactManifold.getNumContacts();
			for (let j = 0; j < numContacts; j++)
			{
				//contactManifold.getBody0().setAbsVelocity( new THREE.Vector3(0,-1000,0) );
			}
		}

	}

	setupCharacter(){
		this.health = 100;
		this.armor 	= 0;
		this.maxSpeed = 200;
	}

	// Characters don't rotate in the usual manner, we only rotate the Y axis on characters,
	// Other rotations are handled by blendshapes, we don't even need to rotate the physical
	// body
	setAbsRotation( rotation: THREE.Euler){
		this.rotation = rotation;
        this.mesh.rotation.set( 0,rotation.y,0 );
	}
	
	getAbsRotation(){
        return this.rotation;
    }
	
}