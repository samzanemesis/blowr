import { CBaseGamemode } from "../BaseGamemode"
import { THREE, CGamebase } from "../Common"
import { CPointerLockCamera } from "../PointerLockCamera"
import { PerspectiveCamera } from "three";

export class CSpellgameGamemode extends CBaseGamemode {
	constructor(gamebase: CGamebase){
		super(gamebase);
	}

	protected setupLocalPlayer(){
		//this.camera = new CPointerLockCamera( this.scene, 70,  16  / 9, 0.1, 27000 ).camera;
		this.camera = new PerspectiveCamera( 70,  16  / 9, 0.1, 27000 );
		this.camera.position.z = 100;
	}
	 
}