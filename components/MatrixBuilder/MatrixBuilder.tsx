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
  let operationsString : string = ''
  for (let i = 0; i < matrixFull[user].length; i++) {
    if(matrixFull[user][i] == -1) {
      item = i;
      break;
    }
  }
  let numerator: number = 0;
  let denominator: number = 0;
  operationsString += `Prediccion Simple en el Item: ${item} \n <br /> (`
  for (let i = 0; i < neighbours.length; i++) {
    operationsString += `${utilitymatrix[i]} * ${matrixFull[neighbours[i]][item]} +`
    //console.log(utilitymatrix[i] + ' * ' + matrixFull[neighbours[i]][item])
    numerator += matrixFull[neighbours[i]][item] * utilitymatrix[i];
    denominator += Math.abs(utilitymatrix[i]);
    //console.log(denominator +' denominator')
  }
  operationsString += `) / ${denominator} =`
  matrixFull[user][item] = Number((numerator/denominator).toFixed(2))
  if (denominator === 0) {
    matrixFull[user][item] = 0;
  }
  operationsString += `${matrixFull[user][item]}\n <br />`
  /** NO TOCAR */
  /** CODIGO MAGICO: Como lo toque alguien se va todo a la funka */
  let segment = document.getElementById("operations")
  if(segment) {
    segment.innerHTML += operationsString;
  }
  return matrixFull
}

export const AverageDeviation = (matrix: number[][], utilitymatrix: number[], user: number, neighbours: number[]) => {
  let item : number = 0;
  let numerator: number = 0;
  let denominator: number = 0;
  //console.log(matrix)
  let operationsString : string = ''
  for (let i = 0; i < matrix[user].length; i++) {
    if(matrix[user][i] == -1) {
      item = i;
      break;
    }
  }
  operationsString += `Prediccion considerando la Media en el Item: ${item} \n <br /> (`
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
    operationsString += `${utilitymatrix[i]} * ${matrix[neighbours[i]][item]} - ${neighbor_average} +`
    //console.log(utilitymatrix[i] + '*' + '('+ matrix[neighbours[i]][item]+ ' - ' + neighbor_average)
    numerator += utilitymatrix[i] * ( matrix[neighbours[i]][item] - neighbor_average);
    denominator += Math.abs(utilitymatrix[i]);
    //console.log(denominator +'denominator')
  }
  operationsString += `) / ${denominator} =`
  matrix[user][item] = Number((user_average + (numerator / denominator)).toFixed(2))
  if (denominator === 0) {
    matrix[user][item] = 0;
  }
  operationsString += `${matrix[user][item]}\n <br />`
  /** NO TOCAR */
  /** CODIGO MAGICO: Como lo toque alguien se va todo a la funka */
  let segment = document.getElementById("operations")
  if(segment) {
    segment.innerHTML += operationsString;
  }
  return matrix
}

export const MatrixBuilder = (matrix: number[][], metric: number, neighbours: number, prediction: number) => {
  if(metric == 0) return matrix;
  let neighboursArray: number[] = []
  let auxMatrix: number[][] = new Array(0);
  let selectedUser: number = -1
  let operationsString : string = ' '
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === -1) {
        selectedUser = i
        break
      }
    }
    if(selectedUser !== -1) break
  }
  if (selectedUser === -1) {
    console.log('SALIDA ')
    return matrix
  }
  auxMatrix.push(matrix[selectedUser]);
  console.log('Usuario seleccionado: ', selectedUser)
  operationsString += '<br/><b>Usuario seleccionado: ' + selectedUser + '</b>\n <br />'
  let matrixCopy = JSON.parse(JSON.stringify(matrix));
  let i : number = 0;
  operationsString += `Vecinos ( Cantidad: ${neighbours} ): `
  while(auxMatrix.length !== neighbours + 1) {
    if(i !== selectedUser) {
      operationsString += i + ', '
      auxMatrix.push(matrix[i]);
      neighboursArray.push(i);
    }
    ++i;
  }
  operationsString += '\n <br />'
  let result: number[][] = [[]]
  let similarity_result: number[] = new Array(0);
  switch (metric) {
    case 1:
      similarity_result = cosine(auxMatrix);
      operationsString += 'Métrica Seleccionada: Coseno\n <br />'
      break;
    case 2:
      similarity_result = pearson(auxMatrix)
      operationsString += 'Métrica Seleccionada: Pearson\n <br />'
      break;
    case 3:
      similarity_result = euclidean(auxMatrix)
      operationsString += 'Métrica Seleccionada: Distancia Euclidea\n <br />'
      break;
    default:
      return matrix;
  }
  operationsString += 'Similitud obtenida (sim(usuario, vecino)):\n <br />'
  similarity_result.forEach((value, index)=> {
    operationsString += `sim(${selectedUser}, ${neighboursArray[index]}) = ${value}\n <br />`
  })
  /** NO TOCAR */
  /** CODIGO MAGICO: Como lo toque alguien se va todo a la funka */
  let segment = document.getElementById("operations")
  if(segment) {
    segment.innerHTML += operationsString;
  }
  operationsString = ''
  switch (prediction) {
    case 1:
      result = SimplePrediction(matrixCopy, similarity_result, selectedUser, neighboursArray);
      break;
    case 2:
      result = AverageDeviation(matrixCopy, similarity_result, selectedUser, neighboursArray);
      break;
    default:
      return SimplePrediction(matrixCopy, similarity_result, selectedUser, neighboursArray);
  }
  console.log("Matriz Util: " + similarity_result)
  console.log("Resultado: ", result)
  /** NO TOCAR */
  /** CODIGO MAGICO: Como lo toque alguien se va todo a la funka */
  segment = document.getElementById("operations")
  if(segment) {
    segment.innerHTML += operationsString;
  }
  result = MatrixBuilder(result, metric, neighbours, prediction)
  return result;
}

export default MatrixBuilder;
