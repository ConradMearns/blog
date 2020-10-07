const startingBoids = 2;
const requiredServices = 1;

var boids = [];
var msgs = [];

const WIDTH = 600;
const HEIGHT = 600;

var bg = (255, 255, 255);

const systemMinimumCooldown = 30;


function msg(x, y, symbol, from, to){
    this.keep = true;

    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);

    this.update = function(){
        var goal = boids[to].pos.copy()
        var diff = goal.sub(this.pos)
        
        if (boids[to].pos.dist(this.pos) < 24){
            this.keep = false;
            boids[to].recieveMessage(symbol, from)
            symbol = "";
        } else {
            this.vel = diff.normalize().setMag(4);
            this.pos.add(this.vel);    
        }
    }
  
    this.show = function(){
        textAlign(CENTER, CENTER);
        stroke(0);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }
}

function newMsg(symbol, from, to) {
    var m = new msg(boids[from].pos.x, boids[from].pos.y, symbol, from, to)
    msgs.push(m)
}

function node(x, y, id){
    this.pos = createVector(x, y);

    this.cooldown = systemMinimumCooldown;
    this.services = []

    this.totalServices = 0

    this.show = function(){
        let coolRatio = this.cooldown/systemMinimumCooldown

        if (this.services[id]) {
            stroke(20, 200, 20, lerp(150, 255, coolRatio));
        } else {
            stroke(200, 20, 20, lerp(150, 255, coolRatio));
        }
        strokeWeight(24);
        point(this.pos.x, this.pos.y);
        
        stroke(100)
        strokeWeight(0)
        textAlign(CENTER)
        text(this.totalServices, x, y)
    }

    this.updateState = function () {
        this.services[id] = !this.services[id];
        for(var i = 0; i < boids.length; i++){
            if ( i != id) {
                newMsg(".", id, i)
            }
        }
    }

    this.updateService = function() {

        this.totalServices = 0
        for(var i = 0; i < this.services.length; i++){
            if (this.services[i] == true) this.totalServices++
        }

        let runningRatio = 0
        if (this.totalServices < requiredServices) {
            runningRatio = (requiredServices - this.totalServices)/(boids.length-this.totalServices)
        } else if (this.totalServices > requiredServices) {
            runningRatio = (this.totalServices - requiredServices)/(boids.length)
        }

        // the target is met - current/goal = 1 - do nothing
        // the target is overshot - current/goal > 1 - am i causing it to overshoot? if so, maybe switch
        // the target is undershot - current/goal < 1 - am i causing it to undershoot? if so, maybe switch

        if (this.cooldown < 0){
            if ( this.totalServices > requiredServices && this.services[id]==true ) {
                if ( Math.random() >=  runningRatio ) this.updateState()
            } else if ( this.totalServices < requiredServices && this.services[id]==false ) {
                if ( Math.random() >= (1 - runningRatio) ) this.updateState()
            }
            this.cooldown = systemMinimumCooldown
        } else {
            this.cooldown--;
        }
    }

    this.recieveMessage = function(symbol, from){
        this.cooldown = systemMinimumCooldown

        for(var i = 0; i < this.services.length; i++){
            this.services[i] = boids[i].services[i]
        }
    }
}

function createBoids () {
    for(var i = 0; i < startingBoids; i++){

        let v = createVector(0, -200)
        v.rotate( ( 2*PI / startingBoids ) * i )
        v.add(300, 300)

        var newBoid = new node(v.x, v.y, i);
        for(var j = 0; j < startingBoids; j++){
            newBoid.services[j] = false;
        }
        boids.push(newBoid);
    }
}

function refreshBoids() {
    boids = []
    msgs = []
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    createBoids()
    resetCooldown = systemMinimumCooldown
}

function draw() {
    background(bg);

    for(var i = boids.length-1; i >= 0; i--) {
        boids[i].updateService()
        boids[i].show()
    }

    for(var i = msgs.length-1; i >= 0; i--){
        msgs[i].update();
        msgs[i].show();
    }

    msgs = msgs.filter(function(m){ return m.keep });

}
