var GameEngine = function() {
	this._player;
    this._ennemies = [];
    this._damages = [];
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
    this._totalTime = 0;

}
GameEngine.prototype.init = function() {

    var self = this;

    this._map = new Map(this);
    //this._map.setSize($("#myCanvas").width,$("#myCanvas").height);

    this._map.setSize($("#myCanvas").width(),$("#myCanvas").height()-30);
    this._map.setBackgroundColor("#AAAAAA");
    this._map.setBackgroundUrl("#AAAAAA");

    this._statistics = new Statistics(this);
    if (!this._debug) this._statistics.hide();
    this._soundPlayer = new SoundPlayer();
    this._soundPlayer.playSound("backgroundMusic",true);
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
	this._player.setHitBox(parPlayerHitBox);
    this._player.setSpeed(parPlayerSpeed);
    if (this._debug) this._player.setGodMode(true);
    this._player.setFulgatorRange(parPLayerFulgatorRange);
    this._player.setFulgatorDamage(parPLayerFulgatorDamage);
    this._player.setFulgatorDispersion(parPLayerFulgatorDispersion);
    this._player.setFulgatorCritRate(parPLayerFulgatorCritRate);

    //var bonusCount = 10
    //for (var i = 0; i <= bonusCount; i++) {
    //    var bonus = new Bonus(self);
    //    bonus.setPosition([i*100,100]);
    //    bonus.setRandomType();
    //    bonus.setHitBox([25,25]);
    //    self._bonus.push(bonus);
    //};


    for (var i = 0; i <= parEnnemyInitCount; i++) {
        var ennemy = new Ennemy(this);
        ennemy.setPosition([(this._map.getSizeX()-50)*Math.random(),100*Math.random()]);
        ennemy.setName("ennemy"+i);
        var size = parEnnemyInitSizeDefault + parEnnemyInitSizeCoefRandom*Math.random();
        var life = parEnnemyInitLifeCoef * size;
        ennemy.setHitBox([size,size]);
        ennemy.setSpeed(parEnnemyInitSpeedDefault + Math.random()*parEnnemyInitSpeedCoefRandom);
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

        // render fulgator and its smoke
        self._player._fulgator.render();

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

        // render damages
        for (var i = 0 ;  i < self._damages.length ; i++) {
            self._damages[i].render();
        }
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
    this._context.fillText("TIME " + Math.trunc(this._totalTime/1000) + "s", 500, 25);
}
GameEngine.prototype.debug = function() {
    //console.log("GameEngine::debug a message from GameEngine !")
}
GameEngine.prototype.increaseScore = function(toAdd) {
    this._score += toAdd;
    this._score = Math.round(this._score);
}

GameEngine.prototype.startLoosePhase = function() {
    var self = this;
    clearInterval(this._gameLoopId);
    for (var i = 0 ;  i < this._ennemies.length ; i++) {
        this._ennemies[i].setPause(true);
    }
    this._player.setPause(true);
    $("#footerDefeat>img").addClass("animatedKelsch");
    setTimeout(function(){self._soundPlayer.playSound("looseMusic",false);},0);
    setTimeout(function(){self._soundPlayer.playSound("manScreaming",false);},3000);

    var audio = document.getElementById('backgroundMusic');
    audio.pause();
    audio.load();

    clearInterval(this._renderingLoopId);
    this._context.restore();
    this._context.fillStyle = "#FFD700";
    this._context.font = "150px Courier new";
    this._context.fillText("YOU LOOSE",150,this._map.getSizeY()/2);
    this._context.fillText("NOOB !",300,this._map.getSizeY()/2 + 100);
    this._context.fillStyle = "#FF0000";
    this._context.font = "100px Courier new";
    this._context.fillText("Score : " + this._score,150,this._map.getSizeY()/2 + 250);

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
    var phase1Once = false;
    var phase2Once = false;
    var phase3Once = false;
    var phase4Once = false;
    function gameLoop() {

        

        if(self._pause === true)
            return;

        // detect loose condition
        for (var i = 0 ;  i < self._ennemies.length && !self._player.getGodMode(); i++) {
            if (self._ennemies[i].getLife() > 0) {
                if (self._player.collided(self._ennemies[i])) {
                    //console.log("GameEngine::renderingLoop : LOOSE");
                    self.startLoosePhase();
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
                    damage = new Damage(self,
                                        self._ennemies[i],
                                        self._player.getFulgatorDamage(),
                                        self._player.getFulgatorDispersion(),
                                        self._player.getFulgatorCritRate()
                    );
                    damage.execute();
                    self._damages.push(damage);
                    //self._ennemies[i].damage(self._player.getFulgatorDamage());
                    self._ennemies[i].startTouchedAnimation();
                }
            }
        }

        // Delete finished damages
        for (var i = 0; i < self._damages.length; i++) {
            if (self._damages[i].isFinished()) self._damages.splice(i,1);
        }

        // Make new ennemy coming
        if (deltaNewEnnemyEntrance > parDeltaNewEnnemyEntrance) {
            if (self._ennemies.length < parMaxEnnemiesOnScreen) {
                var randomPosition = [(self._map.getSizeX()-50)*Math.random(),100*Math.random()];
                if (Math.sqrt(  (randomPosition[0]-self._player.getPosition()[0])*(randomPosition[0]-self._player.getPosition()[0])
                               +(randomPosition[1]-self._player.getPosition()[1])*(randomPosition[1]-self._player.getPosition()[1]))
                    > parSecurityDistancePopEnnemy )
                {

                    var ennemy = new Ennemy(self);
                    ennemy.setPosition(randomPosition);
                    ennemy.setName("ennemy"+self._ennemies.length+1);
                    var size = parEnnemyInitSizeDefault + parEnnemyInitSizeCoefRandom*Math.random();
                    var life = parEnnemyInitLifeCoef * size;
                    ennemy.setHitBox([size,size]);
                    ennemy.setSpeed(parEnnemyInitSpeedDefault + Math.random()*parEnnemyInitSpeedCoefRandom);
                    ennemy.setLife(life);
                    ennemy.setLifeMax(life);
                    ennemy.setDirection([0,1]);
                    self._ennemies.push(ennemy);
                    ennemy.start();
                }
                deltaNewEnnemyEntrance -= parDeltaNewEnnemyEntrance*Math.random();
            }
        }
        deltaNewEnnemyEntrance += 1000/30;

        // Make new bonus to pop
        if (deltaNewBonusEntrance >  parDeltaNewBonusEntrance) {
            if (self._bonus.length <= parMaxBonusOnScreen) {
                var bonus = new Bonus(self);
                bonus.setPosition([(self._map.getSizeX()-50)*Math.random(),(self._map.getSizeY()-50)*Math.random()]);
                bonus.setRandomType();
                bonus.setHitBox([25,25]);
                self._bonus.push(bonus);
            }
            deltaNewBonusEntrance -= parDeltaNewBonusEntrance *Math.random();
        }
        deltaNewBonusEntrance += 1000/30;

        // Compute new score
        if (deltaTimeScore > 1000) {
            self._score += 1000;
            deltaTimeScore -= 1000
        }
        deltaTimeScore += 1000/30;
        self._totalTime += 1000/30;


        if (self._totalTime>20000 && phase1Once == false) {
            parDeltaNewEnnemyEntrance = parDeltaNewEnnemyEntrance/2;
            phase1Once = true;
        }

        if (self._totalTime>30000 && phase2Once == false) {
            //parDeltaNewEnnemyEntrance = parDeltaNewEnnemyEntrance/2;
            self._player.setFulgatorDamage(self._player.getFulgatorDamage()*2);
            parEnnemyInitSizeCoefRandom = parEnnemyInitSizeCoefRandom*2;
            phase2Once = true;
        }

        if (self._totalTime>40000 && phase3Once == false) {
            parEnnemyInitLifeCoef = parEnnemyInitLifeCoef*2;
            phase3Once = true;
        }

        if (self._totalTime>50000 && phase4Once == false) {
            parMaxEnnemiesOnScreen      = parMaxEnnemiesOnScreen*3;
            parDeltaNewEnnemyEntrance   = parDeltaNewEnnemyEntrance/4;
            parEnnemyInitSizeCoefRandom = parEnnemyInitSizeCoefRandom/10;
            parEnnemyInitLifeCoef       = parEnnemyInitLifeCoef/10;

            // Create boss
            var ennemy = new Ennemy(self);
            ennemy.setPosition([0,0]);
            ennemy.setName("ennemy"+self._ennemies.length+1);
            var size = 300;
            ennemy.setHitBox([size,size]);
            ennemy.setSpeed(1);
            ennemy.setLife(10000);
            ennemy.setLifeMax(10000);
            ennemy.setDirection([0,1]);
            self._ennemies.push(ennemy);
            ennemy.start();

            phase4Once = true;
        }

    }
}