var Entity = function(name) {
	console.log("Entity::Constructor : " + name);
	this._resourceImg;
	this._hitBox = [];
	this._position;
	this._name = name;

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