// Gameplay
var parPlayerHitBox              = [45,45];
var parPlayerSpeed               = 4;
var parPLayerFulgatorRange       = 300;
var parPLayerFulgatorDamage      = 100;
var parPLayerFulgatorDispersion  = 10;
var parPLayerFulgatorCritRate    = 5;

var parFulgatorLoadMax           = 1000;
var parFulgatorLoad              = 1000;

var parEnnemyInitCount           = 10;
var parEnnemyInitSizeDefault     = 10;
var parEnnemyInitSizeCoefRandom  = 50;
var parEnnemyInitLifeCoef        = 100; // 100 * Size

var parEnnemyInitSpeedDefault    = 1;
var parEnnemyInitSpeedCoefRandom = 2;

var parSecurityDistancePopEnnemy = 100;

var parDeltaNewEnnemyEntrance    = 2000; // An ennmy enter the game every parDeltaNewEnnemyEntrance*Rand(0,1) ms
var parMaxEnnemiesOnScreen       = 30;
var parDeltaNewBonusEntrance     = 5000; // An bonus appear every parDeltaNewBonusEntrance*Rand(0,1) ms
var parMaxBonusOnScreen          = 5;

// Bonus
var parBonusPowerUpRange		= 500;
var parBonusPowerUpDamage		= 300;
var parBonusPowerUpTimer		= 5000;
var parBonusLoadFulgator		= 500;
var parBonusGodTimer			= 5000;
var parBonusSpeedUpTimer		= 5000;
var parBonusSpeedUpSpeed		= 8;

// Visu
var parEnnemyKillSpeedDown = 25;