let G = 1

let test_orbit0
let test_orbit1
let test_orbit2
let test_orbit3
let test_orbit4

let test_orbit10

let test_orbit100

let time_counter = 0

function setup() {
  createCanvas(windowWidth, windowHeight);

  test_orbit0 = new Orbit(createVector(0,0), 0.7, 100, radians(0))
  test_orbit1 = new Orbit(createVector(0,0), 0.7, 100, radians(0))
  test_orbit2 = new Orbit(createVector(0,0), 0.7, 100, radians(0))
  test_orbit3 = new Orbit(createVector(0,0), 0.7, 100, radians(0))
  test_orbit4 = new Orbit(createVector(0,0), 0.7, 100, radians(0))

  test_orbit10 = new Orbit(createVector(0,0), 0.7, 100, radians(0))

  test_orbit100 = new Orbit(createVector(0,0), 0.7, 100, radians(0))
}



function draw_ellipse(position, a, b) {
  push()
  translate(position)
  beginShape()
  for (var t = 0; t<TWO_PI; t += 0.1) {
    var x = a * cos(t)
    var y = b * sin(t)
    vertex(x, y)
  }
  endShape(CLOSE)
  pop()
}

function draw_on_ellipse(position, a, b, r) {
  push()
  translate(position)
  var x = a * cos(r)
  var y = b * sin(r)
  circle(x, y, 10)
  pop()
}



function draw() {
  translate(windowWidth/2, windowHeight/2)
  background(180);
  
  // stroke("red")
  // strokeWeight(10)
  // draw_super_ellipse()
  
  let seperation = 20

  stroke("black")
  noFill()
  test_orbit0.draw()
  translate(0, seperation)
  test_orbit1.draw()
  translate(0, seperation)
  test_orbit2.draw()
  translate(0, seperation)
  test_orbit3.draw()
  translate(0, seperation)
  test_orbit4.draw()
  

  translate(0, seperation)
  test_orbit10.draw()

  translate(0, seperation)
  test_orbit100.draw()



  time_counter = (time_counter + 0.2) % test_orbit0.period


  test_orbit0.true_anamoly = test_orbit0.E(time_counter, 1)
  test_orbit1.true_anamoly = test_orbit1.E(time_counter, 2)
  test_orbit2.true_anamoly = test_orbit2.E(time_counter, 3)
  test_orbit3.true_anamoly = test_orbit3.E(time_counter, 4)
  test_orbit4.true_anamoly = test_orbit4.E(time_counter, 5)
  
  test_orbit10.true_anamoly = test_orbit10.E(time_counter, 10)

  test_orbit100.true_anamoly = test_orbit100.E(time_counter, 100)

}


function Orbit(_position, _eccentricity, _semi_major_axis, _true_anamoly, _enable_draw_anamoly=true) {
  this.a = _semi_major_axis // semi major axis
  this.e = _eccentricity
  this.true_anamoly = _true_anamoly
  // this.Ra = this.a * (1 + this.e) // aphelion
  // this.Rp = this.a * (1 - this.e)  // perihelion
  this.center_pos = _position.sub(createVector(_eccentricity * this.a, 0))

  this.semi_major_axis = this.a // (this.Rp + this.Ra) / 2
  this.semi_minor_axis = this.a * sqrt(1-(this.e*this.e))

  this.total_mass = 1

  this.gp_u = G * this.total_mass

  this.period = TWO_PI * sqrt ( (this.a^3) / this.gp_u )
  // console.log(this.period)

  this.n = TWO_PI / this.period

  this.E = function(t, n) {
    let calcM = this.M(t)
    let calcE = this.M(t)
    for (let k = 0; k < n; k++) {
      calcE = calcM + this.e * sin(calcE)
    }
    return calcE
  }

  this.M = function(t) {
    // return this.E(theta) - this.e*sin(this.E(theta))
    return (t / this.period) * TWO_PI
  }


  this.draw = function() {
    
    fill("red")
    circle(0,0, 10)

    noFill()
    draw_ellipse(this.center_pos, this.semi_major_axis, this.semi_minor_axis)
    // ellipse(this.epos.x, this.epos.y, this.semi_major_axis*2, this.semi_minor_axis*2)

    if (_enable_draw_anamoly) {
      fill("white")
      draw_on_ellipse(this.center_pos, this.semi_major_axis, this.semi_minor_axis, this.true_anamoly)
    }
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