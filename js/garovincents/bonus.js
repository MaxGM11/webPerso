var Bonus = function (gameEngine) {
    this._gameEngine = gameEngine;
    this._type = "";
    this._animBonusCoord = [];
    this._animSpriteSize = [52,64];
    this._animIndex = 0;
}
Bonus.prototype = Object.create(Entity.prototype);

Bonus.prototype.setPosition = function (position) {
	if (position === undefined) {
		console.log("Bonus::setPosition [ERROR] input parameter undefined");
		return false;
	}
	this._position = position;
	this._modified = true;
	return true;
};

Bonus.prototype.getPosition = function () {
	return this._position;
};

Bonus.prototype.setType = function (type) {
	if (type === undefined) {
		console.log("Bonus::settype [ERROR] input parameter undefined");
		return false;
	}
	this._type = type;
	this._modified = true;
	var xcoord = 0; // It is the only coord that change between kind of bonus in the sprite
	switch (type) {
		case "powerUp" 	: xcoord = 14; 	break;	// ORANGE
		case "freeze"  	: xcoord = 134; break;	// LIGHT BLUE
		case "load" 	: xcoord = 254; break;	// GREEN
		case "slow" 	: xcoord = 374;	break;	// PINK
		case "god"		: xcoord = 494; break;	// PURPLRE
		case "speedUp" 	: xcoord = 614; break;	// BLUE
	}
	this._animBonusCoord = [];		
	this._animBonusCoord.push([xcoord	,361]);
	this._animBonusCoord.push([xcoord	,432]);
	this._animBonusCoord.push([xcoord	,504]);
	this._animBonusCoord.push([xcoord	,576]);
	this._animBonusCoord.push([xcoord	,647]);
	this._animBonusCoord.push([xcoord	,718]);
	this._animBonusCoord.push([xcoord	,789]);
	this._animBonusCoord.push([xcoord+53,718]);
	this._animBonusCoord.push([xcoord+53,647]);
	this._animBonusCoord.push([xcoord+53,576]);
	this._animBonusCoord.push([xcoord+53,504]);
	this._animBonusCoord.push([xcoord+53,432]);

	return true;
};
Bonus.prototype.setRandomType = function () {

	switch (Math.trunc(Math.random()*6)) {
		case 0 : this.setType("powerUp");	break;
		case 1 : this.setType("freeze");	break;
		case 2 : this.setType("load");		break;
		case 3 : this.setType("slow");		break;
		case 4 : this.setType("god");		break;
		case 5 : this.setType("speedUp");	break;
	}
	return true;
};

Bonus.prototype.getType = function () {
	return this._type;
};
Bonus.prototype.activate = function () {
	switch (this._type) {
		case "powerUp": // ORANGE
			this._gameEngine._player.modifyFulgatorRangeTimer(500,5000);
			this._gameEngine._player.modifyFulgatorDamageTimer(100,5000);
			this._gameEngine._soundPlayer.playSound("bonusPowerUp");
		break;
		case "freeze":  // LIGHT BLUE
			for (var i = 0 ; i < this._gameEngine._ennemies.length ; i++) {
				this._gameEngine._ennemies[i].modifySpeedTimer(0,5000);
			}
			this._gameEngine._soundPlayer.playSound("bonusFreeze");
		break;
		case "slow": // PINK
			for (var i = 0 ; i < this._gameEngine._ennemies.length ; i++) {
				this._gameEngine._ennemies[i].modifySpeedTimer(0.5,5000);
			}
			this._gameEngine._soundPlayer.playSound("bonusSlow");
		break;
		case "load":  // GREEN
			this._gameEngine._player.loadFulgator(500);
			this._gameEngine._soundPlayer.playSound("bonusLoad");
			break;
		case "god":  // PURPLRE
			this._gameEngine._player.modifyGodModeTimer(true,5000);
			this._gameEngine._soundPlayer.playSound("bonusGod");
			break;
		case "speedUp":  // BLUE
			this._gameEngine._player.modifySpeedTimer(8,3000);
			this._gameEngine._soundPlayer.playSound("bonusSpeedUp");
		break;
	}
};


Bonus.prototype.render = function () {

	var context = this._gameEngine._context;
	context.save();

	// Rotation if any
	context.translate(this._position[0] ,this._position[1] );

	// Draw image
	var img=document.getElementById("bonusImg");
	var pat=context.createPattern(img,"no-repeat");		
	context.drawImage(img,	this._animBonusCoord[this._animIndex][0],				//- Cropping img
							this._animBonusCoord[this._animIndex][1],				//-	
							this._animSpriteSize[0],this._animSpriteSize[1],		//-			
							0,													//+	Position image
							0,													//+
							this._hitBox[0],													//-	Size image
							this._hitBox[1]														//-
	);
	this._animIndex = (this._animIndex + 1) % this._animBonusCoord.length;


	context.restore();
	context.save();

	context.translate(this._position[0],this._position[1]);

	// Draw hit box if debug mode
	if(this._gameEngine._debug) {
		context.beginPath();
		context.strokeStyle="red";
		context.rect(0,0,this._hitBox[0],this._hitBox[1]);
		context.stroke();
	}
	context.restore();

};
