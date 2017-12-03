import * as THREE from 'three';

import { CBaseGamemode } from './BaseGamemode'
import { CSpellgameGamemode } from './Spellgame/SpellgameGamemode'

import { CPlatform } from './Platform/Platform';

export class CGamebase {
    renderer:THREE.WebGLRenderer;
    gamemode: CBaseGamemode;
    platform: CPlatform;

    constructor( platform: CPlatform ) {
        this.platform = platform;
        this.renderer = platform.webglStart();
        
        this.gamemode = new CSpellgameGamemode(this);
        this.setResolution( {width: platform.resolution.width, height: platform.resolution.height} );

        platform.onresize = () =>{
            this.setResolution( {width: platform.resolution.width, height: platform.resolution.height} );
        }

        this.start();
        
    }

    setResolution( resolution:{width: number , height: number} ){
        this.renderer.setSize( resolution.width, resolution.height);
        var camera = <THREE.PerspectiveCamera>this.gamemode.camera; 
        
        if(camera.aspect){
            camera.aspect = resolution.width  / resolution.height;
            camera.updateProjectionMatrix();
        }
    }

    render() {
        this.platform.requestAnimationFrame(() => this.render());
        this.gamemode.preFrame();
        this.gamemode.update();
        this.renderer.render( this.gamemode.scene , this.gamemode.camera);
        this.gamemode.postFrame();
    }

    start() {
        this.render();
    }
}