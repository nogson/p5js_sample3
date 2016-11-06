
var particle,
    particles = [],
    ctx;

function setup() {
    ctx = createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
    blendMode(LIGHTEST);
    noStroke();
    background(0, 0, 0);

}


function draw() {
    clear();
    background(0, 0, 0);

    makeParticles(25, Math.random()* width, height);

    for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.render();
        p.update();
    }

    for (i = 0; i < 24; i++) {
        particles.shift();
    }


}


function makeParticles(pcount, mx, my) {
    for (var i = 0; i < pcount; i++) {
        var p = new Particle(mx, my, 0);

        var angle = PI + random(-PI, PI);
        var speed = random(10, 20);

        p.velX = sin(angle) * speed;
        p.velY = cos(angle) * speed;
        p.targetY = random(-200, 300);
        p.baseSize = random(5, 15);

        particles.push(p);
      }
}

function Particle(x, y, h) {
    this.posX = x;
    this.posY = y;
    this.velX = 0;
    this.velY = 0;
    this.targetY = 0;
    this.shrink = .95;
    this.baseSize = 1;
    this.drag = 0.9;
    this.gravity = 0.2;
    this.hue = h;
    this.isDown = false;

    this.update = function() {
        this.velX *= this.drag;
        this.velY *= this.drag;

        this.velY += this.gravity;

        this.posX += this.velX;
        if(this.hue > 255){
          this.hue = 0;
        }

        this.hue += 1;


        if(this.posY < this.targetY + 20){
          this.isDown = true;

        }
        if(this.isDown === false){
          this.posY += this.velY - (this.posY - this.targetY)/5;
        }else{
          this.posY += this.velY + (this.posY - this.targetY + 20)/20;
        }


        this.size = (height - this.posY) / height * this. baseSize;
    };

    this.render = function() {
        fill(this.hue, 100, 100);
        ellipse(this.posX, this.posY, this.size);
    };


}
