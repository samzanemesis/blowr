import * as THREE from 'three';

import { CScene } from "./Scene";
import * as WatchJS from "melanke-watchjs";

export class CBaseEntity extends THREE.Geometry{
    scene: CScene;
    mesh: THREE.Mesh;
    networked: boolean = false;
    networkUpdated: boolean = false;
    networkedInfo: Array<any> = [];

    constructor(scene: CScene){
        super();
        scene.AddEntityToScene(this);
    
        //this.addNetworkedElement("Position", this.position);
        
        this.scene = scene;


        this.setupNetworking();
    }

    setupNetworking(){
        if(!this.networked)
            return;

        //Mark for network changes if any key information is changed
        WatchJS.watch( this.networkedInfo, change => {
            this.networkUpdated = true;
            console.log("change");
        }) 
    }

    addNetworkedElement(cont: String, ref: any){
        this.networkedInfo.push( {cont, ref} );
    }

    preSimulate(){
        this.networkUpdated = false;
    }

    simulate(){
    }
    

    postSimulate(){
        //Check for changes in simulation, if so, pass flag that entity is marked for client update
    }

    destroy(){
        this.scene.DestroyEntity(this);
    }

    getClass(){
        return this.constructor.name;
    }
}