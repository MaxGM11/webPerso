var Fulgator = function (gameEngine) {
	this._loadMax = 1000
	this._load = 700;
	this._direction = [];
	this._target = [];
	this._position = [];
	this._rotation;
	this._gameEngine = gameEngine;
	this._runningLoop;
	this._tryFiring = false;
	this._firing = false;
	this._animSmokeCoord = [[17,11],[127,11],[237,11],[347,11],[457,11],[567,11]];
	this._animSpriteSize = [107,98];
	this._animIndex = 0;



}

Fulgator.prototype.render = function() {

	var context = this._gameEngine._context;
	context.save();
	// this._position = center of player
	this._position = [	this._gameEngine._player._position[0] + this._gameEngine._player._hitBox[0]/2,
						this._gameEngine._player._position[1] + this._gameEngine._player._hitBox[1]/2
	];

	// move context to center of player
	context.translate(	this._position[0],this._position[1]);

	// rotation if any
	this._direction = [this._target[0] - this._position[0],this._target[1] - this._position[1]];
	this._rotation = Math.acos(this._direction[0]/Math.sqrt(this._direction[1]*this._direction[1] + this._direction[0]*this._direction[0]));
	if (this._direction[1] > 0) {
		context.rotate(this._rotation); //console.log("rotation : " + this._rotation);
	}
	else{
		context.rotate(2*Math.PI - this._rotation);
		this._rotation = 2*Math.PI - this._rotation;//console.log("rotation : " + (2*Math.PI - this._rotation));
	}

	// Draw image 
	var img=document.getElementById("fulgatorImg");
	var pat=context.createPattern(img,"no-repeat");
	//context.drawImage(img,this._target[0],this._target[1],30,70);
	context.translate(this._gameEngine._player._hitBox[0]/2 + 25,0);

	context.drawImage(img,0,0,15,40);

	// Draw smoke
	if(this._tryFiring && this._load >= 1) {

		var img2=document.getElementById("fulgatorSmokeImg");
		var pat=context.createPattern(img,"no-repeat");
		//context.drawImage(img,this._target[0],this._target[1],30,70);
		//context.drawImage(img2,this._gameEngine._player._hitBox[0]/2 + 20,0,50,20);
		context.rotate(-0.5);
		context.drawImage(img2,	this._animSmokeCoord[this._animIndex][0],				//- Cropping img
								this._animSmokeCoord[this._animIndex][1],				//-	
								this._animSpriteSize[0],this._animSpriteSize[1],		//-			
								15,													//+	Position image
								0,													//+
								150,													//-	Size image
								150														//-
		);
		context.rotate(0.5);
	}

	// Draw load bar
	context.fillStyle="#FF0000";
	context.fillRect(-10,0,5,40);
	context.fillStyle="#00FF00";
	context.fillRect(-10,40*(1-this._load/this._loadMax),5,40 * (this._load/this._loadMax));

	context.restore();

	// Debug rendering
	if (this._gameEngine._debug) {
		if(this._tryFiring) {
			var origin = this._position;
			origin[0] += (this._gameEngine._player._hitBox[0]/2 + 40)*Math.cos(this._rotation);
			origin[1] += (this._gameEngine._player._hitBox[0]/2 + 40)*Math.sin(this._rotation);
			var point1 = [	origin[0] + 150*Math.cos(this._rotation-0.2),
							origin[1] + 150*Math.sin(this._rotation-0.2)];
			var point2 = [	origin[0] + 150*Math.cos(this._rotation+0.4),
							origin[1] + 150*Math.sin(this._rotation+0.4)];
			//console.log ("render " + origin +" _ "+ point1 +" _ "+ point2);
		    var path=new Path2D();
		    path.moveTo(origin[0],origin[1]);
		    path.lineTo(point1[0],point1[1]);
		    path.lineTo(point2[0],point2[1]);
		    context.fillStyle="#FF0000";
		    context.fill(path);
		}
	}


};
Fulgator.prototype.playFireSound = function () {
	console.log("AUDIOStart");
	//var audio = new Audio("../sounds/garovincents/flams.mp3");
	//audio.play();
	var audio = document.getElementById('fulgatorSmokeSound');
	audio.play();
};
Fulgator.prototype.stopFireSound = function () {
	console.log("AUDIOStop");
	//var audio = new Audio("../sounds/garovincents/flams.mp3");
	//audio.play();
	var audio = document.getElementById('fulgatorSmokeSound');
	audio.pause();
	audio.load();
};
Fulgator.prototype.start = function () {

	var self = this;
	this._gameEngine._canvas.addEventListener('mousemove',function(event){
		var cursorX = event.pageX - self._gameEngine._canvas.offsetLeft,
	        cursorY = event.pageY - self._gameEngine._canvas.offsetTop;
		self._target = [cursorX,cursorY];
	});
	this._gameEngine._canvas.addEventListener('mousedown',function(event){
		self._tryFiring = true;
	});
	this._gameEngine._canvas.addEventListener('mouseup',function(event){
		self._tryFiring = false;
	});
	console.log("Fulgator::start Starting Fulgator ");
    //Start the renderer
	this._runningLoop = setInterval(runningLoopp, 1000/30);

	var oncePlay = true;
	var onceStop = true;
    function runningLoopp()
    {
    	if (self._tryFiring && self._load >= 1) {
    		if (self._animIndex == self._animSmokeCoord.length-1) {
    			self._animIndex = 0;
    		}
    		else{
    			self._animIndex++;
    		}
    		self._load -= 1;
    		self._firing = true;
    		if (oncePlay) {
    			self.playFireSound();
	    		onceStop = true;
	    		oncePlay = false;
    		}
    	}
    	else {
    		self._animIndex = 0;
    		self._firing = false;
    		if (onceStop) {
    			self.stopFireSound();
    			onceStop = false;
    			oncePlay = true;
    		}
    	}
    }
}

Fulgator.prototype.isInRange = function(point) {
	// Get triangle 3 point coordinates defining the range of fulgator
	var origin = [this._position[0],this._position[1]];
	//console.log("this._position : " + this._position);
	//console.log("... origin1 : " + origin);
	origin[0] += (this._gameEngine._player._hitBox[0]/2 + 40)*Math.cos(this._rotation);
	origin[1] += (this._gameEngine._player._hitBox[0]/2 + 40)*Math.sin(this._rotation);
	//console.log("... origin2 : " + origin);
	var point1 = [	origin[0] + 150*Math.cos(this._rotation-0.2),
					origin[1] + 150*Math.sin(this._rotation-0.2)];
	var point2 = [	origin[0] + 150*Math.cos(this._rotation+0.4),
					origin[1] + 150*Math.sin(this._rotation+0.4)];

	function sign (p1, p2, p3)
	{
	    return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
	}

	function PointInTriangle (pt, v1, v2, v3)
	{
	    
		var b1,b2,b3;
		//console.log (sign(pt, v1, v2) + "," + sign(pt, v2, v3) + "," +sign(pt, v3, v1));
	    (sign(pt, v1, v2) < 0) ? b1 = true : b1 = false;
	    (sign(pt, v2, v3) < 0) ? b2 = true : b2 = false;
	    (sign(pt, v3, v1) < 0) ? b3 = true : b3 = false;

	    if ((b1 == b2) && (b2 == b3)) {
	    	return true;
	    }
	    else
	    	return false;
	    //return ((b1 == b2) && (b2 == b3));
	}

	if (PointInTriangle (point,origin,point1,point2)){
		//console.log ("touché : (this._position : "+ this._position +") "+ point + " .. is in .. " + origin +" _ "+ point1 +" _ "+ point2);
		return true;
	}
	else {
		return false;
	}


}