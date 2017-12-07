import { CPlatform } from "./Platform"
import * as THREE from 'three';

//Physics stuff
var Physijs = require('physijs-browserify')(THREE);
Physijs.scripts.worker = '/libs/physi-worker.js';
Physijs.scripts.ammo = '/libs/ammo.js';

export class CPlatformBrowser extends CPlatform{
	constructor(){
		super(false);
		this.resolution = {width: window.innerWidth, height: window.innerHeight};

		console.log("Running on Browser");
		
		this.physijs = Physijs;

		window.onload = () => {
			this.onload();
		};

		window.onresize = () => {
			this.resolution = {width: window.innerWidth, height: window.innerHeight};
			this.onresize();
		}
		
	};

	render(){
		
	}

	now(){
		return performance.now()/1000;
	}

	requestAnimationFrame(cb: any){
		requestAnimationFrame(cb);
	}

	webglStart(){
		var renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
        renderer.setClearColor(0x555555, 1);
		document.getElementById('content').appendChild( renderer.domElement );
		return renderer;
	}
}