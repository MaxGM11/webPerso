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
    this._debug = false;

}
GameEngine.prototype.init = function() {

    var self = this;

    this._map = new Map(this);
    //this._map.setSize($("#myCanvas").width,$("#myCanvas").height);
    this._map.setSize(800,500);
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
	this._player.setHitBox([35,35]);
    this._player.setSpeed(4);

    var monsterCount = 30
    for (var i = 0; i <= monsterCount; i++) {
        var ennemy = new Ennemy(this);
        ennemy.setPosition([(this._map.getSizeX()-50)*Math.random(),100*Math.random()]);
        ennemy.setName("ennemy"+i);
        var size = 10 + 20*Math.random();
        var life = 100 * size;
        ennemy.setHitBox([size,size]);
        ennemy.setSpeed(1 + Math.random()*2);
        ennemy.setLife(life);
        ennemy.setLifeMax(life);
        ennemy.setDirection([0,1]);
        this._ennemy.push(ennemy);
    };


    this._pause = true;

}


GameEngine.prototype.removeEnnemy = function(name) {

    if (name === undefined) {
        console.log("GameEngine::removeEnnemy [ERROR] input parameter undefined");
        return false;
    }

    for (var i = 0 ;  i < this._ennemy.length ; i++) {
        if (this._ennemy[i].getName () === name) {
            this._ennemy.splice(i,1);
            console.log("Ennemy "+name+" removed from game")
            return;
        }
    }
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
            if (self._ennemy[i].getLife() > 0) {
                if (self._player.collided(self._ennemy[i])) {
                    //console.log("GameEngine::renderingLoop : LOOSE");
                    clearInterval(self._gameLoopId);
                    self._pause = true;
                }
            }
        }
        
        // manage fulgator firing
        if (self._player.isFiring()) {
            for (var i = 0 ;  i < self._ennemy.length ; i++) {
                if (self._ennemy[i].getLife() > 0 && (
                    self._player.isInRange(self._ennemy[i].getPosition())                                           ||

                    self._player.isInRange([self._ennemy[i].getPosition()[0] + self._ennemy[i].getHitBox()[0],
                                            self._ennemy[i].getPosition()[1]                                    ])  ||

                    self._player.isInRange([self._ennemy[i].getPosition()[0]                                 ,
                                            self._ennemy[i].getPosition()[1] + self._ennemy[i].getHitBox()[1]   ])  ||

                    self._player.isInRange([self._ennemy[i].getPosition()[0] + self._ennemy[i].getHitBox()[0],
                                            self._ennemy[i].getPosition()[1] + self._ennemy[i].getHitBox()[1]   ])
                )) {
                    self._ennemy[i].damage(100);
                    self._ennemy[i].startTouchedAnimation();
                }
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