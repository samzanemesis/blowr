import * as THREE from 'three';
var isNode = require('detect-node');

export class CPlatform{
	operatingSystem: String
	resolution: { width: number, height:number };
	onload: () => any
	onresize: () => any

	constructor(platformCheck = true){
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
}

import { CPlatformBrowser } from "./PlatformBrowser";
import { CPlatformNative } from "./PlatformNative";