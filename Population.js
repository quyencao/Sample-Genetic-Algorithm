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

    if(this.maxFitness == 1) {
      this.finish = true;
    }
  }

  this.caculateFitness();

  this.naturalSelection = function() {
    this.matingPool = [];

    for(var i = 0; i < this.population.length; i++) {
      var numE = floor(this.population[i].fitness * 100 / this.maxFitness);

      for(var j = 0; j < numE; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  this.generate = function() {
    for(var i = 0; i < this.maxE; i++) {
      var parent1 = this.matingPool[floor(random(this.matingPool.length))];
      var parent2 = this.matingPool[floor(random(this.matingPool.length))];

      var child = parent1.crossOver(parent2);
      child.mutate(this.mutateRate);

      child.getPhase();

      this.population[i] = child;
    }
    this.generation++;
  }

  this.evaluate = function() {
    document.querySelector('#maxFitness').textContent = this.maxFitness;
    document.querySelector('#avgFitness').textContent = this.avgFitness;
    document.querySelector('#bestPhase').textContent = this.bestPhase;
    document.querySelector('#numGeneration').textContent = this.generation;
    document.querySelector('#numPopulation').textContent = this.maxE;
    document.querySelector('#mutateRate').textContent = this.mutateRate;
    var listPhase = document.querySelector('#listPhase');
    var html = '';
    for(var i = 0; i < this.maxE; i++) {
      var dna = this.population[i];
      html += "<p>" + dna.phase + "   -   <span>" + dna.fitness + "</span></p>";
    }
    listPhase.innerHTML = html;
  }
}
