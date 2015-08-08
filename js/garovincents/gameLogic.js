var GameLogic = function() {
	this._player;
	this._ennemy = [];
	this._map;
	this._renderer;


}
GameLogic.prototype.init = function() {

	this._map = new Map();
	this._map.setSize(500,500);

	this._player = new Player();
	this._player.setPosition(this._map.getCenter());
	this._player.setHitBox([40,40]);

	var ennemy0 = new Ennemy();
	ennemy0.setHitBox([40,40]);
	this._ennemy.push(ennemy0);

	var ennemy1 = new Ennemy();
	ennemy1.setHitBox([40,40]);
	this._ennemy.push(ennemy1);

}


GameLogic.prototype.setRenderer = function(renderer) {

	this._renderer = renderer;

}

GameLogic.prototype.start = function() {

	// Start the game
	var myInterval = setInterval(loop, 1000/2);
    function loop()
    {
    	console.log("GameLogic::start looping");
    }

    // Start the renderer
    this._renderer.render(30);

}

GameLogic.prototype.debug = function() {
	console.log("GameLogic::debug a message from gamelogic !")
}