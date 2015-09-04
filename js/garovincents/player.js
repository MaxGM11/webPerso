var Player = function (gameEngine) {
	Entity.call(this,"Player");
	this._position;
	this._life;
	this._speed = 2;
	this._godMode;
    this._gameEngine = gameEngine;
    this._keyboardController = new Keyboard();
    this._runningLoop;

    var self = this;
	this._keyboardController.addKeyListener(38,function(){ // UP
		//console.log ("[DBG] key listner for UP !!");
		if (self._position[1] - self._speed > 0)
			self._position[1] = self._position[1] - self._speed;
	},true);

	this._keyboardController.addKeyListener(39,function(){ // RIGHT
		//console.log ("[DBG] key listner for RIGHT !!");
		if (self._position[0] + self._speed < self._gameEngine._map.getSizeX() - self._hitBox[0])
		self._position[0] = self._position[0] + self._speed;
	});

	this._keyboardController.addKeyListener(37,function(){ // LEFT
		//console.log ("[DBG] key listner for LEFT !!");
		if (self._position[0] - self._speed > 0)
			self._position[0] = self._position[0] - self._speed;
	},true);

	this._keyboardController.addKeyListener(40,function(){ // DOWN
		//console.log ("[DBG] key listner for DOWN !!");
		if (self._position[1] + self._speed < self._gameEngine._map.getSizeY() - self._hitBox[1])
			self._position[1] = self._position[1] + self._speed;
	});
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

Player.prototype.render = function() {

	var context = this._gameEngine._context;
	context.save();
	context.translate(this._position[0] + 0.5*this._hitBox[0],this._position[1] + 0.5*this._hitBox[0]);
	context.rotate(this._rotation);

	var img=document.getElementById("heroImg");
	//var pat=context.createPattern(img,"no-repeat");
	context.drawImage(img,-0.5*this._hitBox[0],-0.5*this._hitBox[1],this._hitBox[0],this._hitBox[1]);
	context.restore();
	if(this._gameEngine._debug) {
		context.beginPath();
		context.strokeStyle="red";
		context.rect(this._position[0],this._position[1],this._hitBox[0],this._hitBox[1]);
		context.stroke();
	}


};
Player.prototype.start = function () {

	console.log("Player::start Starting player ");
    // Start the renderer
	this._runningLoop = setInterval(runningLoop, 1000/30);

  	var self = this;
    function runningLoop()
    {
		var targetRotation = self._rotation + self._rotationSpeed * self._rotationDirection
		console.log(targetRotation);
		if (targetRotation >= 0.8 || targetRotation <= -0.8) {
			self._rotation += -1 * self._rotationSpeed * self._rotationDirection;
			self._rotationDirection *= -1;
		}
		else {
			self._rotation = targetRotation;
		}
		// compute target position

    }
}