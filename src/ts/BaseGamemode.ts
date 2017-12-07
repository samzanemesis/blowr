import * as THREE from 'three';
import { CGamebase } from "./game";

import { CBaseEntity } from "./BaseEntity";
import { CScene } from "./Scene";

export class CBaseGamemode{

		public scene    	: CScene;
		public camera		: THREE.Camera;
		private entityList 	: CBaseEntity[];
	
		constructor(gamebase: CGamebase){
			this.setupScene();
			this.setupLocalPlayer();
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
			this.scene.simulate(undefined, 1 );
		}
	}