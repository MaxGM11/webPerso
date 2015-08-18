var Map = function (gameEngine) {
	this._sizeX = 100;
	this._sizeY = 100;
    this._backgroundUrl;
    this._backgroundColor;
    this._gameEngine = gameEngine;

};

Map.prototype.setSize = function(x,y) {
	this._sizeX = x;
	this._sizeY = y;
};

Map.prototype.setSizeX = function(x) {
	this._sizeX = x;
};

Map.prototype.setSizeY = function(y) {
	this._sizeY = y;
};

Map.prototype.getSize = function() {
	console.log("Map::getCenter size of map [" + this.sizeX + "'" + this.sizeY + "]");
	return [this._sizeX,this._sizeY];
};

Map.prototype.getSizeX = function() {
	return this._sizeX;
};

Map.prototype.getSizeY = function() {
	return this._sizeY;
};

Map.prototype.getCenter = function () {
	console.log("Map::getCenter center of map [" + this._sizeX/2 + "'" + this._sizeY/2 + "]");
	return [this._sizeX/2,this._sizeY/2];
};

Map.prototype.getRandomPosition = function () {
	return [this._sizeX/3,this._sizeY/7];
};

Map.prototype.setBackgroundUrl = function (urlBackground) {
    this._backgroundUrl = urlBackground;
}
Map.prototype.setBackgroundColor = function (color) {
    this._backgroundColor = color;
}
Map.prototype.render = function () {
	var context = this._gameEngine._context;
	context.fillStyle = this._backgroundColor;
	context.fillRect(0,0,this._sizeX,this._sizeY);
	
}