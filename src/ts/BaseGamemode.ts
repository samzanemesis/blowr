import * as THREE from 'three';
import { CGamebase } from "./game";

import { CBaseEntity } from "./BaseEntity";
import { CScene } from "./Scene";
import { gPlatform, CPlatformInputHandler } from './Platform/Platform';

import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'

import { FXAAShader } from "./shaders/FXAAShader"

export class CBaseGamemode{

		public scene    	: CScene;
		public camera		: THREE.Camera;
		protected input		: CPlatformInputHandler;
		private entityList 	: CBaseEntity[];

		private renderSettings: { renderScale:number};
		
		constructor(gamebase: CGamebase){
			this.setupScene();
			this.setupLocalPlayer();
			
			this.renderSettings = gamebase.renderSettings;

			this.input = gPlatform.input;
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
			var renderScale = this.renderSettings.renderScale;
			effectFXAA.uniforms[ 'resolution' ].value.set( 1 / (gPlatform.resolution.width * renderScale), 1 / (gPlatform.resolution.height * renderScale) );
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