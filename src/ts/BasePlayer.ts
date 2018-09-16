import * as THREE from 'three';

import { CBaseCharacter } from "./BaseCharacter";
import { CScene } from "./Common"
import { gGameStats } from './game';

export enum PLAYER_ACTIONS{
	PLAYER_JUMP,
	PLAYER_ATTACK1,
	PLAYER_ATTACK2,
}

export class CBasePlayer extends CBaseCharacter{
	
	public localPlayer = false; //Is this a locally controlled player?
	
	public moveDirection = { fwd: 0, right: 0, up: 0 };
	public viewOffset: THREE.Vector3;
	
	constructor(scene: CScene, model?: string | THREE.Mesh){
		super(scene, model);
		//this.body.setFriction(0.5);
		
		this.body.setFriction(1.0); //Hack

		this.viewOffset = new THREE.Vector3(0,0,24);
	}

	simulate(){
		super.simulate();
		this.handleInputs();
	}

	handleInputs(){
		var yaw = this.rotation.y;

		var fwdMove = new THREE.Vector3(
			(Math.sin(yaw)*-this.moveDirection.fwd),
			0,
			(Math.cos(yaw)*-this.moveDirection.fwd)
		);

		var sideMove = new THREE.Vector3(
			(Math.sin(yaw + Math.PI/2)*this.moveDirection.right),
			0,
			(Math.cos(yaw + Math.PI/2)*this.moveDirection.right)
		);

		var moveDir = new THREE.Vector3().copy(fwdMove).add(sideMove).normalize();
		var mass = 60;
		var accelerate = 7;

		var wishSpeed = this.maxSpeed * accelerate * mass;
		var moveVelocity = new THREE.Vector3().copy(moveDir).multiplyScalar(wishSpeed);

		this.body.activate( true );
		
		this.body.applyCentralForce( new Ammo.btVector3( moveVelocity.x, moveVelocity.y, moveVelocity.z ) );

		//Source seems to do something like this, only do this if grounded
		/*if( this.getAbsVelocity().length() > this.maxSpeed && moveDir.length() > 0.1 ){
			let clampedVel = new THREE.Vector3().copy(moveDir).multiplyScalar( this.maxSpeed );
			var vel = new THREE.Vector3().copy( this.getAbsVelocity() ).lerp( clampedVel, gGameStats.frametime * accelerate  );
			vel.y = this.getAbsVelocity().y;
			this.setAbsVelocity( vel );
		}*/

		//Reset after simulated;
		this.moveDirection = { fwd: 0, right: 0, up: 0 }; 
	}

	jump(){
		this.setAbsVelocity( new THREE.Vector3(0,200,0) );
	}
}