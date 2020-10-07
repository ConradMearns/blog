const startingBoids = 5;

const requiredServices = 4;
var totalServices = 0;

var boids = [];

const WIDTH = 600;
const HEIGHT = 600;

const MAXCOOLDOWN = 20;

var cooldown = MAXCOOLDOWN;

var bg = (255, 255, 255);



function node(x, y, id){

    this.serviceStatus = false;

    this.pos = createVector(x, y);

    this.show = function(){
        if (this.serviceStatus) {
            stroke(0, 200, 0, 255);
        } else {
            stroke(200, 0, 0, 255);
        }
        strokeWeight(24);
        point(this.pos.x, this.pos.y);
    }
  
    this.toggleState = function () {
        this.serviceStatus = !this.serviceStatus;
    }

    this.updateService = function() {

        let runningRatio = requiredServices/startingBoids
        if (totalServices < requiredServices) {
            runningRatio = (requiredServices - totalServices)/(boids.length - totalServices)
        } else if (totalServices > requiredServices) {
            runningRatio = (totalServices - requiredServices)/(boids.length)
        }

        // the target is met - current/goal = 1 - do nothing
        // the target is overshot - current/goal > 1 - am i causing it to overshoot? if so, maybe switch
        // the target is undershot - current/goal < 1 - am i causing it to undershoot? if so, maybe switch
        if ( totalServices > requiredServices && this.serviceStatus ) {
            if ( Math.random() >=  runningRatio ) this.toggleState()
        } else if ( totalServices < requiredServices && !this.serviceStatus ) {
            if ( Math.random() >= (1 - runningRatio) ) this.toggleState()
        }
    }
}

function setup() {
    createCanvas(WIDTH, HEIGHT);

    for(var i = 0; i < startingBoids; i++){
        let v = createVector(0, -200)
        v.rotate( ( 2 * PI / startingBoids ) * i )
        v.add(300, 300)

        var newBoid = new node(v.x, v.y, i);
        boids.push(newBoid);
    }
}

function draw() {
    background(bg);

    let countedServices = 0
    for(var i = boids.length-1; i >= 0; i--) {
        boids[i].show();
        if(boids[i].serviceStatus) countedServices++;
    }

    if (countedServices != totalServices) {
        totalServices = countedServices;
        cooldown = MAXCOOLDOWN;
    } 
    
    if(cooldown <= 0) {
        for(var i = boids.length-1; i >= 0; i--) {
            boids[i].updateService()
        }
    } else {
        cooldown -= 1;
    }

}
