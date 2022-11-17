var global_time_counter = 0

let bodies = []

let btn_pause
let sldr_speed

class Universe {
  constructor() {
    this.time = 0
    this.tick_speed = 60
    this.is_paused = false
  }

  update() {
    if (!this.is_paused) {
      this.time += this.tick_speed
    }
  }

  toggle_pause() {
    this.is_paused = !this.is_paused
  }
}

class AstroBody {

  constructor(mass = 1, orbital_focus = null, G = 1, debug_color="white") {
    if (!(this instanceof AstroBody)) {
      throw new Error("AstroBody needs to be called with the new keyword");
    }

    this.G = G
    this.mass = mass
    this.orbital_focus = orbital_focus
    this.time_since_periapsis = 0
    this.debug_color = debug_color
  }

  // TODO why wont this work?
  // set orbital_focus(orbital_focus) {
  //   if (orbital_focus !== null && (orbital_focus instanceof AstroBody) === false) {
  //     console.warn("Orbital focus must be an AstroBOdy")
  //     orbital_focus = null
  //   }
  //   this._orbital_focus = orbital_focus
  // }
  // get orbital_focus() {
  //   return this._orbital_focus
  // }

  get gravitational_parameter() {
    return this.G * this.orbital_focus.mass
  }

  get period() {
    return TWO_PI * sqrt( (this.semi_major_axis ** 3) / this.gravitational_parameter)
  }

  // TODO: is this legal ?
  // get eccentric_anomaly() {
  //   return this.eccentric_anomaly()
  // }
  eccentric_anomaly(n=10) {
    let M = this.mean_anomaly
    let E = M
    for ( let k = 0; k < n; k++) {
      E = M + this.eccentricity * sin(E)
    }
    return E
  }
  
  get mean_anomaly() {
    let t = this.time_since_periapsis
    return ((t / this.period) * TWO_PI) % TWO_PI
  }
  
  get true_anomaly() {
    // https://orbital-mechanics.space/time-since-periapsis-and-keplers-equation/elliptical-orbits.html#equation-time-since-periapsis-and-keplers-equation-elliptical-orbits-2
    let E = this.eccentric_anomaly()
    let e = this.eccentricity

    if (E > PI) {
      return TWO_PI - acos((e - cos(E)) / (e * cos(E) - 1))
    } else {
      return acos((e - cos(E)) / (e * cos(E) - 1))
    }
  }

  /**
   * pos - p5 vector
   * 
   * ecc - float, 0 to 1
   * 
   * sma - positive real
   * 
   * ta  - radians
   */
  set_deprecated(pos, ecc, sma, ta) {
    this.semi_major_axis = sma
    this.eccentricity = ecc
    // this.true_anomoly = ta
    this.elliptic_center = pos.sub(createVector(this.eccentricity * this.semi_major_axis, 0))
    this.semi_minor_axis = this.semi_major_axis * sqrt(1-(this.eccentricity ** 2))
  }
  
  get position() {
    if (this.orbital_focus === null) {
      return createVector(0, 0)
    }
    // let r = this.eccentric_anomaly()
    let r = this.true_anomaly
    let x = this.semi_major_axis * cos(r)
    let y = this.semi_minor_axis * sin(r)
    return createVector(this.elliptic_center.x + x, this.elliptic_center.y + y)
  }

  /** 
   * h
   * 
   * e
   * 
   * i
   * 
   * o
   * 
   * w
   * 
   * v
   */
  set_orbital_elements(h, e, i, o, w, v) {
    this.h = h
    this.e = e
    // this.i = i
    // this.o = o
    this.w = w
    this.v = v
  }

  /**
   * r
   * 
   * v
   * 
   * t
   */
  set_state_vector(r, v, t) {
    this.r = r
    this.v = v
    this.time_since_periapsis = t
  }
  

  // misc equations ?
  // https://orbital-mechanics.space/classical-orbital-elements/orbital-elements-and-the-state-vector.html

  // NOTE: "the orbital angular momentum can be replaced by the semi-major axis distance,"


  v2e()
  {
    let mu = this.gravitational_parameter()



    // angular momentum
    let h_vec = r_vec.cross(v_vec)
    let h = h_vec.mag()

    // eccentricity
    let e_vec = v_vec.cross(h_vec).div(mu).sub(r_vec.div(r))
    let e = e_vec.mag()

    // node line
    let K = createVector(0,0) // let K = createVector(0,0, 1)
    let N_vec = K.cross(h_vec);
    let N = N_vec.mag();
    
    // argument of periapsis
    // + TWO_PI if e_Z >= 2pi or not
    let omega = TWO_PI - acos(N_vec.dot(e_vec).div(N * e));

    // true anomoly
    let nu = acos(e_vec.dot(r_vec).div(e * r));

  }

  e2v()
  {
    // transform to perifocal frame
    // let r_w = h ** 2 / mu / (1 + e * cos(nu)) * createVector(cos(nu), sin(nu))
    let r_w = h ** 2 / mu / (1 + e * cos(nu)) * createVector(cos(nu), sin(nu)) // TODO: not ordered for p5 yet
    let v_w = mu / h * np.array((-np.sin(nu), e + np.cos(nu), 0))      
  

    // rotate the perifocal frame
    // R1 = [cos(-omega) -sin(-omega) 0; sin(-omega) cos(-omega) 0; 0 0 1];
    // R2 = [1 0 0; 0 cos(-i) -sin(-i); 0 sin(-i) cos(-i)];
    // R3 = [cos(-Omega) -sin(-Omega) 0; sin(-Omega) cos(-Omega) 0; 0 0 1];
    // r_rot = r_w * R1 * R2 * R3;
    // v_rot = v_w * R1 * R2 * R3;

    
  }

}


/////////////////////////////////////

let universe

function setup() {
  createCanvas(windowWidth, windowHeight);

  universe = new Universe()

  btn_pause = createButton('PAUSE')
  btn_pause.position(0, 0);
  btn_pause.mousePressed(() => {universe.toggle_pause()});

  sldr_speed = createSlider(-50, 50, 20)
  sldr_speed.position(10, 10);
  sldr_speed.style('width', '300px');

  sldr_history = createSlider(0, 0, 0)
  sldr_history.position(10, 30);
  sldr_history.style('width', '300px');

  console.log(sldr_speed)

  let sun = new AstroBody()
  sun.mass = 10

  let bowie = new AstroBody(5)
  bowie.orbital_focus = sun
  bowie.set_deprecated(createVector(0,0), random(0, 0.6), random(width/8, width/3), radians(0))
  
  let rocket_man = new AstroBody()
  rocket_man.orbital_focus = sun
  rocket_man.set_deprecated(createVector(0,0), random(0.5, 0.9), random(width/8, width/3), radians(0))
  
  bodies.push(sun)
  bodies.push(bowie)
  bodies.push(rocket_man)

}

function draw_body_orbit(body) {
  noFill()
  strokeWeight(3)
  stroke("black")
  ellipse(body.elliptic_center.x, body.elliptic_center.y, body.semi_major_axis*2, body.semi_minor_axis*2)
}


function draw_stellar_body() {
  // noStroke()
  // fill("red")
  stroke("black")
  strokeWeight(3)
  fill("white")
  circle(0, 0, 50)
}

function draw_body(body) {
  strokeWeight(3)
  stroke("black")
  fill(body.debug_color)
  circle(body.position.x, body.position.y, 20)
}



function translate_to_orbital_focus(body) {
  if (body.orbital_focus !== null) {
    translate_to_orbital_focus(body.orbital_focus)
    translate(body.orbital_focus.position.x, body.orbital_focus.position.y)
  }
}


function draw() {
  translate(windowWidth/2, windowHeight/2)
  background("white");  
  
  bodies.forEach(body => {
    body.time_since_periapsis = universe.time
  })
  
  bodies.forEach(body => {
    if (body.orbital_focus !== null) {
      
      push()
      translate_to_orbital_focus(body)
      
      // draw_apsis_scribes(body)
      // draw_mean_anomaly_scribes(body)
      // draw_eccentric_anomaly_scribes(body)
      // draw_true_anomaly_scribes(body)
      
      draw_body_orbit(body)
      draw_body(body)
      pop()
    }
  })

  
  bodies.forEach(body => {
    if (body.orbital_focus === null) {
      draw_stellar_body()
    }
  })
  

  
  universe.tick_speed = sldr_speed.value()
  universe.update()
  // global_time_counter = (global_time_counter + 60)
  
}




//////////////////////////////

var LINE_DASH_NONE = [1]
var LINE_DASH_00 = [5, 5]
var LINE_DASH_01 = [10, 10]
var LINE_DASH_02 = [5, 10, 30, 10]

function setLineDash(list) {
  drawingContext.setLineDash(list);
}














//////////////////////////




function draw_apsis_scribes(body) {
  // if (body.orbital_focus !== null) {
  //   translate(body.orbital_focus.position.x, body.orbital_focus.position.y)
  // }
  noFill()
  strokeWeight(1)
  stroke("black")
  setLineDash([20, 20])
  line(
    body.elliptic_center.x - body.semi_major_axis, body.elliptic_center.y,
    body.elliptic_center.x + body.semi_major_axis, body.elliptic_center.y,
    )
  setLineDash(LINE_DASH_NONE)
}

function draw_true_anomaly_scribes(body) {
  noFill()
  strokeWeight(2)
  stroke("blue")

  push()
  setLineDash(LINE_DASH_00)
  line(
    body.orbital_focus.position.x, body.orbital_focus.position.y,
    body.position.x, body.position.y
    )
  setLineDash(LINE_DASH_NONE)

  arc(0, 0, 50, 50, 0, body.true_anomaly); // TODO: hmmm
  pop()
  // noStroke()
  // fill(color('hsba(160, 100%, 50%, 0.5)'))
  // text('true anomaly (v)', 96, 32)
  // text('v = ' + body.true_anomaly, 32, 64)

}

function draw_mean_anomaly_scribes(body) {

  noFill()
  strokeWeight(2)
  stroke("orange")
  
  setLineDash(LINE_DASH_02)
  circle(body.elliptic_center.x, body.elliptic_center.y, body.semi_major_axis*2)
  setLineDash(LINE_DASH_NONE)

  setLineDash(LINE_DASH_00)  
  push()
  translate(body.elliptic_center.x, body.elliptic_center.y)
  rotate(body.mean_anomaly)
  line( 0, 0, body.semi_major_axis, 0 )
  strokeWeight(10)
  point(body.semi_major_axis, 0)
  pop()
  setLineDash(LINE_DASH_NONE)
  
  // strokeWeight(2)
  arc(body.elliptic_center.x, body.elliptic_center.y, 50, 50, 0, body.mean_anomaly); // TODO: hmmm
}

function draw_eccentric_anomaly_scribes(body) {
  noFill()
  strokeWeight(2)
  stroke("green")
  
  
  setLineDash(LINE_DASH_00)
  push()
  translate(body.elliptic_center.x, body.elliptic_center.y)
  rotate(body.eccentric_anomaly())
  line( 0, 0, body.semi_major_axis, 0 )

  strokeWeight(10)
  point(body.semi_major_axis, 0)
  pop()

  setLineDash(LINE_DASH_NONE)

  arc(body.elliptic_center.x, body.elliptic_center.y, 100, 100, 0, body.eccentric_anomaly()); // TODO: hmmm

  // noStroke()
  // fill("orange")
  // text('eccentric anomaly (E)', body.elliptic_center.x+64, body.elliptic_center.y+40)
}