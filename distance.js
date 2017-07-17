// Compute the edit distance between the two given strings or array
function getLevenshtein(a, b, featureSchema) {
  let insertionCost = 10;
  let deletionCost = 10;

  if (a.length === 0) return b.length * insertionCost; 
  if (b.length === 0) return a.length * insertionCost; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i*insertionCost];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j*insertionCost;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      let phonoVectorA = a[j-1];
      let phonoVectorB = b[i-1];

      let substitution = matrix[i-1][j-1] + phonoVectorDistance(phonoVectorA,phonoVectorB,featureSchema);
      let insertion = matrix[i][j-1] + insertionCost;
      let deletion =  matrix[i-1][j] + deletionCost;
      matrix[i][j] = Math.min(substitution, Math.min(insertion,deletion));
    }
  }

  return matrix[b.length][a.length];
};

function phonoVectorDistance(a,b,featureSchema){
    let scoreSum = 0;
    let weightSum = 0;

    featureSchema.features.forEach(feature=>{
        scoreSum+=score(a,b,feature)*feature.weight;
        weightSum+=feature.weight;
    });

    return scoreSum/weightSum;
}

function score(a,b,feature){
  switch(feature.type){
    case "number" : return numberScore(a,b,feature);
    default : return 0;
  }
}

function numberScore(a,b,feature){
  return (Math.abs(a[feature.name] - b[feature.name]))/(feature.max-feature.min);
}