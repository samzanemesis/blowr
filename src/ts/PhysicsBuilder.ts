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

export class CPhysicsBuilder{
    mesh: THREE.Mesh;
    
    constructor(mesh: THREE.Mesh){
        this.mesh = mesh;
    }

    public getPhysicsShape( shape: shapeType, bbox?: THREE.Vector3 ){
        let physicsShape;

        if(!bbox)
            bbox = new THREE.Box3().setFromObject( this.mesh ).getSize();
            
        bbox = bbox.multiply( new THREE.Vector3( 0.5, 0.5, 0.5) );

		switch(shape){
			case shapeType.BOX_MESH:
				physicsShape = new Ammo.btBoxShape( new Ammo.btVector3(bbox.x, bbox.y, bbox.z ) );
				break;
			case shapeType.CAPSULE_MESH:
				physicsShape = new Ammo.btCapsuleShape( bbox.x, bbox.y );
				break;
			case shapeType.CYLINDER_MESH:
				physicsShape = new Ammo.btCylinderShape( new Ammo.btVector3( bbox.x, bbox.y, bbox.z ) );
				break;
			case shapeType.CONVEX_MESH:
				physicsShape = new Ammo.btConvexShape();
				break;
			case shapeType.SPHERE_MESH:
				physicsShape = new Ammo.btSphereShape( bbox.x );
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
    
    public createRigidBodyInfo(physicsShape: Ammo.btConvexShape, mass: number): Ammo.btRigidBodyConstructionInfo{
		var transform = new Ammo.btTransform();
		transform.setIdentity();
		//TODO: Check if this can be 0
		transform.setOrigin(new Ammo.btVector3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z));
		transform.setRotation(new Ammo.btQuaternion(this.mesh.quaternion.x, this.mesh.quaternion.y, this.mesh.quaternion.z, this.mesh.quaternion.w));
		const motionState = new Ammo.btDefaultMotionState(transform);

		const localInertia = new Ammo.btVector3(0, 100, 0);
		physicsShape.calculateLocalInertia(mass, localInertia);

		var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);

		return rbInfo;
	} 
}

