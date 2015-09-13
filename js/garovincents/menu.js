var Menu = function (gameEngine) {
    this._gameEngine = gameEngine;
    this._buttons = [];
    this._runningLoop
    this._activated = false;
    this._buttonWidthRatio 	= 0.7;
	this._buttonHeightRatio = 0.1;
	this._filterClickFct = function(event){
		var cursorX = event.pageX - self._gameEngine._canvas.offsetLeft,
	        cursorY = event.pageY - self._gameEngine._canvas.offsetTop;
	    console.log("Click event in " + cursorX + "," +cursorY);

		// list button and see if one is clicked
		self._buttons.forEach(function(button){
			if ( cursorX >= button.size[0] && cursorX <= button.size[0] + button.size[2] &&
				 cursorY >= button.size[1] && cursorY <= button.size[1] + button.size[3]) {
				button.callbackFct();
			}
		});
	}

	var self = this;
	this._gameEngine._canvas.addEventListener('click',this._filterClickFct);


}

Menu.prototype.addButton =function(button) {
    // button list. button structure :
    // {
    // 	name 			: 'myButtonName'			// Text displayed in  the button
    // 	size			: [minX,minY,maxX,maxY]		// Clickable zone
    // 	callbackFct 	: function() {				// function called when button is clicked
    // 		console.log("toto");
    // 	}
    // }

    // Define its clickable zone according to previously created button
	var i = this._buttons.length;
	var context 	= this._gameEngine._context;
	var mapSizeX 	= this._gameEngine._map.getSizeX();
	var mapSizeY 	= this._gameEngine._map.getSizeY();
    button.size = [
				mapSizeX * (1-this._buttonWidthRatio) / 2,
				2*i*mapSizeY * this._buttonHeightRatio,
				mapSizeX * this._buttonWidthRatio,
				mapSizeY * this._buttonHeightRatio
    ];

	this._buttons.push(button);
}

Menu.prototype.render = function () {
	var i=0;
	var context 	= this._gameEngine._context;
	var mapSizeX 	= this._gameEngine._map.getSizeX();
	var mapSizeY 	= this._gameEngine._map.getSizeY();
	if (this._activated) {
		var self = this;
		this._buttons.forEach(function(button){
			//console.log("Rendering button :" + button);
			context.fillStyle = "#00FF00";
			context.fillRect(button.size[0],button.size[1],button.size[2],button.size[3]);
			context.fillStyle = "#000000";
			context.font = "30px Arial";
			context.fillText(button.name,button.size[0],button.size[1]+30);

			i++;
		});
	}
}

Menu.prototype.activate = function () {
	console.log("Menu::activate menu activated");
	this._activated = true;
}

Menu.prototype.deactivate = function () {
	console.log("Menu::deactivate menu deactivated");
	this._gameEngine._canvas.removeEventListener('click',this._filterClickFct);
	this._activated = false;
}
