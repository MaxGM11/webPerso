var GameEngine = function() {
	this._player;
	this._ennemy = [];
	this._map;
	this._canvas;
    this._context;
    this._renderingLoopId
    this._backgroundColor;


}
GameEngine.prototype.init = function() {

	this._map = new Map(this);
	this._map.setSize(500,500);
	this._map.setBackgroundColor("#AAAAAA");

	this._player = new Player();
	this._player.setPosition(this._map.getCenter());
	this._player.setHitBox([40,40]);

	var ennemy0 = new Ennemy();
	ennemy0.setPosition([10,10]);
	ennemy0.setHitBox([40,40]);
	this._ennemy.push(ennemy0);

	var ennemy1 = new Ennemy();
	ennemy1.setPosition([80,20]);
	ennemy1.setHitBox([40,40]);
	this._ennemy.push(ennemy1);

}


GameEngine.prototype.setRendereringParameters = function(canvas) {

	if (canvas === undefined) {
		console.log("GameEngine::setRendereringParameters [ERROR] input parameter undefined");
		return false;
	}

	this._canvas = canvas;
    this._context = canvas.getContext("2d");
    if(!this._context)
    {
        console.log("GameEngine::setRendereringParameters [ERROR] not possible to get the 2d context");
        return;
    }

}

GameEngine.prototype.start = function() {

	// Start the game
	var myInterval = setInterval(loop, 1000/2);
    function loop()
    {
   		console.log("GameEngine::start looping");
    }

    // Start the renderer
	this._renderingLoopId = setInterval(renderingLoop, 1000/30);
  
  	var self = this;
    function renderingLoop()
    {
    	console.log("Renderer::render rendering loop : new frame");

    	// clear the canvas
    	self._context.clearRect(0, 0, self._canvas.width, self._canvas.height);

        // render map
        self._map.render();

        // render ennemies
        self._ennemy[0].render(self);
        self._ennemy[1].render(self);
        
        // render player
        self._player.render(self);

    }

}

GameEngine.prototype.debug = function() {
	console.log("GameEngine::debug a message from GameEngine !")
}

