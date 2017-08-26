var population;
var allChars;

function setup() {
    var target = "To be or not to be.";
    var mRate = 0.01;
    var maxE = 200;

    population = new Population(target, mRate, maxE);
}

function draw() {
  // Caculate fitness
  population.caculateFitness();

  // population.naturalSelection();

  population.evaluate();

  population.generate();

  if(population.finish) {
    noLoop();
  }
}
