var Map = function () {
	this._sizeX = 100;
	this._sizeY = 100;
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
