import * as THREE from 'three';

import { CScene } from "./Scene";
import * as WatchJS from "melanke-watchjs";

export class CBaseEntity extends THREE.Geometry{
    scene: CScene;
    mesh: THREE.Mesh;
    networked: boolean = false;
    networkUpdated: boolean = false;
    networkedInfo: Array<any> = [];

    protected health = 0;

    constructor(scene: CScene, model?: string | THREE.Mesh){
        super();
        scene.AddEntityToScene(this);

        this.scene = scene;

        this.setupNetworking();


        if(model){
            if(model.constructor){
                this.mesh = <THREE.Mesh>model;
                this.mesh.receiveShadow = true;
                this.mesh.castShadow = true; 
            }else{
                //modelLoader
            }
            scene.add(this.mesh);
        }
        
        if(this.mesh){
            
        }
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
        // Reset network update flag before the simulation, things that change 
        // network flags in simulate() will trigger the watcher and update this
        // flag automatically.
        this.networkUpdated = false;
    }
 
    simulate(){
    }
    

    postSimulate(){
        // Check for changes in simulation, if so, pass flag that entity is
        // marked for client update
    }

    destroy(){
        this.scene.DestroyEntity(this);
    }

    getClass(){
        return this.constructor.name;
    }

    getAbsPosition(){
        return this.mesh.position;
    }

    getAbsRotation(){
        return this.mesh.rotation;
    }

    setAbsPosition( position: THREE.Vector3){
        this.mesh.position.set( position.x, position.y, position.z );
    }

    setAbsRotation( rotation: THREE.Euler){
        this.mesh.rotation = rotation;
    }
}