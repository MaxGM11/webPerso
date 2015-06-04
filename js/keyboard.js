var Keyboard = function() {


	/*
	*	Create a little debugger tool
	*/
	
	this._keyPressed = [];
	
	/*
	*		We get Downed keys 
	*		This function is repeated until the key is pressed. So we need to prevent this : pressedButton
	*/
	var self = this;
	$("*").keydown(function(codeKey){
		
		self._keyPressed[codeKey.keyCode] = 1;
		console.log("[DBG] > Key UP : " + codeKey.keyCode);
		console.log ("[DBG] " + self._keyPressed);
	});
	
	/*
	*		We get Up key
	*/
	$("*").keyup(function(codeKey){
		console.log("[DBG] > Key DW : " + codeKey.keyCode);
		self._keyPressed[codeKey.keyCode] = 0;
		console.log ("[DBG] " + self._keyPressed);
	});
};
Keyboard.prototype.addKeyListener = function(keyCode,callbackFunction,allowRepeat) {
	allowRepeat = typeof allowRepeat !== "undefined" ? allowRepeat : true;
	
	var self = this;
	$("*").keydown(function(codeKey){
		if(self._keyPressed[keyCode] === 1) {
			callbackFunction();
		}
	});
};