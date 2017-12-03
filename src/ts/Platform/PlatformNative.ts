import { CPlatform } from "./Platform"
import { setTimeout } from "timers";

import * as THREE from 'three';

//requestAnimationFrame = document.requestAnimationFrame;

export class CPlatformNative extends CPlatform{
	document: any;
	
	constructor(){
		super(false);
		console.log("Running as Native!");
		
		this.document = require("node-webgl-raub").document()
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
		this.document.requestAnimationFrame(cb);
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

			  string = string.replace(/highp/g,''); //Remove any explict instances of highp
			  string = string.split('\n').filter(function(line){
				  return ! line.startsWith("precision");
			  }).join('\n');
			  
			  return parentShaderSource(shader, string);
		  };
	  
		  gl.viewportWidth = canvas.width;
		  gl.viewportHeight = canvas.height;
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
			context: gl,
			alpha: false
		});

		renderer.setClearColor(0x555555, 1);

		return renderer;
	  
		//init(canvas, gl);
	}
}