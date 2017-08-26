function DNA(target) {
  this.target = target;
  this.targetLength = target.length;
  this.genes = [];
  this.phase = '';
  this.fitness = 0;

  this.evaluateFitness = function() {
    var score = 0;
    for(var i = 0; i < this.targetLength; i++) {
      if(this.genes[i] == this.target.charAt(i)) {
        score++;
      }
    }

    this.fitness = score / this.target.length;

    return this.fitness;
  }

  this.crossOver = function(other) {
    var child = new DNA(this.target);
    var index = floor(random(this.targetLength));

    for(var i = 0; i < this.targetLength; i++) {
      if(i >= index) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = other.genes[i];
      }
    }

    return child;
  }

  this.mutate = function(rate) {
    for(var i = 0; i < this.genes.length; i++) {
      if(random(1) < rate) {
        var index = floor(random(this.genes.length));
        this.genes[index] = this.randomChar();
      }
    }
  }

  this.getPhase = function() {
    this.phase = this.genes.join("");

    return this.phase;
  }

  this.randomChar = function() {
    DNA.prototype.allChars = _.shuffle(DNA.prototype.allChars);
    var randomIndex = floor(random(DNA.prototype.allChars.length));

    return String.fromCharCode(DNA.prototype.allChars[randomIndex]);
  }

  for(var i = 0; i < this.targetLength; i++) {
    this.genes.push(this.randomChar());
  }
}

DNA.prototype.allChars = (function() {
  var allChars = [];
  allChars.push(32);
  allChars.push(46);
  for(var i = 65; i <= 122; i++) {
    allChars.push(i);
  }
  return allChars;
})();
