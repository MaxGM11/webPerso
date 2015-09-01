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
	this._map.setSize(300,300);
	this._map.setBackgroundColor("#AAAAAA");

	this._player = new Player(this);
	this._player.setPosition(this._map.getCenter());
	this._player.setHitBox([40,40]);
    this._player.setSpeed(4);

    var ennemy0 = new Ennemy(this);
    ennemy0.setPosition([10,10]);
    ennemy0.setName("Ennemy0");
    ennemy0.setHitBox([40,40]);
    ennemy0.setSpeed(3);
    ennemy0.setDirection([-1,3]);
    this._ennemy.push(ennemy0);

    var ennemy1 = new Ennemy(this);
    ennemy1.setPosition([80,20]);
    ennemy1.setName("Ennemy1");
	ennemy1.setHitBox([40,40]);
    ennemy1.setSpeed(1);
    ennemy1.setDirection([2,1]);
	this._ennemy.push(ennemy1);
	
    var ennemy2 = new Ennemy(this);
    ennemy2.setPosition([150,30]);
    ennemy2.setName("Ennemy2");
	ennemy2.setHitBox([40,40]);
    ennemy2.setSpeed(2);
    ennemy2.setDirection([0,1]);
	this._ennemy.push(ennemy2);
	
    var ennemy3 = new Ennemy(this);
    ennemy3.setPosition([150,30]);
    ennemy3.setName("Ennemy3");
	ennemy3.setHitBox([40,40]);
    ennemy3.setSpeed(2);
    ennemy3.setDirection([0,1]);
	this._ennemy.push(ennemy3);
	
    var ennemy4 = new Ennemy(this);
    ennemy4.setPosition([150,30]);
    ennemy4.setName("Ennemy4");
	ennemy4.setHitBox([40,40]);
    ennemy4.setSpeed(2);
    ennemy4.setDirection([0,1]);
	this._ennemy.push(ennemy4);

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
    var self = this;

	// Start the game
	var myInterval = setInterval(loop, 5000);
    function loop()
    {
        console.log("GameEngine::loop randomize ennemies");
        for (var i = 0 ;  i < self._ennemy.length ; i++) {
            // Random -3 / 3 : (Math.random() - 0.5)*6.0
            self._ennemy[i].setDirection ([(Math.random() - 0.5)*6.0,(Math.random() - 0.5)*6.0]);
            self._ennemy[i].setSpeed(Math.random() * 3.0);
        }

    }

    // Start the renderer
	this._renderingLoopId = setInterval(renderingLoop, 1000/30);

    // Start ennemies
    for (var i = 0 ;  i < this._ennemy.length ; i++) {
        this._ennemy[i].start();
    }

    this._player.start();


    function renderingLoop()
    {
    	console.log("GameEngine::renderingLoop : new frame");

        // detect loose condition
        for (var i = 0 ;  i < self._ennemy.length ; i++) {
            if (self._player.collided(self._ennemy[i])) {
                console.log("GameEngine::renderingLoop : LOOSE");
                clearInterval(self._renderingLoopId);
            }
        }

    	// clear the canvas
    	self._context.clearRect(0, 0, self._canvas.width, self._canvas.height);

        // render map
        self._map.render();

        // render ennemies
		for (var i = 0 ;  i < self._ennemy.length ; i++) {
			self._ennemy[i].render(self);
        }
        
        // render player
        self._player.render(self);

    }

}

GameEngine.prototype.debug = function() {
	console.log("GameEngine::debug a message from GameEngine !")
}

