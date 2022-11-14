let G = 5
let destable = 0.5

let sun
let p1

function setup() {
  createCanvas(windowWidth, windowHeight);

  sun = new Body(100, createVector(0,0), createVector(0,0), "#ffffff")

  // initial planet position
  let r = random(sun.radius, min(width/2, height/2))
  let theta = random(TWO_PI)
  let planetPos = createVector(r*cos(theta), r*sin(theta))


  // initial velocity for stable orbit
  let pvel = planetPos.copy()
  pvel.rotate(HALF_PI)
  pvel.setMag(sqrt(G * sun.mass / planetPos.mag()))
  pvel.mult(random(1-destable, 1+destable))


  p1 = new Body(25, planetPos, pvel, "#ff0000")
  
}

function draw() {
  translate(windowWidth/2, windowHeight/2)
  background(180);
  
  sun.show()
  p1.show()

  sun.attract(p1)
  // sun.update()
  p1.update()
  

}

function Body(_mass, _pos, _vel, _color) {
  this.mass = _mass
  this.position = _pos
  this.velocity = _vel
  this.radius = this.mass
  this.color = _color

  this.path_counter = 0
  this.path = []

  this.show = function() {
    noStroke();
    fill(this.color);
    
    stroke(30)
    for (let i = 0; i < this.path.length-1; i++) {
      line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y)
    }
    if (this.path.length > 0) {
      line(this.path[this.path.length-1].x, this.path[this.path.length-1].y, this.position.x, this.position.y)
    }

    
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius, this.radius)
  }

  this.update = function () {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    
    if (this.path_counter == 0) {
      this.path.push(this.position.copy())
    }
    if (this.path.length > 100) {
      this.path.splice(0,1)
    }
    this.path_counter = (this.path_counter + 1) % 10
  }

  this.applyForce = function(f) {
    this.velocity.x += f.x / this.mass
    this.velocity.y += f.y / this.mass
  }

  this.attract = function(child) {
    let r = dist(this.position.x, this.position.y, child.position.x, child.position.y)
    let f = this.position.copy().sub(child.position)

    // drawArrow(child.position, f, 'blue')
    
    f.setMag( (G * this.mass * child.mass) / (r * r) )
    
    child.applyForce(f)
  }
}



function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(2);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 3;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}