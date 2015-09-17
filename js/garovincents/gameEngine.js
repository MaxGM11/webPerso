var GameEngine = function() {
	this._player;
	this._ennemies = [];
    this._map;
    this._menu;
    this._statistics;
    this._soundPlayer;
	this._canvas;
    this._context;
    this._renderingLoopId;
    this._gameLoopId;
    this._backgroundColor;
    this._pause = true;
    this._debug = false;
    this._bonus = [];
    this._score = 0;

}
GameEngine.prototype.init = function() {

    var self = this;

    this._map = new Map(this);
    //this._map.setSize($("#myCanvas").width,$("#myCanvas").height);
    this._map.setSize(1200,670);
    this._map.setBackgroundColor("#AAAAAA");

    this._statistics = new Statistics(this);
    if (!this._debug) this._statistics.hide();
    this._soundPlayer = new SoundPlayer();
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

	this._player = new Player(this);
	this._player.setPosition(this._map.getCenter());
	this._player.setHitBox([35,35]);
    this._player.setSpeed(4);
    if (this._debug) this._player.setGodMode(true);
    this._player.setFulgatorRange(200);
    this._player.setFulgatorDamage(40);

    //var bonusCount = 10
    //for (var i = 0; i <= bonusCount; i++) {
    //    var bonus = new Bonus(self);
    //    bonus.setPosition([i*100,100]);
    //    bonus.setRandomType();
    //    bonus.setHitBox([25,25]);
    //    self._bonus.push(bonus);
    //};


    var monsterCount = 10
    for (var i = 0; i <= monsterCount; i++) {
        var ennemy = new Ennemy(this);
        ennemy.setPosition([(this._map.getSizeX()-50)*Math.random(),100*Math.random()]);
        ennemy.setName("ennemy"+i);
        var size = 10 + 50*Math.random();
        var life = 100 * size;
        ennemy.setHitBox([size,size]);
        ennemy.setSpeed(1 + Math.random()*2);
        ennemy.setLife(life);
        ennemy.setLifeMax(life);
        ennemy.setDirection([0,1]);
        this._ennemies.push(ennemy);
    };


    this._pause = true;

}


GameEngine.prototype.removeEnnemy = function(name) {

    if (name === undefined) {
        console.log("GameEngine::removeEnnemy [ERROR] input parameter undefined");
        return false;
    }

    for (var i = 0 ;  i < this._ennemies.length ; i++) {
        if (this._ennemies[i].getName () === name) {
            this._ennemies.splice(i,1);
            console.log("Ennemy "+name+" removed from game")
            return;
        }
    }
}

GameEngine.prototype.removeBonus = function(i) {
    this._bonus.splice(i,1);
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


        self._context.save();
        self._context.translate(0,30);

        // render map
        self._map.render();

        // render ennemies
        for (var i = 0 ;  i < self._ennemies.length ; i++) {
            self._ennemies[i].render();
        }

        // render bonuses
        for (var i = 0 ;  i < self._bonus.length ; i++) {
            self._bonus[i].render();
        }
        
        // render player
        self._player.render(self);

        // render statistics
        if (self._statistics.displayed())
            self._statistics.render();

        self._context.restore();

        // render header
        self.renderHeader();


    }

}
GameEngine.prototype.renderHeader = function() {
    this._context.clearRect(0, 0, this._canvas.width, 30);

    this._context.fillStyle = "#000000";
    this._context.fillRect(0,0,this._canvas.width, 30);
    this._context.font = "15px Courier new";
    this._context.fillStyle = "#FFFFFF";
    this._context.fillText("SCORE " + Math.trunc(this._score) , 10, 25);
}
GameEngine.prototype.debug = function() {
    //console.log("GameEngine::debug a message from GameEngine !")
}
GameEngine.prototype.increaseScore = function(toAdd) {
    this._score += toAdd;
}

GameEngine.prototype.startGame = function() {
    // Start the game
    var self = this;

    // Start ennemies
    for (var i = 0 ;  i < this._ennemies.length ; i++) {
        this._ennemies[i].start();
    }
    // Start Player
    this._player.start();

    this._gameLoopId = setInterval(gameLoop, 1000/30);

    var deltaNewEnnemyEntrance = 0;
    var deltaNewBonusEntrance = 0;
    var deltaTimeScore = 0;
    function gameLoop() {

        

        if(self._pause === true)
            return;

        // detect loose condition
        for (var i = 0 ;  i < self._ennemies.length && !self._player.getGodMode(); i++) {
            if (self._ennemies[i].getLife() > 0) {
                if (self._player.collided(self._ennemies[i])) {
                    //console.log("GameEngine::renderingLoop : LOOSE");
                    clearInterval(self._gameLoopId);
                    self._pause = true;
                }
            }
        }

        // detect collision with bonus
        for (var i = 0 ;  i < self._bonus.length ; i++) {
           if (self._player.collided(self._bonus[i])) {
                self._bonus[i].activate();
                self.removeBonus(i);

           }
        }
        
        // manage fulgator firing
        if (self._player.isFiring()) {
            for (var i = 0 ;  i < self._ennemies.length ; i++) {
                if (self._ennemies[i].getLife() > 0 && (
                    self._player.isInRange(self._ennemies[i].getPosition())                                           ||

                    self._player.isInRange([self._ennemies[i].getPosition()[0] + self._ennemies[i].getHitBox()[0],
                                            self._ennemies[i].getPosition()[1]                                    ])  ||

                    self._player.isInRange([self._ennemies[i].getPosition()[0]                                 ,
                                            self._ennemies[i].getPosition()[1] + self._ennemies[i].getHitBox()[1]   ])  ||

                    self._player.isInRange([self._ennemies[i].getPosition()[0] + self._ennemies[i].getHitBox()[0],
                                            self._ennemies[i].getPosition()[1] + self._ennemies[i].getHitBox()[1]   ])
                )) {
                    self._ennemies[i].damage(self._player.getFulgatorDamage());
                    self._ennemies[i].startTouchedAnimation();
                }
            }
        }


        // Make new ennemy coming
        var securityDistance = 100;
        if (deltaNewEnnemyEntrance > 2000) {
            var randomPosition = [(self._map.getSizeX()-50)*Math.random(),100*Math.random()];
            if (Math.sqrt(  (randomPosition[0]-self._player.getPosition()[0])*(randomPosition[0]-self._player.getPosition()[0])
                           +(randomPosition[1]-self._player.getPosition()[1])*(randomPosition[1]-self._player.getPosition()[1]))
                > securityDistance )
            {

                var ennemy = new Ennemy(self);
                ennemy.setPosition(randomPosition);
                ennemy.setName("ennemy"+self._ennemies.length+1);
                var size = 10 + 30*Math.random();
                var life = 100 * size;
                ennemy.setHitBox([size,size]);
                ennemy.setSpeed(1 + Math.random()*2);
                ennemy.setLife(life);
                ennemy.setLifeMax(life);
                ennemy.setDirection([0,1]);
                self._ennemies.push(ennemy);
                ennemy.start();
            }
            deltaNewEnnemyEntrance -= 2000*Math.random();
        }
        deltaNewEnnemyEntrance += 1000/30;

        // Make new bonus to pop
        if (deltaNewBonusEntrance > 5000) {
            if (self._bonus.length <= 3) {
                var bonus = new Bonus(self);
                bonus.setPosition([(self._map.getSizeX()-50)*Math.random(),(self._map.getSizeY()-50)*Math.random()]);
                bonus.setRandomType();
                bonus.setHitBox([25,25]);
                self._bonus.push(bonus);
            }
            deltaNewBonusEntrance -= 5000*Math.random();
        }
        deltaNewBonusEntrance += 1000/30;

        // Compute new score
        if (deltaTimeScore > 1000) {
            self._score += 1000;
            deltaTimeScore -= 1000
        }
        deltaTimeScore += 1000/30;

    }
}