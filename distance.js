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
    matrix[i] = [i * insertionCost];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j * insertionCost;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      let featuresA = a[j - 1];
      let featuresB = b[i - 1];

      let substitution = matrix[i - 1][j - 1] + featuresDistance(featuresA, featuresB, featureSchema);
      let insertion = matrix[i][j - 1] + insertionCost;
      let deletion = matrix[i - 1][j] + deletionCost;
      matrix[i][j] = Math.min(substitution, Math.min(insertion, deletion));
    }
  }

  return matrix[b.length][a.length];
};

function featuresDistance(a, b, featureSchema) {
  let scoreSum = 0;
  let weightSum = 0;

  featureSchema.features.forEach(featureDesc => {
    let featureA = a[featureDesc.name];
    let featureB = b[featureDesc.name];
    scoreSum += oneFeatureDistance(featureA, featureB, featureDesc) * featureDesc.weight;
    weightSum += featureDesc.weight;
  });

  return scoreSum / weightSum;
}

function oneFeatureDistance(featureA, featureB, featureDesc) {
  switch (featureDesc.type) {
    case "number": return numberDistance(featureA, featureB, featureDesc);
    case "value": return valueDistance(featureA, featureB, featureDesc);
    default: return 0;
  }
}

function numberDistance(a, b, featureDesc) {
  return Math.abs(a - b) / (featureDesc.max - featureDesc.min);
}

function valueDistance(a, b, featureDesc) {
  return (a === b ? 0 : 1);
}