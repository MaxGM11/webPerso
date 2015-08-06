var GameLogic = function() {
	this._player;
	this._ennemy = [];
	this._map;


}
GameLogic.prototype.init = function() {

	this._map = new Map();
	this._map.setSize(500,500);

	this._player = new Player();
	this._player.setPosition(this._map.getCenter());

	var ennemy0 = new Ennemy();
	this._ennemy.push(ennemy0)
	var ennemy1 = new Ennemy();
	this._ennemy.push(ennemy1)

}
GameLogic.prototype.start = function() {

	var myInterval = setInterval(loop, 1000/2);
  
    function loop()
    {
    	console.log("GameLogic::start looping");
    }
}