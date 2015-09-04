var Keyboard = function() {


	/*
	*	Create a little debugger tool
	*/
	
	this._keyPressed = [];
	this._repeatableKey = [];
	this._repeatableKeyTimeOutID = [];

};
Keyboard.prototype.addKeyListener = function(keyCode,callbackFunction,allowRepeat) {
	allowRepeat = typeof allowRepeat !== "undefined" ? allowRepeat : true;
	
	this._repeatableKey[keyCode] = allowRepeat;
	//console.log ("[DBG] key listener for " + keyCode + " (repeat : " + allowRepeat + ")");
	var self = this;
	$("*").keydown(function(codeKey){
		if (codeKey.keyCode === keyCode) {
			// If the button is already pressed
			if (self._keyPressed[keyCode] !== 1) {
				self._keyPressed[keyCode] = 1;
				// If the user allow the key  to be repeated
				if(self._repeatableKey[keyCode]) {
					callbackFunction();
					self._repeatableKeyTimeOutID[keyCode] = setInterval(callbackFunction,17);
					//console.log("[DBG] Started process for " + keyCode + " with id : " + self._repeatableKeyTimeOutID[keyCode]);
				}else{ // If he doesn't want it to be repeatable
					callbackFunction();
				}
			}else{
				//console.log("the key is already pressed so I do nothing");
			}

		}
	});
	
	$("*").keyup(function(codeKey){
		if (codeKey.keyCode === keyCode) {
			self._keyPressed[keyCode] = 0;
			// If the user allow the key  to be repeated
			if(self._repeatableKey[keyCode]) {
				clearTimeout(self._repeatableKeyTimeOutID[keyCode]);
				//console.log("[DBG] Ended process for " + keyCode + " with id : " + self._repeatableKeyTimeOutID[keyCode]);
			}
		}
	});

};