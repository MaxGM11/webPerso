var Ennemy = function (gameEngine) {
	Entity.call(this,"Ennemy");
	this._direction = [3,1];
	this._speed = 0.3;
    this._gameEngine = gameEngine;
    this._runningLoop;
    this._life = 1;
    this._lifeMax = 1;
    this._idAnimTouched = 0;
    this._idAnimKilled;
}

// Inheritence from entity
//Ennemy.prototype = Entity.prototype;
Ennemy.prototype = Object.create(Entity.prototype);

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

Ennemy.prototype.setLife = function (life) {
	if (life === undefined) {
		console.log("Ennemy::setlife [ERROR] input parameter undefined");
		return false;
	}
	this._life = life;
	this._modified = true;
	return true;
};

Ennemy.prototype.setLifeMax = function (lifeMax) {
	if (lifeMax === undefined) {
		console.log("Ennemy::setlifeMax [ERROR] input parameter undefined");
		return false;
	}
	this._lifeMax = lifeMax;
	this._modified = true;
	return true;
};
Ennemy.prototype.getLife = function (life) {
	return this._life;
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

Ennemy.prototype.render = function () {

	var context = this._gameEngine._context;
	context.save();

	// Rotation if any
	context.translate(this._position[0] + 0.5*this._hitBox[0],this._position[1] + 0.5*this._hitBox[0]);
	var rot = Math.acos(this._direction[0]/Math.sqrt(this._direction[1]*this._direction[1] + this._direction[0]*this._direction[0]));
	if (this._direction[1] > 0)
		context.rotate(rot);
	else
		context.rotate(2*Math.PI - rot);
	//console.log(this._name + " rot : " + rot + "(+ " + rot * 360.0 / (2*Math.PI)+ "°)");

	// Draw image
	var img=document.getElementById("wespImg");
	var pat=context.createPattern(img,"no-repeat");
	context.drawImage(img,-0.7*this._hitBox[0],-0.7*this._hitBox[1],1.4*this._hitBox[0],1.4*this._hitBox[1]);
	//context.drawImage(img,-10,-10,this._hitBox[0]+20,this._hitBox[1]+20);


	context.restore();
	context.save();

	context.translate(this._position[0],this._position[1]);

	// Draw life bar
	context.fillStyle="#FF0000";
	context.fillRect(0,1.4*this._hitBox[1],this._hitBox[0],5);
	context.fillStyle="#00FF00";
	context.fillRect(this._hitBox[0]*(1-this._life/this._lifeMax),1.4*this._hitBox[1],this._hitBox[0]*(this._life/this._lifeMax),5);

	// Draw hit box if debug mode
	if(this._gameEngine._debug) {
		context.beginPath();
		context.strokeStyle="red";
		context.rect(0,0,this._hitBox[0],this._hitBox[1]);
		context.stroke();
	}
	context.restore();

};

Ennemy.prototype.start = function () {

	console.log("Ennemy::start Starting ennemy " + this._name);
    // Start the renderer
	this._runningLoop = setInterval(runningLoop, 1000/30);
	console.log ("this._runningLoop :"+this._runningLoop);

  	var self = this;
    function runningLoop()
    {
    	var i = 0;
    	i++;
		console.log("Ennemy::runningLoop " + self._name + " : new state " + i);

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
};

Ennemy.prototype.kill = function (gameEngine) {
	var audio = document.getElementById('deadWespSound');
	audio.play();
	clearInterval(this._runningLoop);
	this.startKilledAnimation()
};

Ennemy.prototype.damage = function (dmg) {
	if (this._life - dmg <= 0) {
		this._life = 0;
		this.kill();
	}
	else {
		this._life -= dmg;
	}
};

Ennemy.prototype.startTouchedAnimation = function () {
	if (this._idAnimTouched != 0) {
		return;
	}

	this._idAnimTouched = setInterval(touchedAnimation, 1000/30);
	var self = this;

	var animTime = 1000;
	function touchedAnimation() {
		// randomize a little the position of the creature
		animTime -= 1000/30;
		if (animTime > 0) {
			self._position[0] += (0.5-Math.random()) * 5;
			self._position[1] += (0.5-Math.random()) * 5;
		}
		else{
			console.log("End of touchedAnimation");
			clearInterval(self._idAnimTouched);
			self._idAnimTouched = 0;
			return;
		}
		console.log("toto");
	}
};

Ennemy.prototype.startKilledAnimation = function () {
	if (this._idAnimKilled != 0) {
		clearInterval(this._idAnimKilled);
		this._idAnimKilled = 0;
	}

	this._idAnimKilled = setInterval(killedAnimation, 1000/30);
	var self = this;

	function killedAnimation() {
		self._position[1] += 4;
		self._rotation += 0.5;
		if (self._position[1] > self._gameEngine._map.getSizeY()) {
			self._gameEngine.removeEnnemy(self._name);
			clearInterval(self._idAnimKilled);
			self._idAnimKilled = 0;
			console.log("End of killedAnimation");
			return;
		}
		console.log("tata");
	}

};
