import { CBaseEntity } from './BaseEntity';
import * as THREE from 'three';

export class CScene extends THREE.Scene{
    private entityList: CBaseEntity[] = [];
    //scenePhysics: Physijs.Scene;

    constructor(){
        super();
        //this.scenePhysics = new Physijs.Scene;
    }

    public simulate(){
        //Run physics
        //this.scenePhysics.simulate();

        this.entityList.forEach(entity => {
            entity.preSimulate();
            entity.simulate();
            entity.postSimulate();
        })
        
    }
    AddEntityToScene(entity:CBaseEntity){
        this.entityList.push(entity);
    }
    DestroyEntity(entity:CBaseEntity){
        entity = undefined;
        this.entityList.splice(this.entityList.indexOf(entity), 1);
    }
}