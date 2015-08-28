var Ennemy = function (gameEngine) {
	Entity.call(this,"Ennemy");
	this._direction = [3,1];
	this._speed = 0.3;
    this._gameEngine = gameEngine;
    this._runningLoop;
}

// Inheritence from entity
Ennemy.prototype = Entity.prototype;

Ennemy.prototype.setDirection = function (direction) {
	if (direction === undefined) {
		console.log("Ennemy::setDirection [ERROR] input parameter undefined");
		return false;
	}
	this._direction = direction;
	this._modified = true;
	return true;
};
Ennemy.prototype.getDirection = function (direction) {
	return this._direction;
};

Ennemy.prototype.setPosition = function (position) {
	if (position === undefined) {
		console.log("Ennemy::setPosition [ERROR] input parameter undefined");
		return false;
	}
	this._position = position;
	this._modified = true;
	return true;
};
Ennemy.prototype.getPosition = function () {
	return this._position;
};


Ennemy.prototype.setSpeed = function (speed) {
	if (speed === undefined) {
		console.log("Ennemy::setSpeed [ERROR] input parameter undefined");
		return false;
	}
	this._speed = speed;
	this._modified = true;
	return true;
};
Ennemy.prototype.getSpeed = function (speed) {
	return this._speed;
};

Ennemy.prototype.setName = function (name) {
	if (name === undefined) {
		console.log("Ennemy::setname [ERROR] input parameter undefined");
		return false;
	}
	this._name = name;
	this._modified = true;
	return true;
};
Ennemy.prototype.getName = function (name) {
	return this._name;
};



Ennemy.prototype.render = function (gameEngine) {

	var context = gameEngine._context;

	var img=document.getElementById("spaceShipImg");
	var pat=context.createPattern(img,"no-repeat");
	context.drawImage(img,this._position[0],this._position[1],this._hitBox[0],this._hitBox[1]);
}
Ennemy.prototype.start = function () {

	console.log("Ennemy::start Starting ennemy " + this._name);
    // Start the renderer
	this._runningLoop = setInterval(runningLoop, 1000/30);

  	var self = this;
    function runningLoop()
    {
		console.log("Ennemy::runningLoop " + this._name + " : new state");

		// compute target position
		var targetPositionX = self._position[0] + self._direction[0] * self._speed;
		var targetPositionY = self._position[1] + self._direction[1] * self._speed;

		// Check if the target position is still in canvas
		if (targetPositionX >= self._gameEngine._map.getSizeX() - self._hitBox[0] || // Right side
			targetPositionX <= 0 ) {												// Left side
			self._direction[0] *= -1;
			targetPositionX = self._position[0] + self._direction[0] * self._speed;
		}

		if (targetPositionY >= self._gameEngine._map.getSizeY() - self._hitBox[1] || // Bottom side
			targetPositionY <= 0) {													// Top side
			self._direction[1] *= -1;
			targetPositionY = self._position[1] + self._direction[1] * self._speed;
		}
		self._position = [targetPositionX,targetPositionY];
    }
}
Ennemy.prototype.kill = function (gameEngine) {
	clearInterval(this._runningLoop);
}