import { CBaseEntity } from './BaseEntity';
import * as THREE from 'three';
import { CPlatform, gPlatform } from "./Platform/Platform"

var Ammo = require('../libs/ammo.js');
//var Physijs = require('../libs/physi.js')(THREE, Ammo);

export class CScene extends Physijs.Scene{
    private entityList: CBaseEntity[] = [];
    //scenePhysics: Physijs.Scene;

    constructor(){
        super();
        //this.scenePhysics = new Physijs.Scene;
    }

    public simulate(timeStep?:number, maxSubSteps?:number){
        //Run physics
        //this.scenePhysics.simulate();
        
        this.entityList.forEach(entity => {
            entity.preSimulate();
            entity.simulate();
            entity.postSimulate();
        })

        return super.simulate(timeStep, maxSubSteps);
    }
    AddEntityToScene(entity:CBaseEntity){
        this.entityList.push(entity);
    }
    DestroyEntity(entity:CBaseEntity){
        entity = undefined;
        this.entityList.splice(this.entityList.indexOf(entity), 1);
    }
}