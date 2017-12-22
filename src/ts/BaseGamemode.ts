import * as THREE from 'three';
import { CGamebase } from "./game";

import { CBaseEntity } from "./BaseEntity";
import { CScene } from "./Scene";
import { gPlatform, CPlatformInputHandler } from './Platform/Platform';

export class CBaseGamemode{

		public scene    	: CScene;
		public camera		: THREE.Camera;
		protected input		: CPlatformInputHandler;
		private entityList 	: CBaseEntity[];
		
		constructor(gamebase: CGamebase){
			this.setupScene();
			this.setupLocalPlayer();

			this.input = gPlatform.input;
		}

		protected setupScene(){
			this.scene = new CScene();
		}

		protected setupLocalPlayer(){
			this.camera = new THREE.PerspectiveCamera( 70,  16  / 9, 0.01, 10 );
			this.camera.position.z = 1;
		}

		protected initGame(){
		}
		
		public preFrame(){

		}

		public postFrame(){

		}

		public update(){
			this.scene.simulate();
		}
	}