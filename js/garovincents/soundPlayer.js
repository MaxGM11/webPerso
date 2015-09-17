var SoundPlayer = function () {

	// Wesp audio resource
	this._wespDead = [];
	this._countwespDead = 0;
	this._maxwespDead = 10;
	// Init
	for (var i = 0 ; i<this._maxwespDead ; i++ ){
		this._wespDead.push(document.getElementById('deadWespSound'+i));
	}
	
	// Bonus PowerUp audio resource
	this._bonusPowerUp = [];
	this._countbonusPowerUp = 0;
	this._maxbonusPowerUp = 1;
	// Init
	for (var i = 0 ; i<this._maxbonusPowerUp ; i++ ){
		this._bonusPowerUp.push(document.getElementById('bonusPowerUpSound'));
	}
	
	// Bonus load audio resource
	this._bonusLoad = [];
	this._countbonusLoad = 0;
	this._maxbonusLoad = 1;
	// Init
	for (var i = 0 ; i<this._maxbonusLoad ; i++ ){
		this._bonusLoad.push(document.getElementById('bonusLoadSound'));
	}
	// Bonus SpeedUp audio resource
	this._bonusSpeedUp = [];
	this._countbonusSpeedUp = 0;
	this._maxbonusSpeedUp = 1;
	// Init
	for (var i = 0 ; i<this._maxbonusSpeedUp ; i++ ){
		this._bonusSpeedUp.push(document.getElementById('bonusSpeedUpSound'));
	}
	// Bonus God audio resource
	this._bonusGod = [];
	this._countbonusGod = 0;
	this._maxbonusGod = 1;
	// Init
	for (var i = 0 ; i<this._maxbonusGod ; i++ ){
		this._bonusGod.push(document.getElementById('bonusGodSound'));
	}
	// Bonus Slow audio resource
	this._bonusSlow = [];
	this._countbonusSlow = 0;
	this._maxbonusSlow = 1;
	// Init
	for (var i = 0 ; i<this._maxbonusSlow ; i++ ){
		this._bonusSlow.push(document.getElementById('bonusSlowSound'));
	}
	// Bonus Freeze audio resource
	this._bonusFreeze = [];
	this._countbonusFreeze = 0;
	this._maxbonusFreeze = 1;
	// Init
	for (var i = 0 ; i<this._maxbonusFreeze ; i++ ){
		this._bonusFreeze.push(document.getElementById('bonusFreezeSound'));
	}
	
}

SoundPlayer.prototype.playSound = function (id) {

	this["_"+id][this["_count"+id]].play();
	this["_count"+id] = (this["_count"+id] + 1) % this["_max"+id];


}