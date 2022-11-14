var G = 1
var orbit
var global_time_counter = 0
var anomaly_mass_slider

function setup() {
  // createCanvas(500, 500, WEBGL);
  createCanvas(windowWidth, windowHeight);

  orbit = new Orbit(createVector(0,0), random(0, 1), random(width/8, width/3), radians(0))
  // anomaly_mass_slider = createSlider(0.01, 10, 1, 0.1);
  // anomaly_mass_slider.position(10, 10);
  // anomaly_mass_slider.style('width', '200px');
}

// function draw_ellipse(position, a, b) {
//   push()
//   translate(position)
//   beginShape()
//   for (var t = 0; t<TWO_PI; t += 0.1) {
//     var x = a * cos(t)
//     var y = b * sin(t)
//     vertex(x, y)
//   }
//   endShape(CLOSE)
//   pop()
// }



function draw() {
  translate(windowWidth/2, windowHeight/2)
  background("white");

  stroke("black")
  noFill()
  orbit.draw()

  global_time_counter = (global_time_counter + 40) % orbit.period

  
  orbit.true_anomaly = orbit.E(global_time_counter)
  
  // let val = anomaly_mass_slider.value();
  // orbit.anomoly_mass = val
  // orbit.gp_u = G * orbit.main_mass * orbit.anomoly_mass
  // orbit.period = TWO_PI * sqrt ( (orbit.a^3) / orbit.gp_u )
  
}


function Orbit(_position, _eccentricity, _semi_major_axis, _true_anomaly) {
  this.a = _semi_major_axis // semi major axis
  this.e = _eccentricity
  this.true_anomaly = _true_anomaly
  // this.Ra = this.a * (1 + this.e) // aphelion
  // this.Rp = this.a * (1 - this.e)  // perihelion
  this.center_pos = _position.sub(createVector(_eccentricity * this.a, 0))
  this.semi_major_axis = this.a // (this.Rp + this.Ra) / 2
  this.semi_minor_axis = this.a * sqrt(1-(this.e*this.e))
  
  this.main_mass = 2
  this.anomaly_mass = 0.1

  this.gp_u = G * this.main_mass
  this.period = TWO_PI * sqrt ( (this.a**3) / this.gp_u )
  // this.n = TWO_PI / this.period

  this.E = function(t, n=10) {
    let calcM = this.M(t)
    let calcE = this.M(t)
    for (let k = 0; k < n; k++) {
      calcE = calcM + this.e * sin(calcE)
    }
    return calcE
  }

  this.M = function(t) {
    return (t / this.period) * TWO_PI
  }

  this.anomaly_position = function() {
    let r = this.true_anomaly
    var x = this.semi_major_axis * cos(r)
    var y = this.semi_minor_axis * sin(r)
    // return createVector(this.center_pos.x, this.center_pos.y)
    return createVector(this.center_pos.x + x, this.center_pos.y + y)
  }


  this.anomaly_velocity_scalar = function() {
    // VIS VIVA
    let a = this.semi_major_axis
    let r = this.radial_dist()

    return sqrt(G * this.main_mass * (2/r - 1/a))

  }

  this.anomaly_velocity_vector = function() {
     
    let v = this.anomaly_velocity_scalar()
    let th = this.true_anomaly
    let e = this.e
    let den = sqrt( 1 + e**2 + 2*e*cos(th) )
    return createVector(
      (-1 * sin(th)) / den,
      ( e + cos(th)) / den
    ).mult(v)
  }

  this.radial_dist = function() {
    return this.anomaly_position().dist(createVector(0,0))
  }

  this.draw = function() {

    // draw orbit
    noFill()
    strokeWeight(3)
    stroke("black")
    // draw_ellipse(this.center_pos, this.semi_major_axis, this.semi_minor_axis)
    ellipse(this.center_pos.x, this.center_pos.y, this.semi_major_axis*2, this.semi_minor_axis*2)
    
    // draw anomaly velocity data
    let apos = this.anomaly_position()

    strokeWeight(3)
    stroke("green")
    

    strokeWeight(3)
    stroke("green")

    let vv = this.anomaly_velocity_vector().mult(1000)
    push()
    translate(apos.x, apos.y)
    line(0,0 , vv.x, vv.y)
    pop()


    // draw center mass
    noStroke()
    fill("red")
    circle(0,0, 50)
    
    
    // draw true anomaly
    strokeWeight(3)
    stroke("black")
    fill("white")
    circle(apos.x, apos.y, 20)

  }
}
