var GameEngine = function() {
	this._player;
	this._ennemy = [];
    this._map;
    this._menu;
	this._canvas;
    this._context;
    this._renderingLoopId;
    this._gameLoopId;
    this._backgroundColor;
    this._pause = true;
    this._debug = true;

}
GameEngine.prototype.init = function() {

    var self = this;

    this._map = new Map(this);
    this._map.setSize(500,500);
    this._map.setBackgroundColor("#AAAAAA");

    this._menu = new Menu(this);
    this._menu.activate();

    this._menu.addButton({
        name:"Start",
        callbackFct:function(){
            console.log("Start button clicked");
            self._pause = false;
            self._menu.deactivate();
            self.startGame();
        }
    });

    this._menu.addButton({
        name:"Prout",
        callbackFct:function(){
            console.log("Exit button clicked");
            alert("prout");
        }
    });


	this._player = new Player(this);
	this._player.setPosition(this._map.getCenter());
	this._player.setHitBox([60,60]);
    this._player.setSpeed(4);

    var ennemy0 = new Ennemy(this);
    ennemy0.setPosition([10,10]);
    ennemy0.setName("Ennemy0");
    ennemy0.setHitBox([40,40]);
    ennemy0.setSpeed(1);
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

    this._pause = true;

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

    // Start the renderer
	this._renderingLoopId = setInterval(renderingLoop, 1000/30);

    function renderingLoop()
    {
    	//console.log("GameEngine::renderingLoop : new frame");

        // Render the menu
        self._menu.render();

        // check if game is paused
        if(self._pause === true)
            return;

    	// clear the canvas
    	self._context.clearRect(0, 0, self._canvas.width, self._canvas.height);

        // render map
        self._map.render();

        // render ennemies
		for (var i = 0 ;  i < self._ennemy.length ; i++) {
			self._ennemy[i].render();
        }
        
        // render player
        self._player.render(self);

    }

}

GameEngine.prototype.debug = function() {
	//console.log("GameEngine::debug a message from GameEngine !")
}

GameEngine.prototype.startGame = function() {
    // Start the game
    var self = this;

    // Start ennemies
    for (var i = 0 ;  i < this._ennemy.length ; i++) {
        this._ennemy[i].start();
    }
    // Start Player
    this._player.start();

    this._gameLoopId = setInterval(gameLoop, 1000/30);

    var deltaNewDirectionEnnemies = 0;
    function gameLoop() {

        deltaNewDirectionEnnemies += 1000/30

        if(self._pause === true)
            return;

        // detect loose condition
        
        for (var i = 0 ;  i < self._ennemy.length ; i++) {
            if (self._player.collided(self._ennemy[i])) {
                //console.log("GameEngine::renderingLoop : LOOSE");
                clearInterval(self._gameLoopId);
                self._pause = true;
            }
        }
        

        //console.log("GameEngine::loop randomize ennemies");
        if (deltaNewDirectionEnnemies > 5000) {
            for (var i = 0 ;  i < self._ennemy.length ; i++) {
                // Random -3 / 3 : (Math.random() - 0.5)*6.0
                self._ennemy[i].setDirection ([(Math.random() - 0.5)*6.0,(Math.random() - 0.5)*6.0]);
                self._ennemy[i].setSpeed(1 + Math.random() * 1.0);
            }
            deltaNewDirectionEnnemies -= 5000;
        }

    }
}