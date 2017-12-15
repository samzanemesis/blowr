import { CScene, CBaseEntity } from "./Common"

import * as THREE from 'three';
import { CPhysicsBuilder } from "./PhysicsBuilder";

export enum shapeType{
	BOX_MESH,
	CAPSULE_MESH,
	CYLINDER_MESH,
	CONVEX_MESH,
	SPHERE_MESH,
	MESH,
	PLANE_MESH
}

export class CPhysicsEntity extends CBaseEntity{
	mass: number;
	body: Ammo.btRigidBody;
	private worldTransform = new Ammo.btTransform();
	
	constructor(scene: CScene, model?: string | THREE.Mesh, shape = shapeType.BOX_MESH, mass = 0,
				bBox?: THREE.Vector3 ){
		super( scene, model );

		//Can this be 0?
		if(!mass)
			mass = 0;

		this.body = this.setupPhysics( shape, mass, bBox );
	}

	setupPhysics(shape: shapeType, mass:number, bBox?: THREE.Vector3){
		var physicsBuilder = new CPhysicsBuilder( this.mesh );
		
		var physicsShape = physicsBuilder.getPhysicsShape( shape, bBox );
	
		var info = physicsBuilder.createRigidBodyInfo(physicsShape, mass );
		var body = new Ammo.btRigidBody(info);

		this.scene.addRigidBody(body);
		

		return body;
	}


	//Sync physics and mesh data
	private updatePhysics(){
		//Object is not sleeping
		if( this.body.getMotionState() ){
			this.body.getMotionState().getWorldTransform( this.worldTransform );

			let p = this.worldTransform.getOrigin();
			let q = this.worldTransform.getRotation();

			this.mesh.position.set(p.x(), p.y(), p.z());
			this.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
		}
	}

	public setAbsPosition( position: THREE.Vector3){
		this.mesh.position.set( position.x, position.y, position.z );
		this.body.activate(true);
		this.body.getMotionState().getWorldTransform( this.worldTransform );
		this.worldTransform.setOrigin( new Ammo.btVector3( position.x, position.y, position.z ) );
		this.body.getMotionState().setWorldTransform( this.worldTransform );
		this.body.setWorldTransform( this.worldTransform );
    }

    public setAbsRotation( rotation: THREE.Euler){
		this.mesh.rotation.set( rotation.x, rotation.y, rotation.z );
		this.body.activate(true);
		this.body.getMotionState().getWorldTransform( this.worldTransform );
		this.worldTransform.setRotation( /* TODO CONVERT TO QUARTERNION */ );
		this.body.getMotionState().setWorldTransform( this.worldTransform );
		this.body.setWorldTransform( this.worldTransform );
	}
	
	public setAbsVelocity( velocity: THREE.Vector3 ){
		this.body.setLinearVelocity( new Ammo.btVector3(velocity.x, velocity.y, velocity.z));
	}

	public setAbsAngularVelocity( velocity: THREE.Vector3 ){
		this.body.setAngularVelocity(  new Ammo.btVector3(velocity.x, velocity.y, velocity.z));
	}

	simulate(){
		super.simulate();
		this.updatePhysics();
		//Update physics etc
	}
}