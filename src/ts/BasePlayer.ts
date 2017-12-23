import * as THREE from 'three';

import { CBaseCharacter } from "./BaseCharacter";
import { CScene } from "./Common"

export enum PLAYER_ACTIONS{
	PLAYER_JUMP,
	PLAYER_ATTACK1,
	PLAYER_ATTACK2,
}

export class CBasePlayer extends CBaseCharacter{
	
	public localPlayer = false; //Is this a locally controlled player?
	
	public moveDirection = { fwd: 0, right: 0, up: 0 }; 
	
	constructor(scene: CScene, model?: string | THREE.Mesh){
		super(scene, model);
	}

	simulate(){
		super.simulate();
		this.handleInputs();
	}

	handleInputs(){
		var yaw = this.rotation.y;

		var fwdMove = new THREE.Vector3(
			(Math.sin(yaw)*-this.moveDirection.fwd) * 320,
			0,
			(Math.cos(yaw)*-this.moveDirection.fwd) * 320
		);

		var sideMove = new THREE.Vector3(
			(Math.sin(yaw + Math.PI/2)*this.moveDirection.right) * 320,
			0,
			(Math.cos(yaw + Math.PI/2)*this.moveDirection.right) * 320
		);

		var move = fwdMove.add(sideMove);
		var mass = 60;
		move.multiply( new THREE.Vector3(mass,mass,mass) );
		this.body.activate( true );
		this.body.applyCentralForce( new Ammo.btVector3(move.x,move.y,move.z)  );
		//Reset after simulated;
		this.moveDirection = { fwd: 0, right: 0, up: 0 }; 
	}
}