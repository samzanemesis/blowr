import * as THREE from 'three';

import { CBaseEntity } from './BaseEntity';
import { CPlatform, gPlatform } from "./Platform/Platform"
import { gGameStats } from "./game"

import * as Ammo from "ammo-node"; //TODO: Get a preprocessor to remove this line on browser builds

export class CScene extends THREE.Scene{
    private entityList: CBaseEntity[] = [];
    private physicsWorld: Ammo.btDiscreteDynamicsWorld;

    constructor(){
        super();
        this.setupWorldPhysics();
        //this.scenePhysics = new Physijs.Scene;
    }

    public simulate(){        
        
        this.physicsWorld.stepSimulation( gGameStats.frametime , 10);
        
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

    setupWorldPhysics(){
        // Physics configuration
		const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
		const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
		const overlappingPairCache = new Ammo.btAxisSweep3(new Ammo.btVector3(-1000,-1000,-1000), new Ammo.btVector3(1000,1000,1000));
		const solver = new Ammo.btSequentialImpulseConstraintSolver();

		this.physicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration);
		this.physicsWorld.setGravity( new Ammo.btVector3(0, -9.8, 0));
    }

    addRigidBody(body){
        this.physicsWorld.addRigidBody(body);
    }
}