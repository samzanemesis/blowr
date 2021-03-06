import * as THREE from 'three';
var isNode = require('detect-node');

export var gPlatform: CPlatform;

export class CPlatform{
	operatingSystem: String
	resolution: { width: number, height:number };
	input: CPlatformInputHandler;
	io: CPlatformIOHandler;
	onload: () => any;
	onresize: () => any;

	constructor(platformCheck = true){
		gPlatform = this;
		
		if(platformCheck){
			if(isNode){
				//Running on NodeJS platform
				return new CPlatformNative();
			}
			else
			{
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

export class CPlatformIOHandler 
{
	constructor()
	{

	}

	readFile(file)
	{
	}

	readFileAsync(file)
	{
	}

	writeFile(file)
	{
	}

	writeFileAsync(file)
	{
	}
}

export class CPlatformInputHandler {
	//platformDocument: HTMLDocument;

	mousePos: {x: number, y: number};
	mouseSpeed: {x: number, y: number};
	keysDown: Array<boolean> = [];
	inputContext: ( e ) => any;

	constructor(){
		this.mouseSpeed = {	x: 0, y: 0 };
		this.mousePos = { x: 0, y: 0 };

		this.inputContext = () => {};
	}
	onMouseDown( e : MouseEvent){

	}
	onMouseUp( e : MouseEvent){

	}
	onMouseMove( e : MouseEvent){
		let mousePos = { x: e.x, y: e.y };

		if(this.mousePos)
			this.mouseSpeed = {	x: mousePos.x - this.mousePos.x,
								y: mousePos.y - this.mousePos.y };

		this.mousePos = mousePos;
	}

	onKeyDown( e : KeyboardEvent ){
		console.log( "Down " + e.keyCode );
		this.keysDown[e.keyCode] = true;

		this.inputContext( e );
	}

	onKeyPress( e : KeyboardEvent ){
		console.log( "Pressing " + e.keyCode );
		
		this.inputContext( e );
	}
	
	onKeyUp( e : KeyboardEvent ){
		console.log( "Released " + e.keyCode );
		this.keysDown[e.keyCode] = false;
		
		this.inputContext( e );
	}

	setPointerLockEnabled(enable: boolean){
		if(enable){

		}else{

		}
	}

	//Most things will require a dedicated
	setActiveInputContext( context ){
		this.inputContext = context;
	}
}

import { CPlatformBrowser, CPlatformBrowserInputHandler } from "./PlatformBrowser";
import { CPlatformNative } from "./PlatformNative";