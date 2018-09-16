import { CPlatform, CPlatformInputHandler } from "./Platform"
import * as THREE from 'three';


export class CPlatformBrowser extends CPlatform{
	constructor(){
		super(false);
		this.resolution = {width: window.innerWidth, height: window.innerHeight};

		console.log("Running on Browser");

		console.log( document );
		this.input = new CPlatformBrowserInputHandler();
		
		window.onload = () => {
			this.onload();
		};

		window.onresize = () => {
			this.resolution = {width: window.innerWidth, height: window.innerHeight};
			//this.onresize();
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
		
		

		renderer.domElement.id = "gameCanvas";
		return renderer;
	}
}

export class CPlatformBrowserInputHandler extends CPlatformInputHandler {
	constructor(){
		super();
		document.addEventListener("mousedown", e => this.onMouseDown(e) );
		document.addEventListener("mouseup", e => this.onMouseUp(e) );
		document.addEventListener("mousemove", e => this.onMouseMove(e) );
		
		document.addEventListener("keydown", e => this.onKeyDown(e) );
		document.addEventListener("keyup",   e => this.onKeyUp(e) );	
		
		//Need these to trigger pointer lock events
		document.addEventListener('pointerlockchange', this.pointerLockChange, false);
		document.addEventListener('mozpointerlockchange', this.pointerLockChange, false);
		document.addEventListener('webkitpointerlockchange', this.pointerLockChange, false);
	}

	onMouseMove( e : MouseEvent){
		let mousePos = { x: e.x, y: e.y };
		
		this.mousePos = mousePos;

		this.mouseSpeed = {	x: e.movementX ,
							y: e.movementY  };

		//console.log(this.mouseSpeed);
	}

	pointerLockChange(e: Event){

	}

	setPointerLockEnabled(enable: boolean){
		if(enable){
			var havePointerLock = 'pointerLockElement' in document ||
			'mozPointerLockElement' in document ||
			'webkitPointerLockElement' in document;

			if(!havePointerLock)
				console.error("Browser doesn't seem to have pointer lock support!")

			let canvas:any = document.getElementById('gameCanvas');
			if(!canvas)
				console.error("Unable to find Canvas for pointer lock request!");
			
			canvas.requestPointerLock = canvas.requestPointerLock ||
			     canvas.mozRequestPointerLock ||
			     canvas.webkitRequestPointerLock;
			// Ask the browser to lock the pointer
			canvas.requestPointerLock();

			//If that doesn't work, make a request when the user clicks
			canvas.onclick = () => {
				canvas.requestPointerLock();
			};
		}else{
			//Disable browser pointerlock
			let canvas:any = document.getElementById('gameCanvas');

			if(!canvas)
				console.error("Unable to find Canvas for pointer lock request!");
			
			canvas.exitPointerLock();

			canvas.onclick = () => {
				
			};
		}
	}
}