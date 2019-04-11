-- blowr --

Minimal WebGL/OpenGL Game Engine written in Typescript
Runs with the same code both on a Desktop and Browser
context.

This makes you able to write WebGL prototypes that target
multiple platforms without the overhead of a WebBrowser,
on Desktop, any WebGL calls will be translated to OpenGL.

Current implementation contains the base structure, 
minimal serialization for any possible multiplayer 
implementation, physics wrapper (Using Bullet Physics),
input wrapper,, threejs context and a minimal
First Person "Gamemode".

To run just do "npm run native" or "npm run web" depending
on the platform you are targeting.

Written by Samuel Pavlovic <sam@sampavlovic.com>