var Renderer = function (canvas) {
	if (canvas === undefined) {
		console.log("Renderer::constructor [ERROR] input parameter undefined");
		return false;
	}

	this._canvas = canvas;
    this._context = canvas.getContext("2d");
    if(!this._context)
    {
        console.log("Renderer::constructor [ERROR] not possible to get the 2d context");
        return;
    }

        
}

Renderer.prototype.render = function() {
	
}