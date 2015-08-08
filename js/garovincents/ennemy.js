var Ennemy = function () {
	this._direction;
	this._speed;
}

// Inheritence from entity
Ennemy.prototype = new Entity;

Ennemy.prototype.setDirection = function (direction) {
	if (direction === undefined) {
		console.log("Ennemy::setDirection [ERROR] input parameter undefined");
		return false;
	}
	this._direction = direction;
	return true;
};
Ennemy.prototype.getDirection = function (direction) {
	return this._direction;
};
