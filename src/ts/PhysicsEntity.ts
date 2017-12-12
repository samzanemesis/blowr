import { CScene, CBaseEntity } from "./Common"

import * as THREE from 'three';

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
	
	constructor(scene: CScene, model?: string | THREE.Mesh, shape?: shapeType, mass?: number){
		super( scene, model );

		this.body = this.setupPhysics( shape, mass );
	}

	setupPhysics(shape: shapeType, mass:number){
		var physicsShape = this.getPhysicsShape( shape );
		
		//Can this be 0?
		if(!mass)
			mass = 10;
		
		var info = this.createRigidBodyInfo(physicsShape, mass );
		var body = new Ammo.btRigidBody(info);

		this.scene.addRigidBody(body);
		body.setActivationState(4) // Disable deactivation

		return body;
	}

	private getPhysicsShape( shape?: shapeType ){
		var physicsShape;

		if(!shape)
			shape = shapeType.BOX_MESH;
		
		switch(shape){
			case shapeType.BOX_MESH:
				var bbox = new THREE.Box3().setFromObject( this.mesh ).getSize();
				physicsShape = new Ammo.btBoxShape( new Ammo.btVector3(bbox.x, bbox.y, bbox.z ) );
				break;
			case shapeType.CAPSULE_MESH:
				physicsShape = new Ammo.btConvexShape();
				break;
			case shapeType.CYLINDER_MESH:
				physicsShape = new Ammo.btConvexShape();
				break;
			case shapeType.CONVEX_MESH:
				physicsShape = new Ammo.btConvexShape();
				break;
			case shapeType.SPHERE_MESH:
				var radius = new THREE.Box3().setFromObject( this.mesh ).getBoundingSphere().radius;
				physicsShape = new Ammo.btSphereShape(radius);
				break;
			case shapeType.MESH:
				physicsShape = new Ammo.btConvexShape();
				break;
			case shapeType.PLANE_MESH:
				physicsShape = new Ammo.btConvexShape();
				break;
		}

		return physicsShape;
	}

	private createRigidBodyInfo(physicsShape: Ammo.btConvexShape, mass: number): Ammo.btRigidBodyConstructionInfo{
		var transform = new Ammo.btTransform();
		transform.setIdentity();
		//TODO: Check if this can be 0
		transform.setOrigin(new Ammo.btVector3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z));
		transform.setRotation(new Ammo.btQuaternion(this.mesh.quaternion.x, this.mesh.quaternion.y, this.mesh.quaternion.z, this.mesh.quaternion.w));
		const motionState = new Ammo.btDefaultMotionState(transform);

		const localInertia = new Ammo.btVector3(0, 0, 0);
		physicsShape.calculateLocalInertia(mass, localInertia);

		var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);

		return rbInfo;
	}

	//Sync physics and mesh data
	updatePhysics(){
		//Object is not sleeping
		if( this.body.getMotionState() ){
			this.body.getMotionState().getWorldTransform( this.worldTransform );

			let p = this.worldTransform.getOrigin();
			let q = this.worldTransform.getRotation();

			this.mesh.position.set(p.x(), p.y(), p.z());
			this.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
		}
	}

	setAbsPosition( position: THREE.Vector3){
		this.mesh.position = position;
		this.worldTransform.setOrigin( new Ammo.btVector3(position.x, position.y, position.z));
    }

    setAbsRotation( rotation: THREE.Euler){
		this.mesh.rotation = rotation;
		//TODO: Euler to Quartenion
		//this.worldTransform.setRotation()
	}
	
	setAbsVelocity( velocity: THREE.Vector3 ){
		this.body.setLinearVelocity( new Ammo.btVector3(velocity.x, velocity.y, velocity.z));
	}

	simulate(){
		super.simulate();
		this.updatePhysics();
		//Update physics etc
	}
}