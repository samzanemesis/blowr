import * as THREE from 'three';
import { CGamebase, gGameStats } from "./game";
import { CBaseGamemode } from "./BaseGamemode"
import { CSplashScreenLogo } from "./SplashScreenLogo"

import { CBaseEntity } from "./BaseEntity";
import { CScene } from "./Scene";
import { CSpellgameGamemode } from './Spellgame/SpellgameGamemode';

export class CSplashScreenGamemode extends CBaseGamemode{

    //private fadeOutShader:THREE.ShaderPass;

    constructor(gamebase: CGamebase){
        super( gamebase );
        
        setTimeout( () => { this.finishSplashscreen( gamebase )}, 3000 );
    }

    protected setupScene(){
        this.scene = new CScene();
        
        new CSplashScreenLogo( this.scene );
        
        //this.scene.add(new THREE.DirectionalLight( new THREE.Color(0.9,0.9,0.9).getHex() ) );

    }

    protected setupLocalPlayer(){
        this.camera = new THREE.OrthographicCamera( 10,-10,-10,10,0.01,100 );
        this.camera.position.z = 1;
        this.camera.position.x
    }

    protected initGame(){
    }
    
    public preFrame(){

    }

    public postFrame(){

    }

    public update(){
        this.scene.simulate();
        //this.camera.rotateX( gGameStats.frametime );
    }

    finishSplashscreen( gamebase: CGamebase ){
        this.scene = undefined;
        this.camera = undefined;
        gamebase.gamemode = new CSpellgameGamemode(gamebase);
        gamebase.platform.onresize();
    }
}