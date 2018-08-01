// Creating walkers global variables
var walker_1;
var walker_2;

// Creating three step values for Perlin noise calculation
var stepR = 0;
var stepG = 100;
var stepB = 200;

// Canvas Setup
function setup() {
  // Setting background color and canvas size
  background(51);
  createCanvas(640, 480);

  // Creating two walkers
  walker_1 = new Walker();
  walker_2 = new Walker();
}

// Canvas Update
function draw() {
  // Updating and displaying the first walker
  walker_1.update();
  walker_1.display();

  // Updating and displaying the second walker
  walker_2.update();
  walker_2.display();
}

// Walker Class Definition
function Walker() {
  // Walker local variables
  this.pos = createVector(random(width), random(height));
  this.prevPos = this.pos.copy(); // Position in the last frame
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.update = function() {
    // Setting the new position and the previous position
    this.prevPos.set(this.pos);
    this.vel = p5.Vector.random2D();

    // Setting the magnitude in a "Levy Flight" fashion
    var randomChance = random(100);
    if (randomChance < 1) {
      this.vel.setMag(100);
    } else {
      this.vel.setMag(random(5, 25));
    }

    // Updating physics variables
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // Updating Perlin Steps
    stepR += 0.01;
    stepG += 0.01;
    stepB += 0.01;
  };

  this.display = function() {
    // Setting a perlin random color each draw call
    stroke(noise(stepR)*255, noise(stepG)*255, noise(stepB)*255);

    // Setting the thickness of the line about to draw
    strokeWeight(2);

    // Drawing a line petween the current calculated position and the position calculated last draw call
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  };
}