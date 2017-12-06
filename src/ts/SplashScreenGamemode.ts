import * as THREE from 'three';
import { CGamebase } from "./game";
import { CBaseGamemode } from "./BaseGamemode"
import { CSplashScreenLogo } from "./SplashScreenLogo"

import { CBaseEntity } from "./BaseEntity";
import { CScene } from "./Scene";

export class CSplashScreenGamemode extends CBaseGamemode{

    constructor(gamebase: CGamebase){
        super( gamebase );
    }

    protected setupScene(){
        this.scene = new CScene();
        
        new CSplashScreenLogo( this.scene );
        
        //this.scene.add(new THREE.DirectionalLight( new THREE.Color(0.9,0.9,0.9).getHex() ) );
    }

    protected setupLocalPlayer(){
        this.camera = new THREE.OrthographicCamera( -10,10,-10,10,0.01,100 );
        this.camera.position.z = 1;
    }

    protected initGame(){
    }
    
    public preFrame(){

    }

    public postFrame(){

    }

    public update(){
        this.scene.simulate();
    }
}