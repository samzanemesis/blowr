import * as THREE from 'three';
var isNode = require('detect-node');

export var gPlatform: CPlatform;

export class CPlatform{
	operatingSystem: String
	resolution: { width: number, height:number };
	onload: () => any
	onresize: () => any
	physijs: any; //Fixme: Add typing for this

	constructor(platformCheck = true){
		gPlatform = this;
		
		if(platformCheck){
			if(isNode){
				//Running on NodeJS platform
				return new CPlatformNative();
			}else{
				//Running on a browser platform
				return new CPlatformBrowser();
			}
		}
	}

	webglStart(){
		return new THREE.WebGLRenderer();
	}

	requestAnimationFrame(cb: any){};

	now(){ return 0; };

	render(scene: THREE.Scene, camera: THREE.Camera, renderTarget?: THREE.RenderTarget, forceClear?: boolean){};
}

import { CPlatformBrowser } from "./PlatformBrowser";
import { CPlatformNative } from "./PlatformNative";