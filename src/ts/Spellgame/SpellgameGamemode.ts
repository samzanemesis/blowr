import { CBaseGamemode } from "../BaseGamemode"
import { THREE, CGamebase, CScene, CBaseEntity } from "../Common"
import { CPointerLockCamera } from "../PointerLockCamera"
import { PerspectiveCamera } from "three";

import { CPhysicsEntity } from "../PhysicsEntity"

export class CSpellgameGamemode extends CBaseGamemode {
	constructor(gamebase: CGamebase){
		super(gamebase);
	}

	protected setupScene(){
		this.scene = new CScene();
		//this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

		var modelLoader = new THREE.JSONLoader();

		var geometry = new THREE.SphereGeometry(10,10,10);
		var material = new THREE.MeshPhysicalMaterial( {reflectivity: 0.5, roughness: 0.1} );
		var mesh = new THREE.Mesh( geometry, material );

		new CPhysicsEntity( this.scene, mesh );
		
		new CBaseEntity( this.scene, 
			new THREE.Mesh( 
				new THREE.PlaneGeometry(256,256,1,1).rotateX(-70)
				, material 
			)
		);
		
		this.scene.add(new THREE.DirectionalLight( new THREE.Color(0.9,0.9,0.9).getHex() ) );
	}

	protected setupLocalPlayer(){
		//this.camera = new CPointerLockCamera( this.scene, 70,  16  / 9, 0.1, 27000 ).camera;
		this.camera = new PerspectiveCamera( 90,  16  / 9, 0.1, 27000 );
		this.camera.position.z = 100;
		this.camera.position.y = 10;
	}
	 
}