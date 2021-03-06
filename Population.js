function Population(target, mutateRate, maxE) {
  this.target = target;
  this.mutateRate = mutateRate;
  this.maxE = maxE;
  this.population = [];
  this.matingPool = [];
  this.maxFitness = 0;
  this.bestPhase = '';
  this.generation = 0;
  this.finish = false;
  this.avgFitness = 0;

  for(var i = 0; i < this.maxE; i++) {
    this.population.push(new DNA(target));
  }

  this.caculateFitness = function() {
    var total = 0;
    var maxIndex = 0;
    for(var i = 0; i < this.population.length; i++) {
      var fitness = this.population[i].evaluateFitness();
      if(fitness > this.population[maxIndex].fitness) {
        maxIndex = i;
      }
      total += fitness;
    }
    this.avgFitness = total / this.maxE;
    this.bestPhase = this.population[maxIndex].getPhase();
    this.maxFitness = this.population[maxIndex].fitness;

    if(this.maxFitness >= (1 +  this.target.length * pow(this.target.length, 4))) {
      this.finish = true;
    }
  }

  this.caculateFitness();

  // this.naturalSelection = function() {
  //   this.matingPool = [];
  //
  //   for(var i = 0; i < this.population.length; i++) {
  //     var numE = floor(this.population[i].fitness * 100 / this.maxFitness);
  //
  //     for(var j = 0; j < numE; j++) {
  //       this.matingPool.push(this.population[i]);
  //     }
  //   }
  // }

  this.generate = function() {
    var newPopulation = [];
    for(var i = 0; i < this.maxE; i++) {
      var parent1 = this.acceptReject();
      var parent2 = this.acceptReject();

      var child = parent1.crossOver(parent2);
      child.mutate(this.mutateRate);

      child.getPhase();

      newPopulation[i] = child;
    }
    this.population = newPopulation;
    this.generation++;
  }

  this.acceptReject = function() {
    var beSafe = 0;
    while (true){
        var index = floor(random(this.population.length));
        var parent = this.population[index];
        var r = random(this.maxFitness);

        if(r < parent.fitness) {
            return parent;
        }
        beSafe++;
        if(beSafe > 10000) {
          return null;
        }
    }
  }

  this.evaluate = function() {
    document.querySelector('#maxFitness').textContent = this.maxFitness / (1 + this.target.length * pow(this.target.length, 4));
    document.querySelector('#avgFitness').textContent = this.avgFitness / (1 + this.target.length * pow(this.target.length, 4));
    document.querySelector('#bestPhase').textContent = this.bestPhase;
    document.querySelector('#numGeneration').textContent = this.generation;
    document.querySelector('#numPopulation').textContent = this.maxE;
    document.querySelector('#mutateRate').textContent = this.mutateRate;
    var listPhase = document.querySelector('#listPhase');
    var html = '';
    for(var i = 0; i < this.maxE; i++) {
      var dna = this.population[i];
      html += "<p>" + dna.phase + "   -   <span>" + (dna.fitness /  (1 + this.target.length * pow(this.target.length, 4))) + "</span></p>";
    }
    listPhase.innerHTML = html;
  }
}
