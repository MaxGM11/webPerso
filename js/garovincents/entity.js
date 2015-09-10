var Entity = function(name) {
	console.log("Entity::Constructor : " + name);
	this._resourceImg;
	this._hitBox 			= [];
	this._position;
	this._rotationDirection = 1;
	this._rotationSpeed 	= 0.1;
	this._rotation 			= 0;
	this._name 				= name;
	this._modified 			= true;

}

Entity.prototype.setResourceImg = function(imgName) {
	if (imgName === undefined) {
		console.log("Entity::setResourceImg [ERROR] input parameter undefined");
		return false;
	}
	this._resourceImg = imgName;
};

Entity.prototype.getResourceImg = function () {
	return this._resourceImg;
};

Entity.prototype.setHitBox = function(hitBox) {
	if (hitBox === undefined) {
		console.log("Entity::setHitBox [ERROR] input parameter undefined");
		return false;
	}
	this._hitBox = hitBox;
};

Entity.prototype.getHitBox = function () {
	return this._hitBox;
};
Entity.prototype.setPosition = function (position) {
	if (position === undefined) {
		console.log("Entity::setPosition [ERROR] input parameter undefined");
		return false;
	}
	this._position = position;
	return true;
};
Entity.prototype.getPosition = function (position) {
	return this._position;
};
Entity.prototype.collided = function (otherEntity) {

	var checkX = false;
	if (this._hitBox[0] < otherEntity.getHitBox()[0]) {
		// Check if this._hitBox[0] is included in hitBox of otherEntity
		if (!checkX &&
			this._position[0] >= otherEntity.getPosition()[0] &&
			this._position[0] <= otherEntity.getPosition()[0] + otherEntity.getHitBox()[0]) {
			checkX = true;
			console.log ("check collision x 1");
		}

		if (!checkX &&
			this._position[0] + this._hitBox[0] >= otherEntity.getPosition()[0] &&
			this._position[0] + this._hitBox[0] <= otherEntity.getPosition()[0] + otherEntity.getHitBox()[0]) {
			checkX = true;
			console.log ("check collision x 2");
		}
	}
	else {
		// Check if hitBox of otherEntity is included in this._hitBox[0]
		if (!checkX &&
			otherEntity.getPosition()[0] >= this._position[0] &&
			otherEntity.getPosition()[0] <= this._position[0] + this._hitBox[0]) {
			checkX = true;
			console.log ("check collision x 3");
		}

		if (!checkX &&
			otherEntity.getPosition()[0] + otherEntity._hitBox[0] >= this._position[0] &&
			otherEntity.getPosition()[0] + otherEntity._hitBox[0] <= this._position[0] + this._hitBox[0]) {
			checkX = true;
			console.log ("check collision x 4");
		}
	}

	var checkY = false;
	if (checkX && this._hitBox[1] < otherEntity.getHitBox()[1]) {
		// Check if this._hitBox[1] is included in hitBox of otherEntity
		if (!checkY &&
			this._position[1] >= otherEntity.getPosition()[1] &&
			this._position[1] <= otherEntity.getPosition()[1] + otherEntity.getHitBox()[1]) {
			checkY = true;
			console.log ("check collision y 1");
		}

		if (!checkY &&
			this._position[1] + this._hitBox[1] >= otherEntity.getPosition()[1] &&
			this._position[1] + this._hitBox[1] <= otherEntity.getPosition()[1] + otherEntity.getHitBox()[1]) {
			checkY = true;
			console.log ("check collision y 2");
		}
	}
	else {
		// Check if hitBox of otherEntity is included in this._hitBox[1]
		if (!checkY &&
			otherEntity.getPosition()[1] >= this._position[1] &&
			otherEntity.getPosition()[1] <= this._position[1] + this._hitBox[1]) {
			checkY = true;
			console.log ("check collision y 3");
		}

		if (!checkY &&
			otherEntity.getPosition()[1] + otherEntity._hitBox[1] >= this._position[1] &&
			otherEntity.getPosition()[1] + otherEntity._hitBox[1] <= this._position[1] + this._hitBox[1]) {
			checkY = true;
			console.log ("check collision y 4");
		}
	}

	if (checkX && checkY)
		return true;
	else
		return false;
}