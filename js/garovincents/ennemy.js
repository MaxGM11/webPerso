var Ennemy = function () {
	this._position;
}

Ennemy.prototype.setPosition = function (position) {
	if (position === undefined) {
		console.log("Ennemy::setPosition [ERROR] input parameter undefined");
		return false;
	}
	this._position = position;
	return true;
};
Ennemy.prototype.getPosition = function (position) {
	return this._position;
};
