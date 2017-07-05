// Compute the edit distance between the two given strings or array
function getLevenshtein(a, b) {
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

      let substitution = matrix[i-1][j-1] + phonoVectorDistance(phonoVectorA,phonoVectorB);
      let insertion = matrix[i][j-1] + insertionCost;
      let deletion =  matrix[i-1][j] + deletionCost;
      matrix[i][j] = Math.min(substitution, Math.min(insertion,deletion));
    }
  }

  return matrix[b.length][a.length];
};

function phonoVectorDistance(a,b){
    let height = Math.abs(a.height - b.height)/7;
    let backness = Math.abs(a.backness - b.backness)/3;
    let roundedness =  Math.abs(a.roundedness - b.roundedness)/3;
    let nasal =  Math.abs(a.nasal - b.nasal)/3;
    return height + backness*0.5 + roundedness + nasal*0.5;
}