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
  const matrixSize = matrix.length;
  const utilityMatrix = new Array(matrixSize);
  for (let i = 0; i < matrixSize; i++) {
    utilityMatrix[i] = new Array(matrixSize);
  }

  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (i === j) {
        utilityMatrix[i][j] = 0;
      } else {
        utilityMatrix[i][j] = pearsonCorrelation(matrix[i], matrix[j]);
      }
    }
  }

  return utilityMatrix;
}

/** Creates a 2d utility matrix using cosine similarity */
export const cosine = (matrix: number[][]) => {
  const matrixSize = matrix.length;
  const utilityMatrix = new Array(matrixSize);
  for (let i = 0; i < matrixSize; i++) {
    utilityMatrix[i] = new Array(matrixSize);
  }

  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (i === j) {
        utilityMatrix[i][j] = 0;
      } else {
        utilityMatrix[i][j] = cosineSimilarity(matrix[i], matrix[j]);
      }
    }
  }

  return utilityMatrix;
}

/** Creates a 2d utility matrix using euclidean distance */
export const euclidean = (matrix: number[][]) => {
  const matrixSize = matrix.length;
  const utilityMatrix = new Array(matrixSize);
  for (let i = 0; i < matrixSize; i++) {
    utilityMatrix[i] = new Array(matrixSize);
  }

  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (i === j) {
        utilityMatrix[i][j] = 0;
      } else {
        utilityMatrix[i][j] = euclideanDistance(matrix[i], matrix[j]);
      }
    }
  }

  return utilityMatrix;
}

export const MatrixBuilder = (matrix: number[][], metric: number) => {
  switch (metric) {
    case 1:
      return cosine(matrix);
    case 2:
      return pearson(matrix);
    case 3:
      return euclidean(matrix);
    default:
      return cosine(matrix);
  }
}

export default MatrixBuilder;

