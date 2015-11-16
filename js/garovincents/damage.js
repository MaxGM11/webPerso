var Damage = function (gameEngine, target, power, dispersion, critRate) {

	this._target = target;
	this._power = power;
	this._critRate = critRate;
	this._dispersion = dispersion;
	this._finalDamage;
    this._gameEngine = gameEngine;

    this._isCrit = false;
    this._animTime = 500;
    this._position;
    this._direction;
    this._speed;
    this._animationId;
    this._finished = false;
}

Damage.prototype.execute = function() {
	// Compute real damage
	var disp = this._dispersion/100;
	var crit = 1;
	if (Math.random() < this._critRate/100) {
		crit = 2;
		this._animTime = 2*this._animTime;
		this._isCrit = true;
	}
	this._finalDamage = crit * this._power * (1 - disp/2 + (Math.random()*disp));
	// console.log(finalDamage);
	this._position = this._target.getPosition();
	this._direction = [1-2*Math.random(),1-2*Math.random()];
	this._speed = 3*Math.random();
	this._target.damage(this._finalDamage);
	this.startAnimation();
}


Damage.prototype.render = function() {

	var context = this._gameEngine._context;
	context.save();


	context.translate(this._position[0],this._position[1]);

	// Draw damage
	if (this._isCrit) {
		context.font = "15px Courier new";
		context.fillStyle = "#FF0000";
	}
	else {
		context.font = "12px Courier new";
		context.fillStyle = "#FFFFFF";
	}
	context.fillText(Math.round(this._finalDamage) , 0,0);

	context.restore();
}

Damage.prototype.startAnimation = function () {

	this._animationId = setInterval(animatedDamage, 1000/30);
	var self = this;

	var animTime = 0;
	function animatedDamage() {
		self._position[0] += self._speed * self._direction[0];
		self._position[1] += self._speed * self._direction[1];
		animTime += 1000/30;
		if (animTime >= self._animTime) {
			//self._gameEngine.removeEnnemy(self._name);
			clearInterval(self._animationId);
			self._animationId = 0;
			self._finished = true;
			return;
		}
	}

}
Damage.prototype.isFinished = function () {
	return this._finished;
}