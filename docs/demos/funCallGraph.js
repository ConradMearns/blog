const f_n = 5;
const f_r = 3;

var queue = [];
var graph = {};

const WIDTH = 600;
const HEIGHT = 600;

var bg = (255, 255, 255);

const systemMinimumCooldown = 300;
var cooldown = 0;


function node(){
    this.n = 0
    this.r = 0

    this.connections = []
    
    this.cooldown = systemMinimumCooldown;

    this.getPos = function (i) {
        let v = createVector(0, -200)
        v.rotate( ( 2 * PI / boids.length ) * i )
        v.add(300, 300)
        return v
    }

    this.show = function(i){
        let v = this.getPos(i)

        stroke(20, 200, 200, 150);
        strokeWeight(40)
        point(v.x, v.y)
        
        stroke(100)
        strokeWeight(0)
        textAlign(CENTER)
        text("("+this.n+", "+this.r+")", v.x, v.y)
    }
}

function addBoid(n, r) {
    var newBoid = new node();
    newBoid.n = n
    newBoid.r = r
    queue.push(newBoid);
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    addBoid(f_n, f_r)
    cooldown = systemMinimumCooldown
}

function draw() {
    background(bg);

    // Draw process queue
    let qxs = 20
    let qys = 20
    let qyd = 35
    for(var i = 0; i < queue.length; i++) {
        stroke(20, 200, 200, 150);
        strokeWeight(30)
        point(qxs, qys + i * qyd)
        
        stroke(100)
        strokeWeight(0)
        textAlign(CENTER)
        fill(0)
        text("("+queue[i].n+", "+queue[i].r+")", qxs, qys + i * qyd)
    }

    fill(0, 200, 0)
    let o = 20
    rect(0, HEIGHT-o, map(cooldown, 0, systemMinimumCooldown, 0, WIDTH), o);
    
    if (cooldown < 0) {
        cooldown = systemMinimumCooldown
        let b = queue.pop()
    } else {
        cooldown--
    }

}

function mouseClicked() {
    addBoid()
}
