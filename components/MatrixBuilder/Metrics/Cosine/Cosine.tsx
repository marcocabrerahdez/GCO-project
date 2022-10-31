/** Creates a 2d utility matrix using cosine similarity */
export const cosine = (matrix: number[][]) => {
  let auxMatrix = matrix
  for (let i = 0; i < auxMatrix.length; i++) {
    for (let j = 0; j < auxMatrix[i].length; j++) {
      if (auxMatrix[i][j] === -1) {
        for (let k = 0; k < auxMatrix.length; k++) {
          auxMatrix[k].splice(j, 1)
        }
        j--;
      }
    }
  }
  const utilityMatrix = new Array(auxMatrix.length-1);
  for (let j = 1; j < auxMatrix.length; j++) {
    let aux = cosineSimilarity(auxMatrix[0], auxMatrix[j])
    utilityMatrix[j - 1] = aux;
  }
  return utilityMatrix;
}



/** Cosine similarity */
export const cosineSimilarity = (a: number[], b: number[]) => {
  const dotProduct = a.reduce((acc, val, i) => acc + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};