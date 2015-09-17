var Player = function (gameEngine) {
	Entity.call(this,"Player");
	this._position;
	this._godMode = false;
	this._speed = 2;
	this._godMode;
    this._gameEngine = gameEngine;
    this._keyboardController = new Keyboard();
    this._runningLoop;
    this._animationState = 0;
    this._direction = [0,0];

    var self = this;
	this._keyboardController.addKeyListener(38,function(){ // UP
		//console.log ("[DBG] key listner for UP !!");
		if (self._position[1] - self._speed > 0) {
			self._position[1] = self._position[1] - self._speed;
			self._direction[1]=-1;
		}

	},true);

	this._keyboardController.addKeyListener(39,function(){ // RIGHT
		//console.log ("[DBG] key listner for RIGHT !!");
		if (self._position[0] + self._speed < self._gameEngine._map.getSizeX() - self._hitBox[0]){
			self._position[0] = self._position[0] + self._speed;
			self._direction[0]=1;
		}		
	});

	this._keyboardController.addKeyListener(37,function(){ // LEFT
		//console.log ("[DBG] key listner for LEFT !!");
		if (self._position[0] - self._speed > 0){
			self._position[0] = self._position[0] - self._speed;
			self._direction[0]=-1;
		}
	},true);

	this._keyboardController.addKeyListener(40,function(){ // DOWN
		//console.log ("[DBG] key listner for DOWN !!");
		if (self._position[1] + self._speed < self._gameEngine._map.getSizeY() - self._hitBox[1]){
			self._position[1] = self._position[1] + self._speed;
			self._direction[1]=1;
		}
	});

	this._fulgator = new Fulgator(gameEngine);
}

// Inheritence from entity
//Player.prototype = Entity.prototype;
Player.prototype = Object.create(Entity.prototype);
// Player.prototype = new Entity;

Player.prototype.setPosition = function (position) {
	if (position === undefined) {
		console.log("Player::setPosition [ERROR] input parameter undefined");
		return false;
	}
	this._position = position;
	return true;
};
Player.prototype.getPosition = function () {
	return this._position;
};

Player.prototype.setSpeed = function (speed) {
	if (speed === undefined) {
		console.log("Player::setSpeed [ERROR] input parameter undefined");
		return false;
	}
	this._speed = speed;
	this._modified = true;
	return true;
};
Player.prototype.getFulgatorLoad = function () {
	return this._fulgator.getLoad();
};
Player.prototype.loadFulgator = function (count) {
	if (count > 0)
		this._fulgator.setLoad(this._fulgator.getLoad() + count);
};
Player.prototype.getFulgatorLoadMax = function () {
	return this._fulgator.getLoadMax();
}
Player.prototype.setFulgatorRange = function (range) {
	return this._fulgator.setRange(range);
}
Player.prototype.getFulgatorRange = function () {
	return this._fulgator.getRange();
};
Player.prototype.setGodMode = function (b) {
	this._godMode = b;
}
Player.prototype.getGodMode = function () {
	return this._godMode;
};
Player.prototype.getSpeed = function () {
	return this._speed;
};
Player.prototype.setLife = function (life) {
	if (life === undefined) {
		console.log("Player::setPosition [ERROR] input parameter undefined");
		return false;
	}
	if (life < 0) {
		console.log("Player::setPosition [ERROR] life < 0");
		return false;
	}
	this._life = life;
	return true;
};

Player.prototype.getLife = function (life) {
	return this._life;
};
Player.prototype.isFiring = function () {
	return this._fulgator._firing;
};

Player.prototype.render = function() {

	var context = this._gameEngine._context;
	context.save();

	// Rotation if any
	context.translate(this._position[0] + 0.5*this._hitBox[0],this._position[1] + 0.5*this._hitBox[0]);
	context.rotate(this._rotation);

	// Draw image with animation
	var img=document.getElementById("heroImg");
	//var pat=context.createPattern(img,"no-repeat");
	var sizePicture = 0.7;
	var directionAnim = 0;
	if (this._direction[0] == 1)
		directionAnim = 1;
	if (this._animationState == 1) {
		context.drawImage(	img,0,directionAnim*img.height/2,img.width/2,img.height/2,
							-sizePicture*this._hitBox[0],
							-sizePicture*this._hitBox[1],
							2*sizePicture*this._hitBox[0],
							2*sizePicture*this._hitBox[1]
		);
	}
	else {

		context.drawImage(	img,img.width/2,directionAnim*img.height/2,img.width/2,img.height/2,
							-sizePicture*this._hitBox[0],
							-sizePicture*this._hitBox[1],
							2*sizePicture*this._hitBox[0],
							2*sizePicture*this._hitBox[1]
		);
	}

	
	context.restore();

	if (this.getGodMode()) {
		// Draw GodMode in text
		context.fillStyle = "#FFD700";
		context.font = "25px Courier new";
		context.fillText("GOD",this._position[0] + 0.4*this._hitBox[0],this._position[1] + 0.5*this._hitBox[0]);
	}
	// Draw hit box if debug mode
	if(this._gameEngine._debug) {
		context.beginPath();
		context.strokeStyle="red";
		context.rect(this._position[0],this._position[1],this._hitBox[0],this._hitBox[1]);
		context.stroke();
	}


	this._fulgator.render();


};
Player.prototype.start = function () {

	console.log("Player::start Starting player ");
    // Start the renderer
	this._runningLoop = setInterval(runningLoop, 1000/30);

  	var self = this;
  	var delta = 250;
    function runningLoop()
    {
		var targetRotation = self._rotation + self._rotationSpeed * self._rotationDirection
		//console.log(targetRotation);
		if (targetRotation >= 0.6 || targetRotation <= -0.6) {
			self._rotation += -1 * self._rotationSpeed * self._rotationDirection;
			self._rotationDirection *= -1;
		}
		else {
			self._rotation = targetRotation;
		}
		// compute target position
		delta += 1000/30;
		if (delta > 250) {
			self._animationState = (self._animationState + 1) % 2;
			delta -= 250;
		}

    }

    
	this._fulgator.start();
}


Player.prototype.isInRange = function (point) {
	return this._fulgator.isInRange(point);
}
Player.prototype.getFulgatorDamage = function () {
	return this._fulgator.getDamage();
}
Player.prototype.setFulgatorDamage = function (dmg) {
	return this._fulgator.setDamage(dmg);
}

Player.prototype.modifyFulgatorRangeTimer = function (range,timer) {
	var prevRange = this._fulgator.getRange();
	this._fulgator.setRange(range);
	var self = this;
	setTimeout(function() {
		self._fulgator.setRange(prevRange);
	},timer);
}
Player.prototype.modifyFulgatorDamageTimer = function (dmg,timer) {
	var prevDmg = this._fulgator.getDamage();
	this._fulgator.setDamage(dmg);
	var self = this;
	setTimeout(function() {
		self._fulgator.setDamage(prevDmg);
	},timer);
}
Player.prototype.modifySpeedTimer = function (speed,timer) {
	var prevSpeed = this.getSpeed();
	this.setSpeed(speed);
	var self = this;
	setTimeout(function() {
		self.setSpeed(prevSpeed);
	},timer);
}
Player.prototype.modifyGodModeTimer = function (b,timer) {
	var prevGodMode = this.getGodMode();
	this.setGodMode(b);
	var self = this;
	setTimeout(function() {
		self.setGodMode(prevGodMode);
	},timer);
}