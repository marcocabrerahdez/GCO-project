import React from "react";

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
  if (den === 0) return 0;
  return num / den;
};

/** Cosine similarity */
export const cosineSimilarity = (a: number[], b: number[]) => {
  const dotProduct = a.reduce((acc, val, i) => acc + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

/** Euclidean distance */
export const euclideanDistance = (a: number[], b: number[]) => {
  const sum = a.reduce((acc, val, i) => acc + (val - b[i]) ** 2, 0);
  return Math.sqrt(sum);
};


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

export const SimplePrediction = (matrixFull: number[][], utilitymatrix: number[], user: number, neighbours: number[]) => {
  let item : number = 0;
  for (let i = 0; i < matrixFull[user].length; i++) {
    if(matrixFull[user][i] == -1) {
      item = i;
      break;
    }
  }
  let numerator: number = 0;
  let denominator: number = 0;
  for (let i = 0; i < neighbours.length; i++) {
    console.log(utilitymatrix[i] + ' * ' + matrixFull[neighbours[i]][item])
    numerator += matrixFull[neighbours[i]][item] * utilitymatrix[i];
    denominator += Math.abs(utilitymatrix[i]);
    console.log(denominator +' denominator')
  }
  matrixFull[user][item] = Number((numerator/denominator).toFixed(2))
  return matrixFull
}

export const AverageDeviation = (matrix: number[][], utilitymatrix: number[], user: number, neighbours: number[]) => {
  let item : number = 0;
  let numerator: number = 0;
  let denominator: number = 0;
  console.log(matrix)
  for (let i = 0; i < matrix[user].length; i++) {
    if(matrix[user][i] == -1) {
      item = i;
      break;
    }
  }

  let user_average: number = 0;
  let user_average_index : number = 0
  matrix[user].forEach((value, index) => {
    if(value !== -1) {
      user_average += value;
      user_average_index++
    } 
  })

  user_average = user_average / user_average_index;
  console.log(user_average)
  for (let i = 0; i < neighbours.length; i++) {
    let neighbor_average: number = 0;
    let neighbor_average_index : number = 0
    matrix[neighbours[i]].forEach((value, index) => {
      if(value !== -1) {
        neighbor_average += value;
        neighbor_average_index++
      }
    })

    neighbor_average = neighbor_average / neighbor_average_index;
    console.log(utilitymatrix[i] + '*' + '('+ matrix[neighbours[i]][item]+ ' - ' + neighbor_average)
    numerator += utilitymatrix[i] * ( matrix[neighbours[i]][item] - neighbor_average);
    denominator += Math.abs(utilitymatrix[i]);
    console.log(denominator +'denominator')
  }
  matrix[user][item] = Number((user_average + (numerator / denominator)).toFixed(2))
  return matrix
}

export const MatrixBuilder = (matrix: number[][], metric: number, user: number, neighbours: number, prediction: number) => {
  let neighboursArray: number[] = []
  let auxMatrix: number[][] = new Array(0);
  auxMatrix.push(matrix[user]);
  let matrixCopy = JSON.parse(JSON.stringify(matrix));
  // matrix.forEach((value,index) => {
  //   matrixCopy.push([])
  //   matrix[index].forEach((value) => {
  //     matrixCopy[index].push(value)
  //   })
  // })
  let i : number = 0;
  while(auxMatrix.length !== neighbours + 1) {
    if(i !== user) {
      auxMatrix.push(matrix[i]);
      neighboursArray.push(i);
    }
    ++i;
  }
  let result: number[][] = [[]]
  let similarity_result: number[] = new Array(0);
  switch (metric) {
    case 1:
      similarity_result = cosine(auxMatrix);
      break;
    case 2:
      similarity_result = pearson(auxMatrix)
      break;
    case 3:
      similarity_result = euclidean(auxMatrix)
      break;
    default:
      return matrix;
  }
  switch (prediction) {
    case 1:
      result = SimplePrediction(matrixCopy, similarity_result, user, neighboursArray);
      break;
    case 2:
      result = AverageDeviation(matrixCopy, similarity_result, user, neighboursArray);
      break;
    default:
      return SimplePrediction(matrixCopy, similarity_result, user, neighboursArray);
  }
  console.log("Resultado: ", result)
  console.log(similarity_result)
  console.log(matrixCopy)
  console.log(neighboursArray)
  return result;
}

export default MatrixBuilder;
