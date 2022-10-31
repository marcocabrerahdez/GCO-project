import { cosine } from "./Metrics/Cosine/Cosine";
import { euclidean } from "./Metrics/Euclidean/Euclidean";
import { pearson } from "./Metrics/Pearson/Pearson";
import { SimplePrediction } from "./Predictions/SimplePrediction";
import { AverageDeviation } from "./Predictions/AverageDeviation";

/** Builds the matrix result */
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
