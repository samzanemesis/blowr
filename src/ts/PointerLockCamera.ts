import { THREE, CBaseEntity, CScene } from "./Common";

//import * as PointerLockControls from "three-pointerlock";

export class CPointerLockCamera extends CBaseEntity {

	//controls: PointerLockControls;
	camera: THREE.PerspectiveCamera;

	constructor(scene    	: CScene, fov?: number, aspect?: number, near?: number, far?: number){
		super(scene);
		this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		this.camera.position.z = 10;
		//this.controls = new PointerLockControls( this.camera );
		//this.controls.enabled = true;
		
		//this.scene.add( this.controls.getObject() );

		console.log("FUCK");
	}

	simulate(){
		//this.controls.update(1);
	}
}
