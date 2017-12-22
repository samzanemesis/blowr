/*
 	Purpose: Created by the local client, attaches to a a player entity and 
	controls it, sends input queries to the server 
*/ 

import { CBaseEntity } from "./BaseEntity";
import { CScene } from "./Scene";
import { CBasePlayer } from "./BasePlayer";

import * as THREE from 'three';
import { CPlatformInputHandler } from "./Platform/Platform";

export class CBasePlayerController extends CBaseEntity{

	private input : CPlatformInputHandler;

	constructor(scene: CScene, player: CBasePlayer, input : CPlatformInputHandler ){
		super(scene);
		new THREE.PerspectiveCamera( 90,  16  / 9, 0.1, 27000 );
		this.input = input;
	}

	simulate(){
	}
}