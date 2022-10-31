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