/*
 	Purpose: Created by the local client, attaches to a a player entity and 
	controls it, sends input queries to the server, by default this controls
	an FPS character
	Should this send player viewpos to the server?
*/ 

import * as THREE from 'three';

import { CBaseEntity } from "./BaseEntity";
import { CScene } from "./Scene";
import { CBasePlayer } from "./BasePlayer";

import { CPlatformInputHandler, gPlatform } from "./Platform/Platform";
import { CBaseGamemode } from "./BaseGamemode";

export class CBasePlayerController extends CBaseEntity{

	private input : CPlatformInputHandler;
	private player: CBasePlayer;
	private camera: THREE.Camera;

	constructor(gamemode: CBaseGamemode, player: CBasePlayer, input : CPlatformInputHandler ){
		super(gamemode.scene);
		this.camera = new THREE.PerspectiveCamera( 70,  16  / 9, 7, 27000 );
		this.player = player;

		this.player.localPlayer = true;

		//Change gamemode's camera to the one the player's controlling
		gamemode.camera = this.camera;
		this.input = input;

		gPlatform.input.setPointerLockEnabled(true);
	}

	simulate(){
		var playerPos = this.player.getAbsPosition();
		this.camera.position.set( playerPos.x, playerPos.y + 20 , playerPos.z );

		//Rotate camera
		var rotation = new THREE.Euler( this.camera.rotation.x - (this.input.mouseSpeed.y * 0.01),
			this.camera.rotation.y - (this.input.mouseSpeed.x * 0.01),
			0,
			"YXZ"
		);

		if(rotation.x > Math.PI/2)
			rotation.x = Math.PI/2;
		if(rotation.x < -Math.PI/2)
			rotation.x = -Math.PI/2;

		this.camera.rotation.copy(rotation);
		this.player.setAbsRotation(rotation);

		//Hardcoded keys :(
		if( this.input.keysDown[32] )
			this.player.jump();
		
		if( this.input.keysDown[87] ) //W
			this.player.moveDirection.fwd = 1.0;
		if( this.input.keysDown[83] ) //S
			this.player.moveDirection.fwd = -1.0;
		if( this.input.keysDown[65] ) //A
			this.player.moveDirection.right = -1.0;
		if( this.input.keysDown[68] ) //D
			this.player.moveDirection.right = 1.0;
		
	}

	inputEvent( event: KeyboardEvent ){
		
	}
}