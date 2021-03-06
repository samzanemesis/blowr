import { CBaseEntity } from "./BaseEntity"
import { CScene } from "./Scene"
import { gGameStats } from "./game";

import * as THREE from 'three';

var colorTable = [ 0xF0433A, 0xFFFFFF, 0xF043FF, 0xF04300, 0xFFFFFF ];

export class CSplashScreenLogo extends CBaseEntity {

    flapLogoFront: THREE.Mesh;
    flapLogoBack: THREE.Mesh;
    backgroundMesh: THREE.Mesh[];
    logoScale: number

    runTime: number;

    constructor(scene: CScene){
        super( scene );

        this.runTime = 0;

        this.backgroundMesh = [];
        for (let i = 0; i < 5; i++) {
            this.backgroundMesh[i] = new THREE.Mesh( 
                new THREE.PlaneGeometry(8,8,1,1), 
                new THREE.MeshBasicMaterial( {color: colorTable[i] }) );
            this.scene.add( this.backgroundMesh[i] );
        }
        
        this.flapLogoFront = new THREE.Mesh( 
            new THREE.Geometry(), 
            new THREE.MeshBasicMaterial( {color: 0xF0433A } ) );
        this.flapLogoBack = new THREE.Mesh( 
            new THREE.Geometry(), 
            new THREE.MeshBasicMaterial( {color: 0x820333} ) );
        
        this.scene.add( this.flapLogoBack );
        this.scene.add( this.flapLogoFront );
    }

    simulate(){
        this.runTime += gGameStats.frametime;

        var logoScale = 5;
        var newGeo = this.createLogoGeometry( logoScale, Math.pow( ( Math.cos( Math.min( (this.runTime+0.75) * 1.25 ,2) * Math.PI) + 1 ) * 0.5 , 4 ) );
        
        this.flapLogoBack.geometry = newGeo.back;
        this.flapLogoFront.geometry = newGeo.front;

        this.flapLogoFront.position.x =  (logoScale*0.5);
        this.flapLogoFront.position.y = -(logoScale*0.5);

        this.flapLogoBack.position.x =  (logoScale*0.5);
        this.flapLogoBack.position.y = -(logoScale*0.5);

        //Update the back planes
        for (let i = 0; i < 5; i++) {
            var stuff = Math.max(this.runTime - (i*0.05),0);
            var planeScale = -0.5 * (2.71828 ** (-6 * stuff  )) * (
                -2 * (2.71828 ** (6 * stuff )) + Math.sin(12 * stuff ) + 2 * Math.cos(12 * stuff )) * 8;

            //Hack, don't spring the rest back in
            if(this.runTime > 0.5 && i < 4){
                planeScale = 1;
            }

            this.backgroundMesh[i].geometry = new THREE.PlaneGeometry(planeScale,planeScale,1,1);
        }

    }

    createLogoGeometry( scale: number, flapAnimation: number ){
        var backFlap = new THREE.Geometry();
        var frontFlap = new THREE.Geometry();

        var backFlapLerp  = Math.min( flapAnimation * 2, 1);
        var frontFlapLerp = Math.min( (flapAnimation - 0.5) * 2, 1);

        backFlap.vertices.push(
            new THREE.Vector3( 0,        0.485, 0.1 ),
            new THREE.Vector3( -0.420,   0.485, 0.1 ),
            new THREE.Vector3( 0,        0.485, 0.1 ).lerp( new THREE.Vector3( -0.250, 1, 0.1 ), backFlapLerp ),
            new THREE.Vector3( -0.420,   0.485, 0.1 ).lerp( new THREE.Vector3( -0.670, 1, 0.1 ), backFlapLerp ),
        );
        backFlap.faces.push( new THREE.Face3( 2, 1, 0 ) );
        backFlap.faces.push( new THREE.Face3( 3, 1, 2 ) );
        backFlap.scale(scale,scale,1);

        frontFlap.vertices.push(
            new THREE.Vector3( -0.250, 1, 0.2 ),
            new THREE.Vector3( -0.670, 1, 0.2 ),
            new THREE.Vector3( -0.250, 1, 0.2 ).lerp( new THREE.Vector3( -0.580, 0, 0.2 ), frontFlapLerp ),
            new THREE.Vector3( -0.670, 1, 0.2 ).lerp( new THREE.Vector3( -1,     0, 0.2 ), frontFlapLerp ),
        );
        frontFlap.faces.push( new THREE.Face3( 0, 1, 2 ) );
        frontFlap.faces.push( new THREE.Face3( 2, 1, 3 ) );
        frontFlap.scale(scale,scale,1);

        return {front: frontFlap, back: backFlap};
    }
}

class CLogo{
    constructor(){

    }
}