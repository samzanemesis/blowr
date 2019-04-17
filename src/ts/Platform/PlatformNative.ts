import { CPlatform, CPlatformInputHandler } from "./Platform"
import { setTimeout } from "timers";
import { Document } from "node-webgl-raub";

import * as THREE from 'three';

export class CPlatformNative extends CPlatform{
	document: any;

	forceVsync: Boolean
	
	constructor(){
		super(false);
		console.log("Running as Native!");

		//Hack fix for ThreeJS bitching about WebVR by emulating Navigator
		global.navigator = require("navigator");

		this.forceVsync = false;
		
		this.document = new Document()

		this.input = new CPlatformNativeInputHandler( this.document );
		
		//Load Node Ammo
		const Ammo = require('ammo-node');

		//Finished setting up everything
		this.waitUntilLoad();
	}

	waitUntilLoad(){
		if(this.onload)
			this.onload();
		else
			setTimeout( () => this.waitUntilLoad(), 100 );
	}

	requestAnimationFrame(cb: any){
		
		if(this.forceVsync)
			setTimeout( () => { this.document.requestAnimationFrame(cb) }, 1000/60 ); //Framerate implicit as 60fps
        else
			this.document.requestAnimationFrame(cb);
	}

	now(){
		//return process.uptime();
		return process.hrtime()[0] + (process.hrtime()[1] * 0.000000001);
	}

	webglStart(){
		var canvas = this.document.createElement("three-canvas");
		try {
		  var gl = canvas.getContext("experimental-webgl");
			
		  // Hack for three.js, force precision
		  gl.getShaderPrecisionFormat = () => {
			  return {precision: 'mediump'};
		  }
		  // Hack for three.js, remove precision from shader
		  var parentShaderSource = gl.shaderSource;
		  gl.shaderSource = function( shader, string ){
			  string = "#version 400\n" + string;
			  string = string.replace(/highp/g,''); //Remove any explict instances of highp
			  //Signal to some shaders designed for webgl (GLSL 1.00) to use GLSL 1.30, could go higher
			  string = string.replace("GLSL_100 1", "GLSL_200 1");

			  string = string.split('\n').filter(function(line){
				  return ! line.startsWith("precision");
			  }).join('\n');
			  
			  return parentShaderSource(shader, string);
		  };
	  
		  gl.viewportWidth = canvas.width;
		  gl.viewportHeight = canvas.height
		  this.resolution = { width: canvas.width, height: canvas.height };

		  //console.log(gl);
		  
		} catch (e) {
			console.log(e);
		}
		if (!gl) {
		  alert("Could not initialise WebGL, sorry :-(");
		}

		this.document.on("resize", () => {
			this.resolution = { width: canvas.width, height: canvas.height };
			this.onresize();
		});

		var renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			//context: gl,
			alpha: false,
		});

		renderer.context = gl;
		//renderer.setClearColor(0x555555, 1);

		return renderer;
	  
		//init(canvas, gl);
	}
}

export class CPlatformNativeInputHandler extends CPlatformInputHandler {
	platformDocument: any;
	mouseLocked = false;

	constructor(platformDocument: any){
		super();
		this.platformDocument = platformDocument;
		platformDocument.on('mousedown', e => this.onMouseDown( e ) );
		platformDocument.on('mouseup', e => this.onMouseUp( e ) );
		platformDocument.on('mousemove', e => this.onMouseMove( e ) );
		
		platformDocument.on('keydown', e => this.onKeyDown( e ) );
		platformDocument.on('keyup', e => this.onKeyUp( e ) );	
	}

	onMouseMove( e : MouseEvent){
		let mousePos = { x: e.x, y: e.y };

		let halfWindowPos = { x: this.platformDocument.width  /2,
							  y: this.platformDocument.height /2};

		if(this.mousePos)
			this.mouseSpeed = {	x: mousePos.x - halfWindowPos.x,
								y: mousePos.y - halfWindowPos.y };

		if(this.platformDocument && this.mouseLocked)
			this.platformDocument.cursorPos = halfWindowPos;						

		this.mousePos = mousePos;
	}

	setPointerLockEnabled(enable: boolean){
		this.mouseLocked = enable;
	}
}
