import { CBaseGamemode } from "../BaseGamemode"
import { THREE, CGamebase, CScene, CBaseEntity } from "../Common"
import { PerspectiveCamera, MeshStandardMaterial } from "three";

import { CPhysicsEntity, shapeType } from "../PhysicsEntity"
import { CBaseCharacter } from "../BaseCharacter";
import { CBasePlayer } from "../BasePlayer";
import { CBasePlayerController } from "../BasePlayerController";
import { gPlatform } from "../Platform/Platform";

import EffectComposer, { RenderPass, ShaderPass, CopyShader } from '@johh/three-effectcomposer'
import { UnrealBloomPass } from "../shaders/UnrealBloom"

import { CSpellgameSky } from "./SpellgameSky"

export class CSpellgameGamemode extends CBaseGamemode {
	constructor(gamebase: CGamebase){
		super(gamebase);
	}

	protected setupScene(){
		this.scene = new CScene();
		//this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

		var modelLoader = new THREE.JSONLoader();

		var geometry = new THREE.BoxGeometry(30,30,30);
		//var material = new THREE.MeshBasicMaterial();
		var material = new THREE.MeshNormalMaterial(  );
		//var material = new THREE.MeshBasicMaterial( { color: 0x555500 } );
		var mesh = new THREE.Mesh( geometry, material );

		var ground = new CPhysicsEntity( this.scene, 
			new THREE.Mesh( 
				new THREE.BoxGeometry(1024,10,1024)
				, material
			),
			shapeType.BOX_MESH,
			0
		).setAbsPosition( new THREE.Vector3(0,-10,0) );

		for(let i=0;i< 50; i++){
			new CPhysicsEntity( this.scene, 
				new THREE.Mesh( new THREE.BoxGeometry(30,5,30), material ),
				shapeType.BOX_MESH,
				500
			).setAbsPosition(new THREE.Vector3( 0 ,i*10 + 100,0));
		}

		new CSpellgameSky( this.scene );
		
		var light = new THREE.DirectionalLight(0xffffff, 1);
		light.castShadow = true;
		light.position.set(50, 100, 50);
		const d = 100;
		light.shadow.camera.left = -d;
		light.shadow.camera.right = d;
		light.shadow.camera.top = d;
		light.shadow.camera.bottom = -d;
		light.shadow.camera.near = 2;
		light.shadow.camera.far = 500;
		light.shadow.mapSize.x = 1024;
		light.shadow.mapSize.y = 1024;
		
		this.scene.add( light );
		
		var commonLight = new THREE.PointLight();
		this.scene.add(commonLight);

		this.scene.add( new THREE.HemisphereLight(0x606060, 0x000000) );
		
	}


	addModelToScene(geometry, materials) {
		var material = new THREE.MeshFaceMaterial(materials);
		var object = new THREE.Mesh(geometry, material);
		object.scale.set(10, 10, 10);
		this.scene.add(object);
	}

	public addRenderPasses( composer: EffectComposer ){
		
		this.bloomPass(composer);
		super.addRenderPasses(composer);
	}

	private bloomPass( composer: EffectComposer )
    {
		var renderScale = this.renderSettings.renderScale;
        var bloomPass = new UnrealBloomPass( new THREE.Vector2( gPlatform.resolution.width * renderScale, gPlatform.resolution.height * renderScale ), 1.0, 1.0, 0.8);
        //bloomPass.renderToScreen = true;
        composer.addPass(bloomPass);
    }

	protected setupLocalPlayer(){
		let player = new CBasePlayer( this.scene );
		
		this.input = gPlatform.input;

		var controller = new CBasePlayerController( this, player, this.input);
		this.input.setActiveInputContext( controller.inputEvent );
	}
	 
}