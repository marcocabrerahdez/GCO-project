/** Creates a 2d utility matrix using euclidean distance */
export const euclidean = (matrix: number[][]) => {
  let auxMatrix = matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === -1) {
        for (let k = 0; k < auxMatrix.length; k++) {
          auxMatrix[k].splice(j, 1)
        }
        j--;
      }
    }
  }
  const utilityMatrix = new Array(auxMatrix.length-1);
  for (let j = 1; j < auxMatrix.length; j++) {
    let aux = euclideanDistance(auxMatrix[0], auxMatrix[j])
    utilityMatrix[j - 1] = aux;
  }
  return utilityMatrix;
}



/** Euclidean distance */
export const euclideanDistance = (a: number[], b: number[]) => {
  const sum = a.reduce((acc, val, i) => acc + (val - b[i]) ** 2, 0);
  return Math.sqrt(sum);
};
