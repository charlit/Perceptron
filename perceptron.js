function Perceptron(threshold, outputCount) {
    function isActive(input) {
        return input >= threshold;
    }

    function processOutput(input, weight) {
        return isActive(input) ? input * weight : 0;
    }

    // On initialise les sorties à 0
    function initOutputs() {
        var result = [];
        for (var i = 0; i < outputCount; i++) result[i] = 0;
        return result;
    }

    function process(inputs, weights) {
        //On initialise
        var result = initOutputs();

        //On calcule les sorties
        for (var i = 0; i < inputs.length; i++) {
            for (var j = 0; j < outputCount; j++) {
                var input = inputs[i];
                var weight = weights[i][j];
                result[j] += processOutput(input, weight);
            }
        }
        return result;
    }

    function learn(entrees, poids, nombreRecherche, vitesseApprentissage)
    {
      var results = process(entrees,poids);
      for(var i=0;i<entrees.length;i++) { //i = entrée
          for (var j = 0; j < outputCount; j++) { //j = sortie
              var active = isActive(results[j]);
              poids[i][j] = poids[i][j] + (nombreRecherche[j] - active)  * entrees[i] * vitesseApprentissage;
          }
      }
    }

    return {
      learn: learn,
        isActive: isActive,
        process: process
    };
}
