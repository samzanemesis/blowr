import { CPhysicsEntity, shapeType } from "./PhysicsEntity"
import { CScene } from "./Common"

class CBaseCharacter extends CPhysicsEntity{

    constructor(scene: CScene, model?: string | THREE.Mesh){
		super( scene, model, shapeType.CAPSULE_MESH );
		scene.AddEntityToScene(this);
	}
}