import { CBaseEntity } from "./BaseEntity"
import { CScene } from "./Scene"

import * as THREE from 'three';

export class CSplashScreenLogo extends CBaseEntity {
    constructor(scene: CScene){
        super( scene );

        var backgroundMesh = new THREE.Mesh( 
            new THREE.PlaneGeometry(10,10,1,1), 
            new THREE.MeshBasicMaterial() );
            
        this.scene.add( backgroundMesh );
    }
}