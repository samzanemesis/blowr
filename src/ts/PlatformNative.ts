import { CPlatform } from "./Platform"
import { setTimeout } from "timers";

export class CPlatformNative extends CPlatform{
	constructor(){
		super(false);
		console.log("Running as Native!");
		
		//Finished setting up everything
		this.waitUntilLoad();
	}

	waitUntilLoad(){
		if(this.onload)
			this.onload();
		else
			setTimeout( () => this.waitUntilLoad(), 100 );
	}
}