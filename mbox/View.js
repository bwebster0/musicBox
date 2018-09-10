function View(canvas) {
    this.canvas = canvas;
    this.clicks = [];
    this.frameRate = 1000 / 30; //frames / sec
    this.radii = [100,75,50,25];
    this.rindex = 0;
    this.init = 1;
    this.maxRadius = 80;
    this.loopRate = 6000;
}

View.prototype.updateDisplay = function () {    // prototype shares the function with multiple View objects
    var view = this;
    var context = view.canvas.getContext("2d");
    context.clearRect(0, 0, view.canvas.width, view.canvas.height);
    context.fillStyle = 'rgba(0,0,0,1)';
    context.fillRect(0, 0, view.canvas.width, view.canvas.height);

    for (var i = 0; i < view.clicks.length; i++) {
        var circle = view.clicks[i];
        if (circle.radius > view.maxRadius-1) continue;
        circle.radius += 1;
        var alpha = 0.7;
        if (circle.radius > view.maxRadius - 15)  {
            alpha = (view.maxRadius - circle.radius) / 10.0;
        }
        view.drawCircle(context, circle.x, circle.y, circle.radius, alpha);
    }
};

View.prototype.drawCircle = function (context, cx, cy, r, alpha) {
    var startAng = 0;
    var endAng = 2 * Math.PI;
    context.beginPath();
    context.arc(cx, cy, r, startAng, endAng);
    var ccolor = "rgba(" + Math.floor(cx%256) + "," + Math.floor(cy%256) + "," + Math.floor((cx*cy)%256) + "," + alpha + ")";
    context.fillStyle = ccolor;
    context.fill();
}

View.prototype.handleClick = function(event)  {
    var view = this;
    var x = event.offsetX;
    var y = event.offsetY;

    var pos = view.clicks.push({ x: x, y: y, radius: 1 });
    Audio.play(Math.floor(x%10));

    setInterval(function () {
        view.clicks[pos - 1].radius = 1;
        Audio.play(Math.floor(x%10));
    }, view.loopRate);
    console.log("Add circle @ ", x," ",y);  // at first this was canvas obj not the view obj

}
