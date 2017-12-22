import { CBaseCharacter } from "./BaseCharacter";
import { CScene } from "./Common"

export class CBasePlayer extends CBaseCharacter{
	constructor(scene: CScene, model?: string | THREE.Mesh){
		super(scene, model);
	}
}