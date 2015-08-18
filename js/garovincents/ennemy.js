var Ennemy = function (gameEngine) {
	Entity.call(this,"Ennemy");
	this._direction;
	this._speed;
    this._gameEngine = gameEngine;
}

// Inheritence from entity
Ennemy.prototype = Entity.prototype;

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
Ennemy.prototype.render = function (gameEngine) {

	var context = gameEngine._context;

	var img=document.getElementById("spaceShipImg");
	var pat=context.createPattern(img,"no-repeat");
	context.drawImage(img,this._position[0],this._position[1],this._hitBox[0],this._hitBox[1]);
}