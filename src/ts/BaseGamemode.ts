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
				
			var modelLoader = new THREE.JSONLoader();
	
			var geometry = new THREE.SphereGeometry(10,30,30);
			var material = new THREE.MeshNormalMaterial();
			new CBaseEntity( this.scene );
			
			var mesh = new THREE.Mesh( geometry, material );
			this.scene.add( mesh );
			
			this.scene.add(new THREE.AmbientLight(new THREE.Color(0.9,0.9,0.9).
							getHex()));
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