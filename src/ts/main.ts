import * as THREE from 'three';

import * as GAME from './game';
import { CPlatform } from './Platform';

var game: GAME.CGamebase;
var platform: CPlatform;

platform = new CPlatform();

platform.onload = () => {
    game = new GAME.CGamebase( platform );
}

/*
window.onload = () => {
    platform = new CPlatform();
    game = new GAME.Gamebase( {width: window.innerWidth , height: window.innerHeight} );
};

window.onresize = () => {
    game.setResolution( {width: window.innerWidth , height: window.innerHeight} );
}

window.addEventListener( 'click', function ( event ) {
    // Ask the browser to lock the pointer
    document.body.requestPointerLock = document.body.requestPointerLock;
    document.body.requestPointerLock();
}, false );*/