import * as THREE from 'three';

import { CBaseGamemode } from './BaseGamemode'
import { CSpellgameGamemode } from './Spellgame/SpellgameGamemode'
import { CSplashScreenGamemode } from './SplashScreenGamemode'

import { CPlatform } from './Platform/Platform';

export var gGameStats: CGameStats;

export class CGamebase {
    renderer:THREE.WebGLRenderer;
    gamemode: CBaseGamemode;
    platform: CPlatform;
    stats   : CGameStats;

    constructor( platform: CPlatform ) {
        this.platform = platform;
        this.renderer = platform.webglStart();
        
        //Change this to your fav gamemode
        this.gamemode = new CSpellgameGamemode(this);

        this.stats = new CGameStats( platform );
        
        this.setResolution( {width: platform.resolution.width, height: platform.resolution.height} );

        platform.onresize = () =>{
            this.setResolution( {width: platform.resolution.width, height: platform.resolution.height} );
        }

        this.start();
    }

    //Maybe move this away from game?
    setResolution( resolution:{width: number , height: number} ){
        this.renderer.setSize( resolution.width, resolution.height);
        var cameraClass = this.gamemode.camera.constructor.name; 
        var camera;

        switch(cameraClass){
            case "PerspectiveCamera":
                camera = <THREE.PerspectiveCamera>this.gamemode.camera; 
                camera.aspect = resolution.width  / resolution.height;
                camera.updateProjectionMatrix();
                break;
            case "OrthographicCamera":
                var aspect = resolution.width  / resolution.height;
                camera = <THREE.OrthographicCamera>this.gamemode.camera;
                camera.left = -(camera.top * aspect);
                camera.right = (camera.top * aspect);
                camera.updateProjectionMatrix();
                break;
        }
    }

    render() {

        this.gamemode.preFrame();
        this.gamemode.update();
        this.renderer.render( this.gamemode.scene , this.gamemode.camera);
        this.gamemode.postFrame();

        this.stats.updateFrame();

        this.platform.requestAnimationFrame(() => this.render());           
    }

    start() {
        this.render();
    }
}

class CGameStats{
    private platform: CPlatform;

    public frametime = 0;
    public immediateFramerate = 0;
    public framerate = 0;

    private prevTime: number;
    private currentTime: number;
    private frameCount = 0;

    constructor(platform: CPlatform){
        this.platform = platform;
        this.currentTime = this.platform.now();
        this.updateFramerate();

        //Update this singleton to be easily accessed anywhere
        gGameStats = this;
    }

    updateFrame(){
        this.prevTime = this.currentTime;
        this.currentTime = this.platform.now();

        this.frametime = this.currentTime - this.prevTime;
        this.immediateFramerate = 1 / this.frametime;

        this.frameCount++;
    }

    updateFramerate(){
        this.framerate = this.frameCount;
        this.frameCount = 0;
        setTimeout( () => this.updateFramerate(), 1000);
    }
}