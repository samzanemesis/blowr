import * as THREE from 'three';
import { CGamebase } from "./game";

import { CBaseEntity } from "./BaseEntity";
import { CScene } from "./Scene";

import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'

import { FXAAShader } from "./shaders/FXAAShader"
import { gPlatform } from './Platform/Platform';

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

		//Add whichever render passes the gamemode wants to the EffectComposer, by default, pass FXAA
		public addRenderPasses( composer: EffectComposer ){
			var effectFXAA = new ShaderPass( FXAAShader );
			effectFXAA.uniforms[ 'resolution' ].value.set( 1 / gPlatform.resolution.width, 1 / gPlatform.resolution.height );
		  	composer.addPass( effectFXAA );
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