import { CScene, CBaseEntity } from "./Common"

export enum shapeType{
	BOX_MESH,
	CAPSULE_MESH,
	CYLINDER_MESH,
	CONVEX_MESH,
	MESH,
	PLANE_MESH
}

export class CPhysicsEntity extends CBaseEntity{
	mass: number;

	constructor(scene: CScene, model?: string | THREE.Mesh, shape?: shapeType, mass?: number){
		super( scene, model );
		scene.AddEntityToScene(this);
	
		//this.addNetworkedElement("Position", this.position);
		this.mesh = this.setupPhysicsMesh( shape );
		this.scene = scene;

		this.setupNetworking();
	}

	setupPhysicsMesh(shape: shapeType){
		switch(shape){
			case shapeType.BOX_MESH:
				return new Physijs.BoxMesh( <THREE.Geometry>this.mesh.geometry, <THREE.Material>this.mesh.material, this.mass );
			case shapeType.CAPSULE_MESH:
				return new Physijs.CapsuleMesh( <THREE.Geometry>this.mesh.geometry, <THREE.Material>this.mesh.material, this.mass );
			case shapeType.CYLINDER_MESH:
				return new Physijs.CylinderMesh( <THREE.Geometry>this.mesh.geometry, <THREE.Material>this.mesh.material, this.mass );
			case shapeType.CONVEX_MESH:
				return new Physijs.ConvexMesh( <THREE.Geometry>this.mesh.geometry, <THREE.Material>this.mesh.material, this.mass );
			case shapeType.MESH:
				return new Physijs.Mesh( <THREE.Geometry>this.mesh.geometry, <THREE.Material>this.mesh.material, this.mass );
			case shapeType.PLANE_MESH:
				return new Physijs.PlaneMesh( <THREE.Geometry>this.mesh.geometry, <THREE.Material>this.mesh.material, this.mass );
		}
	}
}