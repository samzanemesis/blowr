import { CScene, CBaseEntity } from "./Common"

namespace PhysicsEntity{

	enum shapeType{
		BOX_MESH,
		CAPSULE_MESH,
		CYLINDER_MESH,
		CONVEX_MESH,
		MESH,
		PLANE_MESH
	}


	export class CPhysicsEntity extends CBaseEntity{
		
		physics: Physijs.BoxMesh | Physijs.CapsuleMesh | Physijs.CylinderMesh | Physijs.ConvexMesh | Physijs.Mesh | Physijs.PlaneMesh;
		mass: number;
		
		constructor(scene: CScene, shape?: shapeType){
			super( scene );
			scene.AddEntityToScene(this);
		
			this.addNetworkedElement("Position", this.position);
			
			this.scene = scene;


			this.setupNetworking();
		}

		setupPhysicsMesh(shape: shapeType){
			switch(shape){
				case shapeType.BOX_MESH:
					return new Physijs.BoxMesh( this.mesh, { color: 0x888888 }, this.mass );
			}
		}
	}

}