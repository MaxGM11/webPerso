var Statistics = function (gameEngine) {
	this._gameEngine = gameEngine;
	this._displayed = true;
	this._font = "15px Courier new";
	this._fontColor = "#00FF00";
	this._prevTimestamp = 0;
}

Statistics.prototype.displayed = function () {
  return this._displayed;
}
Statistics.prototype.hide = function () {
  this._displayed = false;
}

Statistics.prototype.render = function () {

	// Prepare UI
	var context = this._gameEngine._context;
	context.font = this._font;
	context.fillStyle = this._fontColor;

	// Init data
  	var livingWesp				= 0;
  	var killedWesp				= 0;
  	var livingWespLifeAvg		= 0;
  	var livingWespLifeTotal		= 0;
  	var playerGod				= 0;
  	var playerFulgatorLoad		= 0;
    var playerFulgatorLoadMax = 0;
    var playerFulgatorDamage = 0;
    var playerSpeed = 0;
  	var fps						= 0;

  	// Get data
    for (var i = 0 ;  i < this._gameEngine._ennemies.length ; i++) {
        var ennLife = this._gameEngine._ennemies[i].getLife();
        if (ennLife > 0) {
			livingWespLifeTotal += ennLife;
			livingWesp ++;
        }
    }
    livingWespLifeTotal = Math.trunc(livingWespLifeTotal);
    (this._gameEngine._player.getGodMode()) ? playerGod = "true" : playerGod = "false";
    livingWespLifeAvg = Math.trunc(livingWespLifeTotal / livingWesp);
    playerFulgatorLoad = this._gameEngine._player.getFulgatorLoad();
    playerFulgatorLoadMax = this._gameEngine._player.getFulgatorLoadMax();
    playerFulgatorDamage = this._gameEngine._player.getFulgatorDamage();
    if(this._prevTimestamp != 0)
    	fps = Math.trunc(1000 / (Date.now() - this._prevTimestamp))
    this._prevTimestamp = Date.now();

    // Draw data

  	context.fillText("livingWesp...............: " + livingWesp               , 10, this._gameEngine._map.getSizeY() - 10 * 1);
  	context.fillText("killedWesp...............: " + killedWesp               , 10, this._gameEngine._map.getSizeY() - 10 * 2);
  	context.fillText("livingWespLifeAvg........: " + livingWespLifeAvg        , 10, this._gameEngine._map.getSizeY() - 10 * 3);
  	context.fillText("livingWespLifeTotal......: " + livingWespLifeTotal      , 10, this._gameEngine._map.getSizeY() - 10 * 4);
    context.fillText("playerGod................: " + playerGod                , 10, this._gameEngine._map.getSizeY() - 10 * 5);
  	context.fillText("playerFulgatorLoad.......: " + playerFulgatorLoad       , 10, this._gameEngine._map.getSizeY() - 10 * 6);
    context.fillText("playerFulgatorLoadMax....: " + playerFulgatorLoadMax    , 10, this._gameEngine._map.getSizeY() - 10 * 7);
  	context.fillText("playerFulgatorDamage.....: " + playerFulgatorDamage     , 10, this._gameEngine._map.getSizeY() - 10 * 8);
  	context.fillText("fps......................: " + fps                      , 10, this._gameEngine._map.getSizeY() - 10 * 9);

}