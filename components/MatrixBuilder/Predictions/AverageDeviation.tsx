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