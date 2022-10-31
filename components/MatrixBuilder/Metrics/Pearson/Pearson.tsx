/** Creates a 2d utility matrix using pearson correlation */
export const pearson = (matrix: number[][]) => {
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
    let aux = pearsonCorrelation(auxMatrix[0], auxMatrix[j])
    utilityMatrix[j - 1] = aux;
  }
  return utilityMatrix;
}



/** Pearson Correlation */
export const pearsonCorrelation = (x: number[], y: number[]) => {
  const n = x.length;
  const vals = Array.from({ length: n }, (_, i) => [x[i], y[i]]);
  const [sumX, sumY] = vals.reduce(
    ([sumX, sumY], [x, y]) => [sumX + x, sumY + y],
    [0, 0]
  );
  const [sumX2, sumY2] = vals.reduce(
    ([sumX2, sumY2], [x, y]) => [sumX2 + x ** 2, sumY2 + y ** 2],
    [0, 0]
  );
  const pSum = vals.reduce((pSum, [x, y]) => pSum + x * y, 0);
  const num = pSum - (sumX * sumY) / n;
  const den = Math.sqrt((sumX2 - sumX ** 2 / n) * (sumY2 - sumY ** 2 / n));
  console.log('P.NUM ' + num)
  console.log('P.DEN ' + den)
  if (den === 0) return 0;
  return num / den;
};