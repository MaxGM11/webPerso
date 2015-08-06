var Player = function () {
	this._position;
	this._life;
	this._godMode;
}

Player.prototype.setPosition = function (position) {
	if (position === undefined) {
		console.log("Player::setPosition [ERROR] input parameter undefined");
		return false;
	}
	this._position = position;
	return true;
};
Player.prototype.getPosition = function (position) {
	return this._position;
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
	return this._life
}

