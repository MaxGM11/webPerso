var Player = function (gameEngine) {
	Entity.call(this,"Player");
	this._position;
	this._life;
	this._godMode;
    this._gameEngine = gameEngine;
}

// Inheritence from entity
Player.prototype = Entity.prototype;
// Player.prototype = new Entity;

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
	return this._life;
};

Player.prototype.render = function(gameEngine) {

	var context = gameEngine._context;

	var img=document.getElementById("heroImg");
	var pat=context.createPattern(img,"no-repeat");
	context.drawImage(img,this._position[0],this._position[1],this._hitBox[0],this._hitBox[1]);
};